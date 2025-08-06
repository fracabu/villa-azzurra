import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send } from 'lucide-react';
import { siteConfig, content } from '../data/content';
import { saveContactMessage, ContactData } from '../services/bookingService';

interface ContactProps {
  currentLanguage: 'it' | 'en';
}

const Contact: React.FC<ContactProps> = ({ currentLanguage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactContent = content.contact[currentLanguage];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleContactSubmission(formData);
  };

  const handleContactSubmission = async (data: typeof formData) => {
    try {
      // Salva il messaggio su Firebase
      const result = await saveContactMessage(data as ContactData);
      
      if (result.success) {
        setIsSubmitted(true);
        
        // Reset form after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
          setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
      } else {
        throw new Error('Errore nel salvare il messaggio');
      }
      
    } catch (error) {
      console.error('Errore invio contatto:', error);
      alert(currentLanguage === 'it' 
        ? 'Errore nell\'invio del messaggio. Riprova o contattaci direttamente.'
        : 'Error sending message. Please try again or contact us directly.'
      );
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {contactContent.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {contactContent.subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                {currentLanguage === 'it' ? 'Informazioni di Contatto' : 'Contact Information'}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contactContent.info.phone}</p>
                    <p className="text-gray-600">{siteConfig.contact.phone}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contactContent.info.email}</p>
                    <p className="text-gray-600">{siteConfig.contact.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MapPin size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{contactContent.info.address}</p>
                    <p className="text-gray-600">{siteConfig.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-3">
                {currentLanguage === 'it' ? 'Orari di Risposta' : 'Response Times'}
              </h4>
              <p className="text-gray-600">
                {currentLanguage === 'it' 
                  ? 'Rispondiamo a tutte le richieste entro 24 ore. Per urgenze, chiamateci direttamente.'
                  : 'We respond to all inquiries within 24 hours. For urgent matters, please call us directly.'
                }
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-xl p-8">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {currentLanguage === 'it' 
                    ? 'Messaggio inviato con successo!'
                    : 'Message sent successfully!'
                  }
                </h3>
                <p className="text-gray-600">
                  {currentLanguage === 'it' 
                    ? 'Ti contatteremo presto.'
                    : 'We will contact you soon.'
                  }
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {contactContent.form.name} *
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
                      {contactContent.form.email} *
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
                    {contactContent.form.subject} *
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {contactContent.form.message} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Send size={20} />
                  <span>{contactContent.form.submit}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;