# 🎨 Frontend - Hệ thống Đăng ký Tín chỉ & Gợi ý Lịch học Tự động

## 🎯 Mục tiêu

Xây dựng giao diện người dùng cho hệ thống đăng ký tín chỉ thông minh:
- Authentication với Google OAuth
- Quản lý subscription & thanh toán
- Tìm kiếm và hiển thị danh sách môn học
- Form nhập thông tin để AI lập lịch học
- Hiển thị kết quả đề xuất từ AI
- Admin: Quản lý crawl config và monitoring

**Tech Stack:**
- Nuxt 4
- Vue 3 (Composition API)
- Tailwind CSS 4
- shadcn-vue
- Radix Vue
- Vue I18n (vi, en, ja)
- Supabase Client

---

## 📐 Cấu trúc Pages & Routes

### Public Routes

```
/                           → Homepage
/login                      → Google OAuth login
/courses                    → Danh sách môn học
/courses/[code]             → Chi tiết môn học
/schedule                   → AI Schedule Scheduler (form + results)
/pricing                    → Subscription plans
/payment/[id]               → Payment page
/payment/success            → Payment success
/payment/failed             → Payment failed
```

### Protected Routes (Auth required)

```
/dashboard                  → User dashboard
/dashboard/payments          → Lịch sử thanh toán
/dashboard/schedules         → Lịch sử lập lịch học
```

### Admin Routes (Admin only)

```
/admin                      → Admin dashboard
/admin/crawl                → Quản lý crawl config
/admin/crawl/[id]           → Chi tiết crawl config
/admin/crawl/[id]/jobs      → Danh sách crawl jobs
/admin/courses              → Quản lý courses
/admin/users                → Quản lý users
```

---

## 🧩 Components Structure

### Common Components (`app/components/common/`)

```
Header.vue                  → Main navigation header
Footer.vue                  → Site footer
AuthGuard.vue                → Route guard for authentication
AdminGuard.vue               → Route guard for admin only
LoadingSpinner.vue           → Loading indicator
ErrorBoundary.vue            → Error boundary wrapper
Breadcrumb.vue               → Breadcrumb navigation
Pagination.vue               → Pagination component
```

### Course Components (`app/components/courses/`)

```
CourseList.vue              → Danh sách môn học (grid/list view)
CourseCard.vue               → Card hiển thị môn học
CourseSearch.vue             → Search bar + filters
CourseDetail.vue             → Chi tiết môn học
CourseSchedule.vue           → Hiển thị lịch học (days, time, room)
```

### Schedule Components (`app/components/schedule/`)

```
ScheduleForm.vue             → Form nhập thông tin (mã môn, campus, giờ rảnh, giờ làm)
ScheduleResult.vue           → Hiển thị kết quả AI
ScheduleResultCard.vue       → Card từng lớp được đề xuất
ScheduleConflict.vue         → Cảnh báo xung đột
ScheduleAlternative.vue      → Danh sách lớp thay thế
ScheduleHistory.vue           → Lịch sử lập lịch học
ScheduleCalendar.vue         → Calendar view của lịch học
```

### Payment Components (`app/components/payment/`)

```
PlanCard.vue                 → Card subscription plan
PlanFeatures.vue             → Features của plan
PaymentForm.vue              → Form thanh toán
PaymentMethod.vue            → Chọn phương thức thanh toán (MoMo, PayPal, Stripe)
PaymentStatus.vue            → Trạng thái thanh toán
PaymentHistory.vue           → Lịch sử thanh toán
```

### Admin Components (`app/components/admin/`)

```
AdminDashboard.vue           → Admin dashboard
CrawlConfigList.vue          → Danh sách crawl config
CrawlConfigForm.vue          → Form tạo/sửa crawl config
CrawlJobList.vue             → Danh sách crawl jobs
CrawlJobStatus.vue           → Trạng thái crawl job (running, completed, failed)
CrawlJobProgress.vue         → Progress bar crawl job
CrawlJobResult.vue           → Kết quả crawl job (fetched, inserted, updated)
CourseManagement.vue         → Quản lý courses
UserManagement.vue           → Quản lý users
```

---

## 🎣 Composables

### Auth (`app/composables/useAuth.ts`)

