# Villa Azzurra - Sito Web Casa Vacanze

Un sito web moderno e responsive per case vacanze, completamente personalizzabile e ottimizzato per il settore turistico.

## 🏡 Caratteristiche

### Funzionalità Principali
- **Homepage accattivante** con hero section e contenuti coinvolgenti
- **Galleria fotografica interattiva** con lightbox e slideshow
- **Sistema di prenotazione** con moduli di contatto integrati
- **Calendario disponibilità** interattivo e facilmente aggiornabile
- **Mappa di localizzazione** con attrazioni vicine
- **Sezione recensioni** per testimonianze clienti
- **Design responsive** ottimizzato per tutti i dispositivi
- **Supporto multilingua** (Italiano/Inglese)
- **SEO ottimizzato** con meta tag e structured data
- **GDPR compliant** con banner cookie

### Design e UX
- Design moderno in stile "hospitality"
- Palette colori personalizzabile
- Animazioni sottili e micro-interazioni
- Typography professionale e leggibile
- Layout mobile-first responsive
- Accessibilità e performance ottimizzate

## 🚀 Personalizzazione

### Contenuti
Tutti i contenuti sono centralizzati nel file `src/data/content.ts`:
- Testi in italiano e inglese
- Informazioni di contatto
- Dati aziendali
- Link social media
- Configurazioni specifiche

### Styling
Il sistema di colori è facilmente personalizzabile tramite CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #2563eb; /* Colore principale */
  --secondary-color: #14b8a6; /* Colore secondario */
  --accent-color: #f97316; /* Colore accent */
}
```

### Immagini
- Utilizzate immagini stock da Pexels come placeholder
- Facilmente sostituibili con foto reali della proprietà
- Ottimizzate per il web e responsive

## 📱 Responsive Design

- **Mobile** (< 768px): Layout stack verticale, menu hamburger
- **Tablet** (768px - 1024px): Layout ibrido ottimizzato
- **Desktop** (> 1024px): Layout completo con sidebar

## 🌐 SEO e Performance

### Ottimizzazioni SEO
- Meta tag ottimizzati per ogni sezione
- Structured data per motori di ricerca
- URL semantici e navigazione intuitiva
- Sitemap e robots.txt ready

### Performance
- Lazy loading per immagini
- CSS e JS ottimizzati
- Preload di risorse critiche
- Bundle splitting per caricamento rapido

## 🔧 Tecnologie Utilizzate

- **React 18** con TypeScript
- **Tailwind CSS** per styling responsive
- **Vite** per build system veloce
- **Lucide React** per iconografia
- **ESLint** per code quality

## 📋 Installazione e Setup

1. Clona il repository
2. Installa le dipendenze: `npm install`
3. **Configura Firebase**:
   - Vai su https://console.firebase.google.com
   - Crea un nuovo progetto
   - Abilita Firestore Database
   - Copia le credenziali in `src/config/firebase.ts`
4. Avvia il server di sviluppo: `npm run dev`
5. Build per produzione: `npm run build`

## 🎨 Personalizzazione per Nuovi Clienti

### Step Rapidi:
1. **Modifica contenuti**: Aggiorna `src/data/content.ts`
2. **Sostituisci immagini**: Cambia URL in gallery e hero
3. **Configura Firebase**: Imposta le tue credenziali
4. **Personalizza colori**: Modifica CSS variables
5. **Aggiorna SEO**: Modifica meta tag in `index.html`
6. **Configura contatti**: Imposta email e telefono
7. **Deploy**: Build e carica su hosting

### Integrazioni Esterne
- **Firebase Firestore** (Implementato): 
  - Database NoSQL gratuito per salvare prenotazioni e contatti
  - Setup: 10 minuti, gratuito fino a 50k letture/giorno
  - Configurazione in `src/config/firebase.ts`
  - Dashboard web per visualizzare richieste
  - Backup automatico e sicurezza integrata

- **Sistema Prenotazioni Avanzato**:
  - **Calendly**: Integrazione calendario prenotazioni
  - **Booking.com API**: Sincronizzazione disponibilità
  - **iCal**: Import/export calendario da Airbnb/VRBO
  - **Database**: MySQL/PostgreSQL per gestione prenotazioni

- **Pagamenti Online**:
  - **Stripe**: Gateway pagamenti sicuro e professionale
  - **PayPal**: Alternativa popolare per pagamenti
  - **Bonifico**: Istruzioni automatiche via email

- **Altre Integrazioni**:
  - **Google Maps**: Sostituire placeholder con API key reale
  - **Google Analytics**: Tracking visite e conversioni
  - **WhatsApp Business**: Chat diretta con clienti
  - **Recensioni**: Import automatico da Airbnb/Booking.com

## 🔥 Firebase Setup Dettagliato

1. **Crea Progetto Firebase**:
   - Vai su https://console.firebase.google.com
   - Clicca "Aggiungi progetto"
   - Inserisci nome progetto (es: "villa-azzurra-bookings")
   - Disabilita Google Analytics (opzionale)

2. **Configura Firestore**:
   - Nel menu laterale, vai su "Firestore Database"
   - Clicca "Crea database"
   - Scegli "Inizia in modalità test" (per sviluppo)
   - Seleziona una regione (es: europe-west1)

3. **Ottieni Credenziali**:
   - Vai su "Impostazioni progetto" (icona ingranaggio)
   - Scorri fino a "Le tue app"
   - Clicca "Aggiungi app" > "Web"
   - Registra l'app con un nome
   - Copia la configurazione e incollala in `src/config/firebase.ts`

4. **Visualizza Richieste**:
   - Le prenotazioni saranno salvate nella collezione `booking-requests`
   - I messaggi di contatto in `contact-messages`
   - Puoi visualizzarli nella console Firebase

5. **Regole di Sicurezza** (per produzione):
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /booking-requests/{document} {
         allow create: if true;
         allow read, update, delete: if false;
       }
       match /contact-messages/{document} {
         allow create: if true;
         allow read, update, delete: if false;
       }
     }
   }
   ```

