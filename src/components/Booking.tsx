import React, { useState } from 'react';
import { Calendar, Users, Send, Calculator, Euro } from 'lucide-react';
import { content } from '../data/content';
import { saveBookingRequest, BookingData } from '../services/bookingService';
import { calculateStayTotal, formatPrice, getSeasonLabel } from '../utils/pricingUtils';

interface BookingProps {
  currentLanguage: 'it' | 'en';
}

const Booking: React.FC<BookingProps> = ({ currentLanguage }) => {
  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    guests: '2',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [priceCalculation, setPriceCalculation] = useState<any>(null);

  const bookingContent = content.booking[currentLanguage];

  // Calcola prezzo quando cambiano le date o ospiti
  React.useEffect(() => {
    if (formData.checkin && formData.checkout && formData.guests) {
      try {
        const calculation = calculateStayTotal(
          formData.checkin,
          formData.checkout,
          parseInt(formData.guests)
        );
        setPriceCalculation(calculation);
      } catch (error) {
        setPriceCalculation(null);
      }
    } else {
      setPriceCalculation(null);
    }
  }, [formData.checkin, formData.checkout, formData.guests]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending booking request
    handleBookingSubmission(formData);
  };

  const handleBookingSubmission = async (data: typeof formData) => {
    try {
      // Salva la richiesta su Firebase
      const result = await saveBookingRequest(data as BookingData);
      
      if (result.success) {
        setIsSubmitted(true);
        
        // Opzionale: Invia anche email di backup
        const subject = encodeURIComponent(`Richiesta Prenotazione - ${data.checkin} / ${data.checkout}`);
        const body = encodeURIComponent(`
Nome: ${data.name}
Email: ${data.email}
Telefono: ${data.phone}
Check-in: ${data.checkin}
Check-out: ${data.checkout}
Numero ospiti: ${data.guests}
Messaggio: ${data.message}

ID Richiesta: ${result.id}
        `);
        
        // Apri email client come backup (opzionale)
        // window.open(`mailto:info@villaazzurra.com?subject=${subject}&body=${body}`);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({
            checkin: '',
            checkout: '',
            guests: '2',
            name: '',
            email: '',
            phone: '',
            message: ''
          });
        }, 5000);
      } else {
        throw new Error('Errore nel salvare la richiesta');
      }
      
    } catch (error) {
      console.error('Errore invio prenotazione:', error);
      alert(currentLanguage === 'it' 
        ? 'Errore nell\'invio della richiesta. Riprova o contattaci direttamente.'
        : 'Error sending request. Please try again or contact us directly.'
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="booking" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {bookingContent.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {bookingContent.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
          {/* Pricing Info */}
          <div className="lg:col-span-1">
            <div className="space-y-6">
              {/* Pricing Info */}
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Euro size={20} className="mr-2 text-blue-600" />
                  {bookingContent.pricing.title}
                </h3>
                <div className="space-y-3 text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>{currentLanguage === 'it' ? 'Bassa stagione:' : 'Low season:'}</span>
                    <span className="font-semibold">€180/notte</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{currentLanguage === 'it' ? 'Alta stagione:' : 'High season:'}</span>
                    <span className="font-semibold">€250/notte</span>
                  </div>
                  <hr className="my-4" />
                  <div className="flex justify-between items-center text-sm">
                    <span>{currentLanguage === 'it' ? 'Pulizia finale:' : 'Final cleaning:'}</span>
                    <span>€80</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>{currentLanguage === 'it' ? 'Tassa soggiorno:' : 'Tourist tax:'}</span>
                    <span>€2.50/persona/notte</span>
                  </div>
                </div>
              </div>

              {/* Price Calculation */}
              {priceCalculation && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-lg p-6 border border-blue-100">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator size={20} className="mr-2 text-blue-600" />
                    {currentLanguage === 'it' ? 'Calcolo Prezzo' : 'Price Calculation'}
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        {priceCalculation.nights} {currentLanguage === 'it' ? 'notti' : 'nights'}
                      </span>
                      <span className="font-semibold">{formatPrice(priceCalculation.accommodationTotal)}</span>
                    </div>
                    
                    <div className="text-xs text-gray-600 ml-4 space-y-1">
                      {priceCalculation.breakdown.map((night: any, index: number) => (
                        <div key={index} className="flex justify-between">
                          <span>{new Date(night.date).toLocaleDateString('it-IT')}</span>
                          <span>
                            {formatPrice(night.price)} 
                            <span className="ml-1 text-xs">
                              ({getSeasonLabel(night.season, currentLanguage)})
                            </span>
                          </span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        {currentLanguage === 'it' ? 'Pulizia finale' : 'Final cleaning'}
                      </span>
                      <span className="font-semibold">{formatPrice(priceCalculation.cleaningFee)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">
                        {currentLanguage === 'it' ? 'Tassa soggiorno' : 'Tourist tax'}
                      </span>
                      <span className="font-semibold">{formatPrice(priceCalculation.touristTax)}</span>
                    </div>
                    
                    <hr className="border-blue-200" />
                    
                    <div className="flex justify-between items-center text-lg font-bold text-blue-900">
                      <span>{currentLanguage === 'it' ? 'Totale' : 'Total'}</span>
                      <span>{formatPrice(priceCalculation.total)}</span>
                    </div>
                    
                    <div className="text-center text-sm text-gray-600 mt-2">
                      {currentLanguage === 'it' 
                        ? `Media: ${formatPrice(priceCalculation.averagePerNight)}/notte`
                        : `Average: ${formatPrice(priceCalculation.averagePerNight)}/night`
                      }
                    </div>
                  </div>
                </div>
              )}
              </div>
            </div>

          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {bookingContent.success}
                  </h3>
                  <p className="text-gray-600">
                    {currentLanguage === 'it' 
                      ? 'La tua richiesta è stata salvata e riceverai una risposta entro 24 ore.'
                      : 'Your request has been saved and you will receive a response within 24 hours.'
                    }
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar size={16} className="inline mr-1" />
                        {bookingContent.form.checkin} *
                      </label>
                      <input
                        type="date"
                        name="checkin"
                        value={formData.checkin}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar size={16} className="inline mr-1" />
                        {bookingContent.form.checkout} *
                      </label>
                      <input
                        type="date"
                        name="checkout"
                        value={formData.checkout}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Users size={16} className="inline mr-1" />
                        {bookingContent.form.guests} *
                      </label>
                      <select
                        name="guests"
                        value={formData.guests}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {[1,2,3,4,5,6,7,8].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {bookingContent.form.name} *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {bookingContent.form.email} *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {bookingContent.form.phone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {bookingContent.form.message}
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                  >
                    <Send size={20} />
                    <span>{bookingContent.form.submit}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;