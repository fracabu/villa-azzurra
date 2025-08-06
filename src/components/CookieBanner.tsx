import React, { useState, useEffect } from 'react';
import { X, Info } from 'lucide-react';
import { content } from '../data/content';

interface CookieBannerProps {
  currentLanguage: 'it' | 'en';
}

const CookieBanner: React.FC<CookieBannerProps> = ({ currentLanguage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cookieContent = content.cookieBanner[currentLanguage];

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a small delay
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start space-x-3 flex-1">
            <Info size={20} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">
                {cookieContent.message}
              </p>
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-700 text-sm underline"
              >
                {cookieContent.moreInfo}
              </a>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 flex-shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {cookieContent.decline}
            </button>
            <button
              onClick={handleAccept}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {cookieContent.accept}
            </button>
            <button
              onClick={handleDecline}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;