// 移除全局作用域的console.log语句，避免在Cloudflare Workers环境中执行不允许的操作

export default defineNuxtConfig({
  nitro: {
    preset: 'cloudflare-pages'
  },
  app:{
    head:{
      title:'Ocr Processing',
      meta:[
        {
          name: 'google-site-verification',
          content: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE  // Google Search Console verification code  
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/ocr-logo.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  ssr: true,
  port: process.env.PORT || 3000,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  //指定全局css
  css:['~/assets/css/tailwind.css','~/assets/css/fonts.css'],

  //引入tailwindcss
  modules:[
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@unlok-co/nuxt-stripe',
    '@nuxtjs/i18n',
    '@vite-pwa/nuxt',
    '@nuxtjs/plausible',
    '@nuxtjs/sitemap',
    'nuxt-llms',
    '@nuxtjs/seo'
  ],
  //配置公共seo数据
  site: {
    url: 'https://www.ocrprocessing.com',
    name: 'Ocr Processing | Deepseek OCR',
    description: 'The NuxtJS boilerplate with all the stuff you need to get your product in front of customers. From idea to production in 1 hour.',
    defaultLocale: 'en',
    enabled: true,
    debug: false,
    indexable: true,
    trailingSlash: false
  },
  //配置结构化数据
  schemaOrg: {
    identity: {
      type: 'Organization',
      name: 'Ocr Processing | Deepseek OCR',
      url: 'https://www.ocrprocessing.com',
      logo: 'https://www.ocrprocessing.com/ocr-logo.svg'
    },
    defaults: true,
    minify: true,
    reactive: false,
    enabled: true,
    debug: false
  },
  //配置robots爬虫抓取协议
  robots: {
    rules: {
      UserAgent: '*',
      Disallow: '/private',
      Allow: '/'
    },
    sitemap: 'https://www.ocrprocessing.com/sitemap.xml'
  },
  i18n: {
    strategy: 'prefix_except_default',
    locales: ['en-US', 'zh-CN', 'zh-TW', 'JP', 'KO'],
    defaultLocale: 'en-US',
    vueI18n: '@@/i18n/config.ts',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },
  llms: {
    domain: 'https://www.ocrprocessing.com',
    title: 'Ocr Processing | Deepseek OCR',
    description: 'The NuxtJS boilerplate with all the stuff you need to get your product in front of customers. From idea to production in 3 days.',
    sections: [
      {
        title: 'Ocr Processing',
        description: 'Ocr Processing is a open source Nuxt3 SaaS Boilerplate, pre-integrated with global payment gateways (Stripe/Cream), Google OAuth, i18n routing, and SEO optimization tools.',
        links: [
          {
            title: 'Ocr Processing `s Features',
            description: 'Integrate the most popular open source technology stack to make your entrepreneurial journey just a moment.',
            href: 'https://www.ocrprocessing.com/#features',
          },
          {
            title: 'Ocr Processing `s pricing',
            description: 'Pricing plans for enthusiasts and professionals.',
            href: 'https://www.ocrprocessing.com/#pricing',
          },
          {
            title: 'Ocr Processing `s blog',
            description: 'Latest news and updates from our team.',
            href: 'https://www.ocrprocessing.com/blog',
          },
          {
            title: 'Ocr Processing `s testimonials',
            description: 'What Our Customers Say?.',
            href: 'https://www.ocrprocessing.com/#testimonials',
          },
          {
            title: 'Ocr Processing `s faq',
            description: 'the most frequently asked questions.',
            href: 'https://www.ocrprocessing.com/#faq',
          },
          {
            title: 'Ocr Processing `s roadmap',
            description: 'Explore our development plans, upcoming features, and share your suggestions for future enhancements.',
            href: 'https://www.ocrprocessing.com/roadmap',
          }
        ]
      }
    ]
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  //运行时全局变量
  runtimeConfig: {
    //此处定义的属性只能在服务端获取到
    // Server
    name: 'jackson',
    environment: process.env.NODE_ENV || 'development',
    stripe: {
      key: process.env.NUXT_STRIPE_SECRET_KEY,
      options: {},
    },
    //creem
    creem:{
      apiKey: process.env.NUXT_CREEM_API_KEY,
      webhookSecret: process.env.NUXT_CREEM_WEBHOOK_SECRET
    },
    //bagelPay
    bagelPay:{
      apiKey: process.env.NUXT_BAGELPAY_API_KEY,
      webhookSecret: process.env.NUXT_BAGELPAY_WEBHOOK_SECRET
    },
    // ipinfo 获取Ip信息
    ipinfoToken: process.env.IPINFO_TOKEN,
    // DeepSeek OCR 配置
    deepseekOcr: {
      apiKey: process.env.DEEPSEEK_OCR_API_KEY,
      baseUrl: process.env.DEEPSEEK_OCR_BASE_URL || "https://api.ppinfra.com/openai",
      model: process.env.DEEPSEEK_OCR_MODEL || "deepseek/deepseek-ocr"
    },
    //public中定义的属性既可以在服务端，也可以在客户端获取到
    public: {
      env: process.env.NUXT_PUBLIC_ENV || 'development',
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
      isServer: true,
      plausible: {
        domain: process.env.NUXT_PUBLIC_PLAUSIBLE_DOMAIN,
        apiHost: process.env.NUXT_PUBLIC_PLAUSIBLE_API_HOST,
        ignoredHostnames: ['localhost', '127.0.0.1'],
        autoOutboundTracking: true,
        enabled: true,
      },
      //支付方式选择：1、stripe;2、paddle;3、creem
      paymentMethod: process.env.PAYMENT_METHOD,
      // Client
      stripe: {
        key: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        options: {},
        manualClientLoad: true
      },
      creem:{
        url: process.env.NUXT_PUBLIC_CREEM_URL
      },
      bagelPay:{
        url: process.env.NUXT_PUBLIC_BAGELPAY_URL
      },
      // DeepSeek OCR 公共配置（如果需要在客户端使用）
      deepseekOcr: {
        baseUrl: process.env.DEEPSEEK_OCR_BASE_URL || "https://api.ppinfra.com/openai",
        model: process.env.DEEPSEEK_OCR_MODEL || "deepseek/deepseek-ocr"
      }
    },
  },
  devServer: {
    host: '0.0.0.0' // 允许所有 IP 访问
  },
  vite: {
    server: {
      allowedHosts: ['www.ocrprocessing.com'] // 允许指定域名
    }
  }
})