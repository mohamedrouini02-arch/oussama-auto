import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Language = 'ar' | 'fr'

interface LanguageContextType {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
    isRTL: boolean
}

const translations: Record<Language, Record<string, string>> = {
    ar: {
        // Navigation
        'nav.home': 'الرئيسية',
        'nav.about': 'من نحن',
        'nav.cars': 'السيارات',
        'nav.process': 'عملية الشراء',
        'nav.tracking': 'تتبع الطلب',
        'nav.contact': 'تواصل معنا',
        'nav.order': 'اطلب الآن',

        // Hero
        'hero.title': 'استورد سيارتك من كوريا بسهولة',
        'hero.subtitle': 'نوفر لك أفضل السيارات الكورية المستعملة بأسعار منافسة مع ضمان الجودة والتوصيل إلى باب منزلك',
        'hero.cta': 'ابدأ الآن',
        'hero.why': 'لماذا نحن؟',

        // Stats
        'stats.cars': 'سيارة تم استيرادها',
        'stats.clients': 'عميل سعيد',
        'stats.years': 'سنوات خبرة',
        'stats.satisfaction': 'نسبة الرضا',

        // Process
        'process.title': 'كيف نعمل؟',
        'process.subtitle': 'خطوات بسيطة للحصول على سيارة أحلامك',
        'process.step1': 'اختر سيارتك',
        'process.step1.desc': 'تصفح مجموعتنا أو أخبرنا بما تبحث عنه',
        'process.step2': 'أكمل الدفع',
        'process.step2.desc': 'ادفع عربون وأكد طلبك',
        'process.step3': 'استلم سيارتك',
        'process.step3.desc': 'نوصلها إلى باب منزلك',

        // Form
        'form.title': 'اطلب سيارتك الآن',
        'form.name': 'الاسم الكامل',
        'form.phone': 'رقم الهاتف',
        'form.email': 'البريد الإلكتروني',
        'form.wilaya': 'الولاية',
        'form.brand': 'العلامة التجارية',
        'form.model': 'الموديل',
        'form.budget': 'الميزانية',
        'form.notes': 'ملاحظات إضافية',
        'form.submit': 'إرسال الطلب',
        'form.submitting': 'جاري الإرسال...',

        // Cars
        'cars.title': 'السيارات الأكثر طلباً',
        'cars.subtitle': 'اكتشف تشكيلتنا من أفضل السيارات الكورية',
        'cars.viewAll': 'عرض جميع السيارات',
        'cars.viewDetails': 'عرض التفاصيل',
        'cars.startingFrom': 'ابتداءً من',
        'cars.priceRange': 'نطاق السعر',

        // Footer
        'footer.about': 'شريكك الموثوق في استيراد السيارات الكورية المستعملة بجودة عالية وأسعار منافسة.',
        'footer.quickLinks': 'روابط سريعة',
        'footer.services': 'خدماتنا',
        'footer.contact': 'تواصل معنا',
        'footer.newsletter': 'النشرة الإخبارية',
        'footer.newsletterDesc': 'اشترك للحصول على آخر العروض',
        'footer.subscribe': 'اشتراك',
        'footer.rights': 'جميع الحقوق محفوظة',

        // Common
        'common.learnMore': 'اعرف المزيد',
        'common.contactUs': 'تواصل معنا',
        'common.whatsapp': 'واتساب',
        'common.call': 'اتصل بنا',

        // About
        'about.title': 'من نحن',
        'about.subtitle': 'قصتنا ورؤيتنا',

        // Tracking
        'tracking.title': 'تتبع طلبك',
        'tracking.subtitle': 'أدخل رقم المرجع للاطلاع على حالة طلبك',
        'tracking.search': 'بحث',
        'tracking.searching': 'جاري البحث...',
    },
    fr: {
        // Navigation
        'nav.home': 'Accueil',
        'nav.about': 'À propos',
        'nav.cars': 'Voitures',
        'nav.process': 'Processus',
        'nav.tracking': 'Suivi',
        'nav.contact': 'Contact',
        'nav.order': 'Commander',

        // Hero
        'hero.title': 'Importez votre voiture de Corée facilement',
        'hero.subtitle': 'Nous vous offrons les meilleures voitures coréennes d\'occasion à des prix compétitifs avec garantie de qualité et livraison à domicile',
        'hero.cta': 'Commencer',
        'hero.why': 'Pourquoi nous?',

        // Stats
        'stats.cars': 'voitures importées',
        'stats.clients': 'clients satisfaits',
        'stats.years': 'ans d\'expérience',
        'stats.satisfaction': 'taux de satisfaction',

        // Process
        'process.title': 'Comment ça marche?',
        'process.subtitle': 'Des étapes simples pour obtenir la voiture de vos rêves',
        'process.step1': 'Choisissez',
        'process.step1.desc': 'Parcourez notre collection ou dites-nous ce que vous cherchez',
        'process.step2': 'Payez',
        'process.step2.desc': 'Payez un acompte et confirmez',
        'process.step3': 'Recevez',
        'process.step3.desc': 'Livraison à domicile',

        // Form
        'form.title': 'Commandez votre voiture',
        'form.name': 'Nom complet',
        'form.phone': 'Téléphone',
        'form.email': 'Email',
        'form.wilaya': 'Wilaya',
        'form.brand': 'Marque',
        'form.model': 'Modèle',
        'form.budget': 'Budget',
        'form.notes': 'Notes supplémentaires',
        'form.submit': 'Envoyer',
        'form.submitting': 'Envoi en cours...',

        // Cars
        'cars.title': 'Voitures les plus demandées',
        'cars.subtitle': 'Découvrez notre sélection des meilleures voitures coréennes',
        'cars.viewAll': 'Voir toutes les voitures',
        'cars.viewDetails': 'Voir détails',
        'cars.startingFrom': 'À partir de',
        'cars.priceRange': 'Fourchette de prix',

        // Footer
        'footer.about': 'Votre partenaire de confiance pour l\'importation de voitures coréennes d\'occasion de haute qualité.',
        'footer.quickLinks': 'Liens rapides',
        'footer.services': 'Nos services',
        'footer.contact': 'Contactez-nous',
        'footer.newsletter': 'Newsletter',
        'footer.newsletterDesc': 'Inscrivez-vous pour les dernières offres',
        'footer.subscribe': 'S\'inscrire',
        'footer.rights': 'Tous droits réservés',

        // Common
        'common.learnMore': 'En savoir plus',
        'common.contactUs': 'Contactez-nous',
        'common.whatsapp': 'WhatsApp',
        'common.call': 'Appelez-nous',

        // About
        'about.title': 'À propos',
        'about.subtitle': 'Notre histoire et notre vision',

        // Tracking
        'tracking.title': 'Suivez votre commande',
        'tracking.subtitle': 'Entrez votre numéro de référence',
        'tracking.search': 'Rechercher',
        'tracking.searching': 'Recherche...',
    }
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
