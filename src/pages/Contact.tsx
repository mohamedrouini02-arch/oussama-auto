import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import { supabase } from '../lib/supabase'
import './Contact.css'

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_d87hn7i'
const EMAILJS_TEMPLATE_ID = 'template_535lqd7'
const EMAILJS_PUBLIC_KEY = 'v00jNbJkzIBI1HQyE'

export default function Contact() {
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
            alert('حدث خطأ. يرجى المحاولة مرة أخرى.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const contactInfo = [
        { icon: Phone, label: 'الهاتف', value: '(0782 76 94 27)', link: 'tel:+213782769427' },
        { icon: MessageCircle, label: 'واتساب', value: '(+82 10-6873-7079)', link: 'https://wa.me/821068737079' },
        { icon: Mail, label: 'البريد الإلكتروني', value: 'info@oussamaauto.com', link: 'mailto:info@oussamaauto.com' },
        { icon: MapPin, label: 'الموقع', value: 'الميلية، جيجل، الجزائر', link: 'https://maps.app.goo.gl/Te7cmtU5iBoiRxAv6' }
    ]

    return (
        <div className="contact-page">
            {/* Hero */}
            <section className="contact-hero">
                <div className="contact-hero-bg"></div>
                <div className="container">
                    <div className="contact-hero-content">
                        <span className="section-tag">تواصل معنا</span>
                        <h1>نحن هنا لمساعدتك</h1>
                        <p>تواصل معنا وسنرد عليك في أقرب وقت</p>
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
                                <h2>أرسل لنا رسالة</h2>

                                {success ? (
                                    <div className="success-message">
                                        <div className="success-icon">
                                            <Send size={32} />
                                        </div>
                                        <h3>تم إرسال رسالتك بنجاح!</h3>
                                        <p>شكراً لتواصلك معنا. سنرد عليك قريباً.</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setSuccess(false)}
                                        >
                                            إرسال رسالة أخرى
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">الاسم الكامل *</label>
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
                                                <label className="form-label">رقم الهاتف *</label>
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
                                            <label className="form-label">البريد الإلكتروني</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="form-input"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">الموضوع *</label>
                                            <select
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="form-select"
                                                required
                                            >
                                                <option value="">اختر الموضوع</option>
                                                <option value="inquiry">استفسار عام</option>
                                                <option value="quote">طلب عرض سعر</option>
                                                <option value="tracking">تتبع طلب</option>
                                                <option value="complaint">شكوى</option>
                                                <option value="other">أخرى</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">الرسالة *</label>
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
                                            {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
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
                                    ساعات العمل
                                </h3>
                                <ul>
                                    <li>
                                        <span>الأحد - الخميس</span>
                                        <strong>9:00 ص - 6:00 م</strong>
                                    </li>
                                    <li>
                                        <span>الجمعة</span>
                                        <strong>مغلق</strong>
                                    </li>
                                    <li>
                                        <span>السبت</span>
                                        <strong>10:00 ص - 4:00 م</strong>
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
                    title="موقعنا - الميلية، جيجل"
                ></iframe>
            </section>
        </div>
    )
}
