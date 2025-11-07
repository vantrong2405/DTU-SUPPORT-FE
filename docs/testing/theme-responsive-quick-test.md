# Theme Component - Quick Test Guide

## Test trên Browser DevTools

### 1. Mobile (< 640px)
**Test width: 375px, 414px, 480px**

#### Button Trigger
- [ ] Icon hiển thị (16px)
- [ ] Text label **ẨN** (hidden)
- [ ] Button height: 32px
- [ ] Button padding: 8px horizontal
- [ ] Click mở dropdown

#### Dropdown
- [ ] Width: `calc(100vw - 2rem)` - full width trừ margin
- [ ] Không bị overflow ra ngoài viewport
- [ ] Alignment: `align="end"` hoạt động
- [ ] Light/Dark buttons: height 32px, text 12px
- [ ] Theme grid: 2 columns, gap 6px
- [ ] Theme buttons: height 32px, padding 8px
- [ ] Color dots: 12px
- [ ] Text truncate hoạt động

### 2. Small (≥ 640px)
**Test width: 640px, 720px**

#### Button Trigger
- [ ] Icon hiển thị (19.2px)
- [ ] Text label **HIỂN THỊ** (visible)
- [ ] Text size: 14px
- [ ] Button height: 36px
- [ ] Button padding: 12px horizontal
- [ ] Gap icon-text: 8px

#### Dropdown
- [ ] Width: 224px (fixed)
- [ ] Max width: 384px
- [ ] Light/Dark buttons: height 36px, text 14px
- [ ] Theme grid: 2 columns, gap 8px
- [ ] Theme buttons: height 36px, padding 12px
- [ ] Color dots: 14px
- [ ] Container padding: 12px

### 3. Medium+ (≥ 768px)
**Test width: 768px, 1024px, 1280px, 1920px**

#### Header Desktop (≥ 1024px)
- [ ] Theme button trong Header desktop
- [ ] Spacing với LocaleSwitcher: `space-x-2` (≥1024px), `space-x-3` (≥1280px)
- [ ] Buttons không overlap
- [ ] Dropdown mở đúng vị trí

#### Dropdown
- [ ] Width: 224px (fixed)
- [ ] Không có layout shift
- [ ] Tất cả elements responsive

## Test Checklist nhanh

### Mobile (< 640px)
```
✅ Button: Icon only, h-8, px-2
✅ Dropdown: w-[calc(100vw-2rem)], max-w-sm
✅ Light/Dark: h-8, text-xs
✅ Grid: grid-cols-2, gap-1.5
✅ Theme buttons: h-8, px-2, text-xs
✅ Color dots: w-3 h-3
```

### Small (≥ 640px)
```
✅ Button: Icon + Text, h-9, px-3, text-sm
✅ Dropdown: w-56, max-w-sm
✅ Light/Dark: h-9, text-sm
✅ Grid: grid-cols-2, gap-2
✅ Theme buttons: h-9, px-3, text-sm
✅ Color dots: w-3.5 h-3.5
```

### Desktop (≥ 1024px)
```
✅ Header integration: space-x-2 (lg), space-x-3 (xl)
✅ Dropdown: w-56 (fixed)
✅ All responsive classes work
```

## Browser DevTools Commands

### Chrome/Edge DevTools
1. Mở DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Chọn device hoặc set custom width:
   - Mobile: 375px, 414px, 480px
   - Small: 640px, 720px
   - Medium: 768px
   - Large: 1024px
   - XL: 1280px
   - 2XL: 1920px

### Firefox DevTools
1. Mở DevTools (F12)
2. Responsive Design Mode (Ctrl+Shift+M)
3. Set custom width tương tự

## Test Cases

### Test Case 1: Mobile Button
- **Width**: 375px
- **Expected**: Icon only, no text
- **Action**: Click button
- **Expected**: Dropdown opens, width = `calc(100vw - 2rem)`

### Test Case 2: Small Button
- **Width**: 640px
- **Expected**: Icon + Text "Theme"
- **Action**: Click button
- **Expected**: Dropdown opens, width = 224px

### Test Case 3: Desktop Header
- **Width**: 1024px
- **Expected**: Theme button in header, spacing với LocaleSwitcher
- **Action**: Click button
- **Expected**: Dropdown opens, aligned to end

### Test Case 4: Very Small Mobile
- **Width**: 320px
- **Expected**: Dropdown không overflow
- **Action**: Click button
- **Expected**: Dropdown width = `calc(100vw - 2rem)` = 288px

### Test Case 5: Large Desktop
- **Width**: 1920px
- **Expected**: Dropdown width = 224px (không quá rộng)
- **Action**: Click button
- **Expected**: Dropdown aligned to end

## Common Issues to Check

1. **Overflow**: Dropdown không bị overflow ra ngoài viewport
2. **Layout Shift**: Không có layout shift khi resize
3. **Touch Target**: Buttons có touch target ≥ 44px trên mobile
4. **Text Truncate**: Long theme names truncate đúng
5. **Alignment**: Dropdown `align="end"` hoạt động đúng
6. **Spacing**: Spacing giữa elements đúng trên mọi breakpoints

## Notes

- Test trên Chrome, Firefox, Safari, Edge
- Test trên real devices nếu có thể
- Test landscape orientation
- Test với different theme names (long/short)