## 🎯 Sistema Admin Completo

### **Dashboard Admin Features:**
- **Login sicuro**: Username: `admin`, Password: `villa2024`
- **Metriche in tempo reale**: Prenotazioni, contatti, status
- **Grafici avanzati**: Trend mensili, distribuzione status
- **Gestione prenotazioni**: Cambia status, elimina, visualizza dettagli
- **Gestione contatti**: Visualizza messaggi, marca come letti
- **Calendario iCal**: Sincronizzazione con Booking.com/Airbnb
- **Export dati**: Scarica calendario in formato .ics

### **Accesso Admin:**
- URL: `https://tuosito.com/admin`
- Credenziali demo: `admin` / `villa2024`
- Sessione persistente con localStorage

### **Funzionalità Avanzate:**

**📧 Email Automatiche:**
- Conferma automatica per ogni prenotazione
- Email di ringraziamento per contatti
- Template personalizzabili
- ID univoco per tracking

**📅 Sincronizzazione iCal:**
- Export calendario prenotazioni confermate
- Formato standard .ics
- Compatibile con Booking.com, Airbnb, Google Calendar
- Aggiornamento automatico status

**📊 Analytics Avanzate:**
- Grafici trend prenotazioni mensili
- Distribuzione status (torta)
- Metriche KPI in tempo reale
- Confronto confermate vs totali

**🔄 Workflow Gestione:**
1. **Nuova prenotazione** → Status "In Attesa"
2. **Admin conferma** → Status "Confermata" → Export iCal
3. **Sincronizza** → Booking.com/Airbnb aggiornati
4. **Check-out** → Status "Completata"

### **Setup Produzione:**

**Autenticazione Sicura:**
```javascript
// Sostituire con Firebase Auth
import { signInWithEmailAndPassword } from 'firebase/auth';
```

**Email Service (Raccomandato):**
- **SendGrid**: 100 email/giorno gratis
- **Mailgun**: 5000 email/mese gratis  
- **AWS SES**: $0.10 per 1000 email

**Notifiche Push:**
- **Firebase Cloud Messaging**
- **Telegram Bot** per notifiche istantanee
- **WhatsApp Business API**

## 📄 GDPR e Privacy

- Banner cookie conforme GDPR
- Link a Privacy Policy e Cookie Policy
- Gestione consensi localStorage
- Form con checkbox privacy obbligatoria

## 🔒 Sicurezza

- Sanitizzazione input form
- Protezione XSS
- Headers di sicurezza
- HTTPS ready

## 📈 Analytics e Monitoraggio

Pronto per integrazione con:
- Google Analytics 4
- Google Search Console
- Facebook Pixel
- Hotjar/Clarity per heatmaps

## 🌍 Multilingua

Sistema di internazionalizzazione integrato:
- Italiano e Inglese inclusi
- Facilmente estendibile per altre lingue
- Switching lingua dinamico
- SEO ottimizzato per ogni lingua

---

**Nota**: Questo è un template base completamente personalizzabile. Per integrazioni avanzate (pagamenti, booking engine, CMS) contattare per sviluppo custom.