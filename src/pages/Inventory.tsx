import { useState, useEffect, useMemo } from 'react'
import { Search, Filter, X, MessageCircle, Eye, Fuel, Cog, Gauge, MapPin, Sparkles, RefreshCw, Car as CarIcon, ArrowUpDown } from 'lucide-react'
import { fetchInventoryCars, InventoryCar } from '../data/api'
import { useLanguage } from '../context/LanguageContext'
import InventoryCarModal from '../components/InventoryCarModal'
import './Inventory.css'

export default function Inventory() {
    const { language, isRTL } = useLanguage()
    const [cars, setCars] = useState<InventoryCar[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedCar, setSelectedCar] = useState<InventoryCar | null>(null)

    // Filters
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedOrigin, setSelectedOrigin] = useState<string>('all')
    const [selectedStatus, setSelectedStatus] = useState<string>('available')
    const [selectedBrand, setSelectedBrand] = useState<string>('all')
    const [selectedEnergy, setSelectedEnergy] = useState<string>('all')
    const [selectedTransmission, setSelectedTransmission] = useState<string>('all')
    const [sortBy, setSortBy] = useState<string>('newest')
    const [showFiltersMobile, setShowFiltersMobile] = useState(false)

    useEffect(() => {
        loadInventory()
    }, [])

    async function loadInventory() {
        setLoading(true)
        try {
            const data = await fetchInventoryCars()
            setCars(data)
        } catch (err) {
            console.error('Failed to load inventory:', err)
        } finally {
            setLoading(false)
        }
    }

    // Unique Brands from actual inventory data
    const brands = useMemo(() => {
        const set = new Set(cars.map(c => c.brand).filter(Boolean))
        return Array.from(set).sort()
    }, [cars])

    // Stats
    const stats = useMemo(() => {
        const available = cars.filter(c => c.status === 'available').length
        const korean = cars.filter(c => c.countryOfOrigin === 'korean').length
        const chinese = cars.filter(c => c.countryOfOrigin === 'chinese').length
        return { total: cars.length, available, korean, chinese }
    }, [cars])

    // Filter & Sort
    const filteredCars = useMemo(() => {
        return cars
            .filter(car => {
                // Search
                if (searchTerm.trim()) {
                    const q = searchTerm.toLowerCase().trim()
                    const matchBrand = car.brand?.toLowerCase().includes(q)
                    const matchModel = car.model?.toLowerCase().includes(q)
                    const matchTrim = car.carTrim?.toLowerCase().includes(q)
                    const matchVin = car.vin?.toLowerCase().includes(q)
                    const matchColor = car.color?.toLowerCase().includes(q)
                    const matchYear = car.year?.toString().includes(q)
                    if (!matchBrand && !matchModel && !matchTrim && !matchVin && !matchColor && !matchYear) {
                        return false
                    }
                }

                // Origin
                if (selectedOrigin !== 'all') {
                    if (car.countryOfOrigin !== selectedOrigin) return false
                }

                // Status
                if (selectedStatus !== 'all') {
                    if (car.status !== selectedStatus) return false
                }

                // Brand
                if (selectedBrand !== 'all') {
                    if (car.brand !== selectedBrand) return false
                }

                // Energy
                if (selectedEnergy !== 'all') {
                    const energy = (car.carEnergy || '').toLowerCase()
                    if (!energy.includes(selectedEnergy.toLowerCase())) return false
                }

                // Transmission
                if (selectedTransmission !== 'all') {
                    const trans = (car.carTransmission || '').toLowerCase()
                    if (!trans.includes(selectedTransmission.toLowerCase())) return false
                }

                return true
            })
            .sort((a, b) => {
                if (sortBy === 'price-asc') return (a.sellingPrice || 0) - (b.sellingPrice || 0)
                if (sortBy === 'price-desc') return (b.sellingPrice || 0) - (a.sellingPrice || 0)
                if (sortBy === 'mileage-asc') return (a.mileage || 0) - (b.mileage || 0)
                if (sortBy === 'year-desc') return (b.year || 0) - (a.year || 0)
                // Default: newest first by id/date
                return (new Date(b.createdAt || 0).getTime()) - (new Date(a.createdAt || 0).getTime())
            })
    }, [cars, searchTerm, selectedOrigin, selectedStatus, selectedBrand, selectedEnergy, selectedTransmission, sortBy])

    const clearFilters = () => {
        setSearchTerm('')
        setSelectedOrigin('all')
        setSelectedStatus('all')
        setSelectedBrand('all')
        setSelectedEnergy('all')
        setSelectedTransmission('all')
        setSortBy('newest')
    }

    const t = {
        ar: {
            heroBadge: 'المخزون المتوفر فوراً',
            heroTitle: 'سيارات المخزون الجاهزة للشحن والتسليم',
            heroSubtitle: 'تصفح السيارات المتوفرة حالياً في مستودعاتنا بكوريا الجنوبية والصين أو في مسار الشحن للجزائر، مع إمكانية المعاينة والحجز الفوري.',
            allOrigins: 'جميع البلدان',
            korean: '🇰🇷 كوريا الجنوبية',
            chinese: '🇨🇳 الصين',
            allStatuses: 'جميع الحالات',
            statusAvailable: '🟢 متوفرة للشحن',
            statusReserved: '🟡 محجوزة',
            statusSold: '🔴 مباعة',
            allBrands: 'كل العلامات',
            allEnergies: 'كل أنواع الطاقة',
            allTransmissions: 'كل نواقل الحركة',
            searchPlaceholder: 'ابحث بالماركة، الموديل، رقم الهيكل (VIN) أو اللون...',
            clearFilters: 'إعادة ضبط الفلاتر',
            filterResults: 'نتيجة مطابقة',
            totalCars: 'إجمالي السيارات',
            availableNow: 'متوفرة فوراً',
            koreanStock: 'مخزون كوري',
            chineseStock: 'مخزون صيني',
            sortBy: 'الترتيب حسب:',
            sortNewest: 'الأحدث إضافة',
            sortPriceAsc: 'السعر: من الأقل للأعلى',
            sortPriceDesc: 'السعر: من الأعلى للأقل',
            sortMileageAsc: 'أقل مسافة مقطوعة',
            sortYearDesc: 'أحدث سنة صنع',
            viewDetails: 'عرض التفاصيل والصور',
            reserveWhatsApp: 'احجز عبر واتساب',
            priceNet: 'السعر الإجمالي:',
            priceOnRequest: 'السعر عند الطلب',
            noResultsTitle: 'لا توجد سيارات مطابقة لبحثك',
            noResultsDesc: 'جرب تعديل خيارات الفلترة أو تواصل معنا وسنوفر لك نفس السيارة مباشرة من كوريا أو الصين.',
            contactCustom: 'اطلب سيارة مخصصة',
            refresh: 'تحديث المخزون',
            photosCount: 'صور',
            instantDelivery: 'شحن فوري'
        },
        fr: {
            heroBadge: 'Stock Disponible Immédiatement',
            heroTitle: 'Véhicules en Stock Prêts à l\'Expédition',
            heroSubtitle: 'Consultez les voitures actuellement disponibles dans nos parcs en Corée du Sud et Chine ou en cours de transit vers l\'Algérie.',
            allOrigins: 'Tous les pays',
            korean: '🇰🇷 Corée du Sud',
            chinese: '🇨🇳 Chine',
            allStatuses: 'Tous les statuts',
            statusAvailable: '🟢 Disponible',
            statusReserved: '🟡 Réservée',
            statusSold: '🔴 Vendue',
            allBrands: 'Toutes les marques',
            allEnergies: 'Toutes énergies',
            allTransmissions: 'Toutes transmissions',
            searchPlaceholder: 'Rechercher marque, modèle, VIN ou couleur...',
            clearFilters: 'Réinitialiser filtres',
            filterResults: 'résultats trouvés',
            totalCars: 'Total véhicules',
            availableNow: 'Disponibles',
            koreanStock: 'Stock Corée',
            chineseStock: 'Stock Chine',
            sortBy: 'Trier par :',
            sortNewest: 'Plus récentes',
            sortPriceAsc: 'Prix croissant',
            sortPriceDesc: 'Prix décroissant',
            sortMileageAsc: 'Kilométrage croissant',
            sortYearDesc: 'Année la plus récente',
            viewDetails: 'Voir détails & photos',
            reserveWhatsApp: 'Réserver via WhatsApp',
            priceNet: 'Prix total :',
            priceOnRequest: 'Prix sur demande',
            noResultsTitle: 'Aucun véhicule ne correspond à vos critères',
            noResultsDesc: 'Modifiez vos filtres ou contactez notre équipe pour importer le véhicule souhaité.',
            contactCustom: 'Commander sur mesure',
            refresh: 'Actualiser',
            photosCount: 'photos',
            instantDelivery: 'Expédition directe'
        }
    }[language === 'ar' ? 'ar' : 'fr']

    const formatPrice = (price: number | undefined, currency: string | undefined) => {
        if (!price || price <= 0) return t.priceOnRequest
        return new Intl.NumberFormat(language === 'ar' ? 'ar-DZ' : 'fr-DZ').format(price) + ` ${currency || 'دج'}`
    }

    return (
        <div className={`inventory-page ${isRTL ? 'rtl' : 'ltr'}`}>
            {/* Hero Section */}
            <section className="inventory-hero">
                <div className="inventory-hero-container">
                    <div className="hero-badge-pill">
                        <Sparkles size={16} />
                        <span>{t.heroBadge}</span>
                    </div>

                    <h1 className="inventory-hero-title">{t.heroTitle}</h1>
                    <p className="inventory-hero-subtitle">{t.heroSubtitle}</p>

                    {/* Stats Counter */}
                    <div className="inventory-stats-bar">
                        <div className="stat-card">
                            <span className="stat-num">{stats.available}</span>
                            <span className="stat-label">{t.availableNow}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-num">{stats.korean}</span>
                            <span className="stat-label">{t.koreanStock}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-num">{stats.chinese}</span>
                            <span className="stat-label">{t.chineseStock}</span>
                        </div>
                        <div className="stat-card">
                            <span className="stat-num">{stats.total}</span>
                            <span className="stat-label">{t.totalCars}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Controls & Filter Bar */}
            <section className="inventory-controls-section">
                <div className="inventory-container">
                    {/* Search & Quick Pills */}
                    <div className="inventory-toolbar">
                        <div className="inventory-search-box">
                            <Search className="search-icon" size={18} />
                            <input
                                type="text"
                                placeholder={t.searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Origin Pills */}
                        <div className="origin-filter-pills">
                            <button
                                className={`pill-btn ${selectedOrigin === 'all' ? 'active' : ''}`}
                                onClick={() => setSelectedOrigin('all')}
                            >
                                {t.allOrigins}
                            </button>
                            <button
                                className={`pill-btn ${selectedOrigin === 'korean' ? 'active' : ''}`}
                                onClick={() => setSelectedOrigin('korean')}
                            >
                                {t.korean}
                            </button>
                            <button
                                className={`pill-btn ${selectedOrigin === 'chinese' ? 'active' : ''}`}
                                onClick={() => setSelectedOrigin('chinese')}
                            >
                                {t.chinese}
                            </button>
                        </div>

                        {/* Status Pills */}
                        <div className="status-filter-pills">
                            <button
                                className={`status-pill-btn ${selectedStatus === 'available' ? 'active-avail' : ''}`}
                                onClick={() => setSelectedStatus(selectedStatus === 'available' ? 'all' : 'available')}
                            >
                                {t.statusAvailable}
                            </button>
                            <button
                                className={`status-pill-btn ${selectedStatus === 'reserved' ? 'active-res' : ''}`}
                                onClick={() => setSelectedStatus(selectedStatus === 'reserved' ? 'all' : 'reserved')}
                            >
                                {t.statusReserved}
                            </button>
                        </div>

                        {/* Mobile Toggle & Refresh */}
                        <div className="toolbar-actions">
                            <button
                                className="mobile-filter-toggle"
                                onClick={() => setShowFiltersMobile(!showFiltersMobile)}
                            >
                                <Filter size={18} />
                                <span>فلاتر</span>
                            </button>

                            <button
                                className="refresh-inventory-btn"
                                onClick={loadInventory}
                                title={t.refresh}
                            >
                                <RefreshCw size={16} className={loading ? 'spinning' : ''} />
                            </button>
                        </div>
                    </div>

                    {/* Secondary Filters Strip */}
                    <div className={`secondary-filters ${showFiltersMobile ? 'show-mobile' : ''}`}>
                        {/* Brand Select */}
                        {brands.length > 0 && (
                            <select
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                                className="filter-select"
                            >
                                <option value="all">{t.allBrands}</option>
                                {brands.map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                        )}

                        {/* Energy Select */}
                        <select
                            value={selectedEnergy}
                            onChange={(e) => setSelectedEnergy(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">{t.allEnergies}</option>
                            <option value="essence">بنزين / Essence</option>
                            <option value="diesel">ديزل / Diesel</option>
                            <option value="hybride">هايبرد / Hybride</option>
                            <option value="electrique">كهربائي / Électrique</option>
                        </select>

                        {/* Transmission Select */}
                        <select
                            value={selectedTransmission}
                            onChange={(e) => setSelectedTransmission(e.target.value)}
                            className="filter-select"
                        >
                            <option value="all">{t.allTransmissions}</option>
                            <option value="auto">أوتوماتيك / Automatique</option>
                            <option value="manuel">يدوي / Manuelle</option>
                        </select>

                        {/* Sort Select */}
                        <div className="sort-box">
                            <ArrowUpDown size={14} className="sort-icon" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="sort-select"
                            >
                                <option value="newest">{t.sortNewest}</option>
                                <option value="price-asc">{t.sortPriceAsc}</option>
                                <option value="price-desc">{t.sortPriceDesc}</option>
                                <option value="mileage-asc">{t.sortMileageAsc}</option>
                                <option value="year-desc">{t.sortYearDesc}</option>
                            </select>
                        </div>

                        {/* Clear Filters Button */}
                        {(searchTerm || selectedOrigin !== 'all' || selectedStatus !== 'available' || selectedBrand !== 'all' || selectedEnergy !== 'all' || selectedTransmission !== 'all') && (
                            <button className="clear-filters-btn" onClick={clearFilters}>
                                <X size={14} />
                                <span>{t.clearFilters}</span>
                            </button>
                        )}
                    </div>

                    {/* Results Counter */}
                    <div className="results-counter">
                        <span>{filteredCars.length} {t.filterResults}</span>
                    </div>
                </div>
            </section>

            {/* Car Grid Section */}
            <section className="inventory-grid-section">
                <div className="inventory-container">
                    {loading ? (
                        <div className="inventory-loading-state">
                            <div className="spinner-glow" />
                            <p>{language === 'ar' ? 'جاري تحميل السيارات المتوفرة...' : 'Chargement du stock en cours...'}</p>
                        </div>
                    ) : filteredCars.length === 0 ? (
                        <div className="inventory-empty-state">
                            <div className="empty-icon-circle">
                                <CarIcon size={44} />
                            </div>
                            <h3>{t.noResultsTitle}</h3>
                            <p>{t.noResultsDesc}</p>
                            <div className="empty-actions">
                                <button className="btn btn-secondary" onClick={clearFilters}>
                                    {t.clearFilters}
                                </button>
                                <a
                                    href={`https://wa.me/213782769427?text=${encodeURIComponent(
                                        language === 'ar'
                                            ? 'السلام عليكم، أبحث عن سيارة محددة للاستيراد من كوريا أو الصين، أرجو المساعدة.'
                                            : 'Bonjour, je recherche un véhicule spécifique à importer depuis la Corée ou la Chine.'
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary"
                                >
                                    <MessageCircle size={18} />
                                    <span>{t.contactCustom}</span>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <div className="inventory-grid">
                            {filteredCars.map((car) => {
                                const photo = car.photosUrls.length > 0 ? car.photosUrls[0] : '/placeholder-car.jpg'
                                const photosCount = car.photosUrls.length

                                const whatsappCarText = language === 'ar'
                                    ? `السلام عليكم، أنا مهتم بالسيارة المتوفرة في المخزون:\n🚗 ${car.year} ${car.brand} ${car.model} ${car.carTrim || ''}\n🔢 الشاسيه (VIN): ${car.vin || 'غير محدد'}\n💰 السعر: ${formatPrice(car.sellingPrice, car.currency)}\nهل لا تزال متوفرة؟`
                                    : `Bonjour, je suis intéressé(e) par ce véhicule en stock :\n🚗 ${car.year} ${car.brand} ${car.model} ${car.carTrim || ''}\n🔢 VIN: ${car.vin || 'N/A'}\n💰 Prix: ${formatPrice(car.sellingPrice, car.currency)}\nEst-il toujours disponible ?`

                                const cardWhatsappUrl = `https://wa.me/213782769427?text=${encodeURIComponent(whatsappCarText)}`

                                return (
                                    <div key={car.id} className="inventory-card">
                                        {/* Card Image Banner */}
                                        <div
                                            className="card-image-wrapper"
                                            onClick={() => setSelectedCar(car)}
                                        >
                                            <img
                                                src={photo}
                                                alt={`${car.brand} ${car.model}`}
                                                className="card-img"
                                                loading="lazy"
                                            />

                                            {/* Status Badge */}
                                            <div className={`card-status-badge ${car.status === 'reserved' ? 'badge-reserved' : (car.status === 'sold' ? 'badge-sold' : 'badge-available')}`}>
                                                {car.status === 'reserved' ? t.statusReserved : (car.status === 'sold' ? t.statusSold : t.statusAvailable)}
                                            </div>

                                            {/* Origin Flag */}
                                            <div className="card-origin-badge">
                                                {car.countryOfOrigin === 'korean' ? '🇰🇷 كوريا' : (car.countryOfOrigin === 'chinese' ? '🇨🇳 الصين' : '🌍 استيراد')}
                                            </div>

                                            {/* Photo Count */}
                                            {photosCount > 1 && (
                                                <div className="card-photos-count">
                                                    📸 {photosCount} {t.photosCount}
                                                </div>
                                            )}

                                            <div className="card-image-overlay">
                                                <span className="overlay-inspect">
                                                    <Eye size={18} />
                                                    {t.viewDetails}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Card Content */}
                                        <div className="card-content">
                                            <div className="card-header-row">
                                                <h3 className="card-title" onClick={() => setSelectedCar(car)}>
                                                    <span className="card-year">{car.year}</span> {car.brand} {car.model}
                                                    {car.carTrim && <span className="card-trim-badge">{car.carTrim}</span>}
                                                </h3>
                                            </div>

                                            {/* Specs Grid */}
                                            <div className="card-specs">
                                                <div className="card-spec-item" title="المسافة المقطوعة">
                                                    <Gauge size={14} className="spec-icon" />
                                                    <span>{car.mileage ? `${car.mileage.toLocaleString()} km` : '0 km'}</span>
                                                </div>

                                                <div className="card-spec-item" title="ناقل الحركة">
                                                    <Cog size={14} className="spec-icon" />
                                                    <span>{car.carTransmission || 'Auto'}</span>
                                                </div>

                                                <div className="card-spec-item" title="نوع الوقود">
                                                    <Fuel size={14} className="spec-icon" />
                                                    <span>{car.carEnergy || 'Essence'}</span>
                                                </div>

                                                <div className="card-spec-item" title="الموقع الحالي">
                                                    <MapPin size={14} className="spec-icon" />
                                                    <span className="truncate-1">{car.location || 'ميناء الشحن'}</span>
                                                </div>
                                            </div>

                                            {/* Chassis / VIN strip */}
                                            {car.vin && (
                                                <div className="card-vin-strip">
                                                    <span className="vin-tag">VIN</span>
                                                    <span className="vin-val">{car.vin}</span>
                                                </div>
                                            )}

                                            {/* Price & Actions */}
                                            <div className="card-footer">
                                                <div className="card-price-container">
                                                    <span className="price-sub">{t.priceNet}</span>
                                                    <span className="card-price">{formatPrice(car.sellingPrice, car.currency)}</span>
                                                </div>

                                                <div className="card-action-buttons">
                                                    <button
                                                        className="card-inspect-btn"
                                                        onClick={() => setSelectedCar(car)}
                                                        title={t.viewDetails}
                                                    >
                                                        <Eye size={18} />
                                                    </button>

                                                    <a
                                                        href={cardWhatsappUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="card-whatsapp-btn"
                                                        title={t.reserveWhatsApp}
                                                    >
                                                        <MessageCircle size={18} />
                                                        <span>{t.reserveWhatsApp}</span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            </section>

            {/* Inspection Modal */}
            <InventoryCarModal
                car={selectedCar}
                onClose={() => setSelectedCar(null)}
            />
        </div>
    )
}
