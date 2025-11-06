import { ref, onMounted, onUnmounted } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { animate } from 'animejs'
import type { AnimationConfig } from '~/types/animations'

export interface ScrollRevealOptions extends Partial<AnimationConfig> {
  threshold?: number
  rootMargin?: string
  animation?: 'fade' | 'slide' | 'scale'
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function useScrollReveal(options?: ScrollRevealOptions) {
  const target = ref<HTMLElement>()
  const isVisible = ref(false)
  const isAnimating = ref(false)

  const getPrefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  const prefersReducedMotion = getPrefersReducedMotion()

  const doAnimate = () => {
    if (!target.value) return

    if (prefersReducedMotion && options?.respectReducedMotion !== false) {
      isVisible.value = true
      return
    }

    isAnimating.value = true
    const animationType = options?.animation || 'fade'
    const direction = options?.direction || 'up'

    let animationProps: Record<string, any> = {
      opacity: [0, 1],
    }

    if (animationType === 'slide') {
      const distance = 50
      switch (direction) {
        case 'up':
          animationProps.translateY = [distance, 0]
          break
        case 'down':
          animationProps.translateY = [-distance, 0]
          break
        case 'left':
          animationProps.translateX = [distance, 0]
          break
        case 'right':
          animationProps.translateX = [-distance, 0]
          break
      }
    } else if (animationType === 'scale') {
      animationProps.scale = [0.8, 1]
    }

    animate(target.value, {
      ...animationProps,
      duration: options?.duration || 800,
      easing: options?.easing || 'easeOutCubic',
      delay: options?.delay || 0,
      complete: () => {
        isAnimating.value = false
        isVisible.value = true
      },
    })
  }

  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }]) => {
      if (isIntersecting && !isVisible.value) {
        doAnimate()
        stop()
      }
    },
    {
      threshold: options?.threshold ?? 0.1,
      rootMargin: options?.rootMargin ?? '0px',
    }
  )

  onUnmounted(() => {
    stop()
  })

  return { target, isVisible, isAnimating }
}
