import { createContext, useContext, useState, ReactNode, useEffect } from 'react'
import { translations, Language } from '../i18n'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
    isRTL: boolean
}


const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        // Get initial language from localStorage or default to 'ar'
        const saved = localStorage.getItem('language') as Language
        return (saved === 'ar' || saved === 'fr') ? saved : 'ar'
    })

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        // Update document direction and lang
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.lang = lang
        // Also set on body for better CSS targeting
        document.body.dir = lang === 'ar' ? 'rtl' : 'ltr'
        document.body.setAttribute('data-lang', lang)
        // Store preference
        localStorage.setItem('language', lang)
    }

    useEffect(() => {
        // Apply direction on initial load
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.lang = language
        document.body.dir = language === 'ar' ? 'rtl' : 'ltr'
        document.body.setAttribute('data-lang', language)
    }, [language])

    const t = (key: string): string => {
        return translations[language][key] || key
    }

    const isRTL = language === 'ar'

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}
