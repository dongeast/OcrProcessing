import OpenAI from "openai"

export default defineEventHandler(async (event) => {
  try {
    // 从请求体中获取数据
    const body = await readBody(event)
    const { imageBase64, prompt } = body

    if (!imageBase64) {
      throw createError({
        statusCode: 400,
        message: 'Missing imageBase64 parameter'
      })
    }

    // 从运行时配置获取API密钥
    const config = useRuntimeConfig()
    const apiKey = config.deepseekOcr?.apiKey
    
    if (!apiKey) {
      throw createError({
        statusCode: 500,
        message: 'DeepSeek OCR API key not configured'
      })
    }

    // 初始化OpenAI客户端
    const openai = new OpenAI({
      baseURL: config.public.deepseekOcr?.baseUrl,
      apiKey: apiKey,
    })

    // 构建消息内容
    const content: any = [
      {
        type: "image_url",
        image_url: {
          url: `data:image/png;base64,${imageBase64}`
        }
      }
    ];

    // 如果提供了提示词，则添加到消息中
    if (prompt) {
      content.unshift({
        type: "text",
        text: prompt
      });
    }

    // 调用OCR API
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: content,
        },
      ],
      model: config.public.deepseekOcr?.model || "deepseek/deepseek-ocr",
      tempature: 0,
      top_p: 0.7,
      max_tokens: 4096,
      min_p: 0,
      top_k: 50,
      presence_penalty: 0,
      frequency_penalty: 0, 
      repetition_penalty: 1,
      stream: false
    })

    // 返回结果
    return {
      success: true,
      data: completion.choices[0]?.message?.content || ""
    }
  } catch (error: any) {
    console.error('OCR API Error:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to process OCR request'
    })
  }
})