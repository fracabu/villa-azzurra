// Contenuti facilmente modificabili per personalizzazione
export const siteConfig = {
  siteName: {
    it: "Villa Azzurra",
    en: "Villa Azzurra"
  },
  tagline: {
    it: "La tua casa vacanze da sogno in Toscana",
    en: "Your dream vacation home in Tuscany"
  },
  contact: {
    phone: "+39 055 123 4567",
    email: "info@villaazzurra.com",
    address: "Via delle Rose 15, 50125 Firenze, Italia",
    coordinates: { lat: 43.7696, lng: 11.2558 } // Firenze
  },
  social: {
    facebook: "https://facebook.com/villaazzurra",
    instagram: "https://instagram.com/villaazzurra",
    airbnb: "https://airbnb.com/h/villaazzurra"
  },
  businessInfo: {
    it: {
      companyName: "Villa Azzurra S.r.l.",
      vatNumber: "P.IVA: 12345678901",
      registration: "Codice identificativo: 048017-LT-12345"
    },
    en: {
      companyName: "Villa Azzurra S.r.l.",
      vatNumber: "VAT: 12345678901", 
      registration: "Registration code: 048017-LT-12345"
    }
  }
};

export const content = {
  navigation: {
    it: {
      home: "Home",
      about: "La Villa", 
      gallery: "Galleria",
      services: "Servizi",
      availability: "Disponibilità",
      booking: "Prenota",
      reviews: "Recensioni",
      location: "Posizione",
      contact: "Contatti"
    },
    en: {
      home: "Home",
      about: "The Villa",
      gallery: "Gallery", 
      services: "Services",
      availability: "Availability",
      booking: "Book Now",
      reviews: "Reviews",
      location: "Location",
      contact: "Contact"
    }
  },
  hero: {
    it: {
      title: "Benvenuti a Villa Azzurra",
      subtitle: "Una magnifica villa toscana immersa nel verde, perfetta per le vostre vacanze da sogno. Scoprite il fascino autentico della Toscana in un ambiente elegante e confortevole.",
      cta: "Scopri di più"
    },
    en: {
      title: "Welcome to Villa Azzurra", 
      subtitle: "A magnificent Tuscan villa surrounded by greenery, perfect for your dream vacation. Discover the authentic charm of Tuscany in an elegant and comfortable environment.",
      cta: "Learn More"
    }
  },
  about: {
    it: {
      title: "La Villa",
      description: "Villa Azzurra è una splendida residenza del XVIII secolo completamente ristrutturata, che combina il fascino storico toscano con tutti i comfort moderni. Situata su una collina panoramica, offre una vista mozzafiato sulla campagna circostante.",
      features: [
        "4 camere da letto eleganti",
        "3 bagni moderni con doccia",
        "Ampio soggiorno con camino",
        "Cucina completamente attrezzata",
        "Terrazza panoramica privata",
        "Giardino mediterraneo di 2000 mq",
        "Piscina privata (12x6m)",
        "Parcheggio privato per 3 auto"
      ]
    },
    en: {
      title: "The Villa",
      description: "Villa Azzurra is a splendid 18th-century residence completely renovated, combining Tuscan historical charm with all modern comforts. Located on a panoramic hill, it offers breathtaking views of the surrounding countryside.",
      features: [
        "4 elegant bedrooms",
        "3 modern bathrooms with shower", 
        "Large living room with fireplace",
        "Fully equipped kitchen",
        "Private panoramic terrace",
        "2000 sqm Mediterranean garden",
        "Private swimming pool (12x6m)",
        "Private parking for 3 cars"
      ]
    }
  },
  services: {
    it: {
      title: "Servizi e Comfort",
      items: [
        { name: "Wi-Fi Gratuito", icon: "Wifi", description: "Connessione internet ad alta velocità in tutta la villa" },
        { name: "Aria Condizionata", icon: "Snowflake", description: "Climatizzazione in tutte le stanze" },
        { name: "Piscina Privata", icon: "Waves", description: "Piscina esclusiva con vista panoramica" },
        { name: "Parcheggio", icon: "Car", description: "Posti auto privati e custoditi" },
        { name: "Cucina Attrezzata", icon: "ChefHat", description: "Cucina moderna con tutti gli elettrodomestici" },
        { name: "Giardino", icon: "Trees", description: "Ampio spazio verde con zona relax" },
        { name: "Terrazza", icon: "Sun", description: "Terrazza panoramica per cene all'aperto" },
        { name: "Animali Ammessi", icon: "Heart", description: "I vostri amici a quattro zampe sono benvenuti" }
      ]
    },
    en: {
      title: "Services & Amenities",
      items: [
        { name: "Free Wi-Fi", icon: "Wifi", description: "High-speed internet connection throughout the villa" },
        { name: "Air Conditioning", icon: "Snowflake", description: "Climate control in all rooms" },
        { name: "Private Pool", icon: "Waves", description: "Exclusive pool with panoramic view" },
        { name: "Parking", icon: "Car", description: "Private and secure parking spaces" },
        { name: "Equipped Kitchen", icon: "ChefHat", description: "Modern kitchen with all appliances" },
        { name: "Garden", icon: "Trees", description: "Large green space with relaxation area" },
        { name: "Terrace", icon: "Sun", description: "Panoramic terrace for outdoor dining" },
        { name: "Pet Friendly", icon: "Heart", description: "Your four-legged friends are welcome" }
      ]
    }
  },
  calendar: {
    it: {
      title: "Disponibilità",
      subtitle: "Controlla le date disponibili e prenota il tuo soggiorno",
      available: "Disponibile",
      booked: "Prenotato",
      legend: "Legenda"
    },
    en: {
      title: "Availability",
      subtitle: "Check available dates and book your stay",
      available: "Available", 
      booked: "Booked",
      legend: "Legend"
    }
  },
  booking: {
    it: {
      title: "Prenota il tuo Soggiorno",
      subtitle: "Compila il modulo per richiedere una prenotazione. Ti contatteremo entro 24 ore.",
      form: {
        checkin: "Data di arrivo",
        checkout: "Data di partenza", 
        guests: "Numero ospiti",
        name: "Nome completo",
        email: "Email",
        phone: "Telefono",
        message: "Richieste speciali",
        submit: "Invia Richiesta",
        required: "Campo obbligatorio"
      },
      success: "Richiesta inviata con successo! Ti contatteremo presto.",
      pricing: {
        title: "Tariffe",
        lowSeason: "Bassa stagione (Luglio-Agosto): €180/notte",
        highSeason: "Alta stagione (resto dell'anno): €250/notte", 
        notes: "Pulizia finale: €80 | Tassa soggiorno: €2.50/persona/notte"
      }
    },
    en: {
      title: "Book Your Stay",
      subtitle: "Fill out the form to request a booking. We will contact you within 24 hours.",
      form: {
        checkin: "Check-in date",
        checkout: "Check-out date",
        guests: "Number of guests", 
        name: "Full name",
        email: "Email",
        phone: "Phone",
        message: "Special requests",
        submit: "Send Request",
        required: "Required field"
      },
      success: "Request sent successfully! We will contact you soon.",
      pricing: {
        title: "Rates",
        lowSeason: "Low season (July-August): €180/night",
        highSeason: "High season (rest of year): €250/night",
        notes: "Final cleaning: €80 | Tourist tax: €2.50/person/night"
      }
    }
  },
  reviews: {
    it: {
      title: "Recensioni degli Ospiti",
      items: [
        {
          name: "Marco & Elena",
          rating: 5,
          text: "Villa meravigliosa con una vista spettacolare! Tutto perfetto, dalla pulizia ai servizi. Proprietari disponibilissimi. Torneremo sicuramente!",
          date: "Settembre 2024"
        },
        {
          name: "Familie Schmidt", 
          rating: 5,
          text: "Perfetto per una vacanza in famiglia. I bambini hanno adorato la piscina e noi adulti la tranquillità del posto. Highly recommended!",
          date: "Agosto 2024"
        },
        {
          name: "Sarah & James",
          rating: 5, 
          text: "An authentic Tuscan experience! The villa exceeded our expectations. Beautiful location, excellent amenities, and wonderful hosts.",
          date: "Luglio 2024"
        }
      ]
    },
    en: {
      title: "Guest Reviews",
      items: [
        {
          name: "Marco & Elena",
          rating: 5,
          text: "Wonderful villa with spectacular views! Everything perfect, from cleanliness to services. Very helpful owners. We will definitely return!",
          date: "September 2024"
        },
        {
          name: "Familie Schmidt",
          rating: 5, 
          text: "Perfect for a family vacation. The kids loved the pool and we adults enjoyed the tranquility of the place. Highly recommended!",
          date: "August 2024"
        },
        {
          name: "Sarah & James",
          rating: 5,
          text: "An authentic Tuscan experience! The villa exceeded our expectations. Beautiful location, excellent amenities, and wonderful hosts.", 
          date: "July 2024"
        }
      ]
    }
  },
  contact: {
    it: {
      title: "Contattaci",
      subtitle: "Siamo qui per aiutarti a pianificare la tua vacanza perfetta",
      form: {
        name: "Nome",
        email: "Email", 
        subject: "Oggetto",
        message: "Messaggio",
        submit: "Invia Messaggio"
      },
      info: {
        phone: "Telefono",
        email: "Email",
        address: "Indirizzo"
      }
    },
    en: {
      title: "Contact Us",
      subtitle: "We're here to help you plan your perfect vacation",
      form: {
        name: "Name",
        email: "Email",
        subject: "Subject", 
        message: "Message",
        submit: "Send Message"
      },
      info: {
        phone: "Phone",
        email: "Email",
        address: "Address"
      }
    }
  },
  footer: {
    it: {
      description: "Villa Azzurra offre un'esperienza autentica nella bellissima Toscana. Scopri il comfort e l'eleganza in un ambiente unico.",
      quickLinks: "Link Rapidi",
      followUs: "Seguici",
      copyright: "© 2024 Villa Azzurra. Tutti i diritti riservati.",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy"
    },
    en: {
      description: "Villa Azzurra offers an authentic experience in beautiful Tuscany. Discover comfort and elegance in a unique environment.",
      quickLinks: "Quick Links", 
      followUs: "Follow Us",
      copyright: "© 2024 Villa Azzurra. All rights reserved.",
      privacy: "Privacy Policy",
      cookies: "Cookie Policy"
    }
  },
  cookieBanner: {
    it: {
      message: "Questo sito utilizza cookie per migliorare la tua esperienza di navigazione e per finalità statistiche.",
      accept: "Accetta",
      decline: "Rifiuta",
      moreInfo: "Maggiori informazioni"
    },
    en: {
      message: "This site uses cookies to improve your browsing experience and for statistical purposes.",
      accept: "Accept",
      decline: "Decline", 
      moreInfo: "More information"
    }
  }
};