import { ref, onMounted, onUnmounted } from 'vue'
import { animate } from 'animejs'
import type { AnimationConfig } from '~/types/animations'

export type SlideDirection = 'left' | 'right' | 'top' | 'bottom'

export interface SlideInOptions extends Partial<AnimationConfig> {
  direction?: SlideDirection
  distance?: number
}

export function useSlideIn(options?: SlideInOptions) {
  const elementRef = ref<HTMLElement>()
  const isVisible = ref(false)
  const isAnimating = ref(false)
  let currentAnimation: ReturnType<typeof animate> | null = null

  const getPrefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  const prefersReducedMotion = getPrefersReducedMotion()

  const getInitialPosition = (direction: SlideDirection = 'bottom', distance: number = 50) => {
    switch (direction) {
      case 'left':
        return { translateX: [-distance, 0], translateY: 0 }
      case 'right':
        return { translateX: [distance, 0], translateY: 0 }
      case 'top':
        return { translateX: 0, translateY: [-distance, 0] }
      case 'bottom':
      default:
        return { translateX: 0, translateY: [distance, 0] }
    }
  }

  const start = () => {
    if (prefersReducedMotion && options?.respectReducedMotion !== false) {
      isVisible.value = true
      return
    }

    if (!elementRef.value) return

    isAnimating.value = true
    const direction = options?.direction || 'bottom'
    const distance = options?.distance || 50
    const position = getInitialPosition(direction, distance)

    if (currentAnimation) {
      currentAnimation.revert()
    }

    currentAnimation = animate(elementRef.value, {
      opacity: [0, 1],
      ...position,
      duration: options?.duration || 800,
      easing: options?.easing || 'easeOutCubic',
      delay: options?.delay || 0,
      complete: () => {
        isAnimating.value = false
        isVisible.value = true
      },
    })
  }

  const stop = () => {
    if (currentAnimation) {
      currentAnimation.revert()
      currentAnimation = null
    }
    isAnimating.value = false
  }

  onMounted(() => {
    start()
  })

  onUnmounted(() => {
    stop()
  })

  return { elementRef, isVisible, isAnimating, start, stop }
}
