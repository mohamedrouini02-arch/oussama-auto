import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Comprehensive features in Arabic
const comprehensiveFeatures = [
    'شاشة لمس 7"',
    'بلوتوث',
    'كاميرا خلفية',
    'مكيف هواء',
    'وسائد هوائية',
    'فتح بدون مفتاح',
    'مقاعد جلد',
    'مقاعد مدفأة ومهواة',
    'إغلاق أوتوماتيكي للمرايا',
    'إضاءة LED كاملة',
    'إضاءة محيطية',
    'مقود مدفأ',
    'حساسات وكاميرا خلفية',
    'تحذير النقطة العمياء',
    'تكييف أوتوماتيكي',
    'تحذير التصادم والتوقف التلقائي'
];

// Comprehensive features in French
const comprehensiveFeaturesFr = [
    'Écran tactile 7"',
    'Bluetooth',
    'Caméra de recul',
    'Climatisation',
    'Airbags',
    'Ouverture mains libres',
    'Sièges en cuir',
    'Sièges chauffants et ventilés',
    'Fermeture auto des rétroviseurs',
    'Éclairage LED complet',
    "Éclairage d'ambiance",
    'Volant chauffant',
    'Capteurs et caméra arrière',
    'Alerte angle mort',
    'Climatisation automatique',
    'Alerte collision et arrêt auto'
];

const carsFilePath = path.join(__dirname, '..', 'src', 'data', 'cars.ts');

// Read the current file
let content = fs.readFileSync(carsFilePath, 'utf-8');

// Remove duplicate endYear entries
content = content.replace(/endYear: 2026,\r?\n\s+endYear: 2026,/g, 'endYear: 2026,');

// Create the new features array string
const newFeatures = JSON.stringify(comprehensiveFeatures).replace(/"/g, "'");
const newFeaturesFr = JSON.stringify(comprehensiveFeaturesFr).replace(/"/g, "'");

// Pattern to match features arrays (matches both single and multi-line)
const featuresPattern = /features: \[.*?\],\r?\n\s+featuresFr: \[.*?\],/gs;

// Replace all features arrays with the comprehensive list
content = content.replace(featuresPattern, `features: ${newFeatures},\n        featuresFr: ${newFeaturesFr},`);

// Write the updated content back
fs.writeFileSync(carsFilePath, content);

console.log('Successfully updated all cars with comprehensive features!');
console.log('Features added:', comprehensiveFeatures.length);
