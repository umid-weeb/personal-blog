import { createContext, useContext, useState, type ReactNode } from 'react'

export type Language = 'en' | 'uz' | 'ru'

type LanguageCopy = {
  initializing: string
  ready: string
  steps: string[]
  enterWorld: string
  startDemo: string
  portfolio: string
  beta: string
  languageLabel: string
}

const copy: Record<Language, LanguageCopy> = {
  en: {
    initializing: 'INITIALIZING DIGITAL SPACE…',
    ready: 'SYSTEM READY',
    steps: ['ESTABLISHING UPLINK', 'BUILDING STATION GEOMETRY', 'CALIBRATING OPTICS', 'SYNCHRONISING EXHIBITS'],
    enterWorld: 'ENTER THE WORLD',
    startDemo: 'START THE DEMO',
    portfolio: '← PORTFOLIO',
    beta: 'BETA',
    languageLabel: 'LANGUAGE',
  },
  uz: {
    initializing: 'RAQAMLI MAKON YUKLANMOQDA…',
    ready: 'TIZIM TAYYOR',
    steps: ['ALOQA O‘RNATILMOQDA', 'STANSIYA TUZILMOQDA', 'OPTIKA SOZLANMOQDA', 'EKSPONATLAR SINXRONLANMOQDA'],
    enterWorld: 'DUNYOGA KIRISH',
    startDemo: 'DEMONI BOSHLASH',
    portfolio: '← PORTFOLIO',
    beta: 'BETA',
    languageLabel: 'TIL',
  },
  ru: {
    initializing: 'ЦИФРОВОЕ ПРОСТРАНСТВО ЗАПУСКАЕТСЯ…',
    ready: 'СИСТЕМА ГОТОВА',
    steps: ['СОЕДИНЕНИЕ УСТАНОВЛЕНО', 'СТАНЦИЯ СОЗДАЁТСЯ', 'ОПТИКА КАЛИБРУЕТСЯ', 'ЭКСПОНАТЫ СИНХРОНИЗИРУЮТСЯ'],
    enterWorld: 'ВОЙТИ В МИР',
    startDemo: 'НАЧАТЬ ДЕМО',
    portfolio: '← ПОРТФОЛИО',
    beta: 'БЕТА',
    languageLabel: 'ЯЗЫК',
  },
}

const LanguageContext = createContext<{
  language: Language
  setLanguage: (language: Language) => void
  copy: LanguageCopy
}>({
  language: 'en',
  setLanguage: () => undefined,
  copy: copy.en,
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  return <LanguageContext.Provider value={{ language, setLanguage, copy: copy[language] }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
