/**
 * PDF文件处理工具类
 * 提供PDF文件的页数获取等功能
 */

/**
 * 获取PDF文件的页数
 * @param file PDF文件对象
 * @returns Promise<number> PDF文件的页数
 */
export async function getPdfPageCount(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    
    fileReader.onload = function() {
      const typedArray = new Uint8Array(this.result as ArrayBuffer)
      const pdfPageCount = extractPageCount(typedArray)
      resolve(pdfPageCount)
    }
    
    fileReader.onerror = function(err) {
      reject(err)
    }
    
    fileReader.readAsArrayBuffer(file)
  })
}

/**
 * 根据PDF文件生成每页的图片
 * @param file PDF文件对象
 * @param scale 图片缩放比例，默认为1
 * @returns Promise<string[]> 每页图片的Base64数据URL数组
 */
export async function getPdfPageImages(file: File, scale: number = 1): Promise<string[]> {
  // 动态导入pdfjs-dist库
  const pdfjsLib = await import('pdfjs-dist')
  
  // 设置PDF.js worker路径，使用与API相同的版本
  pdfjsLib.GlobalWorkerOptions.workerSrc = '//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js'
  
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader()
    
    fileReader.onload = async function() {
      try {
        const typedArray = new Uint8Array(this.result as ArrayBuffer)
        
        // 加载PDF文档
        const pdf = await pdfjsLib.getDocument({ data: typedArray }).promise
        
        const imageList: string[] = []
        
        // 遍历每一页并转换为图片
        for (let i = 1; i <= pdf.numPages; i++) {
          // 获取页面
          const page = await pdf.getPage(i)
          
          // 设置渲染参数
          const viewport = page.getViewport({ scale })
          
          // 创建canvas元素
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')
          
          if (!context) {
            throw new Error('无法创建canvas上下文')
          }
          
          canvas.height = viewport.height
          canvas.width = viewport.width
          
          // 渲染页面到canvas
          await page.render({
            canvasContext: context,
            viewport: viewport
          }).promise
          
          // 将canvas转换为Base64图片数据
          const imageData = canvas.toDataURL('image/png')
          imageList.push(imageData)
        }
        
        resolve(imageList)
      } catch (error) {
        reject(error)
      }
    }
    
    fileReader.onerror = function(err) {
      reject(err)
    }
    
    fileReader.readAsArrayBuffer(file)
  })
}

/**
 * 从PDF文件的二进制数据中提取页数
 * @param typedArray PDF文件的二进制数据
 * @returns number PDF文件的页数
 */
function extractPageCount(typedArray: Uint8Array): number {
  try {
    // 将Uint8Array转换为字符串以便搜索
    const str = Array.from(typedArray)
      .map(byte => String.fromCharCode(byte))
      .join('')
    
    // 查找 /Type /Catalog 对象，它包含页面数信息
    const catalogRegex = /\/Type\s*\/Catalog/
    const catalogMatch = str.match(catalogRegex)
    
    if (catalogMatch) {
      // 在Catalog对象附近查找页面数
      const catalogIndex = catalogMatch.index || 0
      const substring = str.substring(catalogIndex, catalogIndex + 200)
      
      // 查找 Count 字段
      const countRegex = /\/Count\s+(\d+)/
      const countMatch = substring.match(countRegex)
      
      if (countMatch && countMatch[1]) {
        return parseInt(countMatch[1], 10)
      }
    }
    
    // 备用方法：查找所有页面对象
    const pageRegex = /\/Type\s*\/Page\b/g
    const pages = str.match(pageRegex)
    
    if (pages) {
      return pages.length
    }
    
    // 如果无法确定页数，返回默认值1
    return 1
  } catch (error) {
    console.error('Error extracting page count from PDF:', error)
    return 1 // 出错时返回默认值1
  }
}

/**
 * 检查文件是否为PDF格式
 * @param file 文件对象
 * @returns boolean 是否为PDF文件
 */
export function isPdfFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
}