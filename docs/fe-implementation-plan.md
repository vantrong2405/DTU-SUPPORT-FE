# 📋 FE Implementation Plan - AI Chatbox

## 🎯 Mục tiêu

Implement AI Chatbox feature cho GPA Calculator tab theo architecture document:
- BE làm hết logic tính toán
- FE chỉ render UI (text response + rich UI components)

---

## 📦 Phase 1: Foundation Setup (Priority: High)

### Task 1.1: Types & Interfaces

**File**: `app/types/chat.ts`

**Deliverables**:
- [ ] Define `ChatMessage` interface
- [ ] Define `ChatResponse` interface
- [ ] Define `ToolResult` interface
- [ ] Define `Message` interface (internal)

**Acceptance Criteria**:
- Types match với API contract trong document
- Export types để reuse

**Estimated Time**: 30 minutes

---

### Task 1.2: API Client Composable

**File**: `app/composables/gpa/useChatApi.ts`

**Deliverables**:
- [ ] Create `useChatApi` composable
- [ ] Implement `sendMessage` function
- [ ] Error handling
- [ ] Use `useApiFetch` từ `app/lib/api.ts`

**Acceptance Criteria**:
- Function `sendMessage` nhận `ChatMessage[]` → trả `ChatResponse`
- Handle errors properly
- Use `POST /api/chat` endpoint
- Return type-safe response

**Estimated Time**: 1 hour

---

### Task 1.3: Conversation Manager Composable

**File**: `app/composables/gpa/useChatConversation.ts`

**Deliverables**:
- [ ] Create `useChatConversation` composable
- [ ] Implement `messages` state (ref)
- [ ] Implement `isLoading` state
- [ ] Implement `error` state
- [ ] Implement `addMessage` function
- [ ] Implement `sendUserMessage` function
- [ ] Implement `clearConversation` function
- [ ] Auto-scroll to bottom khi có message mới

**Acceptance Criteria**:
- Messages được lưu trong state
- Loading state hoạt động đúng
- Error handling đầy đủ
- Auto-scroll khi có message mới

**Estimated Time**: 2 hours

---

## 📦 Phase 2: UI Components (Priority: High)

### Task 2.1: ChatBox Component

**File**: `app/components/gpa/ChatBox.vue`

**Deliverables**:
- [ ] Create ChatBox component
- [ ] Message list UI (user messages + bot messages)
- [ ] Input area với send button
- [ ] Loading state indicator
- [ ] Empty state (khi chưa có messages)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Dark mode support

**Acceptance Criteria**:
- UI đẹp, responsive
- Loading state hiển thị khi đang gửi
- Input có placeholder và disabled khi loading
- Enter key để send message
- Scroll to bottom khi có message mới

**Estimated Time**: 3 hours

---

### Task 2.2: Message Item Component (Optional)

**File**: `app/components/gpa/ChatMessage.vue`

**Deliverables**:
- [ ] Create ChatMessage component
- [ ] User message styling
- [ ] Bot message styling
- [ ] Timestamp display
- [ ] Avatar/icon cho user và bot

**Acceptance Criteria**:
- Visual distinction giữa user và bot messages
- Styling đẹp, consistent với design system
- Responsive

**Estimated Time**: 1 hour

---

### Task 2.3: Tool Result Components

#### Task 2.3.1: GpaResultCard Component

**File**: `app/components/gpa/GpaResultCard.vue`

**Deliverables**:
- [ ] Create GpaResultCard component
- [ ] Display GPA results (target/simulation)
- [ ] Display graduation classification
- [ ] Display tool result data
- [ ] Styling với Card component

**Acceptance Criteria**:
- Component nhận `data` prop từ `toolResult`
- Display results đẹp, readable
- Support cả target và simulation GPA

**Estimated Time**: 2 hours

#### Task 2.3.2: PeResultCard Component

**File**: `app/components/gpa/PeResultCard.vue`

**Deliverables**:
- [ ] Create PeResultCard component
- [ ] Display PE GPA average
- [ ] Display pass/fail status
- [ ] Display input values (pe1, pe2, pe3)
- [ ] Styling với Card component

**Acceptance Criteria**:
- Component nhận `data` prop từ `toolResult`
- Display results đẹp, readable

**Estimated Time**: 1 hour

---

### Task 2.4: Integrate ChatBox vào Tab "AI"

**File**: `app/pages/tools/gpa/index.vue`

**Deliverables**:
- [ ] Replace placeholder content trong tab "ai"
- [ ] Import ChatBox component
- [ ] Add ChatBox vào TabsContent value="ai"
- [ ] Styling integration

