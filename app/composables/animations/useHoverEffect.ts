import { ref, onMounted, onUnmounted } from 'vue'
import { animate } from 'animejs'
import type { AnimationConfig } from '~/types/animations'

export interface HoverEffectOptions extends Partial<AnimationConfig> {
  scale?: number
  translateY?: number
  translateX?: number
  rotate?: number
}

export function useHoverEffect(options?: HoverEffectOptions) {
  const elementRef = ref<HTMLElement>()
  const isHovered = ref(false)
  const isAnimating = ref(false)
  let currentAnimation: ReturnType<typeof animate> | null = null

  const getPrefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  const prefersReducedMotion = getPrefersReducedMotion()

  const handleMouseEnter = () => {
    if (prefersReducedMotion && options?.respectReducedMotion !== false) {
      isHovered.value = true
      return
    }

    if (!elementRef.value) return

    isAnimating.value = true
    isHovered.value = true

    const scale = options?.scale ?? 1.05
    const translateY = options?.translateY ?? -5
    const translateX = options?.translateX ?? 0
    const rotate = options?.rotate ?? 0

    if (currentAnimation) {
      currentAnimation.revert()
    }

    currentAnimation = animate(elementRef.value, {
      scale,
      translateY,
      translateX,
      rotate,
      duration: options?.duration || 300,
      easing: options?.easing || 'easeOutCubic',
      complete: () => {
        isAnimating.value = false
      },
    })
  }

  const handleMouseLeave = () => {
    if (prefersReducedMotion && options?.respectReducedMotion !== false) {
      isHovered.value = false
      return
    }

    if (!elementRef.value) return

    isAnimating.value = true
    isHovered.value = false

    if (currentAnimation) {
      currentAnimation.revert()
    }

    currentAnimation = animate(elementRef.value, {
      scale: 1,
      translateY: 0,
      translateX: 0,
      rotate: 0,
      duration: options?.duration || 300,
      easing: options?.easing || 'easeOutCubic',
      complete: () => {
        isAnimating.value = false
      },
    })
  }

  onMounted(() => {
    if (elementRef.value) {
      elementRef.value.addEventListener('mouseenter', handleMouseEnter)
      elementRef.value.addEventListener('mouseleave', handleMouseLeave)
    }
  })

  onUnmounted(() => {
    if (elementRef.value) {
      elementRef.value.removeEventListener('mouseenter', handleMouseEnter)
      elementRef.value.removeEventListener('mouseleave', handleMouseLeave)
      if (currentAnimation) {
        currentAnimation.revert()
        currentAnimation = null
      }
    }
  })

  return { elementRef, isHovered, isAnimating }
}
