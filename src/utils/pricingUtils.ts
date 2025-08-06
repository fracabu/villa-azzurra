// Utilità per calcolo prezzi stagionali
export interface PricingConfig {
  lowSeason: number;    // €/notte bassa stagione
  highSeason: number;   // €/notte alta stagione
  cleaningFee: number;  // Pulizia finale
  touristTax: number;   // Tassa soggiorno per persona/notte
}

export const defaultPricing: PricingConfig = {
  lowSeason: 180,
  highSeason: 250,
  cleaningFee: 80,
  touristTax: 2.5
};

// Definizione stagioni
export const getSeasonType = (date: Date): 'high' | 'low' => {
  const month = date.getMonth() + 1; // 1-12
  const day = date.getDate();
  
  // Alta stagione:
  // - Metà aprile (15 aprile) - Giugno (30 giugno)
  // - Settembre - Ottobre (31 ottobre)  
  // - Novembre - Metà aprile (14 aprile)
  
  if (month === 4 && day >= 15) return 'high'; // Metà aprile
  if (month >= 5 && month <= 6) return 'high'; // Maggio-Giugno
  if (month >= 9 && month <= 10) return 'high'; // Settembre-Ottobre
  if (month >= 11 || month <= 3) return 'high'; // Novembre-Marzo
  if (month === 4 && day <= 14) return 'high'; // Prima metà aprile
  
  // Bassa stagione: Luglio-Agosto
  return 'low';
};

export const getPriceForDate = (date: Date, pricing: PricingConfig = defaultPricing): number => {
  const season = getSeasonType(date);
  return season === 'high' ? pricing.highSeason : pricing.lowSeason;
};

export const calculateStayTotal = (
  checkinDate: string, 
  checkoutDate: string, 
  guests: number,
  pricing: PricingConfig = defaultPricing
) => {
  const checkin = new Date(checkinDate);
  const checkout = new Date(checkoutDate);
  
  if (checkin >= checkout) {
    throw new Error('Data checkout deve essere successiva al checkin');
  }
  
  let totalNights = 0;
  let totalAccommodation = 0;
  const nightlyBreakdown: Array<{date: string, price: number, season: 'high' | 'low'}> = [];
  
  // Calcola prezzo per ogni notte
  const currentDate = new Date(checkin);
  while (currentDate < checkout) {
    const nightPrice = getPriceForDate(currentDate, pricing);
    const season = getSeasonType(currentDate);
    
    totalAccommodation += nightPrice;
    totalNights++;
    
    nightlyBreakdown.push({
      date: currentDate.toISOString().split('T')[0],
      price: nightPrice,
      season
    });
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  const touristTaxTotal = guests * totalNights * pricing.touristTax;
  const subtotal = totalAccommodation + pricing.cleaningFee;
  const total = subtotal + touristTaxTotal;
  
  return {
    nights: totalNights,
    accommodationTotal: totalAccommodation,
    cleaningFee: pricing.cleaningFee,
    touristTax: touristTaxTotal,
    subtotal,
    total,
    breakdown: nightlyBreakdown,
    averagePerNight: Math.round(totalAccommodation / totalNights)
  };
};

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const getSeasonLabel = (season: 'high' | 'low', language: 'it' | 'en' = 'it'): string => {
  if (language === 'en') {
    return season === 'high' ? 'High Season' : 'Low Season';
  }
  return season === 'high' ? 'Alta Stagione' : 'Bassa Stagione';
};