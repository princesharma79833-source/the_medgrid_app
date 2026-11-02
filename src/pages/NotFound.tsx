import { Link } from 'react-router-dom'
import { Home as HomeIcon } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="font-display text-7xl font-extrabold gradient-text">404</p>
      <h1 className="section-title mt-4 text-2xl">Page not found</h1>
      <p className="mt-2 text-slate-600">The page you're looking for doesn't exist or has been moved.</p>
      <Link to="/" className="btn-primary mt-6">
        <HomeIcon size={18} /> Back to Home
      </Link>
    </div>
  )
}
