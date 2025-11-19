interface DeepSeekOCRConfig {
  baseURL?: string;
  apiKey?: string;
  model?: string;
}

interface OCRResult {
  content: string;
  finishReason?: string;
}

class DeepSeekOCR {
  private baseURL: string;
  private apiKey: string;
  private model: string;

  constructor(config?: DeepSeekOCRConfig) {
    // 尝试从Nuxt运行时配置获取参数
    let baseURL = config?.baseURL;
    let apiKey = config?.apiKey;
    let model = config?.model;

    // 如果在Nuxt环境中，尝试获取运行时配置
    if (typeof useRuntimeConfig !== 'undefined') {
      try {
        // @ts-ignore
        const runtimeConfig = useRuntimeConfig();
        baseURL = baseURL || runtimeConfig.public.deepseekOcr?.baseUrl;
        apiKey = apiKey || runtimeConfig.deepseekOcr?.apiKey;
        model = model || runtimeConfig.public.deepseekOcr?.model;
      } catch (e) {
        console.warn('Failed to get runtime config:', e);
      }
    }

    // 回退到环境变量
    baseURL = baseURL || process.env.DEEPSEEK_OCR_BASE_URL || "https://api.ppinfra.com/openai";
    apiKey = apiKey || process.env.DEEPSEEK_OCR_API_KEY || "";
    model = model || process.env.DEEPSEEK_OCR_MODEL || "deepseek/deepseek-ocr";
    
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.model = model;
  }

  /**
   * Perform OCR on an image
   * @param imageBase64 Base64 encoded image
   * @param prompt Optional prompt to guide the OCR process
   * @returns Promise that resolves to OCR result
   */
  async recognize(imageBase64: string, prompt?: string): Promise<OCRResult> {
    try {
      // 通过后端API代理请求，避免CORS问题
      const response = await fetch('/api/ocr/deepseek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: imageBase64,
          prompt: prompt
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'OCR processing failed');
      }

      return {
        content: result.data,
        finishReason: 'completed'
      };
    } catch (error) {
      console.error('OCR API Error:', error);
      throw error;
    }
  }

  /**
   * Get current model name
   */
  getModel(): string {
    return this.model;
  }
}


export default DeepSeekOCR;