import { ref, onMounted, onUnmounted } from 'vue'
import { useWindowScroll } from '@vueuse/core'

export interface ParallaxOptions {
  speed?: number
  direction?: 'vertical' | 'horizontal'
  respectReducedMotion?: boolean
}

export function useParallax(options?: ParallaxOptions) {
  const offset = ref(0)
  const { y, x } = useWindowScroll()
  const speed = options?.speed ?? 0.5
  const direction = options?.direction ?? 'vertical'

  const getPrefersReducedMotion = (): boolean => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  const prefersReducedMotion = getPrefersReducedMotion()

  const update = () => {
    if (prefersReducedMotion && options?.respectReducedMotion !== false) {
      offset.value = 0
      return
    }

    if (direction === 'horizontal') {
      offset.value = x.value * speed
    } else {
      offset.value = y.value * speed
    }
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