```typescript
export const useAuth = () => {
  const user = useState<User | null>('user')
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const login = async () => {
    // Google OAuth flow
  }

  const logout = async () => {
    // Clear session
  }

  const refreshToken = async () => {
    // Refresh access token
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    refreshToken
  }
}
```

### Courses (`app/composables/useCourses.ts`)

```typescript
export const useCourses = () => {
  const courses = ref<Course[]>([])
  const isLoading = ref(false)
  const filters = ref<CourseFilters>({
    semester: null,
    campus: null,
    search: ''
  })

  const fetchCourses = async () => {
    // Fetch from API
  }

  const searchCourses = async (query: string) => {
    // Search courses
  }

  const getCourseByCode = async (code: string) => {
    // Get course detail
  }

  return {
    courses,
    isLoading,
    filters,
    fetchCourses,
    searchCourses,
    getCourseByCode
  }
}
```

### Schedule (`app/composables/useSchedule.ts`)

```typescript
export const useSchedule = () => {
  const scheduleInput = ref<ScheduleInput>({
    courseCodes: [],
    campus: null,
    freeTimeRanges: [],
    workTime: null
  })

  const scheduleResult = ref<ScheduleResult | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const generateSchedule = async () => {
    // Call AI API
  }

  const saveSchedule = async () => {
    // Save to database
  }

  const loadScheduleHistory = async () => {
    // Load from database
  }

  return {
    scheduleInput,
    scheduleResult,
    isLoading,
    error,
    generateSchedule,
    saveSchedule,
    loadScheduleHistory
  }
}
```

### Payment (`app/composables/usePayment.ts`)

```typescript
export const usePayment = () => {
  const plans = ref<SubscriptionPlan[]>([])
  const currentPlan = ref<SubscriptionPlan | null>(null)
  const paymentHistory = ref<Payment[]>([])

  const fetchPlans = async () => {
    // Fetch subscription plans
  }

  const selectPlan = async (planId: number) => {
    // Select plan and redirect to payment
  }

  const processPayment = async (paymentMethod: string) => {
    // Process payment
  }

  const fetchPaymentHistory = async () => {
    // Fetch payment history
  }

  return {
    plans,
    currentPlan,
    paymentHistory,
    fetchPlans,
    selectPlan,
    processPayment,
    fetchPaymentHistory
  }
}
```

### Admin (`app/composables/useAdmin.ts`)

```typescript
export const useAdmin = () => {
  const crawlConfigs = ref<CrawlConfig[]>([])
  const crawlJobs = ref<CrawlJob[]>([])
  const isLoading = ref(false)

  const fetchCrawlConfigs = async () => {
    // Fetch crawl configs
  }

  const createCrawlConfig = async (config: CreateCrawlConfigDto) => {
    // Create crawl config
  }

  const updateCrawlConfig = async (id: number, config: UpdateCrawlConfigDto) => {
    // Update crawl config
  }

  const triggerCrawl = async (configId: number) => {
    // Trigger crawl job
  }

  const fetchCrawlJobs = async (configId: number) => {
    // Fetch crawl jobs for config
  }

  const pollJobStatus = async (jobId: number) => {
    // Poll job status (for real-time updates)
  }

  return {
    crawlConfigs,
    crawlJobs,
    isLoading,
    fetchCrawlConfigs,
    createCrawlConfig,
    updateCrawlConfig,
    triggerCrawl,
    fetchCrawlJobs,
    pollJobStatus
  }
}
```

---

## 🔌 API Integration

### API Client (`app/composables/useApi.ts`)

