import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { animate } from 'animejs'
import { splitText } from 'animejs/text'
import type { AnimationConfig } from '~/types/animations'

export interface TextAnimationOptions extends Omit<Partial<AnimationConfig>, 'direction'> {
  splitBy?: 'words' | 'chars'
  stagger?: number
  direction?: 'up' | 'down' | 'left' | 'right'
}

export function useTextAnimation(options?: TextAnimationOptions) {
  const elementRef = ref<HTMLElement>()
  const isVisible = ref(false)
  const isAnimating = ref(false)
  let currentAnimation: ReturnType<typeof animate> | null = null
  let splitResult: ReturnType<typeof splitText> | null = null

  const getPrefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  const prefersReducedMotion = getPrefersReducedMotion()

  const start = async () => {
    if (prefersReducedMotion && options?.respectReducedMotion !== false) {
      isVisible.value = true
      return
    }

    if (!elementRef.value) return

    await nextTick()

    const splitBy = options?.splitBy || 'words'
    const direction = options?.direction || 'up'
    const staggerDelay = options?.stagger || 50

    try {
      splitResult = splitText(elementRef.value, {
        words: splitBy === 'words',
        chars: splitBy === 'chars',
      })

      const targets = splitBy === 'words' ? splitResult.words : splitResult.chars

      if (!targets || targets.length === 0) return

      isAnimating.value = true

      let animationProps: Record<string, any> = {
        opacity: [0, 1],
      }

      const distance = 30
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

      currentAnimation = animate(targets, {
        ...animationProps,
        duration: options?.duration || 1000,
        easing: options?.easing || 'easeOutExpo',
        delay: (el: any, i: number) => i * staggerDelay,
        loop: true,
        direction: 'alternate',
        complete: () => {
          isAnimating.value = false
          isVisible.value = true
        },
      })
    } catch (error) {
      console.warn('Text animation failed:', error)
      isVisible.value = true
    }
  }

  const stop = () => {
    if (currentAnimation) {
      currentAnimation.revert()
      currentAnimation = null
    }
    if (splitResult) {
      splitResult.revert()
      splitResult = null
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
