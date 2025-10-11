export type ThemeValue =
  | 'red-light'
  | 'blue-light'
  | 'green-light'
  | 'purple-light'
  | 'orange-light'
  | 'pink-light'
  | 'red-dark'
  | 'blue-dark'
  | 'green-dark'
  | 'purple-dark'
  | 'orange-dark'
  | 'pink-dark'

export type LocaleCode = 'vi' | 'en' | 'ja'

export interface Theme {
  value: ThemeValue
  color: string
}

export interface Locale {
  code: LocaleCode
  name: string
  englishName: string
}
