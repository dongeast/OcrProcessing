<template>
  <div class="bg-gradient-to-r from-purple-50 to-blue-50">
    <HeadNavbar />
    
    <!-- Hero Section -->
    <section class="py-20 grid-background" id="home">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="flex items-center gap-4 mb-6">
              <h2 class="text-5xl font-bold">{{ $t('home.title') }}</h2>
            </div>
            <p class="text-xl text-gray-600 mb-8 min-h-[3em]">
              {{ displayedDescription }}
            </p>
            <div class="flex gap-4">
              <button @click="goToCenter" class="bg-black text-white px-16 py-5 rounded-full relative overflow-hidden group hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                <span class="absolute w-64 h-64 mt-12 group-hover:-rotate-45 group-hover:-mt-24 transition-all duration-500 ease-out bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20"></span>
                <span class="relative group-hover:scale-110 transition-transform duration-300">{{ $t('home.startLink') }}</span>
              </button>
              <!-- <button @click="openGithub" class="border-2 border-black px-8 py-3 rounded-full hover:bg-gray-50">{{ $t('home.thirdPartyLink') }}</button> -->
            </div>

          </div>
          <div class="relative">
            <div class="bg-white p-3 rounded-xl shadow-lg">
              <!-- DeepSeek OCR Logo -->
              <div class="flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700 rounded-lg p-8 h-64">
                <div class="text-center">
                  <div class="flex justify-center mb-4">
                    <!-- DeepSeek Logo -->
                    <div class="bg-white p-4 rounded-lg">
                      <img src="~/assets/logo/deepseek-color.svg" alt="DeepSeek OCR Logo" class="w-20 h-20 flex-shrink-0 mx-auto" />
                    </div>
                  </div>
                  <h3 class="text-2xl font-bold text-white">{{ $t('home.hero.deepSeekTitle') }}</h3>
                  <p class="text-purple-200 mt-2">{{ $t('home.hero.deepSeekSubtitle') }}</p>
                </div>
              </div>
              
              <div class="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg mt-6 border border-gray-100">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-semibold text-gray-800">{{ $t('home.hero.poweredBy') }}</h3>
                </div>
                
                <div class="space-y-3">
                  <div class="flex items-start">
                    <div class="flex-shrink-0 mt-1">
                      <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p class="ml-2 text-gray-600">{{ $t('home.hero.feature1') }}</p>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="flex-shrink-0 mt-1">
                      <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p class="ml-2 text-gray-600">{{ $t('home.hero.feature2') }}</p>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="flex-shrink-0 mt-1">
                      <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p class="ml-2 text-gray-600">{{ $t('home.hero.feature3') }}</p>
                  </div>
                  
                  <div class="flex items-start">
                    <div class="flex-shrink-0 mt-1">
                      <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <p class="ml-2 text-gray-600">{{ $t('home.hero.feature4') }}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 mt-16" id="features">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ $t('home.features.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src="~/assets/logo/deepseek-color.svg" alt="DeepSeek OCR" class="w-12 h-12 text-purple-600">
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.features.sutTitle_1') }}</h3>
            <p class="text-gray-600">{{ $t('home.features.subDescription_1') }}</p>
          </div>

          <div class="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.features.sutTitle_2') }}</h3>
            <p class="text-gray-600">{{ $t('home.features.subDescription_2') }}</p>
          </div>

          <div class="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.features.sutTitle_3') }}</h3>
            <p class="text-gray-600">{{ $t('home.features.subDescription_3') }}</p>
          </div>

          <div class="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.features.sutTitle_4') }}</h3>
            <p class="text-gray-600">{{ $t('home.features.subDescription_4') }}</p>
          </div>

          <div class="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.features.sutTitle_5') }}</h3>
            <p class="text-gray-600">{{ $t('home.features.subDescription_5') }}</p>
          </div>

          <div class="text-center p-6 bg-white/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div class="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002-2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-3">{{ $t('home.features.sutTitle_6') }}</h3>
            <p class="text-gray-600">{{ $t('home.features.subDescription_6') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 功能更齐全的部分  -->
    <!-- Pricing Section -->
    <!-- <section class="py-20 mt-16" id="pricing">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12"> {{ $t('home.pricing.title') }} </h2>
        <div class="flex flex-col md:flex-row md:justify-between gap-8">
          <div class="bg-white p-8 md:p-12 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center flex flex-col items-center justify-start" style="min-height: 400px; flex: 1;">
            <h3 class="text-xl font-semibold mb-4">Open Source</h3>
            <p class="text-4xl md:text-5xl font-bold mb-4">Free</p>
            <ul class="space-y-3 md:space-y-4 mb-8 md:mb-10 text-left w-full max-w-xs mx-auto">
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.nuxtJSTemplate') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.seoSupports')}}              
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.stripeAndCreem')}}              
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.authThird')}}              
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.i18Support')}}              
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.zeroPWA')}}              
              </li>
              <li class="flex items-center gap-3">
                <span class="text-red-500 text-lg md:text-xl">×</span> {{ $t('home.pricing.backgroundSupport') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-red-500 text-lg md:text-xl">×</span> {{ $t('home.pricing.visualDataAnalysis') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-red-500 text-lg md:text-xl">×</span> {{ $t('home.pricing.IntelligentEmailMarketing') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-red-500 text-lg md:text-xl">×</span> {{ $t('home.pricing.HighDRSiteRecommendation') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-red-500 text-lg md:text-xl">×</span> {{ $t('home.pricing.ExclusiveHighQualityOverseasCommunity') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-red-500 text-lg md:text-xl">×</span> {{ $t('home.pricing.newFeaturesExperience') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-red-500 text-lg md:text-xl">×</span> {{ $t('home.pricing.multiTheme') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-red-500 text-lg md:text-xl">×</span> {{ $t('home.pricing.seoBlog') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-red-500 text-lg md:text-xl">×</span> {{ $t('home.pricing.overboardPdf') }}
              </li>
            </ul>
            <button @click="openGithub" class="w-full bg-black text-white py-3 md:py-4 rounded-full relative overflow-hidden group max-w-xs mx-auto mt-auto">
              <span class="relative group-hover:scale-110 transition-transform duration-300 text-sm md:text-base">✨Star✨ to Github.....</span>
            </button>
          </div>
          
          <div class="bg-white p-8 md:p-12 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 text-center flex flex-col items-center justify-start" style="min-height: 400px; flex: 1;">
            <h3 class="text-xl font-semibold mb-4">{{ $t('home.pricing.oneTimePayment') }}</h3>
            <p class="text-4xl md:text-5xl font-bold mb-4">$1??</p>
            <ul class="space-y-3 md:space-y-4 mb-8 md:mb-10 text-left w-full max-w-xs mx-auto">
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{t('home.pricing.permanentAccess') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.allFeaturesIncluded')}}              
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.backgroundSupport') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.visualDataAnalysis') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.IntelligentEmailMarketing') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.HighDRSiteRecommendation') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.ExclusiveHighQualityOverseasCommunity') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.newFeaturesExperience') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.multiTheme') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.seoBlog') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.overboardPdf') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.freeUpdatesForLife') }}
              </li>
              <li class="flex items-center gap-3">
                <span class="text-green-500 text-lg md:text-xl">✓</span> {{ $t('home.pricing.unlimitedCreate') }}
              </li>
            </ul>
            <button class="w-full bg-black text-white py-3 md:py-4 rounded-full relative overflow-hidden group max-w-xs mx-auto mt-auto">
              <span class="relative group-hover:scale-110 transition-transform duration-300 text-sm md:text-base">🎁To be Continued.....</span>
            </button>
          </div>
        </div>
      </div>
    </section> -->

       <!-- 功能演示部分  -->
    <!-- Pricing Section -->
    <section class="bg-gray-50 py-20" id="pricing">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ $t('home.pricing.title') }}</h2>
        
        <!-- Billing Toggle  -->
        <div class="flex justify-center items-center gap-4 mb-12">
          <span :class="{'text-gray-900 font-semibold': !isAnnual, 'text-gray-500': isAnnual}">{{ $t('home.pricing.monthly') }}</span>
          <button 
            class="w-16 h-8 rounded-full bg-gray-200 relative"
            @click="isAnnual = !isAnnual"
          >
            <div 
              class="w-6 h-6 rounded-full bg-white shadow absolute top-1 transition-all duration-300"
              :class="isAnnual ? 'left-9' : 'left-1'"
            ></div>
          </button>
          <span :class="{'text-gray-900 font-semibold': isAnnual, 'text-gray-500': !isAnnual}">
            {{ $t('home.pricing.annually') }}
            <span class="ml-1 text-sm text-green-500 font-medium">( {{ $t('home.pricing.saveDiscount') }} 20%)</span>
          </span>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
           <!-- One-time Purchase Plan  -->
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
            <h3 class="text-xl font-semibold mb-4">{{ $t('home.pricing.oneTimePayment') }}</h3>
            <p class="text-4xl font-bold mb-2">$120</p>
            <p class="text-green-500 text-sm mb-6" style="height: 20px;">&nbsp;</p>
            <ul class="space-y-3 mb-8 flex-grow">
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.permanentAccess') }}
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.allFeaturesIncluded') }}
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.freeUpdatesForLife') }}
              </li>
            </ul>
             <!-- stripe  此处是stripe的价格 id ，测试时换成自己的stripe价格 id-->
            <div class="mt-4">
              <button v-if="paymentMethod == 1" @click="openPayment('price_1QzJqNBwLqowaPCgkQmDoKXg','payment')" class="w-full bg-black text-white py-3 rounded-full relative overflow-hidden group">
                <span class="relative group-hover:scale-110 transition-transform duration-300">{{ $t('home.pricing.buyButton') }}</span>
              </button>
               <!-- creem  此处是creem的价格 id ，测试时换成自己的creem价格 id-->
              <button v-if="paymentMethod == 3"  @click="openPayment('prod_5t8s9rmvF8iuvVI4DxCJww','')" class="w-full bg-black text-white py-3 rounded-full relative overflow-hidden group">
                <span class="relative group-hover:scale-110 transition-transform duration-300">{{ $t('home.pricing.buyButton') }}</span>
              </button>
            </div>
          </div>

           <!-- Starter Plan  -->
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
            <h3 class="text-xl font-semibold mb-4">{{ $t('home.pricing.starterPlan') }}</h3>
            <p class="text-4xl font-bold mb-2">
              {{ isAnnual ? $t('home.pricing.starterPlanYearPrice') : $t('home.pricing.starterPlanMonthPrice') }}
              <span class="text-lg text-gray-500">/{{ isAnnual ? $t('home.pricing.starterYearUnit') : $t('home.pricing.starterMonthUnit') }}</span>
            </p>
            <p v-if="isAnnual" class="text-green-500 text-sm mb-6" style="height: 20px;">{{ $t('home.pricing.starterPlanYearPriceDiscountText') }}</p>
            <p v-else class="text-green-500 text-sm mb-6" style="height: 20px;">&nbsp;</p>
            <ul class="space-y-3 mb-8 flex-grow">
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.starterPlanPermanentAccess') }}
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.starterPlanAllFeaturesIncluded') }}
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.starterPlanFreeUpdatesForLife') }}
              </li>
            </ul>
             <!-- stripe  此处是stripe的价格 id ，测试时换成自己的stripe价格 id-->
            <div class="mt-4">
              <button v-if="paymentMethod == 1" @click="openPayment(isAnnual ? 'price_1QzJtwBwLqowaPCgxRxhpHLC' : 'price_1QzJqmBwLqowaPCgKHeolkGZ','subscription')" class="w-full bg-black text-white py-3 rounded-full relative overflow-hidden group">
                <span class="relative group-hover:scale-110 transition-transform duration-300">{{ $t('home.pricing.starterButton') }}</span>
              </button>
               <!-- creem  此处是creem的价格 id ，测试时换成自己的creem价格 id-->
              <button v-if="paymentMethod == 3" @click="openPayment(isAnnual ? 'prod_69GtlTkHl8An5htSR9DAFf' : 'prod_208nDCId85sCF8ElBSqcb0','')" class="w-full bg-black text-white py-3 rounded-full relative overflow-hidden group">
                <span class="relative group-hover:scale-110 transition-transform duration-300">{{ $t('home.pricing.starterButton') }}</span>
              </button>
               <!-- bagelpay 此处是bagelpay的商品id ，测试时换成自己的商品id -->
              <button v-if="paymentMethod == 5" @click="openPayment(isAnnual ?'prod_1972471388709662722': 'prod_1972471388709662722','onetime')" class="w-full bg-purple-600 text-white py-3 md:py-4 rounded-full relative overflow-hidden group max-w-xs mx-auto mt-auto">
                <span class="relative group-hover:scale-110 transition-transform duration-300 text-sm md:text-base">{{ $t('home.pricing.buyNow') }}</span>
              </button>
            </div>
          </div> 
