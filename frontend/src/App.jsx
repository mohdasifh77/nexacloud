import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Pricing from './pages/Pricing'
import Features from './pages/Features'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="noise-bg min-h-screen flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#0f0f22',
            color: '#f0efff',
            border: '1px solid rgba(101,84,250,0.3)',
            borderRadius: '12px',
            fontFamily: 'DM Sans, sans-serif'
          }
        }}
      />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"         element={<Home />} />
          <Route path="/pricing"  element={<Pricing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about"    element={<About />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="*"         element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
