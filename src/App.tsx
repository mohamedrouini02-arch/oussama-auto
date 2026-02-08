import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import About from './pages/About'
import Cars from './pages/Cars'
import CarDetails from './pages/CarDetails'
import Process from './pages/Process'
import OrderTracking from './pages/OrderTracking'
import ShippingForm from './pages/ShippingForm'
import Contact from './pages/Contact'
import DocumentsUpload from './pages/DocumentsUpload'

function App() {
    return (
        <LanguageProvider>
            <Router>
                <div className="app">
                    <Header />
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/cars" element={<Cars />} />
                            <Route path="/cars/:id" element={<CarDetails />} />
                            <Route path="/process" element={<Process />} />
                            <Route path="/tracking" element={<OrderTracking />} />
                            <Route path="/shipping-form" element={<ShippingForm />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/documents" element={<DocumentsUpload />} />
                        </Routes>
                    </main>
                    <Footer />
                    <WhatsAppButton />
                </div>
            </Router>
        </LanguageProvider>
    )
}

export default App
