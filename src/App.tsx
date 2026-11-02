import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Cities from './pages/Cities'
import Ayush from './pages/Ayush'
import Treatments from './pages/Treatments'
import Hospitals from './pages/Hospitals'
import Stories from './pages/Stories'
import About from './pages/About'
import Inquiry from './pages/Inquiry'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/ayush" element={<Ayush />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/about" element={<About />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
