import React from 'react';
import { Facebook, Instagram, Home } from 'lucide-react';
import { siteConfig, content } from '../data/content';

interface FooterProps {
  currentLanguage: 'it' | 'en';
}

const Footer: React.FC<FooterProps> = ({ currentLanguage }) => {
  const footerContent = content.footer[currentLanguage];
  const nav = content.navigation[currentLanguage];
  const businessInfo = siteConfig.businessInfo[currentLanguage];

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">VA</span>
              </div>
              <h3 className="text-xl font-bold">Villa Azzurra</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              {footerContent.description}
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{businessInfo.companyName}</p>
              <p>{businessInfo.vatNumber}</p>
              <p>{businessInfo.registration}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{footerContent.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {nav.about}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {nav.gallery}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('services')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {nav.services}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('booking')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {nav.booking}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {nav.contact}
                </button>
              </li>
              <li>
                <a 
                  href="/admin"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{footerContent.followUs}</h4>
            <div className="flex space-x-4 mb-6">
              <a 
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href={siteConfig.social.airbnb}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors"
              >
                <Home size={20} />
              </a>
            </div>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">{siteConfig.contact.phone}</p>
              <p className="text-gray-300">{siteConfig.contact.email}</p>
            </div>
          </div>
        </div>

        <hr className="border-gray-800 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>{footerContent.copyright}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              {footerContent.privacy}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {footerContent.cookies}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;