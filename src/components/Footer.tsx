import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Send } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './Footer.css'

// Custom icons for Telegram and WhatsApp
const TelegramIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
)

const WhatsAppIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
)

export default function Footer() {
    const currentYear = new Date().getFullYear()
    const { language, isRTL } = useLanguage()

    const quickLinksAr = [
        { path: '/', label: 'الرئيسية' },
        { path: '/cars', label: 'السيارات المتاحة' },
        { path: '/about', label: 'من نحن' },
        { path: '/process', label: 'كيف نعمل' },
        { path: '/tracking', label: 'تتبع طلبك' },
        { path: '/contact', label: 'تواصل معنا' }
    ]

    const quickLinksFr = [
        { path: '/', label: 'Accueil' },
        { path: '/cars', label: 'Voitures disponibles' },
        { path: '/about', label: 'À propos' },
        { path: '/process', label: 'Comment ça marche' },
        { path: '/tracking', label: 'Suivi commande' },
        { path: '/contact', label: 'Contact' }
    ]

    const servicesAr = [
        'استيراد السيارات من كوريا',
        'استيراد السيارات من الصين',
        'التخليص الجمركي',
        'الشحن البحري',
        'التوصيل للمنزل',
        'ضمان الجودة'
    ]

    const servicesFr = [
        'Importation depuis la Corée',
        'Importation depuis la Chine',
        'Dédouanement',
        'Transport maritime',
        'Livraison à domicile',
        'Garantie qualité'
    ]

    const quickLinks = language === 'ar' ? quickLinksAr : quickLinksFr
    const services = language === 'ar' ? servicesAr : servicesFr

    const socialLinks = [
        {
            href: 'https://www.tiktok.com/@oussama..auto?_r=1&_t=ZS-93ioAdrkF1Q',
            label: 'TikTok',
            icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
            )
        },
        {
            href: 'https://www.facebook.com/share/1BoaSFbDBu/?mibextid=wwXIfr',
            label: 'Facebook',
            icon: (
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            )
        },
        {
            href: 'https://t.me/oussamaauto',
            label: 'Telegram',
            icon: <TelegramIcon />
        },
        {
            href: 'https://chat.whatsapp.com/HzmjstGZ89iKCsno9IW9Xk?mode=gi_t',
            label: 'WhatsApp Community',
            icon: <WhatsAppIcon />
        }
    ]

    return (
        <footer className={`footer ${!isRTL ? 'footer-ltr' : ''}`}>
            {/* Wave Decoration */}
            <div className="footer-wave">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z"
                        fill="currentColor"
                    />
                </svg>
            </div>

            <div className="footer-content">
                <div className="container">
                    <div className="footer-grid">
                        {/* Company Info */}
                        <div className="footer-section footer-about">
                            <img src="/logo.png" alt="Oussama Auto" className="footer-logo" />
                            <p className="footer-description">
                                {language === 'ar'
                                    ? 'أوسامة أوتو - شريكك الموثوق لاستيراد السيارات الكورية والصينية المستعملة إلى الجزائر. نقدم أفضل الأسعار مع ضمان الجودة والدعم الكامل.'
                                    : 'Oussama Auto - Votre partenaire de confiance pour l\'importation de voitures coréennes et chinoises d\'occasion en Algérie. Les meilleurs prix avec garantie qualité.'
                                }
                            </p>
                            <div className="footer-social">
                                {socialLinks.map((link, index) => (
                                    <a
                                        key={index}
                                        href={link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="social-link"
                                        aria-label={link.label}
                                        title={link.label}
                                    >
                                        {link.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className="footer-section">
                            <h4 className="footer-title">
                                {language === 'ar' ? 'روابط سريعة' : 'Liens rapides'}
                            </h4>
                            <ul className="footer-links">
                                {quickLinks.map(link => (
                                    <li key={link.path}>
                                        <Link to={link.path} className="footer-link">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="footer-section">
                            <h4 className="footer-title">
                                {language === 'ar' ? 'خدماتنا' : 'Nos services'}
                            </h4>
                            <ul className="footer-links">
                                {services.map((service, index) => (
                                    <li key={index}>
                                        <span className="footer-link">{service}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div className="footer-section">
                            <h4 className="footer-title">
                                {language === 'ar' ? 'تواصل معنا' : 'Contactez-nous'}
                            </h4>
                            <ul className="footer-contact">
                                <li>
                                    <Phone size={18} />
                                    <div>
                                        <span>{language === 'ar' ? 'اتصل بنا' : 'Appelez-nous'}</span>
                                        <a href="tel:+213782769427">0782 76 94 27</a>
                                    </div>
                                </li>
                                <li>
                                    <Mail size={18} />
                                    <div>
                                        <span>{language === 'ar' ? 'راسلنا' : 'Écrivez-nous'}</span>
                                        <a href="mailto:info@oussamaauto.com">info@oussamaauto.com</a>
                                    </div>
                                </li>
                                <li>
                                    <MapPin size={18} />
                                    <div>
                                        <span>{language === 'ar' ? 'الميلية، جيجل، الجزائر' : 'El Milia, Jijel, Algérie'}</span>
                                    </div>
                                </li>
                            </ul>

                            {/* Newsletter */}
                            <div className="footer-newsletter">
                                <h5>{language === 'ar' ? 'اشترك في النشرة البريدية' : 'Inscrivez-vous à notre newsletter'}</h5>
                                <form className="newsletter-form" onSubmit={e => e.preventDefault()}>
                                    <input
                                        type="email"
                                        placeholder={language === 'ar' ? 'بريدك الإلكتروني' : 'Votre email'}
                                        className="newsletter-input"
                                    />
                                    <button type="submit" className="newsletter-btn">
                                        <Send size={18} />
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <div className="container">
                    <div className="footer-bottom-content">
                        <p>
                            © {currentYear} {language === 'ar' ? 'أوسامة أوتو. جميع الحقوق محفوظة.' : 'Oussama Auto. Tous droits réservés.'}
                        </p>
                        <div className="footer-legal">
                            <Link to="/privacy">
                                {language === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}
                            </Link>
                            <Link to="/terms">
                                {language === 'ar' ? 'الشروط والأحكام' : 'Conditions générales'}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
