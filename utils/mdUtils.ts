/**
 * Markdown处理工具类
 * 提供处理带有定位标签的Markdown内容的功能
 */

interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface PositionTag {
  type: string;
  coords: number[];
  fullMatch: string;
  startIndex: number;
  endIndex: number;
}

/**
 * 解析Markdown中的定位标签
 * @param mdContent Markdown内容
 * @returns PositionTag[] 定位标签数组
 */
function parsePositionTags(mdContent: string): PositionTag[] {
  const positionTags: PositionTag[] = [];
  // 匹配形如 <|ref|>text<|/ref|><|det|>[[88, 72, 745, 94]]<|/det|> 的模式
  // 支持标签在同一行或不同行的情况
  const tagRegex = /<\|ref\|>(?<type>title|sub_title|text|image|image_caption)<\|\/ref\|><\|det\|>\[\[(?<x1>\d+),\s*(?<y1>\d+),\s*(?<x2>\d+),\s*(?<y2>\d+)\]\]<\|\/det\|>/g;
  
  let match;
  while ((match = tagRegex.exec(mdContent)) !== null) {
    const fullMatch = match[0];
    const type = match.groups?.type || '';
    const coordsText = `${match.groups?.x1},${match.groups?.y1},${match.groups?.x2},${match.groups?.y2}`;
    
    console.log(`Found tag: type=${type}, coordsText=${coordsText}`);
    
    let coords: number[] = [];
    if (coordsText) {
      coords = coordsText.split(',').map(s => {
        const num = parseInt(s.trim(), 10);
        console.log(`Parsed coordinate: ${s} -> ${num}`);
        return num;
      });
    }
    
    positionTags.push({
      type,
      coords,
      fullMatch,
      startIndex: match.index,
      endIndex: match.index + fullMatch.length
    });
  }
  
  return positionTags;
}

/**
 * 从图片中裁剪指定区域
 * @param imageBase64 原始图片Base64数据
 * @param bbox 裁剪区域
 * @returns Promise<string> 裁剪后的小图片Base64数据
 */
async function cropImageFromBase64(imageBase64: string, bbox: BoundingBox): Promise<string> {
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
        
        // 设置canvas尺寸为裁剪区域尺寸
        canvas.width = bbox.width;
        canvas.height = bbox.height;
        
        // 从原始图片中裁剪指定区域
        ctx.drawImage(
          img,
          bbox.x, bbox.y, bbox.width, bbox.height,  // 源区域
          0, 0, bbox.width, bbox.height             // 目标区域
        );
        
        // 导出为Base64
        const croppedImage = canvas.toDataURL('image/png');
        resolve(croppedImage);
      } catch (error) {
        reject(error);
      }
    };
    
    img.onerror = () => {
      reject(new Error('图片加载失败'));
    };
    
    img.src = imageBase64;
  });
}

/**
 * 转换OCR坐标到图片坐标
 * @param coords OCR坐标 [x1, y1, x2, y2]
 * @param imgWidth 图片实际宽度
 * @param imgHeight 图片实际高度
 * @returns BoundingBox 转换后的坐标对象
 */
function convertCoordsToBoundingBox(
  coords: number[],
  imgWidth: number,
  imgHeight: number
): BoundingBox {
  // DeepSeek OCR 使用的是1024x1024坐标系统
  const originalWidth = 999;
  const originalHeight = 999;
  
  if (coords.length !== 4) {
    throw new Error('坐标必须包含4个值: [x1, y1, x2, y2]');
  }
  
  const [x1, y1, x2, y2] = coords;
  
  // 计算缩放比例
  const scaleX = imgWidth / originalWidth;
  const scaleY = imgHeight / originalHeight;
  
  // 转换坐标
  const x = Math.round(x1 * scaleX);
  const y = Math.round(y1 * scaleY);
  const width = Math.round((x2 - x1) * scaleX);
  const height = Math.round((y2 - y1) * scaleY);
  
  return { x, y, width, height };
}

/**
 * 获取图片的实际尺寸
 * @param imageBase64 图片Base64数据
 * @returns Promise<{width: number, height: number}> 图片尺寸
 */
function getImageDimensions(imageBase64: string): Promise<{ width: number; height: number }> {
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

/**
 * 处理带有定位标签的Markdown内容
 * @param imageBase64 原始图片的Base64数据
 * @param mdContent 包含定位标签的Markdown内容
 * @returns Promise<string> 处理后的Markdown内容
 */
export async function processMdWithPositionTags(
  imageBase64: string,
  mdContent: string
): Promise<string> {
  console.log('Processing markdown with position tags, content length:', mdContent.length);
  
  // 解析所有定位标签
  const positionTags = parsePositionTags(mdContent);
  console.log('Found', positionTags.length, 'position tags');
  
  if (positionTags.length === 0) {
    console.log('No position tags found, returning original content');
    return mdContent;
  }
  
  // 获取图片尺寸
  const dimensions = await getImageDimensions(imageBase64);
  console.log('Image dimensions:', dimensions);
  
  // 从后向前处理标签，避免索引变化影响
  let processedContent = mdContent;
  for (let i = positionTags.length - 1; i >= 0; i--) {
    const tag = positionTags[i];
    console.log(`Processing tag ${i}: type=${tag.type}, coords=`, tag.coords);
    
    if (tag.type === 'image' && tag.coords.length === 4) {
      try {
        // 对于image类型，从原图中截取对应区域并替换
        const bbox = convertCoordsToBoundingBox(tag.coords, dimensions.width, dimensions.height);
        const croppedImage = await cropImageFromBase64(imageBase64, bbox);
        
        // 用居中对齐且限制最大宽度的HTML图片语法替换整个标签
        const imageMarkdown = `<div align="center"><img src="${croppedImage}" alt="cropped-image" style="max-width: 80%;" /></div>`;
        processedContent = processedContent.substring(0, tag.startIndex) +
                          imageMarkdown +
                          processedContent.substring(tag.endIndex);
        console.log(`Replaced image tag with cropped image, size: ${croppedImage.length}`);
      } catch (error) {
        console.error('Error cropping image for tag:', tag, error);
        // 出错时删除该标签
        processedContent = processedContent.substring(0, tag.startIndex) +
                          processedContent.substring(tag.endIndex);
      }
    } else {
      // 对于非image类型，直接删除整行
      const lines = processedContent.split('\n');
      let charCount = 0;
      let lineToRemove = -1;
      
      for (let j = 0; j < lines.length; j++) {
        const lineEnd = charCount + lines[j].length + (j < lines.length - 1 ? 1 : 0); // +1 for \n
        if (charCount <= tag.startIndex && tag.startIndex < lineEnd) {
          lineToRemove = j;
          break;
        }
        charCount = lineEnd;
      }
      
      if (lineToRemove !== -1) {
        lines.splice(lineToRemove, 1);
        processedContent = lines.join('\n');
        console.log(`Removed line ${lineToRemove} for non-image tag type: ${tag.type}`);
      }
    }
  }
  
  console.log('Processed markdown content length:', processedContent.length);
  return processedContent;
}