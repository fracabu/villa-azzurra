import React from 'react';
import { Star } from 'lucide-react';
import { content } from '../data/content';

interface ReviewsProps {
  currentLanguage: 'it' | 'en';
}

const Reviews: React.FC<ReviewsProps> = ({ currentLanguage }) => {
  const reviewsContent = content.reviews[currentLanguage];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {reviewsContent.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reviewsContent.items.map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">{review.date}</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{review.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-gray-900">{review.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Average Rating Display */}
        <div className="text-center mt-12">
          <div className="bg-blue-50 rounded-xl p-8 max-w-md mx-auto">
            <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="flex justify-center space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-gray-600">
              {currentLanguage === 'it' ? 'Basato su 127 recensioni' : 'Based on 127 reviews'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;