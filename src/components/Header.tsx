import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { content } from '../data/content';

interface HeaderProps {
  currentLanguage: 'it' | 'en';
  setCurrentLanguage: (lang: 'it' | 'en') => void;
}

const Header: React.FC<HeaderProps> = ({ currentLanguage, setCurrentLanguage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const nav = content.navigation[currentLanguage];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white/90 backdrop-blur-sm py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">VA</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">Villa Azzurra</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {nav.home}
            </button>
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {nav.about}
            </button>
            <button onClick={() => scrollToSection('gallery')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {nav.gallery}
            </button>
            <button onClick={() => scrollToSection('services')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {nav.services}
            </button>
            <button onClick={() => scrollToSection('availability')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {nav.availability}
            </button>
            <button onClick={() => scrollToSection('booking')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {nav.booking}
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-blue-600 transition-colors">
              {nav.contact}
            </button>
          </nav>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button 
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setCurrentLanguage(currentLanguage === 'it' ? 'en' : 'it')}
              >
                <Globe size={18} />
                <span className="text-sm font-medium">{currentLanguage.toUpperCase()}</span>
              </button>
            </div>

            <button
              className="lg:hidden text-gray-700 hover:text-blue-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <button onClick={() => scrollToSection('home')} className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2">
                {nav.home}
              </button>
              <button onClick={() => scrollToSection('about')} className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2">
                {nav.about}
              </button>
              <button onClick={() => scrollToSection('gallery')} className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2">
                {nav.gallery}
              </button>
              <button onClick={() => scrollToSection('services')} className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2">
                {nav.services}
              </button>
              <button onClick={() => scrollToSection('availability')} className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2">
                {nav.availability}
              </button>
              <button onClick={() => scrollToSection('booking')} className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2">
                {nav.booking}
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left text-gray-700 hover:text-blue-600 transition-colors py-2">
                {nav.contact}
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;