**Acceptance Criteria**:
- ChatBox hiển thị trong tab "ai"
- Layout đẹp, không break existing tabs
- Responsive

**Estimated Time**: 30 minutes

---

## 📦 Phase 3: Tool Result Rendering (Priority: Medium)

### Task 3.1: Tool Component Mapping

**File**: `app/composables/gpa/useChatTools.ts` (hoặc trong ChatBox component)

**Deliverables**:
- [ ] Create tool component mapping
- [ ] Map tool names → component names
- [ ] Helper function `getToolComponent(toolName)`

**Acceptance Criteria**:
- Mapping đúng với tool names từ BE
- Component names match với actual components

**Estimated Time**: 30 minutes

---

### Task 3.2: Dynamic Component Rendering

**File**: `app/components/gpa/ChatBox.vue`

**Deliverables**:
- [ ] Implement dynamic component rendering
- [ ] Render tool result component khi có `toolResult`
- [ ] Pass `data` prop vào component

**Acceptance Criteria**:
- Component render đúng khi có `toolResult`
- Data được pass đúng vào component
- Fallback khi component không tồn tại

**Estimated Time**: 1 hour

---

## 📦 Phase 4: i18n Integration (Priority: Medium)

### Task 4.1: Chat Translations

**Files**:
- `i18n/locales/gpa/vi.yml`
- `i18n/locales/gpa/en.yml`
- `i18n/locales/gpa/ja.yml`

**Deliverables**:
- [ ] Add chat UI translations
- [ ] Add placeholder text
- [ ] Add button labels
- [ ] Add error messages
- [ ] Add empty state messages
- [ ] Add tool result labels

**Acceptance Criteria**:
- All UI text có i18n keys
- Support 3 languages: vi, en, ja
- Structure rõ ràng, dễ maintain

**Estimated Time**: 1 hour

---

### Task 4.2: Update Components với i18n

**Files**:
- `app/components/gpa/ChatBox.vue`
- `app/components/gpa/ChatMessage.vue`
- `app/components/gpa/GpaResultCard.vue`
- `app/components/gpa/PeResultCard.vue`

**Deliverables**:
- [ ] Replace hardcoded text với `t()` function
- [ ] Use `useI18n()` composable
- [ ] Define SCOPE constant

**Acceptance Criteria**:
- Không có hardcoded text
- All text có i18n support

**Estimated Time**: 1 hour

---

## 📦 Phase 5: Error Handling & UX (Priority: Medium)

### Task 5.1: Error Handling

**Files**:
- `app/composables/gpa/useChatApi.ts`
- `app/composables/gpa/useChatConversation.ts`
- `app/components/gpa/ChatBox.vue`

**Deliverables**:
- [ ] Handle network errors
- [ ] Handle API errors (400, 401, 500, etc.)
- [ ] Display error messages to user
- [ ] Retry mechanism (optional)
- [ ] Error state UI

**Acceptance Criteria**:
- Errors được handle gracefully
- User thấy error messages rõ ràng
- UX không bị break khi có error

**Estimated Time**: 1.5 hours

---

### Task 5.2: Loading States

**Files**:
- `app/components/gpa/ChatBox.vue`

**Deliverables**:
- [ ] Loading indicator khi đang gửi message
- [ ] Disable input khi loading
- [ ] Typing indicator (optional, advanced)

**Acceptance Criteria**:
- Loading state rõ ràng
- User không thể spam send button

**Estimated Time**: 30 minutes

---

### Task 5.3: Empty State

**Files**:
- `app/components/gpa/ChatBox.vue`

**Deliverables**:
- [ ] Empty state UI khi chưa có messages
- [ ] Welcome message
- [ ] Example prompts (optional)

**Acceptance Criteria**:
- Empty state đẹp, informative
- User biết cách sử dụng

**Estimated Time**: 30 minutes

---

## 📦 Phase 6: Polish & Optimization (Priority: Low)

### Task 6.1: Auto-scroll

**Files**:
- `app/components/gpa/ChatBox.vue`

**Deliverables**:
- [ ] Auto-scroll to bottom khi có message mới
- [ ] Smooth scroll behavior
- [ ] Handle scroll position khi user scroll up (optional)

**Acceptance Criteria**:
- Auto-scroll hoạt động smooth
- Không bị jump khi có message mới

**Estimated Time**: 30 minutes

---

### Task 6.2: Keyboard Shortcuts

**Files**:
- `app/components/gpa/ChatBox.vue`

**Deliverables**:
- [ ] Enter to send
- [ ] Shift+Enter for new line (optional)
- [ ] Escape to clear input (optional)

**Acceptance Criteria**:
- Keyboard shortcuts hoạt động đúng
- UX intuitive

