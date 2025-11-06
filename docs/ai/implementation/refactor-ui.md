---
phase: implementation
title: Implementation Guide
description: Technical implementation notes, patterns, and code guidelines
---

# Implementation Guide

## Development Setup
**How do we get started?**

**Prerequisites and dependencies:**
- Node.js 18+ (already installed)
- Yarn package manager (already configured)
- Nuxt 4 development environment (already set up)
- animejs (already in dependencies: `^4.2.2`)
- @vueuse/core (already in dependencies: `^13.9.0`)

**Environment setup steps:**
```bash
# No additional setup needed - dependencies already installed
# Verify animejs is available:
yarn list animejs

# If Three.js is needed (optional):
yarn add three @types/three
```

**Configuration needed:**
- No additional Nuxt config needed
- Tailwind CSS config may need extension for custom animations
- TypeScript types for animation configs

## Code Structure
**How is the code organized?**

**Directory structure:**
```
app/
├── composables/
│   └── animations/              # New: Animation composables
│       ├── useFadeIn.ts
│       ├── useSlideIn.ts
│       ├── useParallax.ts
│       ├── useHoverEffect.ts
│       ├── useScrollReveal.ts
│       └── useAnimationPerformance.ts
├── components/
│   ├── effects/                 # New: Visual effect components
│   │   ├── ParticleBackground.vue (optional)
│   │   ├── GradientMesh.vue (optional)
│   │   └── ThreeScene.vue (optional)
│   ├── common/                  # Enhanced: Existing components
│   ├── home/                    # Enhanced: Existing components
│   └── tools/                   # Enhanced: Existing components
├── types/
│   └── animations.ts            # New: Animation type definitions
└── assets/
    └── css/
        └── tailwind.css         # Enhanced: Custom animation utilities
```

**Module organization:**
- Animation composables are self-contained and reusable
- Visual effect components are optional and lazy-loaded
- Enhanced components maintain existing structure with added animations

**Naming conventions:**
- Composables: `use[AnimationName].ts` (e.g., `useFadeIn.ts`)
- Effect components: `[EffectName].vue` (e.g., `ParticleBackground.vue`)
- Animation configs: `AnimationConfig`, `VisualEffectConfig`
- CSS classes: `animate-[effect]` (e.g., `animate-fade-in`)

## Implementation Notes
**Key technical details to remember:**

### Core Features

**1. Animation Composables Pattern**
```typescript
// app/composables/animations/useFadeIn.ts
import { ref, onMounted, onUnmounted } from 'vue'
import anime from 'animejs'
import type { AnimationConfig } from '~/types/animations'

export function useFadeIn(options?: Partial<AnimationConfig>) {
  const elementRef = ref<HTMLElement>()
  const isVisible = ref(false)
  const isAnimating = ref(false)
  
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  const start = () => {
    if (prefersReducedMotion) {
      isVisible.value = true
      return
    }
    
    if (!elementRef.value) return
    
    isAnimating.value = true
    anime({
      targets: elementRef.value,
      opacity: [0, 1],
      translateY: [20, 0],
      duration: options?.duration || 800,
      easing: options?.easing || 'easeOutCubic',
      delay: options?.delay || 0,
      complete: () => {
        isAnimating.value = false
        isVisible.value = true
      }
    })
  }
  
  onMounted(() => {
    start()
  })
  
  onUnmounted(() => {
    if (elementRef.value) {
      anime.remove(elementRef.value)
    }
  })
  
  return { elementRef, isVisible, isAnimating, start }
}
```

**2. Parallax Effect Pattern**
```typescript
// app/composables/animations/useParallax.ts
import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

export function useParallax(speed: number = 0.5) {
  const offset = ref(0)
  const { y } = useWindowScroll()
  
  const update = () => {
    offset.value = y.value * speed
  }
  
  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })
  
  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })
  
  return { offset }
}
```

**3. Scroll Reveal Pattern**
```typescript
// app/composables/animations/useScrollReveal.ts
import { ref, onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

export function useScrollReveal(threshold: number = 0.1) {
  const target = ref<HTMLElement>()
  const isVisible = ref(false)
  
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting && !isVisible.value) {
        isVisible.value = true
        stop()
      }
    },
    { threshold }
  )
  
  return { target, isVisible }
}
```

