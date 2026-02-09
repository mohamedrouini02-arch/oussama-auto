import { Link } from 'react-router-dom'
import {
    Search, CreditCard, Ship, FileCheck, Truck, CheckCircle,
    HelpCircle, ChevronDown, Phone
} from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import './Process.css'

export default function Process() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)
    const { t, isRTL } = useLanguage()

    const steps = [
        {
            step: 1,
            icon: Search,
            titleKey: 'processPage.step1.title',
            descKey: 'processPage.step1.desc',
            durationKey: 'processPage.step1.duration',
            detailKeys: ['processPage.step1.detail1', 'processPage.step1.detail2', 'processPage.step1.detail3']
        },
        {
            step: 2,
            icon: CreditCard,
            titleKey: 'processPage.step2.title',
            descKey: 'processPage.step2.desc',
            durationKey: 'processPage.step2.duration',
            detailKeys: ['processPage.step2.detail1', 'processPage.step2.detail2', 'processPage.step2.detail3']
        },
        {
            step: 3,
            icon: Ship,
            titleKey: 'processPage.step3.title',
            descKey: 'processPage.step3.desc',
            durationKey: 'processPage.step3.duration',
            detailKeys: ['processPage.step3.detail1', 'processPage.step3.detail2', 'processPage.step3.detail3']
        },
        {
            step: 4,
            icon: FileCheck,
            titleKey: 'processPage.step4.title',
            descKey: 'processPage.step4.desc',
            durationKey: 'processPage.step4.duration',
            detailKeys: ['processPage.step4.detail1', 'processPage.step4.detail2', 'processPage.step4.detail3']
        },
        {
            step: 5,
            icon: Truck,
            titleKey: 'processPage.step5.title',
            descKey: 'processPage.step5.desc',
            durationKey: 'processPage.step5.duration',
            detailKeys: ['processPage.step5.detail1', 'processPage.step5.detail2', 'processPage.step5.detail3']
        }
    ]

    const paymentMethods = [
        { nameKey: 'processPage.payment.bank', descKey: 'processPage.payment.bank.desc' },
        { nameKey: 'processPage.payment.ccp', descKey: 'processPage.payment.ccp.desc' },
        { nameKey: 'processPage.payment.cash', descKey: 'processPage.payment.cash.desc' }
    ]

    const documents = [
        'processPage.docs.id',
        'processPage.docs.passport',
        'processPage.docs.residence',
        'processPage.docs.license',
        'processPage.docs.birth'
    ]

    const faqs = [
        { questionKey: 'processPage.faq.q1', answerKey: 'processPage.faq.a1' },
        { questionKey: 'processPage.faq.q2', answerKey: 'processPage.faq.a2' },
        { questionKey: 'processPage.faq.q3', answerKey: 'processPage.faq.a3' },
        { questionKey: 'processPage.faq.q4', answerKey: 'processPage.faq.a4' },
        { questionKey: 'processPage.faq.q5', answerKey: 'processPage.faq.a5' }
    ]

    return (
        <div className={`process-page ${!isRTL ? 'ltr' : ''}`}>
            {/* Hero */}
            <section className="process-hero">
                <div className="process-hero-bg"></div>
                <div className="container">
                    <div className="process-hero-content">
                        <span className="section-tag">{t('processPage.hero.tag')}</span>
                        <h1>{t('processPage.hero.title')}</h1>
                        <p>{t('processPage.hero.subtitle')}</p>
                    </div>
                </div>
            </section>

            {/* Steps */}
            <section className="steps-section section">
                <div className="container">
                    <div className="steps-timeline">
                        {steps.map((step, index) => (
                            <div key={index} className="step-item">
                                <div className="step-marker">
                                    <div className="step-number">{step.step}</div>
                                    <div className="step-icon-wrapper">
                                        <step.icon size={28} />
                                    </div>
                                    {index < steps.length - 1 && <div className="step-line"></div>}
                                </div>
                                <div className="step-content">
                                    <div className="step-header">
                                        <h3>{t(step.titleKey)}</h3>
                                        <span className="step-duration">{t(step.durationKey)}</span>
                                    </div>
                                    <p>{t(step.descKey)}</p>
                                    <ul className="step-details">
                                        {step.detailKeys.map((detailKey, i) => (
                                            <li key={i}>
                                                <CheckCircle size={16} />
                                                {t(detailKey)}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Payment Methods */}
            <section className="payment-section section section-dark">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">{t('processPage.payment.tag')}</span>
                        <h2>{t('processPage.payment.title')}</h2>
                    </div>
                    <div className="payment-grid">
                        {paymentMethods.map((method, index) => (
                            <div key={index} className="payment-card">
                                <CreditCard size={32} />
                                <h4>{t(method.nameKey)}</h4>
                                <p>{t(method.descKey)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents */}
            <section className="documents-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">{t('processPage.docs.tag')}</span>
                        <h2>{t('processPage.docs.title')}</h2>
                        <p>{t('processPage.docs.subtitle')}</p>
                    </div>
                    <div className="documents-list">
                        {documents.map((docKey, index) => (
                            <div key={index} className="document-item card">
                                <FileCheck size={24} />
                                <span>{t(docKey)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="documents-cta">
                        <Link to="/documents" className="btn btn-primary">
                            {t('processPage.docs.upload')}
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="faq-section section section-dark">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">{t('processPage.faq.tag')}</span>
                        <h2>{t('processPage.faq.title')}</h2>
                    </div>
                    <div className="faq-list">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className={`faq-item ${openFaq === index ? 'faq-open' : ''}`}
                            >
                                <button
                                    className="faq-question"
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                >
                                    <HelpCircle size={20} />
                                    <span>{t(faq.questionKey)}</span>
                                    <ChevronDown size={20} className="faq-arrow" />
                                </button>
                                <div className="faq-answer">
                                    <p>{t(faq.answerKey)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="process-cta section">
                <div className="container">
                    <div className="cta-box">
                        <h2>{t('processPage.cta.title')}</h2>
                        <p>{t('processPage.cta.subtitle')}</p>
                        <div className="cta-buttons">
                            <a href="https://wa.me/821068737079" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                                {t('processPage.cta.whatsapp')}
                            </a>
                            <a href="tel:+213782769427" className="btn btn-outline btn-lg">
                                <Phone size={20} />
                                {t('processPage.cta.call')}
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
