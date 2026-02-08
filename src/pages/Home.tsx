import { useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import {
    Car, Shield, DollarSign, Headphones, CheckCircle, Phone, Mail, MapPin,
    Ship, Package, FileCheck, Home as HomeIcon, Factory, ArrowLeft
} from 'lucide-react'
import { getPopularCars, formatPrice } from '../data/cars'
import { wilayas, budgetRanges, carBrands } from '../data/wilayas'
import { supabase, generateReferenceNumber } from '../lib/supabase'
import './Home.css'

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_d87hn7i'
const EMAILJS_TEMPLATE_ID = 'template_iftksee'
const EMAILJS_PUBLIC_KEY = 'v00jNbJkzIBI1HQyE'

export default function Home() {
    const popularCars = getPopularCars()
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        wilaya: '',
        carBrand: '',
        carModel: '',
        budget: '',
        notes: ''
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [referenceNumber, setReferenceNumber] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const refNumber = generateReferenceNumber()

            const { error } = await supabase.from('orders').insert({
                reference_number: refNumber,
                full_name: formData.fullName,
                phone: formData.phone,
                email: formData.email || null,
                wilaya: formData.wilaya,
                car_brand: formData.carBrand,
                car_model: formData.carModel,
                budget: formData.budget,
                notes: formData.notes || null,
                status: 'pending'
            })

            if (error) throw error

            // Send email notification
            try {
                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    {
                        reference: refNumber,
                        from_name: formData.fullName,
                        phone: formData.phone,
                        customer_email: formData.email || 'غير محدد',
                        wilaya: formData.wilaya,
                        car_brand: formData.carBrand,
                        car_model: formData.carModel,
                        budget: formData.budget,
                        notes: formData.notes || 'لا توجد ملاحظات'
                    },
                    EMAILJS_PUBLIC_KEY
                )
                console.log('Email sent successfully')
            } catch (emailError) {
                console.error('Email notification failed:', emailError)
                // Don't fail the order if email fails
            }

            setReferenceNumber(refNumber)
            setSubmitSuccess(true)
            setFormData({
                fullName: '', phone: '', email: '', wilaya: '',
                carBrand: '', carModel: '', budget: '', notes: ''
            })
        } catch (error) {
            console.error('Error submitting order:', error)
            alert('حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.')
        } finally {
            setIsSubmitting(false)
        }
    }

    const stats = [
        { number: '500+', label: 'سيارة تم استيرادها' },
        { number: '98%', label: 'رضا العملاء' },
        { number: '2', label: 'سنوات خبرة' }
    ]

    const benefits = [
        { icon: DollarSign, title: 'أفضل الأسعار', desc: 'وفر حتى 40% مقارنة بالوكلاء المحليين' },
        { icon: Shield, title: 'ضمان الجودة', desc: 'فحص شامل لكل سيارة قبل الشراء' },
        { icon: Headphones, title: 'دعم كامل', desc: 'نرافقك من الاختيار حتى التسليم' }
    ]

    const processSteps = [
        { step: 1, title: 'اختر السيارة', desc: 'تصفح مجموعتنا الواسعة من السيارات الكورية واختر ما يناسبك', icon: Car },
        { step: 2, title: 'تواصل معنا', desc: 'أرسل لنا تفاصيل السيارة المطلوبة وسنقدم لك عرض سعر', icon: Phone },
        { step: 3, title: 'نحن نهتم بكل شيء', desc: 'نتولى عملية الشراء، الشحن، الجمارك والتوصيل', icon: CheckCircle }
    ]

    const timelineSteps = [
        { icon: Factory, title: 'المصنع في كوريا', desc: 'اختيار وشراء السيارة من المصدر' },
        { icon: Ship, title: 'الشحن البحري', desc: 'نقل آمن عبر البحر (25-35 يوم)' },
        { icon: Package, title: 'الوصول للميناء', desc: 'وصول السيارة لميناء الجزائر' },
        { icon: FileCheck, title: 'الجمارك', desc: 'إجراءات التخليص الجمركي' },
        { icon: HomeIcon, title: 'التسليم للمنزل', desc: 'توصيل السيارة لباب منزلك' }
    ]

    const advantages = [
        { us: 'سعر المصنع + عمولة شفافة', them: 'هامش ربح كبير مخفي' },
        { us: 'تقرير فحص كامل للسيارة', them: 'لا ضمان على الحالة' },
        { us: 'تتبع الشحنة لحظة بلحظة', them: 'لا شفافية في العملية' },
        { us: 'خيارات واسعة من السيارات', them: 'مخزون محدود' },
        { us: 'دعم فني بعد الشراء', them: 'بيع فقط بدون دعم' }
    ]

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <div className="hero-overlay"></div>
                    <div className="hero-pattern"></div>
                </div>

                <div className="hero-content container">
                    <div className="hero-text">
                        <div className="hero-badge animate-fadeInDown">
                            <span>🚗 الوكيل الأول في الجزائر</span>
                        </div>

                        <h1 className="hero-title animate-fadeInUp">
                            استورد سيارتك الكورية المستعملة مباشرة من{' '}
                            <span className="text-gradient">كوريا</span>
                        </h1>

                        <p className="hero-subtitle animate-fadeInUp stagger-2">
                            خبرة واسعة في استيراد سيارات كيا، هيونداي ورينو بأفضل الأسعار
                            مع ضمان الجودة والدعم الكامل من الشراء حتى التسليم
                        </p>

                        <div className="hero-benefits animate-fadeInUp stagger-3">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="hero-benefit">
                                    <div className="benefit-icon">
                                        <benefit.icon size={24} />
                                    </div>
                                    <div>
                                        <h4>{benefit.title}</h4>
                                        <p>{benefit.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="hero-stats animate-fadeInUp stagger-4">
                            {stats.map((stat, index) => (
                                <div key={index} className="hero-stat">
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="hero-actions animate-fadeInUp stagger-5">
                            <a href="#order-form" className="btn btn-primary btn-lg">
                                ابدأ طلبك الآن
                                <ArrowLeft size={20} />
                            </a>
                            <Link to="/cars" className="btn btn-secondary btn-lg">
                                تصفح السيارات
                            </Link>
                        </div>
                    </div>

                    {/* Floating Badges */}
                    <div className="hero-floating">
                        <div className="floating-badge badge-1 animate-float">
                            <Shield size={24} />
                            <span>ضمان 100%</span>
                        </div>
                        <div className="floating-badge badge-2 animate-float" style={{ animationDelay: '0.5s' }}>
                            <DollarSign size={24} />
                            <span>وفر 40%</span>
                        </div>
                    </div>
                </div>

                {/* Decorative blobs */}
                <div className="blob blob-primary" style={{ top: '10%', right: '-10%', width: '400px', height: '400px' }}></div>
                <div className="blob blob-secondary" style={{ bottom: '10%', left: '-5%', width: '300px', height: '300px' }}></div>
            </section>

            {/* Order Process Section */}
            <section id="order-form" className="order-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">الخطوات</span>
                        <h2>كيف تطلب سيارتك؟</h2>
                        <p>عملية بسيطة وشفافة من البداية للنهاية</p>
                    </div>

                    <div className="process-steps">
                        {processSteps.map((step, index) => (
                            <div key={index} className="process-step animate-fadeInUp" style={{ animationDelay: `${index * 0.2}s` }}>
                                <div className="step-number">{step.step}</div>
                                <div className="step-icon">
                                    <step.icon size={32} />
                                </div>
                                <h3>{step.title}</h3>
                                <p>{step.desc}</p>
                                {index < processSteps.length - 1 && <div className="step-connector"></div>}
                            </div>
                        ))}
                    </div>

                    <div className="order-grid">
                        {/* Order Form */}
                        <div className="order-form-container">
                            <div className="form-card card">
                                <div className="form-header">
                                    <h3>أرسل طلبك الآن</h3>
                                    <p>املأ النموذج وسنتواصل معك خلال 24 ساعة</p>
                                </div>

                                {submitSuccess ? (
                                    <div className="form-success">
                                        <div className="success-icon">
                                            <CheckCircle size={48} />
                                        </div>
                                        <h4>تم استلام طلبك بنجاح!</h4>
                                        <p>رقم المرجع الخاص بك:</p>
                                        <div className="reference-number">{referenceNumber}</div>
                                        <p className="success-note">
                                            احتفظ بهذا الرقم لتتبع طلبك. سنتواصل معك قريباً.
                                        </p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => setSubmitSuccess(false)}
                                        >
                                            إرسال طلب جديد
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="order-form">
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">الاسم الكامل *</label>
                                                <input
                                                    type="text"
                                                    name="fullName"
                                                    value={formData.fullName}
                                                    onChange={handleInputChange}
                                                    className="form-input"
                                                    placeholder="أدخل اسمك الكامل"
                                                    required
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">رقم الهاتف *</label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="form-input"
                                                    placeholder="0555 XX XX XX"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">البريد الإلكتروني</label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="form-input"
                                                    placeholder="example@email.com"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">الولاية *</label>
                                                <select
                                                    name="wilaya"
                                                    value={formData.wilaya}
                                                    onChange={handleInputChange}
                                                    className="form-select"
                                                    required
                                                >
                                                    <option value="">اختر الولاية</option>
                                                    {wilayas.map(wilaya => (
                                                        <option key={wilaya.code} value={wilaya.name}>
                                                            {wilaya.code} - {wilaya.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>

                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">العلامة التجارية *</label>
                                                <select
                                                    name="carBrand"
                                                    value={formData.carBrand}
                                                    onChange={handleInputChange}
                                                    className="form-select"
                                                    required
                                                >
                                                    <option value="">اختر العلامة</option>
                                                    {carBrands.map(brand => (
                                                        <option key={brand.value} value={brand.label}>
                                                            {brand.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">الموديل *</label>
                                                <input
                                                    type="text"
                                                    name="carModel"
                                                    value={formData.carModel}
                                                    onChange={handleInputChange}
                                                    className="form-input"
                                                    placeholder="مثال: سبورتاج، النترا..."
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">الميزانية *</label>
                                            <select
                                                name="budget"
                                                value={formData.budget}
                                                onChange={handleInputChange}
                                                className="form-select"
                                                required
                                            >
                                                <option value="">اختر الميزانية</option>
                                                {budgetRanges.map(range => (
                                                    <option key={range.value} value={range.label}>
                                                        {range.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label className="form-label">ملاحظات إضافية</label>
                                            <textarea
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                className="form-textarea"
                                                placeholder="أي متطلبات أو ملاحظات خاصة..."
                                                rows={3}
                                            ></textarea>
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary btn-lg w-full"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner" style={{ width: '20px', height: '20px' }}></span>
                                                    جاري الإرسال...
                                                </>
                                            ) : (
                                                <>
                                                    إرسال الطلب
                                                    <ArrowLeft size={20} />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>

                        {/* Contact Info & Notes */}
                        <div className="order-info">
                            <div className="info-card card">
                                <h4>🔒 ضماناتنا</h4>
                                <ul className="guarantee-list">
                                    <li>
                                        <CheckCircle size={18} />
                                        <span>تقرير فحص كامل لكل سيارة</span>
                                    </li>
                                    <li>
                                        <CheckCircle size={18} />
                                        <span>أسعار شفافة بدون رسوم مخفية</span>
                                    </li>
                                    <li>
                                        <CheckCircle size={18} />
                                        <span>تتبع الشحنة لحظة بلحظة</span>
                                    </li>
                                    <li>
                                        <CheckCircle size={18} />
                                        <span>دعم فني بعد الشراء</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="contact-card card">
                                <h4>تواصل معنا مباشرة</h4>
                                <div className="contact-methods">
                                    <a href="tel:+213782769427" className="contact-method">
                                        <Phone size={20} />
                                        <div>
                                            <span>اتصل بنا</span>
                                            <strong>0782-76-94-27</strong>
                                        </div>
                                    </a>
                                    <a href="https://wa.me/821068737079" target="_blank" rel="noopener noreferrer" className="contact-method whatsapp-method">
                                        <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                        <div>
                                            <span>واتساب</span>
                                            <strong>راسلنا الآن</strong>
                                        </div>
                                    </a>
                                    <a href="mailto:info@oussamaauto.com" className="contact-method">
                                        <Mail size={20} />
                                        <div>
                                            <span>البريد الإلكتروني</span>
                                            <strong>info@oussamaauto.com</strong>
                                        </div>
                                    </a>
                                    <a href="https://maps.app.goo.gl/Te7cmtU5iBoiRxAv6" target="_blank" rel="noopener noreferrer" className="contact-method">
                                        <MapPin size={20} />
                                        <div>
                                            <span>الموقع</span>
                                            <strong>الميلية، جيجل، الجزائر</strong>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Cars Section */}
            <section className="cars-section section section-dark">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">السيارات</span>
                        <h2>السيارات الأكثر طلباً</h2>
                        <p>اكتشف تشكيلتنا من أفضل السيارات الكورية</p>
                    </div>

                    <div className="cars-grid">
                        {popularCars.map((car, index) => (
                            <div key={car.id} className="car-card animate-fadeInUp" style={{ animationDelay: `${index * 0.1}s` }}>
                                <div className="car-image">
                                    <img src={car.image} alt={`${car.brandAr} ${car.modelAr}`} />
                                    <div className="car-badge">{car.year}</div>
                                </div>
                                <div className="car-content">
                                    <div className="car-brand">{car.brandAr}</div>
                                    <h3 className="car-name">{car.modelAr}</h3>
                                    <p className="car-description">{car.description}</p>
                                    <div className="car-specs">
                                        <span>{car.engine}</span>
                                        <span>{car.transmission}</span>
                                        <span>{car.seats} مقاعد</span>
                                    </div>
                                    <div className="car-footer">
                                        <div className="car-price">
                                            <span>نطاق السعر</span>
                                            <strong>{formatPrice(car.priceMin)} - {formatPrice(car.priceMax)} دج</strong>
                                        </div>
                                        <Link to={`/cars/${car.id}`} className="btn btn-outline btn-sm">
                                            عرض التفاصيل
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="cars-cta">
                        <p>لم تجد السيارة التي تبحث عنها؟</p>
                        <div className="cta-buttons">
                            <Link to="/cars" className="btn btn-primary">
                                تصفح كل السيارات
                            </Link>
                            <a href="https://wa.me/821068737079" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                                تواصل معنا
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Korean Cars Section */}
            <section className="why-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">المميزات</span>
                        <h2>لماذا السيارات الكورية؟</h2>
                        <p>أسباب تجعل الاستيراد من كوريا الخيار الأفضل</p>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card card-glass">
                            <span className="stat-value">500+</span>
                            <span className="stat-title">سيارة متاحة</span>
                        </div>
                        <div className="stat-card card-glass">
                            <span className="stat-value">40%</span>
                            <span className="stat-title">متوسط التوفير</span>
                        </div>
                        <div className="stat-card card-glass">
                            <span className="stat-value">98%</span>
                            <span className="stat-title">رضا العملاء</span>
                        </div>
                        <div className="stat-card card-glass">
                            <span className="stat-value">2</span>
                            <span className="stat-title">سنوات خبرة</span>
                        </div>
                    </div>

                    <div className="comparison-section">
                        <h3>مقارنة: نحن vs الوكلاء التقليديين</h3>
                        <div className="comparison-table">
                            <div className="comparison-header">
                                <span>معنا</span>
                                <span>الوكلاء التقليديين</span>
                            </div>
                            {advantages.map((item, index) => (
                                <div key={index} className="comparison-row">
                                    <div className="comparison-us">
                                        <CheckCircle size={18} />
                                        <span>{item.us}</span>
                                    </div>
                                    <div className="comparison-them">
                                        <span>{item.them}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TikTok Integration */}
                    <div className="tiktok-section">
                        <h3>تابعنا على تيك توك</h3>
                        <p>شاهد آخر السيارات والعروض على حسابنا</p>
                        <a
                            href="https://www.tiktok.com/@oussama..auto"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                            </svg>
                            @oussama..auto
                        </a>
                    </div>
                </div>
            </section>

            {/* Shipping Timeline Section */}
            <section className="timeline-section section section-dark">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">الشحن</span>
                        <h2>رحلة سيارتك من كوريا إلى بيتك</h2>
                        <p>عملية شفافة وآمنة من البداية للنهاية</p>
                    </div>

                    <div className="timeline">
                        {timelineSteps.map((step, index) => (
                            <div key={index} className="timeline-step animate-fadeInUp" style={{ animationDelay: `${index * 0.15}s` }}>
                                <div className="timeline-icon">
                                    <step.icon size={28} />
                                </div>
                                <div className="timeline-content">
                                    <h4>{step.title}</h4>
                                    <p>{step.desc}</p>
                                </div>
                                {index < timelineSteps.length - 1 && <div className="timeline-connector"></div>}
                            </div>
                        ))}
                    </div>

                    <div className="timeline-cta">
                        <p>هل لديك طلب قيد الشحن؟</p>
                        <Link to="/tracking" className="btn btn-primary">
                            تتبع طلبك الآن
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
