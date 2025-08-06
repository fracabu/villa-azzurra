import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { content } from '../data/content';

interface GalleryProps {
  currentLanguage: 'it' | 'en';
}

const Gallery: React.FC<GalleryProps> = ({ currentLanguage }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    {
      src: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Villa Exterior"
    },
    {
      src: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Living Room"
    },
    {
      src: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Bedroom"
    },
    {
      src: "https://images.pexels.com/photos/1428348/pexels-photo-1428348.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Kitchen"
    },
    {
      src: "https://images.pexels.com/photos/261181/pexels-photo-261181.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Swimming Pool"
    },
    {
      src: "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Garden View"
    },
    {
      src: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Terrace"
    },
    {
      src: "https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Bathroom"
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    setCurrentSlide(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const nav = content.navigation[currentLanguage];

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {nav.gallery}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {currentLanguage === 'it' 
              ? "Scopri gli spazi eleganti e confortevoli della nostra villa attraverso questa galleria fotografica."
              : "Discover the elegant and comfortable spaces of our villa through this photo gallery."
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center">
                    <div className="w-12 h-12 border-2 border-white rounded-full flex items-center justify-center mx-auto">
                      <span className="text-lg">+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X size={32} />
            </button>
            
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronLeft size={48} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
            >
              <ChevronRight size={48} />
            </button>

            <div className="max-w-4xl max-h-4xl mx-4">
              <img
                src={images[currentSlide].src}
                alt={images[currentSlide].alt}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
              {currentSlide + 1} / {images.length}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;