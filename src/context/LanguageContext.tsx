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
    const [language, setLanguageState] = useState<Language>('ar')

    const setLanguage = (lang: Language) => {
        setLanguageState(lang)
        // Update document direction and lang
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.lang = lang
        // Store preference
        localStorage.setItem('language', lang)
    }

    useEffect(() => {
        // Load saved preference
        const saved = localStorage.getItem('language') as Language
        if (saved && (saved === 'ar' || saved === 'fr')) {
            setLanguage(saved)
        }
    }, [])

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
