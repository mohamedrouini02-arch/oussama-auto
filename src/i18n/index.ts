import ar from './ar'
import fr from './fr'

export type Language = 'ar' | 'fr'

export const translations: Record<Language, Record<string, string>> = {
    ar,
    fr
}

export { ar, fr }