```typescript
export const useApi = () => {
  const config = useRuntimeConfig()
  const { user } = useAuth()

  const api = $fetch.create({
    baseURL: config.public.apiBaseUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    async onRequest({ request, options }) {
      if (user.value?.tokens?.access_token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${user.value.tokens.access_token}`
        }
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        // Refresh token or redirect to login
        await useAuth().refreshToken()
      }
    }
  })

  return api
}
```

### API Endpoints

#### Auth
```
POST   /api/auth/login          → Google OAuth login
POST   /api/auth/logout          → Logout
POST   /api/auth/refresh         → Refresh token
GET    /api/auth/me              → Get current user
```

#### Courses
```
GET    /api/courses              → List courses (query: semester, campus, search)
GET    /api/courses/:code        → Get course detail
```

#### Schedule
```
POST   /api/schedule/generate     → Generate schedule with AI
GET    /api/schedule/history      → Get schedule history
GET    /api/schedule/:id          → Get schedule detail
POST   /api/schedule/:id/save     → Save schedule
```

#### Payment
```
GET    /api/payment/plans        → Get subscription plans
GET    /api/payment/current      → Get current plan
POST   /api/payment/create       → Create payment
POST   /api/payment/:id/verify    → Verify payment
GET    /api/payment/history       → Get payment history
```

#### Admin
```
GET    /api/admin/crawl/configs   → List crawl configs
POST   /api/admin/crawl/configs   → Create crawl config
PUT    /api/admin/crawl/configs/:id → Update crawl config
DELETE /api/admin/crawl/configs/:id → Delete crawl config
POST   /api/admin/crawl/configs/:id/trigger → Trigger crawl
GET    /api/admin/crawl/jobs      → List crawl jobs
GET    /api/admin/crawl/jobs/:id  → Get crawl job detail
GET    /api/admin/courses          → List courses (admin)
PUT    /api/admin/courses/:id      → Update course
DELETE /api/admin/courses/:id      → Delete course
GET    /api/admin/users             → List users
PUT    /api/admin/users/:id         → Update user
```

---

## 📱 UI/UX Flow

### 1. Authentication Flow

```
User clicks "Login with Google"
    ↓
Redirect to Google OAuth
    ↓
User authorizes
    ↓
Callback with code
    ↓
Exchange code for tokens
    ↓
Save tokens to database
    ↓
Set user session
    ↓
Redirect to dashboard or intended page
```

### 2. Schedule Generation Flow

```
User navigates to /schedule
    ↓
Display ScheduleForm
    ↓
User fills:
  - Select courses (multi-select)
  - Select campus (dropdown)
  - Select free time ranges (time picker)
  - Optional: Work time (time picker)
    ↓
User clicks "Generate Schedule"
    ↓
Show loading state
    ↓
Call API: POST /api/schedule/generate
    ↓
Display ScheduleResult:
  - Recommended sections (green badges)
  - Alternative sections (yellow badges)
  - Conflicts (red alerts)
    ↓
User can:
  - Save schedule
  - Regenerate with different inputs
  - View calendar view
  - Export schedule
```

### 3. Payment Flow

```
User navigates to /pricing
    ↓
Display subscription plans (Free, Pro, Premium)
    ↓
User clicks "Subscribe" on a plan
    ↓
Check user's current plan
    ↓
If not free plan:
  - Redirect to /payment/:planId
  - Display PaymentForm
  - User selects payment method (MoMo, PayPal, Stripe)
    ↓
User fills payment details
    ↓
Submit payment
    ↓
Process payment via gateway
    ↓
On success:
  - Update user's plan_id
  - Redirect to /payment/success
  - Show confirmation
    ↓
On failure:
  - Redirect to /payment/failed
  - Show error message
```

### 4. Admin Crawl Management Flow

```
Admin navigates to /admin/crawl
    ↓
Display list of crawl configs
    ↓
Admin can:
  - Create new config (form: name, URL, is_active)
  - Edit existing config
  - Toggle is_active
  - View crawl jobs for config
    ↓
Admin clicks "Trigger Crawl"
    ↓
Show loading state
    ↓
Call API: POST /api/admin/crawl/configs/:id/trigger
    ↓
Poll job status (WebSocket or polling)
    ↓
Display real-time progress:
  - Status: pending → running → completed/failed
  - Progress bar
  - Run result: fetched, inserted, updated, errors
    ↓
On completion:
  - Show summary (courses added/updated)
  - Show errors if any
