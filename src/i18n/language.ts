import { createContext, useContext } from 'react'
import type { Language, LocalizedText, TranslationDictionary } from './translations'

export const LANGUAGE_STORAGE_KEY = 'low-hours-language'

export interface LanguageContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: TranslationDictionary
  localize: (text: LocalizedText) => string
}

export const LanguageContext = createContext<LanguageContextValue | null>(null)

export function useLanguage() {
  const context = useContext(LanguageContext)

  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }

  return context
}