<!-- 
           Professional Plan  -->
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col">
            <div class="absolute -top-4 right-4">
              <span class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm">{{ $t('home.pricing.popular') }}</span>
            </div>
            <h3 class="text-xl font-semibold mb-4">{{ $t('home.pricing.professionalPlan') }}</h3>
            <p class="text-4xl font-bold mb-2">
              {{ isAnnual ? $t('home.pricing.professionalPlanYearPrice') : $t('home.pricing.professionalPlanMonthPrice') }}
              <span class="text-lg text-gray-500">/{{ isAnnual ? $t('home.pricing.professionalYearUnit') : $t('home.pricing.professionalMonthUnit') }}</span>
            </p>
            <p v-if="isAnnual" class="text-green-500 text-sm mb-6" style="height: 20px;">{{ $t('home.pricing.professionalPlanYearPriceDiscountText') }}</p>
            <p v-else class="text-green-500 text-sm mb-6" style="height: 20px;">&nbsp;</p>
            <ul class="space-y-3 mb-8 flex-grow">
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.professionalPlanPermanentAccess') }}
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.professionalPlanAllFeaturesIncluded') }}
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.professionalPlanFreeUpdatesForLife') }}
              </li>
            </ul>

             <!-- stripe  此处是stripe的价格 id ，测试时换成自己的stripe价格 id-->
            <div class="mt-4">
              <button v-if="paymentMethod == 1" @click="openPayment(isAnnual ? 'price_1QzJv1BwLqowaPCgXQYb2PP1' : 'price_1QzJr9BwLqowaPCgW6zdg2z7','subscription')" class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full relative overflow-hidden group">
                <span class="relative group-hover:scale-110 transition-transform duration-300">{{ $t('home.pricing.professionalButton') }}</span>
              </button>
               <!-- creem  此处是creem的价格 id ，测试时换成自己的creem价格 id-->
              <button v-if="paymentMethod == 3" @click="openPayment(isAnnual ? 'prod_7BOSCT3lmQgFWvcXxpwVzh' : 'prod_1NHRsJYGE5WvGuagE8cBZj','subscription')" class="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-full relative overflow-hidden group">
                <span class="relative group-hover:scale-110 transition-transform duration-300">{{ $t('home.pricing.professionalButton') }}</span>
              </button>
               <!-- bagelpay 此处是bagelpay的商品id ，测试时换成自己的商品id -->
              <button v-if="paymentMethod == 5" @click="openPayment(isAnnual ?'prod_1972471388709662722': 'prod_1972471388709662722','subscription')" class="w-full bg-purple-600 text-white py-3 md:py-4 rounded-full relative overflow-hidden group max-w-xs mx-auto mt-auto">
                <span class="relative group-hover:scale-110 transition-transform duration-300 text-sm md:text-base">{{ $t('home.pricing.buyNow') }}</span>
              </button>
            </div>
          </div>

           <!-- Enterprise Plan  -->
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
            <h3 class="text-xl font-semibold mb-4">{{ $t('home.pricing.enterprisePlan') }}</h3>
            <p class="text-4xl font-bold mb-2">
              {{ isAnnual ? $t('home.pricing.enterprisePlanYearPrice') : $t('home.pricing.enterprisePlanMonthPrice') }}
              <span class="text-lg text-gray-500">/{{ isAnnual ? $t('home.pricing.enterpriseYearUnit') : $t('home.pricing.enterpriseMonthUnit') }}</span>
            </p>
            <p v-if="isAnnual" class="text-green-500 text-sm mb-6" style="height: 20px;">{{ $t('home.pricing.enterprisePlanYearPriceDiscountText') }}</p>
            <p v-else class="text-green-500 text-sm mb-6" style="height: 20px;">&nbsp;</p>
            <ul class="space-y-3 mb-8 flex-grow">
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.enterprisePlanPermanentAccess') }}
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.enterprisePlanAllFeaturesIncluded') }}
              </li>
              <li class="flex items-center gap-2">
                <span class="text-green-500">✓</span> {{ $t('home.pricing.enterprisePlanFreeUpdatesForLife') }}
              </li>
            </ul>
            <div class="mt-4">
              <button class="w-full bg-black text-white py-3 rounded-full relative overflow-hidden group">
                <span class="relative group-hover:scale-110 transition-transform duration-300">{{ $t('home.pricing.enterpriseButton') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="py-20 mt-16" id="testimonials">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ $t('home.testimonials.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-6 rounded-xl shadow">
            <div class="flex items-center gap-4 mb-4">
              <img src="../assets/imgs/head/Q56a-E7a_400x400.jpg" alt="John Smith" class="w-12 h-12 rounded-full object-cover">
              <div>
                <h4 class="font-semibold">John Smith</h4>
                <p class="text-gray-600">CTO, TechGlobal</p>
              </div>
            </div>
            <p class="text-gray-600">"The recognition accuracy of deepseek-ocr is impressive! It has increased our document processing efficiency by 300%. This AI-driven OCR truly transforms our workflow."</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow">
            <div class="flex items-center gap-4 mb-4">
              <img src="../assets/imgs/head/_0jm4JCN_400x400.jpg" alt="Sarah Johnson" class="w-12 h-12 rounded-full object-cover">
              <div>
                <h4 class="font-semibold">Sarah Johnson</h4>
                <p class="text-gray-600">Data Scientist, DataInsights</p>
              </div>
            </div>
            <p class="text-gray-600">"Compared to other OCR tools, deepseek-ocr excels in complex layouts and handwritten text recognition. Both accuracy and processing speed exceeded our expectations."</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow">
            <div class="flex items-center gap-4 mb-4">
              <img src="../assets/imgs/head/773JgJ71_400x400.jpg" alt="Mike Chen" class="w-12 h-12 rounded-full object-cover">
              <div>
                <h4 class="font-semibold">Mike Chen</h4>
                <p class="text-gray-600">Founder, DocuFlow</p>
              </div>
            </div>
            <p class="text-gray-600">"The solution with deepseek-ocr is our best choice for handling multi-format documents. The conversion quality from scanned images to editable text is unparalleled."</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow">
            <div class="flex items-center gap-4 mb-4">
              <img src="../assets/imgs/head/UFStG2aG_400x400.jpg" alt="Alex Wang" class="w-12 h-12 rounded-full object-cover">
              <div>
                <h4 class="font-semibold">Alex Wang</h4>
                <p class="text-gray-600">AI Researcher</p>
              </div>
            </div>
            <p class="text-gray-600">"作为AI研究员，我对deepseek-ocr的表现印象深刻。它在多语言支持和复杂版面分析方面的能力远超传统OCR工具。"</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow">
            <div class="flex items-center gap-4 mb-4">
              <img src="../assets/imgs/head/X_lkYpoR_400x400.jpg" alt="Emily Parker" class="w-12 h-12 rounded-full object-cover">
              <div>
                <h4 class="font-semibold">Emily Parker</h4>
                <p class="text-gray-600">Archivist</p>
              </div>
            </div>
            <p class="text-gray-600">"私たちのアーカイブには膨大な歴史文書がありますが、このシステムによりすべての文書がデジタル化されました。deepseek-ocrは、劣化した文書でも正確に認識してくれます。"</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow">
            <div class="flex items-center gap-4 mb-4">
              <img src="../assets/imgs/head/66Z_Ppre_400x400.jpg" alt="David Wilson" class="w-12 h-12 rounded-full object-cover">
              <div>
                <h4 class="font-semibold">David Wilson</h4>
                <p class="text-gray-600">Product Manager</p>
              </div>
            </div>
            <p class="text-gray-600">"Cette plateforme OCR prend en charge de nombreux formats de fichiers et conserve la mise en page d'origine après conversion. Le modèle deepseek-ocr a considérablement amélioré nos capacités de traitement de documents."</p>
          </div>
        </div>
      </div>
    </section>
    <!-- FAQ Section -->
    <section class="py-20 mt-16" id="faq">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">{{ $t('home.faqs.title') }}</h2>
        <div class="space-y-6">
          <div 
            v-for="(_, index) in Array(8)" 
            :key="index" 
            class="bg-white p-6 rounded-xl shadow cursor-pointer" 
            @click="toggle(index)"
          >
            <h3 class="font-semibold flex justify-between items-center">
              {{ $t('home.faqs.question' + (index + 1)) }}
              <span>{{ isOpen[index] ? '-' : '+' }}</span>
            </h3>
            <p v-if="isOpen[index]" class="text-gray-600 mt-2">{{ $t('home.faqs.answer' + (index + 1)) }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-black text-white py-20 mt-16">
      <div class="max-w-7xl mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-6">{{ $t('home.cta.title') }}</h2>
        <p class="text-xl mb-8">{{ $t('home.cta.description') }}</p>
        <button @click="openGithub" class="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-100">{{ $t('home.cta.button') }}</button>
      </div>
    </section>

    <!-- Friend Links Section -->
    <!-- <section class="py-12 bg-gray-50" id="friend">
      <div class="max-w-7xl mx-auto px-4">
        <h2 class="text-xl font-semibold text-center mb-8">{{ $t('home.friend.title') }}</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          <a href="https://github.com/PennyJoly/linktre-tools" target="_blank" class="text-gray-600 hover:text-gray-900 text-center p-4 rounded-lg hover:bg-white transition-all duration-300">
            <span>linktre.cc</span>
          </a>
          <a href="https://ai.linktre.cc" target="_blank" class="text-gray-600 hover:text-gray-900 text-center p-4 rounded-lg hover:bg-white transition-all duration-300">
            <span>CheapGpt</span>
          </a>
          <a href="https://aitre.cc" target="_blank" class="text-gray-600 hover:text-gray-900 text-center p-4 rounded-lg hover:bg-white transition-all duration-300">
            <span>AITRE</span>
          </a>
          <a href="https://creem.io" target="_blank" class="text-gray-600 hover:text-gray-900 text-center p-4 rounded-lg hover:bg-white transition-all duration-300">
            <span>Creem</span>
          </a>
          <a href="https://ramen.tools" target="_blank" rel="nofollow" class="text-gray-600 hover:text-gray-900 text-center p-4 rounded-lg hover:bg-white transition-all duration-300">
            <span>ramen.tools</span>
          </a>
          <a href="https://devresourc.es" target="_blank" rel="nofollow" class="text-gray-600 hover:text-gray-900 text-center p-4 rounded-lg hover:bg-white transition-all duration-300">
            <span>devresourc.es</span>
          </a>
           <a href="https://yo.directory" target="_blank" rel="nofollow" class="text-gray-600 hover:text-gray-900 text-center p-4 rounded-lg hover:bg-white transition-all duration-300">
            <span>yo.directory</span>
          </a> 
        </div>
      </div>
    </section> -->

    <!-- Add Copyright Section -->
    <AppFooter />

   

    <!-- Add this Center Modal section before the closing </div> -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="showBottomPopup" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/50" @click="closeBottomPopup"></div>
        
        <div class="relative bg-white rounded-2xl p-6 md:p-20 max-w-2xl w-full mx-4 shadow-xl overflow-hidden">
          
          <button @click="closeBottomPopup" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div class="flex flex-col md:flex-row items-stretch gap-4 relative h-full">
            <div class="flex-1 text-center flex flex-col justify-center">
              <h3 class="text-2xl md:text-3xl font-bold mb-4">{{ $t('home.bottomPopup.title') }}</h3>
              <p class="text-gray-600 text-lg md:text-xl mb-6 md:mb-8">
                {{ $t('home.bottomPopup.description') }}
              </p>
              <div class="flex justify-center">
                <button @click="scrollToPricing" class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 md:px-12 py-3 md:py-4 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-base md:text-lg font-semibold">
                  {{ $t('home.bottomPopup.button') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <!-- ... existing dashboard content ... -->
    
    <!-- Waitlist Success Modal -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/60" @click="closeSuccessModal"></div>
        
        <div class="relative bg-white rounded-2xl p-8 max-w-md w-full mx-auto shadow-xl text-center overflow-hidden">
          <!-- Close button -->
          <button @click="closeSuccessModal" class="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Icon -->
          <div class="text-6xl mb-4">🚀</div> 

          <!-- Title -->
          <h3 class="text-2xl font-bold mb-3 text-gray-900">{{ $t('home.waitlist.modalTitle') }}</h3>

          <!-- Message -->
          <p class="text-gray-600 mb-6">
            {{ $t('home.waitlist.modalMessage') }}
          </p>

          <!-- Optional Close Button in Content -->
          <button @click="closeSuccessModal" class="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors">
            {{ $t('home.waitlist.modalCloseButton') }}
          </button>
          
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import confetti from 'canvas-confetti'; // Import confetti
import { $fetch } from 'ofetch'; // 确保导入 $fetch
import Logo from '@/components/Logo.vue';

const {t} = useI18n()
const router = useRouter()

const config = useRuntimeConfig();
//import Paddle from 'paddle-sdk';
const { stripe,loadStripe  } = useClientStripe();
stripe.value = await loadStripe(config.public.stripe.key);

const paymentMethod = ref(parseInt(config.public.paymentMethod))
const waitlistEmail = ref('');

// --- Typing Effect State ---
const typingSpeed = 75; // Milliseconds per character
const fullDescription = computed(() => t('home.description'));
const displayedDescription = ref('');
const charIndex = ref(0);
const typingInterval = ref(null);
// -------------------------

// --- Waitlist Join Count State ---
const baseJoinCount = 2001; // Starting count
const dynamicJoinCount = ref(baseJoinCount);
const countInterval = ref(null);
const minUpdateInterval = 10000; // Minimum milliseconds between updates (Changed to 5s)
const maxUpdateInterval = 30000; // Maximum milliseconds between updates (Changed to 10s)

// --- Success Modal State ---
const showSuccessModal = ref(false);
// -------------------------

// SEO metadata
const title = computed(() => t('home.seo.title') || 'NuxtPro:Open-Source Nuxt3 SaaS Boilerplate | Multilingual, Payments & SEO Ready (Nuxt3)');
const description = computed(() => t('home.seo.description') || 'The NuxtJS boilerplate with all the stuff you need to get your product in front of customers. From idea to production in 3 days.');

// Use useSeoMeta for comprehensive SEO setup
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://img.com/nuxtpro/og/nuxtproOg.png', // Make sure this image exists in your public folder
  ogUrl: config.public.baseUrl || 'https://nuxtpro.com',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterSite: config.public.baseUrl || 'https://nuxtpro.com',
  twitterImage: 'https://img.com/nuxtpro/og/nuxtproOg.png', // Make sure this image exists in your public folder
})

// Add JSON-LD structured data for better SEO
// const jsonLd = computed(() => ({
//   '@context': 'https://schema.org',
//   '@type': 'SoftwareApplication',
//   name: title.value,
//   description: description.value,
//   applicationCategory: 'BusinessApplication',
//   offers: {
//     '@type': 'Offer',
//     price: '120',
//     priceCurrency: 'USD'
//   },
//   aggregateRating: {
//     '@type': 'AggregateRating',
//     ratingValue: '4.8',
//     ratingCount: '250'
//   }
// }))

useHead({
  link: [
    { rel: 'canonical', href: config.public.baseUrl || 'https://nuxtpro.com' }
  ]
})

useHead({
  title: 'OpenSource Nuxt SaaS Boilerplate | Ocr Processing',
  meta: [
    {
      name: 'description',
      content: 'The NuxtJS boilerplate with all the stuff you need to get your product in front of customers. From idea to production in 5 minutes.'
    },
    {
      name: 'keywords',
      content: 'Ocr Processing, NuxtJS boilerplate, NuxtJS starter, NuxtJS template, NuxtJS, Vue, Nuxt3,,Open-Source'
      
    }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/ocr-logo.svg' }
  ]
})


const isOpen = ref(Array(8).fill(false));

const toggle = (index) => {
  isOpen.value[index] = !isOpen.value[index];
};

// --- Typing Effect Logic ---
const typeWriter = () => {
  if (charIndex.value < fullDescription.value.length) {
    displayedDescription.value += fullDescription.value.charAt(charIndex.value);
    charIndex.value++;
  } else {
    if (typingInterval.value) clearInterval(typingInterval.value);
  }
};

const startTyping = () => {
  // Reset if called again (e.g., on language change, though not handled here explicitly)
  displayedDescription.value = '';
  charIndex.value = 0;
  if (typingInterval.value) clearInterval(typingInterval.value);
  
  // Start new interval
  typingInterval.value = setInterval(typeWriter, typingSpeed);
};
// -------------------------

// --- Waitlist Join Count Logic ---
const updateJoinCount = () => {
  const increment = Math.floor(Math.random() * 3) + 1; // Add 1, 2, or 3
  dynamicJoinCount.value += increment;
  
  // Schedule next update with random interval
  const nextInterval = Math.random() * (maxUpdateInterval - minUpdateInterval) + minUpdateInterval;
  if (countInterval.value) clearTimeout(countInterval.value); // Clear previous timeout just in case
  countInterval.value = setTimeout(updateJoinCount, nextInterval);
};

const startJoinCountUpdates = () => {
  if (countInterval.value) clearTimeout(countInterval.value); // Clear existing interval/timeout if any
  // Start the first update after a short delay
  const initialDelay = Math.random() * (maxUpdateInterval - minUpdateInterval) + minUpdateInterval;
  countInterval.value = setTimeout(updateJoinCount, initialDelay);
};
// -----------------------------

// 修改后的 joinWaitlist 函数
const joinWaitlist = async () => { // 添加 async 关键字
  if (waitlistEmail.value && validateEmail(waitlistEmail.value)) { // 添加简单的前端校验
    try {
      // 调用后端 API
      const response = await $fetch('/api/waitlist/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: waitlistEmail.value }),
      });

      // 检查后端返回的成功状态
      if (response.success) {
        console.log('Waitlist join successful:', response);
        // 显示成功模态框并触发庆祝动画
        showSuccessModal.value = true;
        triggerConfetti();
        waitlistEmail.value = ''; // 清空输入框
      } else {
        // 如果后端返回 success: false，但也可能是一个已知情况（如已加入）
        console.warn('Waitlist join response indicates potential issue:', response.message);
        // 根据后端返回的消息决定是否提示用户
        // 在这种情况下，邮箱已存在也被视为成功加入，所以仍然显示成功
        showSuccessModal.value = true;
        triggerConfetti();
        waitlistEmail.value = ''; // 清空输入框
        // 或者你可以根据 response.message 显示不同的提示
        // alert(response.message || t('home.waitlist.errorMessage'));
      }
    } catch (error) {
      // 处理 fetch 调用本身的错误
      console.error('Error joining waitlist:', error);
      // 可以尝试从错误中获取更具体的后端消息
      const errorMessage = error.data?.statusMessage || error.message || t('home.waitlist.errorMessage');
      alert(errorMessage);
    }
  } else {
    // 如果邮箱格式无效
    alert(t('home.waitlist.invalidEmailMessage') || 'Please enter a valid email address.'); // 添加一个无效邮箱的翻译
  }
};

// 跳转到用户中心页面
const goToCenter = () => {
  router.push('/center');
};

// 简单的邮箱验证函数 (如果需要可以在前端也加上)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

const openPayment = async (priceId,payType) => {
  const parType = parseInt(config.public.paymentMethod);
  console.log('当前parType为：',parType)
  if (parType === 1) { // 使用 Stripe
    await payWithStripe(priceId,payType);
  } else if (parType === 2) { // 使用 Paddle
    await payWithPaddle(priceId,payType);
  } else if (parType === 3) { // 使用 creem
    await payWithCreem(priceId,payType);
  }else if (parType === 5) { // 使用 bagelPay
    await payWithBagelPay(priceId,payType);
  }
};

const showBottomPopup = ref(false);
let scrollTimeout;
let hasShownPopup = ref(false); // 追踪弹窗是否已经显示过
const minTimeBeforePopup = 7000; // 最少浏览7秒后才可能显示弹窗
let pageLoadTime = Date.now();

const handleScroll = () => {
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    const bottomReached = 
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100;
    
    // 检查是否满足所有显示条件
    if (bottomReached && 
        !hasShownPopup.value && 
        Date.now() - pageLoadTime > minTimeBeforePopup) {
      
      // 设置50%的概率显示弹窗
      const shouldShow = Math.random() < 0.5;
      
      if (shouldShow) {
        showBottomPopup.value = true;
        hasShownPopup.value = true;
      }
    }
  }, 100);
};

const closeBottomPopup = () => {
  showBottomPopup.value = false;
};

onMounted(() => {
  pageLoadTime = Date.now();
  window.addEventListener('scroll', handleScroll);
  startTyping(); // Start the typing animation on mount
  startJoinCountUpdates(); // Start the dynamic join count updates
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  clearTimeout(scrollTimeout);
  if (typingInterval.value) clearInterval(typingInterval.value); // Clear typing interval on unmount
  if (countInterval.value) clearTimeout(countInterval.value); // Clear count update interval on unmount
});


const payWithStripe = async (priceId,payType) => {
  try {
    const response = await $fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: `${priceId}`,
        payType: `${payType}`// Format the price ID correctly
      }),
    })

    if (response.code !== 200) {
      throw new Error(response.message || 'Error creating checkout session')
    }

    const { url } = response.data
    if (url) {
      window.location.href = url
    } else {
      throw new Error('No URL returned from checkout session creation')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('An error occurred while processing your request. Please try again.')
  }
}

