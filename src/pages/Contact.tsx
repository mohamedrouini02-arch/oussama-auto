import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { supabase } from '../lib/supabase'
import { useLanguage } from '../context/LanguageContext'
import './Contact.css'

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_d87hn7i'
const EMAILJS_TEMPLATE_ID = 'template_535lqd7'
const EMAILJS_PUBLIC_KEY = 'v00jNbJkzIBI1HQyE'

export default function Contact() {
    const { t, isRTL } = useLanguage()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const { error } = await supabase.from('contacts').insert({
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                subject: formData.subject,
                message: formData.message
            })

            if (error) throw error

            // Send email notification
            try {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        from_name: formData.name,
                        from_email: formData.email || 'غير محدد',
                        phone: formData.phone,
                        subject: formData.subject,
                        message: formData.message
                    },
                    EMAILJS_PUBLIC_KEY
                )
                console.log('Contact email sent successfully')
            } catch (emailError) {
                console.error('Email notification failed:', emailError)
            }

            setSuccess(true)
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        } catch (error) {
            console.error('Error:', error)
            alert(isRTL ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'Une erreur est survenue. Veuillez réessayer.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfoAr = [
        { icon: Phone, label: 'الهاتف', value: '0782-76-94-27', link: 'tel:+213782769427' },
        { icon: MessageCircle, label: 'واتساب', value: '+8210-6873-7079', link: 'https://wa.me/821068737079' },
        { icon: Mail, label: 'البريد الإلكتروني', value: 'info@oussamaauto.com', link: 'mailto:info@oussamaauto.com' },
        { icon: MapPin, label: 'الموقع', value: 'الميلية، جيجل، الجزائر', link: 'https://maps.app.goo.gl/Te7cmtU5iBoiRxAv6' }
    ]

    const contactInfoFr = [
        { icon: Phone, label: 'Téléphone', value: '0782-76-94-27', link: 'tel:+213782769427' },
        { icon: MessageCircle, label: 'WhatsApp', value: '+8210-6873-7079', link: 'https://wa.me/821068737079' },
        { icon: Mail, label: 'Email', value: 'info@oussamaauto.com', link: 'mailto:info@oussamaauto.com' },
        { icon: MapPin, label: 'Adresse', value: 'El Milia, Jijel, Algérie', link: 'https://maps.app.goo.gl/Te7cmtU5iBoiRxAv6' }
    ]

    const contactInfo = isRTL ? contactInfoAr : contactInfoFr

    const subjectsAr = [
        { value: '', label: 'اختر الموضوع' },
        { value: 'inquiry', label: 'استفسار عام' },
        { value: 'quote', label: 'طلب عرض سعر' },
        { value: 'tracking', label: 'تتبع طلب' },
        { value: 'complaint', label: 'شكوى' },
        { value: 'other', label: 'أخرى' }
    ]

    const subjectsFr = [
        { value: '', label: 'Sélectionnez le sujet' },
        { value: 'inquiry', label: 'Demande générale' },
        { value: 'quote', label: 'Demande de devis' },
        { value: 'tracking', label: 'Suivi de commande' },
        { value: 'complaint', label: 'Réclamation' },
        { value: 'other', label: 'Autre' }
    ]

    const subjects = isRTL ? subjectsAr : subjectsFr

    return (
        <div className={`contact-page ${!isRTL ? 'ltr' : ''}`}>
            {/* Hero */}
            <section className="contact-hero">
                <div className="contact-hero-bg"></div>
                <div className="container">
                    <div className="contact-hero-content">
                        <span className="section-tag">{t('contact.title')}</span>
                        <h1>{t('contact.subtitle')}</h1>
                        <p>{isRTL ? 'تواصل معنا وسنرد عليك في أقرب وقت' : 'Contactez-nous et nous vous répondrons rapidement'}</p>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="contact-section section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <div className="contact-form-wrapper">
                            <div className="card contact-form-card">
                                <h2>{t('contact.form.title')}</h2>

                                {success ? (
                                    <div className="success-message">
                                        <div className="success-icon">
                                            <Send size={32} />
                                        </div>
                                        <h3>{t('contact.form.success')}</h3>
                                        <p>{isRTL ? 'شكراً لتواصلك معنا. سنرد عليك قريباً.' : 'Merci de nous avoir contactés. Nous vous répondrons bientôt.'}</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setSuccess(false)}
                                        >
                                            {isRTL ? 'إرسال رسالة أخرى' : 'Envoyer un autre message'}
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">{t('contact.form.name')} *</label>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="form-input"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">{t('contact.form.phone')} *</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="form-input"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">{t('contact.form.email')}</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">{t('contact.form.subject')} *</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="form-select"
                                                required
                                            >
                                                {subjects.map(subject => (
                                                    <option key={subject.value} value={subject.value}>
                                                        {subject.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">{t('contact.form.message')} *</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="form-textarea"
                                                rows={5}
                                                required
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg w-full"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div className="contact-info-wrapper">
                            <div className="contact-info-cards">
                                {contactInfo.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.link}
                                        target={item.link.startsWith('http') ? '_blank' : undefined}
                                        rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                        className="contact-info-card card"
                                    >
                                        <div className="info-icon">
                                            <item.icon size={24} />
                                        </div>
                                        <div className="info-content">
                                            <span className="info-label">{item.label}</span>
                                            <strong className="info-value">{item.value}</strong>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            <div className="business-hours card">
                                <h3>
                                    <Clock size={20} />
                                    {t('contact.hours.title')}
                                </h3>
                                <ul>
                                    <li>
                                        <span>{t('contact.hours.weekdays')}</span>
                                        <strong>{t('contact.hours.weekdaysTime')}</strong>
                                    </li>
                                    <li>
                                        <span>{t('contact.hours.friday')}</span>
                                        <strong>{t('contact.hours.fridayTime')}</strong>
                                    </li>
                                    <li>
                                        <span>{isRTL ? 'السبت' : 'Samedi'}</span>
                                        <strong>{isRTL ? '10:00 ص - 4:00 م' : '10h00 - 16h00'}</strong>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map */}
            <section className="map-section">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51389.94478695547!2d6.217!3d36.751!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12f2d8c67a44c9c3%3A0x4c8f7a9e0c8b5a0!2sEl%20Milia%2C%20Algeria!5e0!3m2!1sen!2sdz!4v1707400000000!5m2!1sen!2sdz"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={isRTL ? 'موقعنا - الميلية، جيجل' : 'Notre localisation - El Milia, Jijel'}
                ></iframe>
            </section>
        </div>
    )
}
