import { Link } from 'react-router-dom'
import {
    Search, CreditCard, Ship, FileCheck, Truck, CheckCircle,
    HelpCircle, ChevronDown, Phone
} from 'lucide-react'
import { useState } from 'react'
import './Process.css'

export default function Process() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const steps = [
        {
            step: 1,
            icon: Search,
            title: 'اختيار السيارة',
            description: 'تصفح مجموعتنا الواسعة من السيارات الكورية واختر ما يناسبك. يمكنك أيضاً إخبارنا بمواصفات السيارة التي تبحث عنها وسنجدها لك.',
            duration: '1-3 أيام',
            details: ['تصفح قاعدة بياناتنا', 'أو أخبرنا بمتطلباتك', 'استلم تقرير فحص السيارة']
        },
        {
            step: 2,
            icon: CreditCard,
            title: 'الدفع والتأكيد',
            description: 'بعد اختيار السيارة، ستتلقى عرض سعر شامل. عند الموافقة، يتم دفع عربون وبدء إجراءات الشراء.',
            duration: '1-2 يوم',
            details: ['استلام عرض السعر الشامل', 'دفع العربون (30%)', 'توقيع عقد الشراء']
        },
        {
            step: 3,
            icon: Ship,
            title: 'الشحن البحري',
            description: 'يتم شحن السيارة عبر البحر من كوريا إلى ميناء الجزائر. ستتمكن من تتبع شحنتك في كل مرحلة.',
            duration: '25-35 يوم',
            details: ['تحميل السيارة في الميناء الكوري', 'الشحن البحري الآمن', 'تتبع الشحنة لحظة بلحظة']
        },
        {
            step: 4,
            icon: FileCheck,
            title: 'التخليص الجمركي',
            description: 'نتولى جميع إجراءات التخليص الجمركي نيابة عنك. كل ما عليك هو تزويدنا بالوثائق المطلوبة.',
            duration: '5-10 أيام',
            details: ['تحضير الوثائق', 'دفع الرسوم الجمركية', 'استخراج البطاقة الرمادية']
        },
        {
            step: 5,
            icon: Truck,
            title: 'التوصيل',
            description: 'بعد إتمام التخليص، يتم توصيل السيارة إلى باب منزلك في أي ولاية بالجزائر.',
            duration: '1-3 أيام',
            details: ['نقل آمن', 'تسليم مع الفحص', 'استلام الوثائق النهائية']
        }
    ]

    const paymentMethods = [
        { name: 'التحويل البنكي', description: 'تحويل مباشر إلى حسابنا البنكي' },
        { name: 'CCP', description: 'الدفع عبر الحساب البريدي الجاري' },
        { name: 'الدفع النقدي', description: 'عند الاستلام أو في مكتبنا' }
    ]

    const documents = [
        'بطاقة التعريف الوطنية',
        'جواز السفر',
        'شهادة الإقامة',
        'رخصة السياقة',
        'شهادة الميلاد'
    ]

    const faqs = [
        {
            question: 'كم تستغرق عملية الاستيراد الكاملة؟',
            answer: 'تستغرق العملية الكاملة من اختيار السيارة حتى التسليم بين 35 إلى 50 يوماً، حسب توفر السيارة وإجراءات الشحن والجمارك.'
        },
        {
            question: 'ما هي تكلفة الشحن والجمارك؟',
            answer: 'تختلف التكاليف حسب نوع السيارة وحجمها. سنقدم لك عرض سعر شامل يتضمن جميع التكاليف قبل البدء.'
        },
        {
            question: 'هل يمكنني فحص السيارة قبل الشراء؟',
            answer: 'نعم، نقدم تقرير فحص مفصل لكل سيارة يتضمن صور وفيديوهات. كما يمكن ترتيب فحص إضافي عبر جهة مستقلة.'
        },
        {
            question: 'ماذا لو كانت السيارة معيبة عند الاستلام؟',
            answer: 'نضمن جودة جميع سياراتنا. في حالة وجود أي عيب لم يُذكر في تقرير الفحص، نتحمل تكاليف الإصلاح أو الاستبدال.'
        },
        {
            question: 'هل يمكنني طلب سيارة غير موجودة في القائمة؟',
            answer: 'بالتأكيد! أخبرنا بمواصفات السيارة التي تريدها وسنبحث عنها في مزادات كوريا ونوفرها لك.'
        }
    ]

    return (
        <div className="process-page">
            {/* Hero */}
            <section className="process-hero">
                <div className="process-hero-bg"></div>
                <div className="container">
                    <div className="process-hero-content">
                        <span className="section-tag">عملية الشراء</span>
                        <h1>كيف تستورد سيارتك من كوريا؟</h1>
                        <p>دليلك الشامل خطوة بخطوة</p>
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
                                        <h3>{step.title}</h3>
                                        <span className="step-duration">{step.duration}</span>
                                    </div>
                                    <p>{step.description}</p>
                                    <ul className="step-details">
                                        {step.details.map((detail, i) => (
                                            <li key={i}>
                                                <CheckCircle size={16} />
                                                {detail}
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
                        <span className="section-tag">الدفع</span>
                        <h2>طرق الدفع المتاحة</h2>
                    </div>
                    <div className="payment-grid">
                        {paymentMethods.map((method, index) => (
                            <div key={index} className="payment-card">
                                <CreditCard size={32} />
                                <h4>{method.name}</h4>
                                <p>{method.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Documents */}
            <section className="documents-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">الوثائق</span>
                        <h2>الوثائق المطلوبة</h2>
                        <p>الأوراق اللازمة لإتمام عملية الاستيراد</p>
                    </div>
                    <div className="documents-list">
                        {documents.map((doc, index) => (
                            <div key={index} className="document-item card">
                                <FileCheck size={24} />
                                <span>{doc}</span>
                            </div>
                        ))}
                    </div>
                    <div className="documents-cta">
                        <Link to="/documents" className="btn btn-primary">
                            رفع الوثائق الآن
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="faq-section section section-dark">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">أسئلة شائعة</span>
                        <h2>الأسئلة المتكررة</h2>
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
                                    <span>{faq.question}</span>
                                    <ChevronDown size={20} className="faq-arrow" />
                                </button>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
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
                        <h2>مستعد للبدء؟</h2>
                        <p>تواصل معنا الآن وابدأ رحلة استيراد سيارتك</p>
                        <div className="cta-buttons">
                            <a href="https://wa.me/821068737079" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                                تواصل عبر واتساب
                            </a>
                            <a href="tel:+213782769427" className="btn btn-outline btn-lg">
                                <Phone size={20} />
                                اتصل بنا
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
