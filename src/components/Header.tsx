import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './Header.css'

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()
    const { language, setLanguage, t, isRTL } = useLanguage()

    const navLinks = [
        { path: '/', labelKey: 'nav.home' },
        { path: '/cars', labelKey: 'nav.cars' },
        { path: '/about', labelKey: 'nav.about' },
        { path: '/process', labelKey: 'nav.process' },
        { path: '/tracking', labelKey: 'nav.tracking' },
        { path: '/contact', labelKey: 'nav.contact' }
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMenuOpen(false)
    }, [location])

    const handleLanguageSwitch = () => {
        setLanguage(language === 'ar' ? 'fr' : 'ar')
    }

    // Always show header background on non-home pages
    const isHomePage = location.pathname === '/'
    const showBackground = isScrolled || !isHomePage

    return (
        <header className={`header ${showBackground ? 'header-scrolled' : ''} ${!isRTL ? 'header-ltr' : ''}`}>
            <div className="header-container">
                {/* Logo */}
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="Oussama Auto" className="logo-image" />
                </Link>

                {/* Desktop Navigation */}
                <nav className="nav-desktop">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-link ${location.pathname === link.path ? 'nav-link-active' : ''}`}
                        >
                            {t(link.labelKey)}
                        </Link>
                    ))}
                </nav>

                {/* Right Side Actions */}
                <div className="header-actions">
                    {/* Language Switcher */}
                    <div className="language-switcher">
                        <button
                            className="language-btn"
                            onClick={handleLanguageSwitch}
                        >
                            {language === 'ar' ? 'FR' : 'عربي'}
                            <ChevronDown size={16} />
                        </button>
                    </div>

                    {/* CTA Button */}
                    <a href="tel:+213782769427" className="header-cta btn btn-primary">
                        <Phone size={18} />
                        <span>{language === 'ar' ? 'اتصل بنا' : 'Appelez-nous'}</span>
                    </a>

                    {/* Mobile Menu Button */}
                    <button
                        className="menu-toggle"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <div className={`nav-mobile ${isMenuOpen ? 'nav-mobile-open' : ''}`}>
                <nav className="nav-mobile-links">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`nav-mobile-link ${location.pathname === link.path ? 'nav-mobile-link-active' : ''}`}
                        >
                            {t(link.labelKey)}
                        </Link>
                    ))}
                </nav>
                <div className="nav-mobile-footer">
                    <a href="tel:+213782769427" className="btn btn-primary w-full">
                        <Phone size={18} />
                        {language === 'ar' ? 'اتصل بنا الآن' : 'Appelez maintenant'}
                    </a>
                </div>
            </div>
        </header>
    )
}