**4. Component Enhancement Pattern**
```vue
<!-- Example: Enhanced Hero.vue -->
<script setup lang="ts">
import { useFadeIn } from '~/composables/animations/useFadeIn'
import { useParallax } from '~/composables/animations/useParallax'

const { elementRef: titleRef } = useFadeIn({ delay: 200 })
const { elementRef: subtitleRef } = useFadeIn({ delay: 400 })
const { offset: parallaxOffset } = useParallax(0.3)
</script>

<template>
  <section class="hero-section">
    <div 
      class="parallax-background"
      :style="{ transform: `translateY(${parallaxOffset}px)` }"
    >
      <!-- Background content -->
    </div>
    <h1 ref="titleRef" class="hero-title">Welcome</h1>
    <p ref="subtitleRef" class="hero-subtitle">Subtitle</p>
  </section>
</template>
```

### Patterns & Best Practices

**1. Performance Optimization**
- Use `transform` and `opacity` for animations (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left` (causes layout reflow)
- Use `will-change` sparingly and remove after animation
- Debounce scroll events for parallax effects
- Use `requestAnimationFrame` for smooth animations

**2. Accessibility**
- Always check `prefers-reduced-motion` before animating
- Provide instant state changes for reduced motion users
- Ensure animations don't interfere with keyboard navigation
- Test with screen readers

**3. Code Organization**
- Keep animation logic in composables, not components
- Use TypeScript for type safety
- Document animation configs and options
- Create reusable animation presets

**4. CSS vs JS Animations**
- Use CSS for simple, one-time animations (hover, focus)
- Use JS (animejs) for complex, orchestrated animations
- Prefer CSS when possible (better performance)

## Integration Points
**How do pieces connect?**

**1. Composables Integration**
- Composables are auto-imported by Nuxt
- Use in components via `use[AnimationName]()`
- Composables can be composed together

**2. CSS Integration**
- Extend Tailwind config for custom animation utilities
- Add keyframes in `tailwind.css`
- Use utility classes alongside composables

**3. Component Integration**
- Enhance existing components without breaking APIs
- Add optional animation props where needed
- Maintain backward compatibility

**4. Performance Monitoring**
- Use `useAnimationPerformance` composable
- Monitor frame rate during development
- Log performance warnings in development mode

## Error Handling
**How do we handle failures?**

**1. Animation Library Failures**
```typescript
// Graceful fallback if animejs fails to load
try {
  const animation = anime({ /* config */ })
} catch (error) {
  console.warn('Animation failed, using CSS fallback')
  element.classList.add('animate-fade-in')
}
```

**2. Performance Degradation**
- Detect low frame rate (< 30fps)
- Automatically reduce animation intensity
- Provide option to disable animations

**3. Browser Compatibility**
- Check for animation support before using
- Provide CSS fallbacks for older browsers
- Test in target browsers

## Performance Considerations
**How do we keep it fast?**

**1. Bundle Size**
- Tree-shake unused animation code
- Lazy load heavy libraries (Three.js)
- Use CSS animations when possible

**2. Runtime Performance**
- Use GPU-accelerated properties (`transform`, `opacity`)
- Debounce scroll/resize events
- Clean up animations on component unmount
- Use `will-change` judiciously

**3. Animation Optimization**
- Limit concurrent animations
- Use `requestAnimationFrame` for smooth updates
- Avoid animating during scroll
- Optimize animation duration and easing

**4. Lazy Loading**
- Load animation libraries only when needed
- Lazy load visual effect components
- Defer non-critical animations

## Security Notes
**What security measures are in place?**

**1. Library Security**
- Keep animation libraries up-to-date
- Check for known vulnerabilities
- Use official, maintained libraries

**2. User Input**
- No user input in animation logic (UI-only)
- Sanitize any dynamic animation configs

**3. XSS Prevention**
- No dynamic HTML in animations
- Use Vue's safe rendering
