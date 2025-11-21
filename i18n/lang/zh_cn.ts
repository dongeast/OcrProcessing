export default {
    center: {
        menu: {
            dashboard: '仪表盘',
            profile: '个人资料',
            account: '账户',
            billing: '账单',
            settings: '设置',
            ocrAnalysis: 'OCR分析',
            translation: '智能翻译',
            tools: '实用工具',
            theme: '切换主题'
        },
        dashboard: {
            title: '仪表盘',
            subtitle: '管理您的OCR文档并监控处理活动',
            welcome: '欢迎回来',
            quickActions: {
                addNew: '添加新内容',
                uploadDocument: '上传文档'
            },
            uploadButton: '上传文档',
            uploadCard: {
                title: '上传新文件',
                description: '上传文件进行OCR处理'
            },
            resources: {
                usage: '资源使用情况',
                files: '文件',
                storage: '存储空间',
                apiCalls: 'API调用'
            },
            viewDetails: '查看详情',
            table: {
                searchPlaceholder: '搜索文档...',
                columns: {
                    name: '名称',
                    type: '类型',
                    size: '大小',
                    status: '状态',
                    date: '日期',
                    actions: '操作'
                },
                actions: {
                    view: '查看文档',
                    download: '下载文档',
                    delete: '删除文档'
                },
                empty: '未找到文档',
                showing: '显示 {count} 个，共 {total} 个文档'
            },
            recentActivity: '最近活动',
            recentDocuments: '最近文档',
            viewAll: '查看全部',
            activities: {
                uploaded: '文件已上传',
                processed: '文档处理成功',
                deleted: '文件已删除',
                failed: '处理失败'
            },
            cards: {
                documents: {
                    label: '文档',
                    subText: '文档总数'
                },
                processed: {
                    label: '已处理',
                    subText: '成功处理'
                },
                accuracy: {
                    label: '准确率',
                    subText: '成功率'
                },
                processingTime: {
                    label: '处理时间',
                    subText: '每文档平均时间'
                }
            },
            sortNewest: '最新优先',
            sortOldest: '最旧优先',
            sortNameAsc: '名称（A-Z）',
            sortNameDesc: '名称（Z-A）'
        },
        billing: {
            free: '免费',
            pro: '专业版',
            max: '高级版',
            ultra: '旗舰版'
        },
    },
    home: {
        title: 'Ocr Processing',
        description: '基于 Deepseek-OCR 大模型的先进OCR处理平台。以无与伦比的准确率将扫描文档、PDF和图像转换为可编辑文本。支持多种语言和文件格式。',
        startLink: '立即开始免费体验~',
        thirdPartyLink: '前往Github~',
        loginButton: '登录',
        waitlist:{
            cardTitle: '加入等待列表,第一时间获取Ocr Processing最新消息及折扣优惠！',
            placeholder: '输入你的邮箱吧~',
            button: '立即加入！',
            joinCountMessage: '🔥 刚刚，第 {count} 位早期用户加入了等待名单！',
            modalTitle: '加入成功！',
            modalMessage: '感谢您对Ocr Processing的认可与支持，您将第一时间收到Ocr Processing的最新消息及折扣优惠！Enjoy it！',
            modalCloseButton: '关闭',
        },
        hero: {
            deepSeekTitle: 'DeepSeek OCR',
            deepSeekSubtitle: '先进的AI驱动文字识别',
            poweredBy: '由 DeepSeek OCR 驱动',
            feature1: '先进的AI模型，提供卓越的OCR识别精度',
            feature2: '支持多种语言和复杂版式',
            feature3: '将文档转换为可编辑文本，准确率高达95%以上',
            feature4: '几秒钟内处理PDF、扫描图像和文档'
        },
        nav: {
            features: '功能特性',
            pricing: '价格方案',
            blog: '技术博客',
            contact: '联系我们',
            roadmap: '产品路线',
            waitlist: '加入等待列表',
            login: '登录',
        },
        features: {
            title: '功能特性',
            description: '开箱即用的功能，助你快速构建全球化Web应用',
            sutTitle_1: 'i18n 国际化',
            subDescription_1: '轻松为Nuxt项目添加国际化支持,再小的语种都不怕',
            sutTitle_2: 'Stripe支付',
            subDescription_2: '最好、最安全的在线支付服务',
            sutTitle_3: 'BagelPay支付',
            subDescription_3: '为 SaaS 和独立开发者提供稳定简单配置的的在线收款服务',
            sutTitle_4: 'Creem支付',
            subDescription_4: '为 SaaS 和独立开发者提供稳定的的在线支付服务',
            sutTitle_5: 'Resend邮件',
            subDescription_5: '为开发者们打造的现代邮件API服务',
            sutTitle_6: 'SEO优化',
            subDescription_6: '内置全面的SEO功能，提高搜索引擎排名',
            sutTitle_7: 'PWA支持',
            subDescription_7: '零配置的PWA框架，提供离线访问和移动设备安装支持',
            sutTitle_8: 'Google Auth认证',
            subDescription_8: '安全可靠的Google账户登录支持',
            sutTitle_9: 'DrizzleORM数据库',
            subDescription_9: '用于 Node.js 和 TypeScript 的开源下一代数据库工具包',
        },
        pricing: {
            title: '价格方案',
            description: '为爱好者和专业人士提供的价格计划',
            monthly: '月付',
            annually: '年付',
            saveDiscount: '节省',
            oneTimePayment: '一次性购买',
            allFeaturesIncluded: '包含开源版本所有功能',
            permanentAccess: '永久访问',
            backgroundSupport: '后台管理系统配置支持',
            visualDataAnalysis: '可视化数据分析',
            freeUpdatesForLife: '终身免费更新',
            IntelligentEmailMarketing: '智能邮件营销获客',
            HighDRSiteRecommendation: '高权重站点收录推荐',
            ExclusiveHighQualityOverseasCommunity: '独家优质海外社群服务',
            newFeaturesExperience: '新产品/功能优先体验',
            unlimitedCreate: '一次付费，无限创作',
            multiTheme: '多元化风格主题定制',
            seoBlog: 'SEO博客内容管理',
            overboardPdf: '一站式从零开始出海指南PDF',
            nuxtJSTemplate: 'NuxtJs3 模板',
            seoSupports: '基础SEO功能支持',
            stripeAndCreem: 'Stripe和Creem支付无缝集成及WebHook回调',
            authThird: '安全的授权认证及第三方登录集成',
            i18Support: '国际化配置支持',
            zeroPWA: '零配置PWA集成',
            buyButton: '立即购买',
            starterPlan: '入门版',
            starterPlanYearPrice: '¥99',
            starterPlanMonthPrice: '¥9',
            starterYearUnit: '年',
            starterMonthUnit: '月',
            starterPlanYearPriceDiscountText: '9 × 12 - 20% 优惠',
            starterPlanPermanentAccess: '包含开源版本所有功能',
            starterPlanAllFeaturesIncluded: '永久访问',
            starterPlanFreeUpdatesForLife: '终身免费更新',
            starterButton: '立即购买',
            popular: '最受欢迎',
            professionalPlan: '专业版',
            professionalPlanYearPrice: '¥299',
            professionalPlanMonthPrice: '¥29',
            professionalYearUnit: '年',
            professionalMonthUnit: '月',
            professionalPlanYearPriceDiscountText: '29 × 12 - 20% 优惠',
            professionalPlanPermanentAccess: '包含开源版本所有功能',
            professionalPlanAllFeaturesIncluded: '永久访问',
            professionalPlanFreeUpdatesForLife: '终身免费更新',
            professionalButton: '立即购买',
            enterprisePlan: '企业版',
            enterprisePlanYearPrice: '¥1,999',
            enterprisePlanMonthPrice: '¥199',
            enterpriseYearUnit: '年',
            enterpriseMonthUnit: '月',
            enterprisePlanYearPriceDiscountText: '199 × 12 - 20% 优惠',
            enterprisePlanPermanentAccess: '包含开源版本所有功能',
            enterprisePlanAllFeaturesIncluded: '永久访问',
            enterprisePlanFreeUpdatesForLife: '终身免费更新',
            enterpriseButton: '立即购买'
        },
        faq: {
            title: '常见问题',
            description: '关于Ocr Processing的常见问题解答',
            items: [
                {
                    question: '1. 什么是DeepSeek OCR？它与传统OCR技术有何不同？',
                    answer: 'DeepSeek OCR是一种基于30亿参数大模型的先进光学字符识别系统。与依赖模板匹配和基于规则方法的传统OCR系统不同，DeepSeek OCR使用深度学习算法来理解复杂的文档布局、识别手写文本，并以超过95%的卓越准确率处理多语言文档。'
                },
                {
                    question: '2. 你们的OCR服务支持哪些文件格式？',
                    answer: '我们的OCR服务支持多种文件格式，包括PDF文档、扫描图像（JPEG、PNG、TIFF、BMP）以及各种办公文档格式。我们可以从单页和多页文档中提取文本，同时保留原始布局结构和格式。'
                },
                {
                    question: '3. DeepSeek OCR提供的文本识别准确率如何？',
                    answer: 'DeepSeek OCR在标准打印文档上的准确率超过95%，在手写文本上的准确率约为90%。准确率可能会受到图像质量、字体复杂性和文档布局等因素的影响。我们的动态分块视觉编码技术显著提高了复杂布局的识别准确率。'
                },
                {
                    question: '4. DeepSeek OCR能否处理多语言文档？',
                    answer: '可以，DeepSeek OCR支持识别多种语言的文档，包括英语、中文、日语、韩语和许多欧洲语言。该模型经过专门训练，能够有效处理混合语言文档，非常适合国际商务应用。'
                },
                {
                    question: '5. 使用DeepSeek OCR处理文档的速度如何？',
                    answer: '文档处理速度取决于文档的复杂性和大小。简单的单页文档通常在几秒钟内处理完毕，而复杂的多页文档可能需要几分钟。我们的系统经过优化，具有高吞吐量，能够高效处理批量处理任务。'
                },
                {
                    question: '6. 使用你们的OCR服务时，我的数据安全吗？',
                    answer: '绝对安全。我们将数据安全和隐私放在首位。所有文档都经过安全处理，处理完成后我们不会在服务器上存储您的文档。我们的基础设施遵循行业标准的安全实践，包括加密数据传输和安全的API访问。'
                },
                {
                    question: '7. 识别出的文本有哪些输出格式？',
                    answer: '我们提供多种输出格式以满足不同需求，包括纯文本（TXT）、结构化数据（JSON）、Microsoft Word文档（DOCX）和带可搜索文本的PDF。您还可以通过我们的API以编程方式访问识别结果，以便与您自己的应用程序集成。'
                },
                {
                    question: '8. 如何将DeepSeek OCR集成到我自己的应用程序或工作流程中？',
                    answer: '我们提供全面的API文档和主流编程语言的SDK，使集成变得简单直接。只需几行代码，您就可以为应用程序添加先进的OCR功能。我们还提供webhook支持，用于自动化处理工作流程。'
                }
            ]
        },
        faqs:{
            title: '常见问题',
            question1: '1. 什么是DeepSeek OCR？它与传统OCR技术有何不同？',
            answer1: 'DeepSeek OCR是一种基于30亿参数大模型的先进光学字符识别系统。与依赖模板匹配和基于规则方法的传统OCR系统不同，DeepSeek OCR使用深度学习算法来理解复杂的文档布局、识别手写文本，并以超过95%的卓越准确率处理多语言文档。',
            question2: '2. 你们的OCR服务支持哪些文件格式？',
            answer2: '我们的OCR服务支持多种文件格式，包括PDF文档、扫描图像（JPEG、PNG、TIFF、BMP）以及各种办公文档格式。我们可以从单页和多页文档中提取文本，同时保留原始布局结构和格式。',
            question3: '3. DeepSeek OCR提供的文本识别准确率如何？',
            answer3: 'DeepSeek OCR在标准打印文档上的准确率超过95%，在手写文本上的准确率约为90%。准确率可能会受到图像质量、字体复杂性和文档布局等因素的影响。我们的动态分块视觉编码技术显著提高了复杂布局的识别准确率。',
            question4: '4. DeepSeek OCR能否处理多语言文档？',
            answer4: '可以，DeepSeek OCR支持识别多种语言的文档，包括英语、中文、日语、韩语和许多欧洲语言。该模型经过专门训练，能够有效处理混合语言文档，非常适合国际商务应用。',
            question5: '5. 使用DeepSeek OCR处理文档的速度如何？',
            answer5: '文档处理速度取决于文档的复杂性和大小。简单的单页文档通常在几秒钟内处理完毕，而复杂的多页文档可能需要几分钟。我们的系统经过优化，具有高吞吐量，能够高效处理批量处理任务。',
            question6: '6. 使用你们的OCR服务时，我的数据安全吗？',
            answer6: '绝对安全。我们将数据安全和隐私放在首位。所有文档都经过安全处理，处理完成后我们不会在服务器上存储您的文档。我们的基础设施遵循行业标准的安全实践，包括加密数据传输和安全的API访问。',
            question7: '7. 识别出的文本有哪些输出格式？',
            answer7: '我们提供多种输出格式以满足不同需求，包括纯文本（TXT）、结构化数据（JSON）、Microsoft Word文档（DOCX）和带可搜索文本的PDF。您还可以通过我们的API以编程方式访问识别结果，以便与您自己的应用程序集成。',
            question8: '8. 如何将DeepSeek OCR集成到我自己的应用程序或工作流程中？',
            answer8: '我们提供全面的API文档和主流编程语言的SDK，使集成变得简单直接。只需几行代码，您就可以为应用程序添加先进的OCR功能。我们还提供webhook支持，用于自动化处理工作流程。',
        },
        testimonials: {
            title: '用户评价',
            description: '看看我们的用户怎么说',
            items: [
                {
                    name: '张三',
                    role: '创业者',
                    content: 'Ocr Processing帮助我快速启动了我的SaaS业务，国际化支持特别棒！',
                    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
                },
                {
                    name: '李四',
                    role: '独立开发者',
                    content: '集成的支付和认证功能节省了我大量的开发时间，强烈推荐！',
                    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
                },
                {
                    name: '王五',
                    role: 'CTO',
                    content: 'SEO优化和PWA支持让我们的应用在搜索引擎和移动设备上表现出色。',
                    avatar: 'https://randomuser.me/api/portraits/men/67.jpg'
                }
            ]
        },
        footer: {
            description: '基于Nuxt3的企业级SaaS出海模板，预集成Stripe/Cream支付、谷歌登录、多语言路由和SEO工具。快速构建SSR的全球化Web应用，开箱即用',
            copyRight: '版权所有 © 2025 Ocr Processing 保留所有权利',
            github: 'GitHub',
            twitter: 'Twitter',
            discord: 'Discord',
            wechat: '微信',
            columns: [
                {
                    title: '产品',
                    links: [
                        { name: '功能特性', href: '#features' },
                        { name: '价格方案', href: '#pricing' },
                        { name: '技术博客', href: '/blog' },
                        { name: '产品路线', href: '/roadmap' },
                    ]
                },
                {
                    title: '支持',
                    links: [
                        { name: '帮助中心', href: '#' },
                        { name: '联系我们', href: '#' },
                        { name: '隐私政策', href: '/privacy' },
                        { name: '服务条款', href: '/terms' },
                    ]
                },
                {
                    title: '公司',
                    links: [
                        { name: '关于我们', href: '#' },
                        { name: '加入我们', href: '#' },
                        { name: '许可协议', href: '/license' },
                    ]
                }
            ]
        },
        waitlistSuccessModal: {
            title: '加入成功！',
            message: '感谢您对Ocr Processing的认可与支持，您将第一时间收到Ocr Processing的最新消息及折扣优惠！Enjoy it!',
            closeButton: '关闭'
        },
        cta:{
            title: '准备好以最高效的方式开始你的光学探索工作了吗？',
            description: '加入成千上万的开发者和企业，借助先进的3B参数模型和动态分块视觉编码，实现卓越的准确性。',
            button: '立即开始您的免费试用！'
        },
    },
    auth: {
      selectLoginMethod: '授权登录',
      selectLoginMethodDescription: '即刻开启属于你在Ocr Processing的出海之旅.'
    },
    ocrAnalysis: {
      title: 'OCR分析',
      subtitle: '从图像和文档中提取文本',
      uploadButton: '上传文件',
      steps: {
        title: '处理步骤',
        upload: '上传文件',
        analysis: '光学分析',
        edit: '文档编辑',
        export: '预览导出'
      },
      features: {
        title: 'OCR功能',
        document: {
          title: '文档处理',
          description: '处理各种文档格式，包括PDF、DOCX和图像'
        },
        accuracy: {
          title: '高精度',
          description: '行业领先的OCR精度，采用先进的AI算法'
        },
        export: {
          title: '多种导出选项',
          description: '将结果导出为多种格式，包括TXT、DOCX和PDF'
        }
      },
      upload: {
        title: '上传文档',
        dragDrop: '拖拽文件到此处',
        supportedFormats: '支持JPG、PNG、PDF、TIFF、BMP格式',
        browseFiles: '浏览图像',
        uploading: '正在上传',
        analyzing: '正在分析',
        uploadComplete: '上传完成',
        uploadedFile: '已上传文件',
        requiredPoints: '所需积分',
        points: '积分',
        pageCount: '页数',
        pages: '页',
        reupload: '重新上传',
        startProcessing: '开始处理'
      },
      analysis: {
        title: 'OCR分析',
        reset: '重置',
        reprocess: '重新处理',
        reprocessCurrent: '重新处理本页',
        reprocessAll: '全部重新处理',
        saveResult: '保存结果'
      },
      editor: {
        title: 'MD编辑',
        edit: '编辑',
        preview: '预览',
        split: '分屏',
        placeholder: '# 文档标题\n\n在这里输入您的文档内容...',
        defaultTitle: 'OCR识别结果',
        defaultContent: '这是从您的文档中识别出的内容。\n\n您可以自由编辑、格式化文本。',
        save: '保存文档',
        saved: '文档已保存',
        reset: '重置'
      },
      preview: {
        title: '文档预览',
        exportPDF: '导出PDF',
        exportTXT: '导出TXT',
        exportMD: '导出MD',
        exportDOCX: '导出DOCX',
        exporting: '正在导出为{format}格式...'
      },
      recent: {
        title: '最近OCR处理',
        table: {
          name: '名称',
          date: '日期',
          status: '状态',
          actions: '操作'
        },
        actions: {
          view: '查看',
          download: '下载'
        },
        empty: '未找到OCR处理记录'
      },
      status: {
        completed: '已完成',
        processing: '处理中',
        failed: '失败'
      }
    },
      translation: {
        title: '翻译',
        subtitle: '在多种语言之间翻译文本',
        translateButton: '翻译',
        features: {
          title: '翻译功能',
          multiLanguage: {
            title: '多语言支持',
            description: '支持100多种语言和方言'
          },
          document: {
            title: '文档翻译',
            description: '翻译整个文档并保留格式'
          },
          accuracy: {
            title: '精准翻译',
            description: '神经机器翻译，结果更自然准确'
          }
        },
        source: {
          title: '原文',
          placeholder: '输入要翻译的文字...'
        },
        result: {
          title: '翻译结果',
          translating: '翻译中...',
          translated: '已翻译'
        },
        recent: {
          title: '最近翻译',
          table: {
            source: '原文',
            target: '目标语言',
            date: '日期',
            actions: '操作'
          },
          actions: {
            view: '查看',
            download: '下载'
          },
          empty: '未找到翻译记录'
        },
        languages: {
          en: '英语',
          zh: '中文',
          ja: '日语',
          ko: '韩语'
        }
      },
      tools: {
        title: '工具',
        subtitle: '各种文档处理实用工具',
        features: {
          title: '可用工具'
        },
        pdfConverter: {
          title: 'PDF转换器',
          description: '将图像转换为PDF文件',
          input: '输入',
          dragDrop: '拖拽图像到此处',
          supportedFormats: '支持JPG、PNG、PDF、TIFF、BMP格式',
          browseFiles: '浏览图像',
          output: '输出设置',
          fileName: '文件名',
          fileNamePlaceholder: '输入文件名',
          quality: '质量',
          qualityHigh: '高',
          qualityMedium: '中',
          qualityLow: '低',
          convertButton: '转换为PDF'
        },
        imageCompressor: {
          title: '图像压缩器',
          description: '在保持质量的同时减小图像文件大小',
          input: '输入',
          dragDrop: '拖拽图像到此处',
          supportedFormats: '支持JPG、PNG、TIFF、BMP格式',
          browseFiles: '浏览图像',
          output: '输出设置',
          compression: '压缩级别',
          format: '输出格式',
          compressButton: '压缩图像'
        },
        imageCropper: {
          title: '图像裁剪器',
          description: '将图像裁剪为所需尺寸'
        },
        imageRotator: {
          title: '图像旋转器',
          description: '旋转图像以校正方向'
        },
        batchProcessor: {
          title: '批量处理器',
          description: '一次处理多个文件'
        },
        fileDownloader: {
          title: '文件下载器',
          description: '从URL下载文件'
        },
        status: {
          completed: '已完成',
          processing: '处理中',
          failed: '失败'
        }
      },
      profile: {
        name: '姓名',
        email: '邮箱',
        bio: '个人简介',
        updateProfile: '更新资料',
        social: {
          title: '社交媒体',
          linkedin: 'LinkedIn',
          twitter: 'Twitter',
          github: 'GitHub',
          website: '个人网站'
        },
        errors: {
          invalidUrl: '请输入有效的URL',
          invalidImageType: '请选择有效的图像文件 (jpg, jpeg, png)',
          imageTooLarge: '图像文件太大，请选择小于5MB的文件'
        }
      },
      account: {
        changePassword: '更改密码',
        currentPassword: '当前密码',
        newPassword: '新密码',
        confirmPassword: '确认新密码',
        updatePassword: '更新密码',
        deleteAccount: '删除账户',
        deleteAccountDescription: '一旦您删除账户，将无法恢复。请确认。'
      },
      billing: {
        free: '免费',
        pro: '专业版',
        max: '高级版',
        ultra: '旗舰版'
      },
      settings: {
        language: '语言',
        selectLanguage: '选择语言',
        emailNotifications: '邮件通知',
        newsletter: '新闻通讯',
        productUpdates: '产品更新',
        securityAlerts: '安全警报'
      },
    roadmap: {
        title: "Ocr Processing 的发展规划",
        description: "探索我们的开发计划、即将推出的功能，并分享您对未来增强功能的建议。",
        status: {
            completed: "已完成",
            inProgress: "进行中",
            planned: "规划中"
        },
        sections: {
            completed:[
                { 
                  title: '市场调研',
                  description: 'Twitter上观察检索相关模板产品，竞品分析，市场调研',
                  date:'2025/02' 
                },
                { 
                  title: '现有个人产品接入stripe',
                  description: '原为个人产品，接入stripe做出海准备',
                  date:'2025/02' 
                },
                { 
                  title: '规划T产品',
                  description: '深入Nuxt3技术栈，规划Template产品',
                  date:'2025/02' 
                },
                { 
                  title: '技术选型',
                  description: '综合考虑Nuxt3、Stripe、Creem、Resend、Google Auth、i18n、PWA等技术，选择最优方案',
                  date:'2025/02' 
                },
                { 
                  title: '项目搭建，启动研发',
                  description: '搭建NuxtJs3项目，启动研发',
                  date:'2025/02' 
                },
                { 
                  title: 'Nuxt3核心功能开发',
                  description: 'Nuxt3核心功能开发，包括首页、博客、文档、价格页、登录页、控制台、国际化、SEO、PWA、支付等',
                  date:'2025/03' 
                },
                { 
                  title: '第一版产品发布',
                  description: '第一版产品发布，包括首页、博客、文档、价格页、登录页、控制台、国际化、SEO、PWA、支付等',
                  date:'2025/04' 
                }
            ],
            inProgress: [
                { 
                  title: 'AI集成',
                  description: '在Ocr Processing后台管理系统中，实现AI集成功能',
                  date:'2025/05/01' 
                },
                { 
                  title: 'AI营销分析获客',
                  description: '在Ocr Processing后台管理系统中，实现智能营销分析获客功能',
                  date:'2025/05/01' 
                },
                { 
                  title: '主页页面优化',
                  description: '主页页面优化，包括页面布局、页面设计、页面交互等',
                  date:'2025/05/01' 
                }
            ],
            planned:[
                { 
                  title: '支持AISdk',
                  description: '接入AI开发sdk，一键调用相关api接口',
                  date:'2025/05'   
                }, 
                { 
                  title: 'ai营销集成分析工具',
                  description: '智能营销集成分析工具，根据用户行为和偏好提供个性化营销建议，并进行数据分析和可视化',
                  date:'2025/05' 
                },  
                { 
                  title: '支持Paddle支付',
                  description: '接入Paddle支付，支持多种支付方式',
                  date:'2025/06'   
                }, 
                
            ]
        }
    },
    error: {
      notFoundTitle: '页面未找到',
      notFoundMessage: '我们无法找到您正在寻找的页面。',
      goHomeButton: '返回主页'
    },
}
