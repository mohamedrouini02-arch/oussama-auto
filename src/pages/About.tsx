import { CheckCircle, Users, Award, Target, Heart, Shield, Zap, Globe } from 'lucide-react'
import './About.css'

export default function About() {
    const stats = [
        { number: '500+', label: 'سيارة تم استيرادها' },
        { number: '1000+', label: 'عميل سعيد' },
        { number: '2', label: 'سنوات خبرة' },
        { number: '98%', label: 'نسبة الرضا' }
    ]

    const values = [
        { icon: Shield, title: 'الشفافية', desc: 'نؤمن بالصدق والوضوح في كل تعاملاتنا' },
        { icon: Heart, title: 'الموثوقية', desc: 'نلتزم بوعودنا ونتجاوز توقعات عملائنا' },
        { icon: Zap, title: 'الكفاءة', desc: 'نوفر لك الوقت والجهد في رحلة الاستيراد' },
        { icon: Globe, title: 'الخبرة', desc: 'نمتلك معرفة عميقة بالسوق الكوري' }
    ]

    const reasons = [
        'فريق متخصص في كوريا الجنوبية',
        'أسعار تنافسية مباشرة من المصدر',
        'فحص شامل لكل سيارة قبل الشراء',
        'تتبع الشحنة لحظة بلحظة',
        'دعم فني بعد الشراء',
        'خبرة واسعة في التخليص الجمركي',
        'ضمان الجودة على جميع السيارات',
        'خدمة عملاء متوفرة 24/7'
    ]

    return (
        <div className="about-page">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-hero-bg"></div>
                <div className="container">
                    <div className="about-hero-content">
                        <span className="section-tag">من نحن</span>
                        <h1>قصتنا ورؤيتنا</h1>
                        <p>نحن شريكك الموثوق في رحلة استيراد سيارتك الكورية</p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story-section section">
                <div className="container">
                    <div className="story-grid">
                        <div className="story-content">
                            <h2>رحلتنا في عالم السيارات</h2>
                            <p>
                                بدأت أوسامة أوتو كحلم لتسهيل عملية استيراد السيارات الكورية المستعملة للمواطن الجزائري.
                                على مر السنين، نمت خبرتنا وتوسعت شبكة علاقاتنا في كوريا الجنوبية لتشمل أفضل الموردين والمزادات.
                            </p>
                            <p>
                                اليوم، نفتخر بأننا ساعدنا مئات العائلات الجزائرية في الحصول على سيارات أحلامهم
                                بأسعار منافسة وجودة مضمونة. نحن لا نبيع سيارات فقط، بل نبني علاقات ثقة مع عملائنا.
                            </p>
                            <div className="story-stats">
                                {stats.map((stat, index) => (
                                    <div key={index} className="story-stat">
                                        <span className="stat-number">{stat.number}</span>
                                        <span className="stat-label">{stat.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="story-image">
                            <img src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=600" alt="فريقنا" />
                            <div className="story-badge">
                                <span>2</span>
                                <span>سنوات من التميز</span>
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
                            <h3>رسالتنا</h3>
                            <p>
                                تقديم تجربة استيراد سيارات سلسة وشفافة وموثوقة،
                                مع توفير أفضل الأسعار والجودة لعملائنا في الجزائر.
                            </p>
                        </div>
                        <div className="mission-card">
                            <div className="mission-icon">
                                <Award size={40} />
                            </div>
                            <h3>رؤيتنا</h3>
                            <p>
                                أن نكون الخيار الأول والأكثر ثقة لاستيراد السيارات الكورية
                                في الجزائر، مع التوسع لنشمل أسواقاً جديدة.
                            </p>
                        </div>
                        <div className="mission-card">
                            <div className="mission-icon">
                                <Users size={40} />
                            </div>
                            <h3>قيمنا</h3>
                            <p>
                                الصدق، الجودة، والخدمة المتميزة هي أساس كل ما نقوم به.
                                نضع عملاءنا في قلب اهتماماتنا دائماً.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values-section section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">قيمنا</span>
                        <h2>ما يميزنا</h2>
                        <p>المبادئ التي توجه عملنا يومياً</p>
                    </div>
                    <div className="values-grid">
                        {values.map((value, index) => (
                            <div key={index} className="value-card card">
                                <div className="value-icon">
                                    <value.icon size={32} />
                                </div>
                                <h3>{value.title}</h3>
                                <p>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="why-us-section section section-dark">
                <div className="container">
                    <div className="section-header">
                        <span className="section-tag">لماذا نحن</span>
                        <h2>لماذا تختار أوسامة أوتو؟</h2>
                        <p>أسباب تجعلنا الخيار الأمثل لك</p>
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
                        <h2>مستعد لبدء رحلتك معنا؟</h2>
                        <p>تواصل معنا الآن واحصل على استشارة مجانية</p>
                        <div className="cta-buttons">
                            <a href="https://wa.me/821068737079" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg">
                                تواصل عبر واتساب
                            </a>
                            <a href="tel:+821068737079" className="btn btn-outline btn-lg">
                                اتصل بنا
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