const payWithCreem = async (priceId, payType) => {
  try {
    const response = await $fetch("/api/creem/create-checkout-session", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: {  
        productId: priceId  
      }
    })

    if (response.code !== 200) {
      throw new Error(response.message || 'Error creating checkout session')
    }

    const { url } = response.data
    if (url) {
      window.location.href = url
    } else {
      throw new Error('No URL returned from checkout session creation')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('An error occurred while processing your request. Please try again.')
  }
}

//采用bagePay收款
const payWithBagelPay = async (priceId, payType) => {
  try {
    const requestBody = {
      productId: priceId,
    };
   
    const response = await $fetch("/api/bagelPay/create-checkout-session", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: requestBody
    });
    if (response.code !== 200){
      throw new Error(response.message || 'Error creating checkout session')
    }

    const { url } = response.data;

    if (url) {
      window.location.href = url
    } else {
      throw new Error('No URL returned from checkout session creation')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('An error occurred while processing your request. Please try again.')
  }
};

const isAnnual = ref(false);

const scrollToPricing = () => {
  closeBottomPopup();
  const pricingSection = document.getElementById('pricing');
  if (pricingSection) {
    pricingSection.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  }
};

const openGithub = () => {
  window.open('https://github.com/PennyJoly/nuxtpro', '_blank');
}

