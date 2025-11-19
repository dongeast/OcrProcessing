/**
 * 图像处理工具类
 * 提供在图片上绘制OCR标注框和文本的功能
 */

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface ImageDimensions {
  width: number;
  height: number;
}

/**
 * 转换OCR坐标到图片坐标
 * @param x 原始x坐标
 * @param y 原始y坐标
 * @param width 原始宽度
 * @param height 原始高度
 * @param imgWidth 图片实际宽度
 * @param imgHeight 图片实际高度
 * @param originalWidth OCR处理时的原始图像宽度
 * @param originalHeight OCR处理时的原始图像高度
 * @returns 转换后的坐标对象
 */
function convertOCRCoordinates(
  x: number,
  y: number,
  width: number,
  height: number,
  imgWidth: number,
  imgHeight: number,
  originalWidth: number = 999,
  originalHeight: number = 999
): BoundingBox {
  // 根据deepseek-ocr的坐标系统进行转换
  // 使用独立的x和y缩放因子，参考Python版本实现
  const scaleX = imgWidth / originalWidth;
  const scaleY = imgHeight / originalHeight;
  
  // 应用缩放并确保坐标在图像范围内
  const scaledX = Math.max(0, Math.min(x * scaleX, imgWidth - 1));
  const scaledY = Math.max(0, Math.min(y * scaleY, imgHeight - 1));
  const scaledWidth = width * scaleX;
  const scaledHeight = height * scaleY;
  
  return {
    x: scaledX,
    y: scaledY,
    width: scaledWidth,
    height: scaledHeight
  };
}

/**
 * 获取图片的实际尺寸
 * @param imageBase64 图片Base64数据
 * @returns Promise<ImageDimensions> 图片尺寸
 */
function getImageDimensions(imageBase64: string): Promise<ImageDimensions> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = () => {
      reject(new Error('无法加载图片获取尺寸'));
    };
    img.src = imageBase64;
  });
}

interface OCRDetection {
  type: string;
  text: string;
  bbox: BoundingBox;
}

/**
 * 解析DeepSeek OCR返回的markdown文本，提取检测框信息
 * @param ocrText OCR返回的markdown文本
 * @returns OCRDetection[] 包含检测框信息的数组
 */
export function parseOCRResult(ocrText: string): OCRDetection[] {
  const detections: OCRDetection[] = [];
  const lines = ocrText.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // 查找同时包含<|ref|>和<|det|>的行
    if (line.includes('<|ref|>') && line.includes('<|det|>')) {
      // 提取类型
      const typeMatch = line.match(/<\|ref\|>([^<]+)<\|\/ref\|>/);
      const detMatch = line.match(/<\|det\|>(.*)<\|\/det\|>/);
      
      if (typeMatch && detMatch) {
        const type = typeMatch[1];
        // 移除方括号并解析坐标
        const coordsText = detMatch[1].replace(/\[/g, '').replace(/\]/g, '');
        const coords = coordsText.split(',').map(str => parseInt(str.trim(), 10));
        
        if (coords.length === 4 && coords.every(coord => !isNaN(coord))) {
          const [x, y, x2, y2] = coords;
          const bbox: BoundingBox = {
            x,
            y,
            width: x2 - x,
            height: y2 - y
          };
          
          // 获取下一行作为文本内容
          const textLine = i + 1 < lines.length ? lines[i + 1] : '';
          const text = textLine.trim();
          
          detections.push({
            type,
            text,
            bbox
          });
          
          console.log(`Parsed detection: type=${type}, text="${text}", bbox=`, bbox);
        } else {
          console.warn('Invalid coordinates format:', coordsText);
        }
      }
    }
  }
  
  console.log('Total detections parsed:', detections.length);
  if (detections.length === 0) {
    console.warn('No detections found in OCR text. Sample text:', ocrText.substring(0, 200));
  }
  return detections;
}

/**
 * 在图片上绘制OCR标注框和文本
 * @param imageBase64 原始图片的Base64数据
 * @param detections OCR检测结果
 * @returns Promise<string> 标注后的图片Base64数据
 */
export async function drawAnnotationsOnImage(
  imageBase64: string, 
  detections: OCRDetection[]
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        // 创建canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('无法创建canvas上下文'));
          return;
        }
        
        // 设置canvas尺寸与图片一致
        canvas.width = img.width;
        canvas.height = img.height;
        
        // 绘制原始图片
        ctx.drawImage(img, 0, 0);
        
        // 获取图片实际尺寸
        const imgWidth = img.width;
        const imgHeight = img.height;
        
        // 设置标注样式
        ctx.lineWidth = 2;
        ctx.font = '16px Arial';
        ctx.textBaseline = 'top';
        
        // 为不同类型的标注设置不同颜色
        const typeColors: Record<string, string> = {
          'text': 'rgba(195, 2, 2, 0.8)',       // 红色 - 文本
          'sub_title': 'rgb(0, 122, 0)',  // 绿色 - 子标题
          'title': 'rgba(0, 0, 255, 0.8)',      // 蓝色 - 标题
        };
        
        console.log('Drawing', detections.length, 'detections');
        
        // 绘制每个检测框和文本
        detections.forEach((detection, index) => {
          const { type, text, bbox } = detection;
          
          // 转换坐标以适应实际图片尺寸
          // 根据Python版本的实现，使用1000x1000作为OCR处理时的原始图像尺寸
          const convertedBbox = convertOCRCoordinates(
            bbox.x,
            bbox.y,
            bbox.width,
            bbox.height,
            imgWidth,
            imgHeight,
            1000,
            1000
          );
          
          const color = typeColors[type] || 'rgba(255, 255, 0, 0.8)'; // 默认黄色
          
          console.log(`Drawing detection ${index}:`, detection);
          
          // 绘制边界框
          ctx.strokeStyle = color;
          ctx.strokeRect(convertedBbox.x, convertedBbox.y, convertedBbox.width, convertedBbox.height);
          
          // 绘制文本背景
          if (text) {
            ctx.fillStyle = color;
            const textMetrics = ctx.measureText(text);
            const padding = 4;
            const textHeight = 20;
            ctx.fillRect(
              convertedBbox.x, 
              convertedBbox.y - textHeight, 
              textMetrics.width + padding * 2, 
              textHeight
            );
            
            // 绘制文本
            ctx.fillStyle = 'white';
            ctx.fillText(text, convertedBbox.x + padding, convertedBbox.y - textHeight + padding);
          }
        });
        
        // 导出为Base64
        const annotatedImage = canvas.toDataURL('image/png');
        console.log('Annotation completed, generated image length:', annotatedImage.length);
        resolve(annotatedImage);
      } catch (error) {
        console.error('Error in drawAnnotationsOnImage:', error);
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };
    
    // 添加调试信息
    console.log('Loading image for annotation, data length:', imageBase64.length);
    img.src = imageBase64;
  });
}

/**
 * 处理OCR结果并在图片上生成标注
 * @param imageBase64 原始图片的Base64数据
 * @param ocrText OCR返回的markdown文本
 * @returns Promise<string> 标注后的图片Base64数据
 */
export async function annotateImageWithOCR(
  imageBase64: string, 
  ocrText: string
): Promise<string> {
  console.log('Annotating image with OCR result:', ocrText.substring(0, 200) + '...');
  const detections = parseOCRResult(ocrText);
  console.log('Found', detections.length, 'detections for annotation');
  return await drawAnnotationsOnImage(imageBase64, detections);
}