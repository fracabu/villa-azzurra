import React from 'react';
import { Check } from 'lucide-react';
import { content } from '../data/content';

interface AboutProps {
  currentLanguage: 'it' | 'en';
}

const About: React.FC<AboutProps> = ({ currentLanguage }) => {
  const aboutContent = content.about[currentLanguage];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {aboutContent.title}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {aboutContent.description}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {aboutContent.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={14} className="text-white" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Villa Interior"
              className="rounded-lg shadow-xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 w-48 h-32 bg-white rounded-lg shadow-lg p-4 hidden md:block">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">4.9/5</div>
                <div className="text-sm text-gray-600">Guest Rating</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;