import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDocs, query, orderBy, where, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { calculateStayTotal } from '../utils/pricingUtils';

export interface BookingData {
  checkin: string;
  checkout: string;
  guests: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  totalAmount?: number;
  priceBreakdown?: any;
}

export interface ContactData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface BookingRecord extends BookingData {
  id: string;
  timestamp: any;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  type: 'booking';
}

export interface ContactRecord extends ContactData {
  id: string;
  timestamp: any;
  status: 'unread' | 'read' | 'replied';
  type: 'contact';
}

// Salva richiesta di prenotazione su Firebase
export const saveBookingRequest = async (bookingData: BookingData) => {
  try {
    // Calcola il prezzo totale
    let enhancedBookingData = { ...bookingData };
    
    if (bookingData.checkin && bookingData.checkout && bookingData.guests) {
      try {
        const priceCalculation = calculateStayTotal(
          bookingData.checkin,
          bookingData.checkout,
          parseInt(bookingData.guests)
        );
        enhancedBookingData.totalAmount = priceCalculation.total;
        enhancedBookingData.priceBreakdown = priceCalculation;
      } catch (error) {
        console.warn('Errore calcolo prezzo:', error);
      }
    }
    
    const docRef = await addDoc(collection(db, 'booking-requests'), {
      ...enhancedBookingData,
      timestamp: serverTimestamp(),
      status: 'pending',
      type: 'booking'
    });
    
    console.log('Prenotazione salvata con ID:', docRef.id);
    
    // Invia email automatica di conferma
    await sendAutoReply(bookingData, docRef.id);
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Errore nel salvare la prenotazione:', error);
    return { success: false, error };
  }
};

// Salva messaggio di contatto su Firebase
export const saveContactMessage = async (contactData: ContactData) => {
  try {
    const docRef = await addDoc(collection(db, 'contact-messages'), {
      ...contactData,
      timestamp: serverTimestamp(),
      status: 'unread',
      type: 'contact'
    });
    
    console.log('Messaggio salvato con ID:', docRef.id);
    
    // Invia email automatica di conferma
    await sendContactAutoReply(contactData, docRef.id);
    
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Errore nel salvare il messaggio:', error);
    return { success: false, error };
  }
};

// Funzioni per Admin Dashboard
export const getAllBookings = async (): Promise<BookingRecord[]> => {
  try {
    const q = query(collection(db, 'booking-requests'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as BookingRecord));
  } catch (error) {
    console.error('Errore nel recuperare le prenotazioni:', error);
    return [];
  }
};

export const getAllContacts = async (): Promise<ContactRecord[]> => {
  try {
    const q = query(collection(db, 'contact-messages'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ContactRecord));
  } catch (error) {
    console.error('Errore nel recuperare i contatti:', error);
    return [];
  }
};

export const updateBookingStatus = async (id: string, status: BookingRecord['status']) => {
  try {
    await updateDoc(doc(db, 'booking-requests', id), { status });
    return { success: true };
  } catch (error) {
    console.error('Errore nell\'aggiornare lo status:', error);
    return { success: false, error };
  }
};

export const deleteBooking = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'booking-requests', id));
    return { success: true };
  } catch (error) {
    console.error('Errore nell\'eliminare la prenotazione:', error);
    return { success: false, error };
  }
};

// Email automatiche
const sendAutoReply = async (bookingData: BookingData, bookingId: string) => {
  try {
    // Qui implementeresti l'invio email tramite servizio esterno
    // Per ora simuliamo con console.log
    console.log('📧 Email automatica inviata per prenotazione:', bookingId);
    
    const emailContent = `
Gentile ${bookingData.name},

Grazie per aver scelto Villa Azzurra!

Abbiamo ricevuto la sua richiesta di prenotazione:
- Check-in: ${bookingData.checkin}
- Check-out: ${bookingData.checkout}
- Ospiti: ${bookingData.guests}
- ID Richiesta: ${bookingId}

La contatteremo entro 24 ore per confermare la disponibilità.

Cordiali saluti,
Team Villa Azzurra
    `;
    
    // In produzione, qui useresti un servizio email come SendGrid, Mailgun, etc.
    return { success: true };
  } catch (error) {
    console.error('Errore invio email automatica:', error);
    return { success: false };
  }
};

const sendContactAutoReply = async (contactData: ContactData, contactId: string) => {
  try {
    console.log('📧 Email automatica inviata per contatto:', contactId);
    
    const emailContent = `
Gentile ${contactData.name},

Grazie per averci contattato!

Abbiamo ricevuto il suo messaggio riguardo: "${contactData.subject}"
ID Messaggio: ${contactId}

Le risponderemo al più presto.

Cordiali saluti,
Team Villa Azzurra
    `;
    
    return { success: true };
  } catch (error) {
    console.error('Errore invio email automatica contatto:', error);
    return { success: false };
  }
};

// Generazione iCal per sincronizzazione
export const generateICalFeed = (bookings: BookingRecord[]): string => {
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed');
  
  let icalContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Villa Azzurra//Booking Calendar//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
`;

  confirmedBookings.forEach(booking => {
    const startDate = booking.checkin.replace(/-/g, '');
    const endDate = booking.checkout.replace(/-/g, '');
    
    icalContent += `BEGIN:VEVENT
UID:${booking.id}@villaazzurra.com
DTSTART;VALUE=DATE:${startDate}
DTEND;VALUE=DATE:${endDate}
SUMMARY:Prenotazione - ${booking.name}
DESCRIPTION:Ospiti: ${booking.guests}\\nEmail: ${booking.email}\\nTelefono: ${booking.phone}
STATUS:CONFIRMED
TRANSP:OPAQUE
END:VEVENT
`;
  });

  icalContent += 'END:VCALENDAR';
  return icalContent;
};