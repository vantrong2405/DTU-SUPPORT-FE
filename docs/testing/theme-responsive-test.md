# Theme Component Responsive Test Checklist

## Breakpoints Reference
- **Mobile (default)**: < 640px
- **sm**: ≥ 640px
- **md**: ≥ 768px
- **lg**: ≥ 1024px
- **xl**: ≥ 1280px
- **2xl**: ≥ 1536px

## Test Scenarios

### 1. Button Trigger (Theme Selector Button)

#### Mobile (< 640px)
- [ ] Button height: `h-8` (32px)
- [ ] Button padding: `px-2` (8px horizontal)
- [ ] Icon size: `h-4 w-4` (16px)
- [ ] Text label: **Hidden** (`hidden sm:inline`)
- [ ] Gap between icon and text: `gap-1.5` (6px)
- [ ] Button không bị overflow
- [ ] Button có đủ space trong Header mobile menu

#### Small (≥ 640px)
- [ ] Button height: `h-9` (36px)
- [ ] Button padding: `px-3` (12px horizontal)
- [ ] Icon size: `h-[1.2rem] w-[1.2rem]` (19.2px)
- [ ] Text label: **Visible** (`sm:inline`)
- [ ] Text size: `text-sm` (14px)
- [ ] Gap between icon and text: `gap-2` (8px)
- [ ] Button không bị overflow

#### Medium (≥ 768px)
- [ ] Button vẫn hoạt động tốt
- [ ] Không có layout shift

#### Large (≥ 1024px)
- [ ] Button trong Header desktop layout
- [ ] Button có đủ space với LocaleSwitcher
- [ ] Spacing giữa các buttons: `space-x-2 xl:space-x-3`

#### Extra Large (≥ 1280px)
- [ ] Spacing tăng lên: `xl:space-x-3`
- [ ] Button vẫn responsive

### 2. DropdownMenuContent

#### Mobile (< 640px)
- [ ] Width: `w-[calc(100vw-2rem)]` (full width - 2rem margin)
- [ ] Max width: `max-w-sm` (384px)
- [ ] Không bị overflow ra ngoài viewport
- [ ] Có đủ margin từ edge (1rem mỗi bên)
- [ ] Alignment: `align="end"` hoạt động đúng

#### Small (≥ 640px)
- [ ] Width: `w-56` (224px) - fixed width
- [ ] Max width: `max-w-sm` vẫn áp dụng
- [ ] Không bị overflow
- [ ] Alignment: `align="end"` hoạt động đúng

#### Medium+ (≥ 768px)
- [ ] Width: `w-56` (224px) - fixed width
- [ ] Không có layout shift

### 3. Light/Dark Toggle Buttons

#### Mobile (< 640px)
- [ ] Button height: `h-8` (32px)
- [ ] Text size: `text-xs` (12px)
- [ ] Buttons có `flex-1` để chia đều space
- [ ] Gap giữa buttons: `gap-2` (8px)
- [ ] Buttons không bị overflow

#### Small (≥ 640px)
- [ ] Button height: `h-9` (36px)
- [ ] Text size: `text-sm` (14px)
- [ ] Buttons vẫn chia đều space
- [ ] Gap giữa buttons: `gap-2` (8px)

### 4. Theme Color Buttons Grid

#### Mobile (< 640px)
- [ ] Grid: `grid-cols-2` (2 columns)
- [ ] Gap: `gap-1.5` (6px)
- [ ] Button height: `h-8` (32px)
- [ ] Button padding: `px-2` (8px horizontal)
- [ ] Icon (color dot) size: `w-3 h-3` (12px)
- [ ] Text size: `text-xs` (12px)
- [ ] Gap giữa icon và text: `gap-1.5` (6px)
- [ ] Buttons không bị overflow
- [ ] Text truncate hoạt động đúng

#### Small (≥ 640px)
- [ ] Grid: `grid-cols-2` (2 columns)
- [ ] Gap: `gap-2` (8px)
- [ ] Button height: `h-9` (36px)
- [ ] Button padding: `px-3` (12px horizontal)
- [ ] Icon (color dot) size: `w-3.5 h-3.5` (14px)
- [ ] Text size: `text-sm` (14px)
- [ ] Gap giữa icon và text: `gap-2` (8px)
- [ ] Buttons không bị overflow
- [ ] Text truncate hoạt động đúng

#### Medium+ (≥ 768px)
- [ ] Grid vẫn `grid-cols-2`
- [ ] Không có layout shift

### 5. Container Padding

#### Mobile (< 640px)
- [ ] Padding: `p-2` (8px)
- [ ] Content không bị sát edge

#### Small (≥ 640px)
- [ ] Padding: `p-3` (12px)
- [ ] Content có đủ breathing room

### 6. Integration Tests

#### Header Desktop (≥ 1024px)
- [ ] Theme button trong Header desktop
- [ ] Spacing với LocaleSwitcher: `space-x-2 xl:space-x-3`
- [ ] Buttons không bị overlap
- [ ] Dropdown mở đúng vị trí (align="end")

#### Header Mobile Menu (< 1024px)
- [ ] Theme button trong mobile menu
- [ ] Centered layout: `flex items-center justify-center`
- [ ] Gap với LocaleSwitcher: `gap-3`
- [ ] Dropdown mở đúng vị trí
- [ ] Không bị overflow trong mobile menu

### 7. Edge Cases

#### Very Small Mobile (< 375px)
- [ ] Dropdown width: `w-[calc(100vw-2rem)]` vẫn hoạt động
- [ ] Không bị overflow
- [ ] Buttons vẫn clickable (touch target ≥ 44px)

#### Large Desktop (≥ 1920px)
- [ ] Dropdown width: `w-56` (224px) - không quá rộng
- [ ] Alignment: `align="end"` hoạt động đúng
- [ ] Không có layout shift

#### Landscape Mobile
- [ ] Dropdown vẫn responsive
- [ ] Không bị overflow

## Test Results

### Date: [Date]
### Tester: [Name]
### Browser: [Browser + Version]
### Device: [Device Type]

#### Mobile (< 640px)
- Button Trigger: [ ] Pass [ ] Fail - Notes: ___________
- DropdownMenuContent: [ ] Pass [ ] Fail - Notes: ___________
- Light/Dark Toggle: [ ] Pass [ ] Fail - Notes: ___________
- Theme Grid: [ ] Pass [ ] Fail - Notes: ___________

#### Small (≥ 640px)
- Button Trigger: [ ] Pass [ ] Fail - Notes: ___________
- DropdownMenuContent: [ ] Pass [ ] Fail - Notes: ___________
- Light/Dark Toggle: [ ] Pass [ ] Fail - Notes: ___________
- Theme Grid: [ ] Pass [ ] Fail - Notes: ___________

#### Medium (≥ 768px)
- All Components: [ ] Pass [ ] Fail - Notes: ___________

#### Large (≥ 1024px)
- Header Desktop: [ ] Pass [ ] Fail - Notes: ___________
- Dropdown: [ ] Pass [ ] Fail - Notes: ___________

#### Extra Large (≥ 1280px)
- All Components: [ ] Pass [ ] Fail - Notes: ___________

## Issues Found

1. [Issue description]
   - Breakpoint: ___________
   - Component: ___________
   - Severity: [ ] Critical [ ] High [ ] Medium [ ] Low
   - Status: [ ] Fixed [ ] Pending [ ] Won't Fix

2. [Issue description]
   - ...

## Notes

[Additional notes about testing process, browser-specific issues, etc.]
