import { CheckCircle, Users, Award, Target, Heart, Shield, Zap, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import './About.css'

export default function About() {
    const { t, isRTL } = useLanguage()

    const stats = [
        { number: '500+', labelKey: 'stats.cars' },
        { number: '1000+', labelKey: 'stats.clients' },
        { number: '2', labelKey: 'stats.years' },
        { number: '98%', labelKey: 'stats.satisfaction' }
    ]

    const values = [
        { icon: Shield, titleKey: 'about.value.transparency', descKey: 'about.value.transparency.desc' },
        { icon: Heart, titleKey: 'about.value.reliability', descKey: 'about.value.reliability.desc' },
        { icon: Zap, titleKey: 'about.value.efficiency', descKey: 'about.value.efficiency.desc' },
        { icon: Globe, titleKey: 'about.value.expertise', descKey: 'about.value.expertise.desc' }
    ]

    const reasonsAr = [
        'فريق متخصص في كوريا الجنوبية',
        'أسعار تنافسية مباشرة من المصدر',
        'فحص شامل لكل سيارة قبل الشراء',
        'تتبع الشحنة لحظة بلحظة',
        'دعم فني بعد الشراء',
        'خبرة واسعة في التخليص الجمركي',
        'ضمان الجودة على جميع السيارات',
        'خدمة عملاء متوفرة 24/7'
    ]

    const reasonsFr = [
        'Équipe spécialisée en Corée du Sud',
        'Prix compétitifs directement de la source',
        'Inspection complète de chaque voiture avant achat',
        'Suivi de l\'expédition en temps réel',
        'Support technique après achat',
        'Grande expérience en dédouanement',
        'Garantie de qualité sur toutes les voitures',
        'Service client disponible 24/7'
    ]

    const reasons = isRTL ? reasonsAr : reasonsFr

    return (
        <div className={`about-page ${!isRTL ? 'ltr' : ''}`}>
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-bg"></div>
                <div className="container">
                    <div className="about-hero-content">
                        <span className="section-tag">{t('about.hero.tag')}</span>
                        <h1>{t('about.hero.title')}</h1>
                        <p>{t('about.hero.subtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section section">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-content">
                            <h2>{t('about.story.title')}</h2>
                            <p>{t('about.story.p1')}</p>
                            <p>{t('about.story.p2')}</p>
                            <div className="story-stats">
                                {stats.map((stat, index) => (
                                    <div key={index} className="story-stat">
                                        <span className="stat-number">{stat.number}</span>
                                        <span className="stat-label">{t(stat.labelKey)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="story-image">
                            <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600" alt={isRTL ? 'فريقنا' : 'Notre équipe'} />
                            <div className="story-badge">
                                <span>2</span>
                                <span>{t('about.story.badge')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission-section section section-dark">
                <div className="container">
                    <div className="mission-grid">
                        <div className="mission-card">
                            <div className="mission-icon">
                                <Target size={40} />
                            </div>
                            <h3>{t('about.mission.title')}</h3>
                            <p>{t('about.mission.desc')}</p>
                        </div>
                        <div className="mission-card">
                            <div className="mission-icon">
                                <Award size={40} />
                            </div>
                            <h3>{t('about.vision.title')}</h3>
                            <p>{t('about.vision.desc')}</p>
                        </div>
                        <div className="mission-card">
                            <div className="mission-icon">
                                <Users size={40} />
                            </div>
                            <h3>{t('about.values.title')}</h3>
                            <p>{t('about.values.desc')}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">{t('about.values.section.tag')}</span>
                        <h2>{t('about.values.section.title')}</h2>
                        <p>{t('about.values.section.subtitle')}</p>
                    </div>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card card">
                                <div className="value-icon">
                                    <value.icon size={32} />
                                </div>
                                <h3>{t(value.titleKey)}</h3>
                                <p>{t(value.descKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-us-section section section-dark">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">{t('about.why.tag')}</span>
                        <h2>{t('about.why.title')}</h2>
                        <p>{t('about.why.subtitle')}</p>
                    </div>
                    <div className="reasons-grid">
                        {reasons.map((reason, index) => (
                            <div key={index} className="reason-item">
                                <CheckCircle size={24} />
                                <span>{reason}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="about-cta section">
                <div className="container">
                    <div className="cta-box">
                        <h2>{t('about.cta.title')}</h2>
                        <p>{t('about.cta.subtitle')}</p>
                        <div className="cta-buttons">
                            <a href="https://wa.me/821068737079" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                                {t('processPage.cta.whatsapp')}
                            </a>
                            <a href="tel:+213782769427" className="btn btn-outline btn-lg">
                                {t('common.call')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
