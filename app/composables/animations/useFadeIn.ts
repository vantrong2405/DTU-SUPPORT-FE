import { ref, onMounted, onUnmounted } from 'vue'
import { animate } from 'animejs'
import type { AnimationConfig } from '~/types/animations'

export function useFadeIn(options?: Partial<AnimationConfig>) {
  const elementRef = ref<HTMLElement>()
  const isVisible = ref(false)
  const isAnimating = ref(false)
  let currentAnimation: ReturnType<typeof animate> | null = null

  const getPrefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  const prefersReducedMotion = getPrefersReducedMotion()

  const start = () => {
    if (prefersReducedMotion && options?.respectReducedMotion !== false) {
      isVisible.value = true
      return
    }

    if (!elementRef.value) return

    isAnimating.value = true
    currentAnimation = animate(elementRef.value, {
      opacity: [0, 1],
      translateY: [20, 0],
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