```

---

## 🎨 UI Components Details

### ScheduleForm Component

**Props:**
- `initialData?: ScheduleInput` - Initial form data

**Emits:**
- `submit: [ScheduleInput]` - Form submitted
- `cancel: []` - Form cancelled

**Fields:**
1. **Course Selection**
   - Multi-select dropdown with search
   - Display: course code + course name
   - Validation: At least 1 course selected

2. **Campus Selection**
   - Radio buttons or select
   - Options: Quang Trung, Duy Tân, Hòa Khánh
   - Required

3. **Free Time Ranges**
   - Time range picker (start time - end time)
   - Multiple ranges (morning, afternoon, evening)
   - Add/remove range buttons
   - Validation: No overlapping ranges

4. **Work Time** (Optional)
   - Single time range picker
   - Display: "I have work during this time"

**Layout:**
```
┌─────────────────────────────────────┐
│  AI Schedule Generator               │
├─────────────────────────────────────┤
│                                      │
│  Courses to Register:                │
│  [Multi-select dropdown]             │
│                                      │
│  Campus:                             │
│  ( ) Quang Trung                     │
│  ( ) Duy Tân                         │
│  (•) Hòa Khánh                      │
│                                      │
│  Free Time Ranges:                   │
│  ┌───────────┐ ┌───────────┐       │
│  │ 07:00 ────│─│─ 11:00    │ [+Add] │
│  └───────────┘ └───────────┘       │
│  ┌───────────┐ ┌───────────┐       │
│  │ 13:00 ────│─│─ 17:00    │ [Remove]│
│  └───────────┘ └───────────┘       │
│                                      │
│  Work Time (Optional):               │
│  ┌───────────┐ ┌───────────┐       │
│  │ 08:00 ────│─│─ 17:00    │       │
│  └───────────┘ └───────────┘       │
│                                      │
│  [Cancel]  [Generate Schedule]      │
│                                      │
└─────────────────────────────────────┘
```

### ScheduleResult Component

**Props:**
- `result: ScheduleResult` - AI result data

**Displays:**
1. **Recommended Sections**
   - Green badge/card
   - Course code, course name, lecturer
   - Schedule (days, time, room)
   - Reason for recommendation
   - "Add to My Schedule" button

2. **Alternative Sections**
   - Yellow badge/card
   - Warning message
   - Reason why alternative
   - "Use This Instead" button

3. **Conflicts**
   - Red alert box
   - List of conflicting sections
   - Reason for conflict
   - "Resolve Conflicts" button

**Layout:**
```
┌─────────────────────────────────────┐
│  Schedule Result                     │
├─────────────────────────────────────┤
│                                      │
│  ✅ Recommended (3)                  │
│  ┌─────────────────────────────┐   │
│  │ MTH293 - Toán Laplace        │   │
│  │ Lecturer: Nguyễn Văn A       │   │
│  │ Tue, Fri: 07:00 - 09:00      │   │
│  │ Room: 1001B                   │   │
│  │ ✓ Matches your free time     │   │
│  │ [Add to Schedule]             │   │
│  └─────────────────────────────┘   │
│                                      │
│  ⚠️  Alternative (2)                 │
│  ┌─────────────────────────────┐   │
│  │ PHY101 - Vật lý Cơ bản       │   │
│  │ ⚠️  Slightly outside campus  │   │
│  │ [Use This Instead]            │   │
│  └─────────────────────────────┘   │
│                                      │
│  ❌ Conflicts (1)                    │
│  ┌─────────────────────────────┐   │
│  │ ⚠️  Time conflict detected  │   │
│  │ MTH293 overlaps with PHY101  │   │
│  │ [Resolve Conflicts]          │   │
│  └─────────────────────────────┘   │
│                                      │
│  [Save Schedule] [Regenerate]        │
│                                      │
└─────────────────────────────────────┘
```

### PlanCard Component

**Props:**
- `plan: SubscriptionPlan` - Plan data
- `currentPlan?: boolean` - Is current plan

**Displays:**
- Plan name (Free, Pro, Premium)
- Price per month
- Features list (from JSONB)
- "Current Plan" badge if active
- "Subscribe" or "Upgrade" button

**Layout:**
```
┌─────────────────────────────┐
│       PRO                   │
│   $9.99 / month             │
│                             │
│  ✓ AI Schedule: 100/month   │
│  ✓ Crawl Limit: 50/month    │
│  ✓ Priority Support         │
│                             │
│  [Subscribe]                │
└─────────────────────────────┘
```

---

## 📦 State Management

### User State (`app/stores/user.ts`)

```typescript
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const currentPlan = ref<SubscriptionPlan | null>(null)
  const isLoading = ref(false)

  const setUser = (userData: User) => {
    user.value = userData
  }

  const setCurrentPlan = (plan: SubscriptionPlan) => {
    currentPlan.value = plan
  }

  const clearUser = () => {
    user.value = null
    currentPlan.value = null
  }

  return {
    user,
    currentPlan,
    isLoading,
    setUser,
    setCurrentPlan,
    clearUser
  }
})
```

### Schedule State (`app/stores/schedule.ts`)

```typescript
export const useScheduleStore = defineStore('schedule', () => {
  const scheduleInput = ref<ScheduleInput | null>(null)
  const scheduleResult = ref<ScheduleResult | null>(null)
  const scheduleHistory = ref<ScheduleResult[]>([])

  const saveScheduleInput = (input: ScheduleInput) => {
    scheduleInput.value = input
  }

  const saveScheduleResult = (result: ScheduleResult) => {
    scheduleResult.value = result
  }

  const addToHistory = (result: ScheduleResult) => {
    scheduleHistory.value.unshift(result)
  }

  return {
    scheduleInput,
    scheduleResult,
    scheduleHistory,
    saveScheduleInput,
    saveScheduleResult,
    addToHistory
  }
})
```

---

## 🚀 Implementation Tasks

### Phase 1: Foundation
- [ ] Setup Nuxt 4 project structure
- [ ] Configure Tailwind CSS 4
- [ ] Install shadcn-vue components
- [ ] Setup Vue I18n (vi, en, ja)
- [ ] Setup Supabase client
- [ ] Create API client composable
- [ ] Setup authentication composable

### Phase 2: Authentication & User Management
- [ ] Implement Google OAuth login
- [ ] Create AuthGuard component
- [ ] Create user dashboard page
- [ ] Create user profile page
- [ ] Implement token refresh logic

### Phase 3: Courses Module
- [ ] Create CourseList component
- [ ] Create CourseCard component
- [ ] Create CourseSearch component
- [ ] Create CourseDetail page
- [ ] Implement course filtering
- [ ] Implement course search

### Phase 4: Schedule Module
- [ ] Create ScheduleForm component
- [ ] Create ScheduleResult component
- [ ] Create ScheduleResultCard component
- [ ] Create ScheduleConflict component
- [ ] Create ScheduleAlternative component
- [ ] Create ScheduleCalendar component
- [ ] Implement schedule generation API call
- [ ] Implement schedule saving
- [ ] Create schedule history page

### Phase 5: Payment Module
- [ ] Create PlanCard component
- [ ] Create PaymentForm component
- [ ] Create PaymentMethod component
- [ ] Create PaymentStatus component
- [ ] Implement payment processing (MoMo, PayPal, Stripe)
- [ ] Create payment success/failed pages
- [ ] Create payment history page

### Phase 6: Admin Module
- [ ] Create AdminGuard component
- [ ] Create AdminDashboard page
- [ ] Create CrawlConfigList component
- [ ] Create CrawlConfigForm component
- [ ] Create CrawlJobList component
- [ ] Create CrawlJobStatus component
- [ ] Create CrawlJobProgress component
- [ ] Implement crawl job polling
- [ ] Create course management page
- [ ] Create user management page

### Phase 7: UI Polish & Optimization
- [ ] Responsive design for mobile
- [ ] Loading states
- [ ] Error handling
- [ ] Toast notifications
- [ ] Skeleton loaders
- [ ] Optimize bundle size
- [ ] SEO optimization
- [ ] Accessibility (a11y)

---

## 📘 Ghi chú phát triển

### Performance
- Lazy load routes
- Code splitting per feature
- Image optimization
- API response caching
- Debounce search inputs

### Security
- Sanitize user inputs
- Validate API responses
- Protect admin routes
- Secure token storage
- CSRF protection

### Accessibility
- ARIA labels
- Keyboard navigation
- Screen reader support
- Color contrast (WCAG AA)
- Focus management

### Internationalization
- Support vi, en, ja
- Date/time localization
- Currency formatting
- RTL support (if needed)

---

## 📄 Metadata

**Tác giả:** Doan Vo Van Trong
**Ngày tạo:** 2025-01-27
**Phiên bản:** 1.0.0
**Related Docs:** `course-registration-crawl.md` (BE)

---

## 🔗 Tài liệu tham khảo

- Nuxt 4 Documentation: https://nuxt.com/docs
- Vue 3 Documentation: https://vuejs.org/
- Tailwind CSS 4: https://tailwindcss.com/
- shadcn-vue: https://www.shadcn-vue.com/
- Supabase JS Client: https://supabase.com/docs/reference/javascript
