import { MessageCircle } from 'lucide-react'
import './WhatsAppButton.css'

interface WhatsAppButtonProps {
    phoneNumber?: string
    message?: string
}

export default function WhatsAppButton({
    phoneNumber = '+213782769427',
    message = 'مرحباً، أريد الاستفسار عن استيراد سيارة من كوريا'
}: WhatsAppButtonProps) {
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-button"
            aria-label="تواصل معنا عبر واتساب"
        >
            <div className="whatsapp-pulse"></div>
            <div className="whatsapp-icon">
                <MessageCircle size={28} />
            </div>
            <span className="whatsapp-tooltip">تواصل معنا</span>
        </a>
    )
}
