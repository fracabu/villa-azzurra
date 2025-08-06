import React from 'react';
import { Wifi, Snowflake, Waves, Car, ChefHat, Trees, Sun, Heart } from 'lucide-react';
import { content } from '../data/content';

interface ServicesProps {
  currentLanguage: 'it' | 'en';
}

const iconMap = {
  Wifi,
  Snowflake,
  Waves,
  Car,
  ChefHat,
  Trees,
  Sun,
  Heart
};

const Services: React.FC<ServicesProps> = ({ currentLanguage }) => {
  const servicesContent = content.services[currentLanguage];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {servicesContent.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesContent.items.map((service, index) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap];
            
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:transform hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent size={28} className="text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;