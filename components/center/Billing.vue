<template>
  <div class="space-y-6 py-6">
    <!-- 页面标题 -->
    <div>
      <h1 class="text-2xl font-bold tracking-tight">{{ $t('center.billing.title') }}</h1>
      <p class="text-muted-foreground mt-1">{{ $t('center.billing.subtitle') }}</p>
    </div>

    <!-- 当前订阅计划 -->
    <div class="rounded-lg bg-card border p-6 shadow-sm">
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold mb-1">{{ currentPlan.name }}</h2>
          <p class="text-muted-foreground text-sm mb-2">{{ currentPlan.description }}</p>
          <div class="flex items-center gap-2">
            <span class="font-bold text-lg">{{ formatPrice(currentPlan.price, currentPlan.billingCycle) }}</span>
            <span class="text-muted-foreground">{{ currentPlan.billingCycle === 'monthly' ? $t('center.billing.month') : $t('center.billing.year') }}</span>
          </div>
        </div>
        <div class="flex gap-3">
          <button 
            @click="openPlanModal = true"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
          >
            {{ $t('center.billing.changePlan') }}
          </button>
          <button 
            @click="openInvoiceModal = true"
            class="inline-flex items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {{ $t('center.billing.downloadInvoice') }}
          </button>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- 账单历史 -->
      <div class="lg:col-span-2 space-y-6">
        <div class="rounded-lg bg-card border p-6 shadow-sm">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 class="text-lg font-semibold">{{ $t('center.billing.history.title') }}</h2>
            <div class="flex gap-2">
              <button 
                :class="['px-3 py-1.5 rounded-full text-xs font-medium transition-colors', activeFilter === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80']"
                @click="activeFilter = 'all'"
              >
                {{ $t('center.billing.history.filters.all') }}
              </button>
              <button 
                :class="['px-3 py-1.5 rounded-full text-xs font-medium transition-colors', activeFilter === 'paid' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80']"
                @click="activeFilter = 'paid'"
              >
                {{ $t('center.billing.history.filters.paid') }}
              </button>
              <button 
                :class="['px-3 py-1.5 rounded-full text-xs font-medium transition-colors', activeFilter === 'pending' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80']"
                @click="activeFilter = 'pending'"
              >
                {{ $t('center.billing.history.filters.pending') }}
              </button>
            </div>
          </div>

          <!-- 账单列表 -->
          <div class="space-y-4">
            <div 
              v-for="invoice in filteredInvoices" 
              :key="invoice.id" 
              class="flex flex-col md:flex-row md:items-center justify-between p-4 rounded-md hover:bg-muted/50 transition-colors border"
            >
              <div>
                <div class="flex items-center gap-2">
                  <h3 class="font-medium">{{ $t('center.billing.history.invoice') }} #{{ invoice.id }}</h3>
                  <span :class="['text-xs font-medium px-2 py-0.5 rounded-full', invoice.status === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800']">
                    {{ invoice.status === 'paid' ? $t('center.billing.history.paid') : $t('center.billing.history.pending') }}
                  </span>
                </div>
                <p class="text-sm text-muted-foreground mt-1">{{ invoice.date }}</p>
              </div>
              <div class="flex items-center gap-3 mt-3 md:mt-0">
                <span class="font-bold">{{ formatCurrency(invoice.amount) }}</span>
                <button 
                  @click="downloadInvoice(invoice.id)"
                  class="text-primary text-sm hover:text-primary/80 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {{ $t('center.billing.download') }}
                </button>
              </div>
            </div>
          </div>

          <!-- 分页 -->
          <div class="flex items-center justify-between mt-6">
            <p class="text-sm text-muted-foreground">
              {{ $t('center.billing.history.pagination', { start: 1, end: Math.min(10, filteredInvoices.length), total: filteredInvoices.length }) }}
            </p>
            <div class="flex items-center gap-2">
              <button 
                @click="currentPage--" 
                :disabled="currentPage <= 1"
                class="h-9 w-9 flex items-center justify-center rounded-md border bg-transparent text-sm hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button 
                @click="currentPage++" 
                :disabled="currentPage >= Math.ceil(filteredInvoices.length / itemsPerPage)"
                class="h-9 w-9 flex items-center justify-center rounded-md border bg-transparent text-sm hover:bg-muted disabled:opacity-50 disabled:pointer-events-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 支付方式和联系信息 -->
      <div class="space-y-6">
        <!-- 支付方式 -->
        <div class="rounded-lg bg-card border p-6 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-lg font-semibold">{{ $t('center.billing.paymentMethods.title') }}</h2>
            <button 
              @click="openPaymentModal = true"
              class="text-primary text-sm hover:text-primary/80"
            >
              {{ $t('center.billing.paymentMethods.add') }}
            </button>
          </div>
          
          <div v-if="paymentMethods.length > 0" class="space-y-3">
            <div 
              v-for="method in paymentMethods" 
              :key="method.id" 
              class="p-4 rounded-md border hover:border-primary/50 transition-colors relative"
              :class="{ 'border-primary bg-primary/5': method.isDefault }"
            >
              <div v-if="method.isDefault" class="absolute top-3 right-3">
                <span class="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {{ $t('center.billing.paymentMethods.default') }}
                </span>
              </div>
              <div class="flex items-center gap-3">
                <div class="h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                  <CreditCard v-if="method.cardType" class="h-6 w-6 text-primary" />
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="font-medium">{{ method.cardName }}</p>
                  <p class="text-sm text-muted-foreground">{{ $t('center.billing.paymentMethods.endingIn', { digits: method.cardLastFour }) }}</p>
                </div>
              </div>
              <div class="flex gap-2 mt-3">
                <button 
                  v-if="!method.isDefault"
                  @click="setDefaultPayment(method.id)"
                  class="text-xs text-primary hover:text-primary/80"
                >
                  {{ $t('center.billing.paymentMethods.makeDefault') }}
                </button>
                <button 
                  @click="removePaymentMethod(method.id)"
                  class="text-xs text-muted-foreground hover:text-destructive"
                >
                  {{ $t('center.billing.paymentMethods.remove') }}
                </button>
              </div>
            </div>
          </div>
          
          <div v-else class="text-center py-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p class="mt-4 text-muted-foreground">{{ $t('center.billing.paymentMethods.noPaymentMethods') }}</p>
            <button 
              @click="openPaymentModal = true"
              class="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
            >
              {{ $t('center.billing.paymentMethods.add') }}
            </button>
          </div>
        </div>
        
        <!-- 账单联系信息 -->
        <div class="rounded-lg bg-card border p-6 shadow-sm">
          <h2 class="text-lg font-semibold mb-4">{{ $t('center.billing.contactInfo.title') }}</h2>
          
          <div v-if="billingContact" class="space-y-4">
            <div>
              <h3 class="text-sm font-medium text-muted-foreground mb-1">{{ $t('center.billing.contactInfo.name') }}</h3>
              <p class="font-medium">{{ billingContact.name }}</p>
            </div>
            <div>
              <h3 class="text-sm font-medium text-muted-foreground mb-1">{{ $t('center.billing.contactInfo.email') }}</h3>
              <p class="font-medium">{{ billingContact.email }}</p>
            </div>
            <div v-if="billingContact.company">
              <h3 class="text-sm font-medium text-muted-foreground mb-1">{{ $t('center.billing.contactInfo.company') }}</h3>
              <p class="font-medium">{{ billingContact.company }}</p>
            </div>
            <div v-if="billingContact.address">
              <h3 class="text-sm font-medium text-muted-foreground mb-1">{{ $t('center.billing.contactInfo.address') }}</h3>
              <p class="font-medium">{{ billingContact.address }}</p>
            </div>
            <button 
              @click="openContactModal = true"
              class="w-full inline-flex items-center justify-center rounded-md border bg-transparent px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
            >
              {{ $t('center.billing.edit') }}
            </button>
          </div>
          
          <div v-else class="text-center py-4">
            <p class="text-muted-foreground">{{ $t('center.billing.contactInfo.notSet') }}</p>
            <button 
              @click="openContactModal = true"
              class="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
            >
              {{ $t('center.billing.addInfo') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 计划选择模态框 -->
    <div v-if="openPlanModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" @click="openPlanModal = false"></div>
      <div class="relative z-10 w-full max-w-4xl rounded-lg bg-card border shadow-lg">
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-lg font-semibold">{{ $t('center.billing.changePlanModal.title') }}</h3>
          <button @click="openPlanModal = false" class="text-muted-foreground hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              v-for="plan in availablePlans" 
              :key="plan.id" 
              class="rounded-lg border p-6 hover:border-primary transition-colors cursor-pointer relative"
              :class="{ 'border-primary bg-primary/5': selectedPlan === plan.id }"
              @click="selectedPlan = plan.id"
            >
              <div v-if="plan.isPopular" class="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span class="text-xs font-medium bg-primary text-primary-foreground px-3 py-1 rounded-full">
                  {{ $t('center.billing.popular') }}
                </span>
              </div>
              <h4 class="text-lg font-semibold mb-2">{{ plan.name }}</h4>
              <p class="text-muted-foreground text-sm mb-4">{{ plan.description }}</p>
              <div class="mb-6">
                <span class="text-3xl font-bold">{{ formatCurrency(plan.price) }}</span>
                <span class="text-muted-foreground">{{ plan.billingCycle === 'monthly' ? $t('center.billing.month') : $t('center.billing.year') }}</span>
              </div>
              <ul class="space-y-3 mb-6">
                <li v-for="feature in plan.features" :key="feature.id" class="flex items-start gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sm">{{ feature.text }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end p-6 border-t gap-3">
          <button 
            @click="openPlanModal = false"
            class="inline-flex items-center justify-center rounded-md border bg-transparent px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
          >
            {{ $t('center.billing.cancel') }}
          </button>
          <button 
            @click="changePlan"
            :disabled="!selectedPlan || selectedPlan === currentPlan.id"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transition-colors"
          >
            {{ $t('center.billing.selectPlan') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 支付方式模态框 -->
    <div v-if="openPaymentModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" @click="openPaymentModal = false"></div>
      <div class="relative z-10 w-full max-w-lg rounded-lg bg-card border shadow-lg">
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-lg font-semibold">{{ $t('center.billing.paymentMethods.add') }}</h3>
          <button @click="openPaymentModal = false" class="text-muted-foreground hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <form @submit.prevent="addPaymentMethod" class="space-y-4">
            <div class="space-y-2">
              <label for="cardName" class="block text-sm font-medium">{{ $t('center.billing.paymentMethods.cardName') }}</label>
              <input 
                type="text" 
                id="cardName" 
                v-model="newPaymentMethod.cardName"
                class="w-full rounded-md border border-input px-3 py-2 text-sm"
                required
              />
            </div>
            <div class="space-y-2">
              <label for="cardNumber" class="block text-sm font-medium">{{ $t('center.billing.paymentMethods.cardNumber') }}</label>
              <input 
                type="text" 
                id="cardNumber" 
                v-model="newPaymentMethod.cardNumber"
                class="w-full rounded-md border border-input px-3 py-2 text-sm"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-2">
                <label for="expiryDate" class="block text-sm font-medium">{{ $t('center.billing.paymentMethods.expiryDate') }}</label>
                <input 
                  type="text" 
                  id="expiryDate" 
                  v-model="newPaymentMethod.expiryDate"
                  class="w-full rounded-md border border-input px-3 py-2 text-sm"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div class="space-y-2">
                <label for="cvv" class="block text-sm font-medium">{{ $t('center.billing.paymentMethods.cvv') }}</label>
                <input 
                  type="text" 
                  id="cvv" 
                  v-model="newPaymentMethod.cvv"
                  class="w-full rounded-md border border-input px-3 py-2 text-sm"
                  placeholder="123"
                  required
                />
              </div>
            </div>
            <div class="flex items-center gap-2">
              <input type="checkbox" id="makeDefault" v-model="newPaymentMethod.isDefault">
              <label for="makeDefault" class="text-sm">{{ $t('center.billing.paymentMethods.makeDefault') }}</label>
            </div>
          </form>
        </div>
        <div class="flex items-center justify-end p-6 border-t gap-3">
          <button 
            @click="openPaymentModal = false"
            class="inline-flex items-center justify-center rounded-md border bg-transparent px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
          >
            {{ $t('center.billing.cancel') }}
          </button>
          <button 
            @click="addPaymentMethod"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
          >
            {{ $t('center.billing.add') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 账单联系信息模态框 -->
    <div v-if="openContactModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" @click="openContactModal = false"></div>
      <div class="relative z-10 w-full max-w-lg rounded-lg bg-card border shadow-lg">
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-lg font-semibold">{{ $t('center.billing.contactInfo.title') }}</h3>
          <button @click="openContactModal = false" class="text-muted-foreground hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <form @submit.prevent="saveContactInfo" class="space-y-4">
            <div class="space-y-2">
              <label for="contactName" class="block text-sm font-medium">{{ $t('center.billing.contactInfo.name') }}</label>
              <input 
                type="text" 
                id="contactName" 
                v-model="contactInfo.name"
                class="w-full rounded-md border border-input px-3 py-2 text-sm"
                required
              />
            </div>
            <div class="space-y-2">
              <label for="contactEmail" class="block text-sm font-medium">{{ $t('center.billing.contactInfo.email') }}</label>
              <input 
                type="email" 
                id="contactEmail" 
                v-model="contactInfo.email"
                class="w-full rounded-md border border-input px-3 py-2 text-sm"
                required
              />
            </div>
            <div class="space-y-2">
              <label for="contactCompany" class="block text-sm font-medium">{{ $t('center.billing.contactInfo.company') }}</label>
              <input 
                type="text" 
                id="contactCompany" 
                v-model="contactInfo.company"
                class="w-full rounded-md border border-input px-3 py-2 text-sm"
              />
            </div>
            <div class="space-y-2">
              <label for="contactAddress" class="block text-sm font-medium">{{ $t('center.billing.contactInfo.address') }}</label>
              <textarea 
                id="contactAddress" 
                v-model="contactInfo.address"
                class="w-full rounded-md border border-input px-3 py-2 text-sm"
                rows="3"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="flex items-center justify-end p-6 border-t gap-3">
          <button 
            @click="openContactModal = false"
            class="inline-flex items-center justify-center rounded-md border bg-transparent px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
          >
            {{ $t('center.billing.cancel') }}
          </button>
          <button 
            @click="saveContactInfo"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
          >
            {{ $t('center.billing.save') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 发票下载模态框 -->
    <div v-if="openInvoiceModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="fixed inset-0 bg-background/80 backdrop-blur-sm" @click="openInvoiceModal = false"></div>
      <div class="relative z-10 w-full max-w-md rounded-lg bg-card border shadow-lg">
        <div class="flex items-center justify-between p-6 border-b">
          <h3 class="text-lg font-semibold">{{ $t('center.billing.downloadInvoiceModal.title') }}</h3>
          <button @click="openInvoiceModal = false" class="text-muted-foreground hover:text-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div class="space-y-2">
              <label for="invoiceFormat" class="block text-sm font-medium">{{ $t('center.billing.downloadInvoiceModal.format') }}</label>
              <select 
                id="invoiceFormat" 
                v-model="invoiceFormat"
                class="w-full rounded-md border border-input px-3 py-2 text-sm"
              >
                <option value="pdf">{{ $t('center.billing.downloadInvoiceModal.pdf') }}</option>
                <option value="csv">{{ $t('center.billing.downloadInvoiceModal.csv') }}</option>
                <option value="json">{{ $t('center.billing.downloadInvoiceModal.json') }}</option>
              </select>
            </div>
            <div class="space-y-2">
              <label for="invoicePeriod" class="block text-sm font-medium">{{ $t('center.billing.downloadInvoiceModal.period') }}</label>
              <select 
                id="invoicePeriod" 
                v-model="invoicePeriod"
                class="w-full rounded-md border border-input px-3 py-2 text-sm"
              >
                <option value="current">{{ $t('center.billing.downloadInvoiceModal.currentPeriod') }}</option>
                <option value="last">{{ $t('center.billing.downloadInvoiceModal.lastPeriod') }}</option>
                <option value="all">{{ $t('center.billing.downloadInvoiceModal.allInvoices') }}</option>
              </select>
            </div>
            <div class="flex items-center gap-2">
              <input type="checkbox" id="includeTax" v-model="includeTax">
              <label for="includeTax" class="text-sm">{{ $t('center.billing.downloadInvoiceModal.includeTax') }}</label>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-end p-6 border-t gap-3">
          <button 
            @click="openInvoiceModal = false"
            class="inline-flex items-center justify-center rounded-md border bg-transparent px-4 py-2 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
          >
            {{ $t('center.billing.cancel') }}
          </button>
          <button 
            @click="downloadSelectedInvoice"
            class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {{ $t('center.billing.download') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { CreditCard } from 'lucide-vue-next'

// Emits定义
const emit = defineEmits<{
  'change-plan': [planId: string]
  'add-payment': [paymentData: any]
  'update-payment': [paymentId: string, data: any]
  'remove-payment': [paymentId: string]
  'update-contact': [contactData: any]
  'download-invoice': [options: any]
}>()

// 初始化i18n
const { t } = useI18n()

// 状态
const currentPage = ref(1)
const itemsPerPage = 10
const activeFilter = ref('all')

// 模态框状态
const openPlanModal = ref(false)
const openPaymentModal = ref(false)
const openContactModal = ref(false)
const openInvoiceModal = ref(false)

// 选择状态
const selectedPlan = ref('')

// 发票下载选项
const invoiceFormat = ref('pdf')
const invoicePeriod = ref('current')
const includeTax = ref(true)

// 当前订阅计划数据（模拟）
const currentPlan = ref({
  id: 'pro-monthly',
  name: 'Pro Plan',
  description: 'Professional features for power users',
  price: 19.99,
  billingCycle: 'monthly',
  features: [
    { id: 'f1', text: 'Unlimited document processing' },
    { id: 'f2', text: 'Advanced OCR features' },
    { id: 'f3', text: 'Priority support' },
    { id: 'f4', text: 'Team collaboration' }
  ]
})

// 可用计划数据（模拟）
const availablePlans = ref([
  {
    id: 'basic-monthly',
    name: 'Basic',
    description: 'Essential features for individuals',
    price: 9.99,
    billingCycle: 'monthly',
    isPopular: false,
    features: [
      { id: 'b1', text: 'Up to 100 documents/month' },
      { id: 'b2', text: 'Standard OCR features' },
      { id: 'b3', text: 'Email support' }
    ]
  },
  {
    id: 'pro-monthly',
    name: 'Pro',
    description: 'Professional features for power users',
    price: 19.99,
    billingCycle: 'monthly',
    isPopular: true,
    features: [
      { id: 'p1', text: 'Unlimited document processing' },
      { id: 'p2', text: 'Advanced OCR features' },
      { id: 'p3', text: 'Priority support' },
      { id: 'p4', text: 'Team collaboration' }
    ]
  },
  {
    id: 'enterprise-monthly',
    name: 'Enterprise',
    description: 'Advanced features for large organizations',
    price: 49.99,
    billingCycle: 'monthly',
    isPopular: false,
    features: [
      { id: 'e1', text: 'Everything in Pro' },
      { id: 'e2', text: 'Custom integration' },
      { id: 'e3', text: 'Dedicated account manager' },
      { id: 'e4', text: 'Advanced security controls' },
      { id: 'e5', text: 'SSO support' }
    ]
  }
])

// 账单历史数据（模拟）
const invoices = ref([
  {
    id: 'INV-2023-0001',
    date: '2023-12-01',
    amount: 19.99,
    status: 'paid'
  },
  {
    id: 'INV-2023-0002',
    date: '2023-11-01',
    amount: 19.99,
    status: 'paid'
  },
  {
    id: 'INV-2023-0003',
    date: '2023-10-01',
    amount: 9.99,
    status: 'paid'
  },
  {
    id: 'INV-2023-0004',
    date: '2023-09-01',
    amount: 9.99,
    status: 'paid'
  },
  {
    id: 'INV-2023-0005',
    date: '2023-08-01',
    amount: 9.99,
    status: 'paid'
  },
  {
    id: 'INV-2024-0001',
    date: '2024-01-01',
    amount: 19.99,
    status: 'pending'
  }
])

// 支付方式数据（模拟）
const paymentMethods = ref([
  {
    id: 'pm-1',
    cardType: 'visa',
    cardName: 'Visa',
    cardLastFour: '4242',
    isDefault: true
  },
  {
    id: 'pm-2',
    cardType: 'mastercard',
    cardName: 'Mastercard',
    cardLastFour: '5555',
    isDefault: false
  }
])

// 账单联系信息（模拟）
const billingContact = ref({
  name: 'John Doe',
  email: 'john.doe@example.com',
  company: 'Example Inc.',
  address: '123 Main St, New York, NY 10001'
})

// 新支付方式表单数据
const newPaymentMethod = reactive({
  cardName: '',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  isDefault: false
})

// 联系信息表单数据
const contactInfo = reactive({
  name: billingContact.value?.name || '',
  email: billingContact.value?.email || '',
  company: billingContact.value?.company || '',
  address: billingContact.value?.address || ''
})

// 计算属性
// 过滤后的发票列表
const filteredInvoices = computed(() => {
  let filtered = [...invoices.value]
  
  // 根据状态过滤
  if (activeFilter.value !== 'all') {
    filtered = filtered.filter(invoice => invoice.status === activeFilter.value)
  }
  
  // 按日期排序（最新的在前）
  filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return filtered
})

// 方法
// 格式化价格
const formatPrice = (price: number, cycle: string): string => {
  return cycle === 'monthly' ? `$${price}` : `$${price * 12}`
}

// 格式化货币
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount)
}

// 切换计划
const changePlan = () => {
  if (selectedPlan.value && selectedPlan.value !== currentPlan.value.id) {
    emit('change-plan', selectedPlan.value)
    
    // 更新当前计划
    const plan = availablePlans.value.find(p => p.id === selectedPlan.value)
    if (plan) {
      currentPlan.value = { ...plan }
    }
    
    openPlanModal.value = false
    selectedPlan.value = ''
  }
}

// 添加支付方式
const addPaymentMethod = () => {
  // 模拟API调用
  const newMethod = {
    id: `pm-${Date.now()}`,
    cardType: getCardType(newPaymentMethod.cardNumber),
    cardName: newPaymentMethod.cardName,
    cardLastFour: newPaymentMethod.cardNumber.slice(-4),
    isDefault: newPaymentMethod.isDefault
  }
  
  // 如果设置为默认，将其他支付方式设为非默认
  if (newMethod.isDefault) {
    paymentMethods.value.forEach(method => {
      method.isDefault = false
    })
  }
  
  // 添加新支付方式
  paymentMethods.value.push(newMethod)
  
  // 发送事件
  emit('add-payment', newMethod)
  
  // 重置表单和关闭模态框
  resetNewPaymentForm()
  openPaymentModal.value = false
}

// 设置默认支付方式
const setDefaultPayment = (paymentId: string) => {
  // 重置所有支付方式的默认状态
  paymentMethods.value.forEach(method => {
    method.isDefault = false
  })
  
  // 设置新的默认支付方式
  const payment = paymentMethods.value.find(p => p.id === paymentId)
  if (payment) {
    payment.isDefault = true
    emit('update-payment', paymentId, { isDefault: true })
  }
}

// 移除支付方式
const removePaymentMethod = (paymentId: string) => {
  if (confirm(t('center.billing.paymentMethods.removeConfirm'))) {
    const index = paymentMethods.value.findIndex(p => p.id === paymentId)
    if (index !== -1) {
      paymentMethods.value.splice(index, 1)
      emit('remove-payment', paymentId)
    }
  }
}

// 保存联系信息
const saveContactInfo = () => {
  // 更新联系信息
  billingContact.value = { ...contactInfo }
  emit('update-contact', contactInfo)
  openContactModal.value = false
}

// 下载发票
const downloadInvoice = (invoiceId: string) => {
  emit('download-invoice', { invoiceId, format: 'pdf' })
}

// 下载选中的发票格式
const downloadSelectedInvoice = () => {
  emit('download-invoice', {
    period: invoicePeriod.value,
    format: invoiceFormat.value,
    includeTax: includeTax.value
  })
  openInvoiceModal.value = false
}

// 获取卡类型
const getCardType = (cardNumber: string): string => {
  // 简化的卡类型检测逻辑
  const visaRegex = /^4/;
  const mastercardRegex = /^5[1-5]/;
  const amexRegex = /^3[47]/;
  
  if (visaRegex.test(cardNumber)) return 'visa'
  if (mastercardRegex.test(cardNumber)) return 'mastercard'
  if (amexRegex.test(cardNumber)) return 'amex'
  return 'unknown'
}

// 重置新支付方式表单
const resetNewPaymentForm = () => {
  newPaymentMethod.cardName = ''
  newPaymentMethod.cardNumber = ''
  newPaymentMethod.expiryDate = ''
  newPaymentMethod.cvv = ''
  newPaymentMethod.isDefault = false
}
</script>

<style scoped>
/* 账单组件样式 */
.billing-section {
  background-color: var(--bg-background);
  border-radius: var(--radius-md);
  padding: var(--spacing-6);
}

/* 计划卡片样式 */
.plan-card {
  transition: all 0.3s ease;
}

.plan-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* 支付方式卡片样式 */
.payment-method-card {
  transition: all 0.2s ease;
}

.payment-method-card:hover {
  transform: translateY(-1px);
}

/* 发票列表项样式 */
.invoice-item {
  transition: all 0.2s ease;
}

.invoice-item:hover {
  background-color: var(--bg-muted);
}

/* 模态框动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}

.slide-up-enter-from {
  transform: translateY(30px);
}

.slide-up-leave-to {
  transform: translateY(-30px);
}

/* 响应式调整 */
@media (max-width: 768px) {
  .grid-cols-1\/2 {
    grid-template-columns: 1fr;
  }
  
  .lg\:col-span-2 {
    order: 1;
  }
  
  .lg\:col-span-1 {
    order: 0;
  }
}
</style>