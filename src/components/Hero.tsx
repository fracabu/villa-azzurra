import React from 'react';
import { ChevronDown } from 'lucide-react';
import { content } from '../data/content';

interface HeroProps {
  currentLanguage: 'it' | 'en';
}

const Hero: React.FC<HeroProps> = ({ currentLanguage }) => {
  const heroContent = content.hero[currentLanguage];

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Villa Azzurra"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
            {heroContent.title}
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed opacity-90 animate-fade-in animation-delay-300">
            {heroContent.subtitle}
          </p>
          <button
            onClick={scrollToAbout}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:transform hover:scale-105 animate-fade-in animation-delay-500"
          >
            {heroContent.cta}
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce z-10"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default Hero;