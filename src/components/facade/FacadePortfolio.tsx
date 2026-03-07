'use client'

import NavBar from './NavBar'
import HeroSection from './HeroSection'
import WorkGrid from './WorkGrid'

export default function FacadePortfolio() {
  return (
    <div className="facade-container bg-white text-gray-900">
      <NavBar />
      <HeroSection />
      <WorkGrid />
    </div>
  )
}
