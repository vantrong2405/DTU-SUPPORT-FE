export const HOME_SECTIONS = {
  hero: 'hero',
  whatWeDo: 'what-we-do',
  about: 'about-us',
  testimonials: 'testimonials',
  faq: 'faq'
} as const

export const NAV_ITEMS = [
  { key: 'home', to: '/' },
  { key: 'whatWeDo', to: '#what-we-do', scroll: true },
  { key: 'about', to: '#about-us', scroll: true },
  { key: 'testimonials', to: '#testimonials', scroll: true },
  { key: 'faq', to: '#faq', scroll: true }
] as const
