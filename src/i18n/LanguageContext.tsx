import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { LANGUAGE_STORAGE_KEY, LanguageContext, type LanguageContextValue } from './language'
import { translations, type Language, type LocalizedText } from './translations'

function getInitialLanguage(): Language {
  const savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  return savedLanguage === 'es' || savedLanguage === 'en' ? savedLanguage : 'en'
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useLayoutEffect(() => {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const localize = useCallback((text: LocalizedText) => text[language], [language])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: translations[language],
      localize,
    }),
    [language, localize],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