**Estimated Time**: 30 minutes

---

### Task 6.3: Message Actions (Optional)

**Files**:
- `app/components/gpa/ChatBox.vue`
- `app/components/gpa/ChatMessage.vue`

**Deliverables**:
- [ ] Copy message button
- [ ] Delete message button (optional)
- [ ] Regenerate response button (optional)

**Acceptance Criteria**:
- Actions hoạt động đúng
- UX intuitive

**Estimated Time**: 1 hour

---

### Task 6.4: Performance Optimization

**Files**:
- `app/components/gpa/ChatBox.vue`

**Deliverables**:
- [ ] Virtual scrolling (nếu messages nhiều)
- [ ] Lazy load components
- [ ] Memoize computed values

**Acceptance Criteria**:
- Performance tốt với nhiều messages
- No lag khi scroll

**Estimated Time**: 1 hour

---

## 📋 Implementation Checklist

### Phase 1: Foundation
- [ ] Task 1.1: Types & Interfaces
- [ ] Task 1.2: API Client Composable
- [ ] Task 1.3: Conversation Manager Composable

### Phase 2: UI Components
- [ ] Task 2.1: ChatBox Component
- [ ] Task 2.2: Message Item Component (Optional)
- [ ] Task 2.3.1: GpaResultCard Component
- [ ] Task 2.3.2: PeResultCard Component
- [ ] Task 2.4: Integrate ChatBox vào Tab "AI"

### Phase 3: Tool Result Rendering
- [ ] Task 3.1: Tool Component Mapping
- [ ] Task 3.2: Dynamic Component Rendering

### Phase 4: i18n Integration
- [ ] Task 4.1: Chat Translations
- [ ] Task 4.2: Update Components với i18n

### Phase 5: Error Handling & UX
- [ ] Task 5.1: Error Handling
- [ ] Task 5.2: Loading States
- [ ] Task 5.3: Empty State

### Phase 6: Polish & Optimization
- [ ] Task 6.1: Auto-scroll
- [ ] Task 6.2: Keyboard Shortcuts
- [ ] Task 6.3: Message Actions (Optional)
- [ ] Task 6.4: Performance Optimization

---

## 🎯 Priority Order

### Must Have (MVP)
1. Phase 1: Foundation Setup
2. Phase 2: UI Components (basic ChatBox)
3. Phase 3: Tool Result Rendering (basic)
4. Phase 4: i18n Integration (basic)
5. Phase 5: Error Handling & UX (basic)

### Nice to Have
6. Phase 6: Polish & Optimization
7. Task 2.2: Message Item Component
8. Task 6.3: Message Actions

---

## ⏱️ Estimated Total Time

**MVP**: ~12-15 hours
**Full Implementation**: ~18-20 hours

---

## 📝 Notes

1. **Start with MVP**: Implement basic chat flow trước, sau đó polish dần
2. **Test with mock data**: Dùng mock data để test flow trước khi integrate với BE
3. **Follow naming conventions**: Theo project conventions (PascalCase cho components, camelCase cho variables)
4. **Use existing UI components**: Reuse shadcn-vue components (Button, Input, Card, etc.)
5. **Responsive first**: Mobile-first approach, test trên mobile
6. **Dark mode**: Đảm bảo support dark mode
7. **Accessibility**: ARIA labels, keyboard navigation

---

## 🚀 Quick Start Guide

### Step 1: Setup Types
```bash
# Create types file
touch app/types/chat.ts
```

### Step 2: Create API Client
```bash
# Create composable
touch app/composables/gpa/useChatApi.ts
```

### Step 3: Create Conversation Manager
```bash
# Create composable
touch app/composables/gpa/useChatConversation.ts
```

### Step 4: Create ChatBox Component
```bash
# Create component
touch app/components/gpa/ChatBox.vue
```

### Step 5: Integrate vào Tab "AI"
- Update `app/pages/tools/gpa/index.vue`
- Import ChatBox component
- Add vào TabsContent value="ai"

---

## ✅ Definition of Done

Một task được coi là "Done" khi:
- [ ] Code được viết theo conventions
- [ ] No linting errors
- [ ] Responsive trên mobile, tablet, desktop
- [ ] Dark mode support
- [ ] i18n support (nếu có text)
- [ ] Error handling đầy đủ
- [ ] Tested với mock data (nếu có)
- [ ] Ready for review

---

## 🔗 Related Files

- Architecture Document: `docs/ai-chatbox-architecture.md`
- GPA Calculator Docs: `docs/gpa-calculator.md`
- API Client: `app/lib/api.ts`
- Existing Calculators: `app/components/gpa/*.vue`
