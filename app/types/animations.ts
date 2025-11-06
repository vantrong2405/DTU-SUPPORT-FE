export interface AnimationConfig {
  duration: number
  easing: string
  delay?: number
  direction?: 'normal' | 'reverse' | 'alternate'
  respectReducedMotion: boolean
}

export interface VisualEffectConfig {
  type: 'particles' | 'gradient' | '3d' | 'none'
  intensity: 'low' | 'medium' | 'high'
  performance: 'auto' | 'high' | 'low'
}
