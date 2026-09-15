import { useState, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, Phone, MessageCircle, MapPin, Gauge, Fuel, Cog, Calendar, Palette, ShieldCheck, Video, Copy, Check } from 'lucide-react'
import { InventoryCar } from '../data/api'
import { useLanguage } from '../context/LanguageContext'
import './InventoryCarModal.css'

interface Props {
    car: InventoryCar | null
    onClose: () => void
}

export default function InventoryCarModal({ car, onClose }: Props) {
    const { language, isRTL } = useLanguage()
    const [activePhotoIndex, setActivePhotoIndex] = useState(0)
    const [copiedVin, setCopiedVin] = useState(false)
    const [showVideo, setShowVideo] = useState(false)

    useEffect(() => {
        setActivePhotoIndex(0)
        setShowVideo(false)
        setCopiedVin(false)
    }, [car])

    // Handle ESC key to close modal
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [onClose])

    if (!car) return null

    const photos = car.photosUrls.length > 0 ? car.photosUrls : ['/placeholder-car.jpg']

    const nextPhoto = () => {
        setActivePhotoIndex((prev) => (prev + 1) % photos.length)
        setShowVideo(false)
    }

    const prevPhoto = () => {
        setActivePhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)
        setShowVideo(false)
    }

    const copyVinToClipboard = () => {
        if (!car.vin) return
        navigator.clipboard.writeText(car.vin)
        setCopiedVin(true)
        setTimeout(() => setCopiedVin(false), 2000)
    }

    const formattedPrice = car.sellingPrice && car.sellingPrice > 0
        ? new Intl.NumberFormat(language === 'ar' ? 'ar-DZ' : 'fr-DZ').format(car.sellingPrice) + ` ${car.currency || 'دج'}`
        : (language === 'ar' ? 'السعر عند الطلب' : 'Prix sur demande')

    const whatsappText = language === 'ar'
        ? `السلام عليكم، أنا مهتم بالسيارة المتوفرة في المخزون:\n🚗 ${car.year} ${car.brand} ${car.model} ${car.carTrim || ''}\n🔢 رقم الهيكل (VIN): ${car.vin || 'غير محدد'}\n💰 السعر: ${formattedPrice}\nهل لا تزال متوفرة؟ أرجو تزويدي بمزيد من التفاصيل.`
        : `Bonjour, je suis intéressé(e) par ce véhicule en stock :\n🚗 ${car.year} ${car.brand} ${car.model} ${car.carTrim || ''}\n🔢 VIN: ${car.vin || 'N/A'}\n💰 Prix: ${formattedPrice}\nEst-il toujours disponible ? Merci de me recontacter.`

    const whatsappUrl = `https://wa.me/213782769427?text=${encodeURIComponent(whatsappText)}`

    const statusBadge = {
        available: {
            labelAr: '🟢 متوفرة للشحن الفوري',
            labelFr: '🟢 Disponible pour expédition',
            className: 'status-available'
        },
        reserved: {
            labelAr: '🟡 محجوزة حالياً',
            labelFr: '🟡 Actuellement réservée',
            className: 'status-reserved'
        },
        sold: {
            labelAr: '🔴 مباعة',
            labelFr: '🔴 Vendue',
            className: 'status-sold'
        }
    }[car.status || 'available']

    return (
        <div className="inventory-modal-overlay" onClick={onClose}>
            <div
                className={`inventory-modal-container ${isRTL ? 'rtl' : 'ltr'}`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button className="inventory-modal-close" onClick={onClose} aria-label="Close">
                    <X size={22} />
                </button>

                <div className="inventory-modal-body">
                    {/* Media Column (Left / Right depending on RTL) */}
                    <div className="inventory-modal-media">
                        <div className="main-media-stage">
                            {showVideo && car.videoUrl ? (
                                <div className="video-wrapper">
                                    <iframe
                                        src={car.videoUrl}
                                        title="Car video inspection"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <img
                                    src={photos[activePhotoIndex]}
                                    alt={`${car.brand} ${car.model}`}
                                    className="main-photo"
                                />
                            )}

                            {/* Status Tag */}
                            <div className={`media-status-badge ${statusBadge.className}`}>
                                {language === 'ar' ? statusBadge.labelAr : statusBadge.labelFr}
                            </div>

                            {/* Origin Tag */}
                            <div className="media-origin-badge">
                                {car.countryOfOrigin === 'korean' ? '🇰🇷 كورية أصلية' : (car.countryOfOrigin === 'chinese' ? '🇨🇳 صينية' : '🌍 استيراد')}
                            </div>

                            {/* Photo Arrows */}
                            {photos.length > 1 && !showVideo && (
                                <>
                                    <button className="photo-arrow photo-arrow-prev" onClick={prevPhoto} aria-label="Previous photo">
                                        <ChevronLeft size={22} />
                                    </button>
                                    <button className="photo-arrow photo-arrow-next" onClick={nextPhoto} aria-label="Next photo">
                                        <ChevronRight size={22} />
                                    </button>
                                    <div className="photo-counter">
                                        {activePhotoIndex + 1} / {photos.length}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Thumbnails strip */}
                        <div className="thumbnails-strip">
                            {car.videoUrl && (
                                <button
                                    className={`thumb-btn ${showVideo ? 'active-video' : ''}`}
                                    onClick={() => setShowVideo(true)}
                                    title="فيديو المعاينة"
                                >
                                    <Video size={18} />
                                    <span>فيديو</span>
                                </button>
                            )}
                            {photos.map((url, idx) => (
                                <button
                                    key={idx}
                                    className={`thumb-btn ${!showVideo && activePhotoIndex === idx ? 'active' : ''}`}
                                    onClick={() => {
                                        setShowVideo(false)
                                        setActivePhotoIndex(idx)
                                    }}
                                >
                                    <img src={url} alt={`Thumbnail ${idx + 1}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Details Column */}
                    <div className="inventory-modal-details">
                        <div className="details-header">
                            <span className="car-category-pill">
                                {car.year} • {car.countryOfOrigin === 'korean' ? 'Corée du Sud' : 'Chine'}
                            </span>
                            <h2 className="car-title">
                                {car.brand} {car.model} {car.carTrim && <span className="car-trim">{car.carTrim}</span>}
                            </h2>

                            {car.vin && (
                                <div className="vin-display">
                                    <span className="vin-label">VIN / الشاسيه:</span>
                                    <code className="vin-code">{car.vin}</code>
                                    <button
                                        className="vin-copy-btn"
                                        onClick={copyVinToClipboard}
                                        title={language === 'ar' ? 'نسخ رقم الهيكل' : 'Copier le VIN'}
                                    >
                                        {copiedVin ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                                    </button>
                                </div>
                            )}

                            <div className="price-tag-large">
                                <span className="price-label">{language === 'ar' ? 'السعر الصافي' : 'Prix Net'}</span>
                                <span className="price-val">{formattedPrice}</span>
                            </div>
                        </div>

                        {/* Specs Grid */}
                        <div className="specs-grid">
                            <div className="spec-item">
                                <Gauge className="spec-icon" size={18} />
                                <div>
                                    <div className="spec-name">{language === 'ar' ? 'المسافة المقطوعة' : 'Kilométrage'}</div>
                                    <div className="spec-value">{car.mileage?.toLocaleString()} km</div>
                                </div>
                            </div>

                            <div className="spec-item">
                                <Calendar className="spec-icon" size={18} />
                                <div>
                                    <div className="spec-name">{language === 'ar' ? 'سنة الصنع' : 'Année'}</div>
                                    <div className="spec-value">{car.year}</div>
                                </div>
                            </div>

                            <div className="spec-item">
                                <Fuel className="spec-icon" size={18} />
                                <div>
                                    <div className="spec-name">{language === 'ar' ? 'نوع الطاقة' : 'Énergie'}</div>
                                    <div className="spec-value">{car.carEnergy || (language === 'ar' ? 'بنزين' : 'Essence')}</div>
                                </div>
                            </div>

                            <div className="spec-item">
                                <Cog className="spec-icon" size={18} />
                                <div>
                                    <div className="spec-name">{language === 'ar' ? 'ناقل الحركة' : 'Transmission'}</div>
                                    <div className="spec-value">{car.carTransmission || (language === 'ar' ? 'أوتوماتيك' : 'Automatique')}</div>
                                </div>
                            </div>

                            <div className="spec-item">
                                <Palette className="spec-icon" size={18} />
                                <div>
                                    <div className="spec-name">{language === 'ar' ? 'اللون' : 'Couleur'}</div>
                                    <div className="spec-value">{car.color || (language === 'ar' ? 'أصلي' : 'Standard')}</div>
                                </div>
                            </div>

                            <div className="spec-item">
                                <MapPin className="spec-icon" size={18} />
                                <div>
                                    <div className="spec-name">{language === 'ar' ? 'الموقع الحالي' : 'Localisation'}</div>
                                    <div className="spec-value">{car.location || (language === 'ar' ? 'ميناء الشحن' : 'Port')}</div>
                                </div>
                            </div>
                        </div>

                        {/* Notes / Inspector Remarks */}
                        {car.notes && (
                            <div className="inspector-notes">
                                <h4>
                                    <ShieldCheck size={16} />
                                    {language === 'ar' ? 'ملاحظات الفحص والمعاينة:' : 'Remarques d\'inspection :'}
                                </h4>
                                <p>{car.notes}</p>
                            </div>
                        )}

                        {/* Guarantees Callout */}
                        <div className="stock-guarantees">
                            <div className="guarantee-chip">✓ {language === 'ar' ? 'فحص تقني معتمد' : 'Contrôle technique certifié'}</div>
                            <div className="guarantee-chip">✓ {language === 'ar' ? 'أقل من 3 سنوات' : 'Moins de 3 ans'}</div>
                            <div className="guarantee-chip">✓ {language === 'ar' ? 'شحن بحري مؤمن' : 'Fret maritime assuré'}</div>
                        </div>

                        {/* Action Buttons */}
                        <div className="modal-actions">
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="action-btn-whatsapp"
                            >
                                <MessageCircle size={20} />
                                <span>{language === 'ar' ? 'احجز أو استفسر عبر واتساب' : 'Réserver via WhatsApp'}</span>
                            </a>

                            <a
                                href="tel:+213782769427"
                                className="action-btn-call"
                            >
                                <Phone size={18} />
                                <span>{language === 'ar' ? 'اتصل بنا مباشرة' : 'Appeler directement'}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