// --- Confetti Logic ---
const triggerConfetti = () => {
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });
};
// ---------------------

const closeSuccessModal = () => {
  showSuccessModal.value = false;
};
</script>

<style scoped>
.grid-background {
  --grid-size: 80px; /* 控制网格大小 - 增大此值使网格更稀疏 */
  --grid-color: rgba(0, 0, 0, 0.05); /* 控制网格线颜色和透明度 */
  background-image:
    linear-gradient(to right, var(--grid-color) 1px, transparent 1px),
    linear-gradient(to bottom, var(--grid-color) 1px, transparent 1px);
  background-size: var(--grid-size) var(--grid-size);
  /* 注意：这里不再需要显式包含渐变背景，因为它是由父级 div 提供的 */
}

/* 注释掉之前的整合方案，因为现在背景是从父级继承 */
/* .grid-background {
  --grid-size: 40px; 
  --grid-line-thickness: 1px; 
  --grid-color: rgba(0, 0, 0, 0.15); 
  background:
    linear-gradient(to right, var(--grid-color) var(--grid-line-thickness), transparent var(--grid-line-thickness)),
    linear-gradient(to bottom, var(--grid-color) var(--grid-line-thickness), transparent var(--grid-line-thickness)),
    linear-gradient(to right, #ede9fe, #e0f2fe); 
  background-size: 
    var(--grid-size) var(--grid-size), 
    var(--grid-size) var(--grid-size), 
    100% 100%; 
} */

</style>
