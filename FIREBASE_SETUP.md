# 🔥 GUIDA SETUP FIREBASE - PASSO PASSO

## 📋 STEP 1: Crea Progetto Firebase

1. **Vai su** https://console.firebase.google.com
2. **Clicca** "Aggiungi progetto" 
3. **Nome progetto**: `villa-azzurra-bookings` (o il nome che preferisci)
4. **Google Analytics**: Disabilita (non necessario per ora)
5. **Clicca** "Crea progetto"
6. **Attendi** la creazione (1-2 minuti)

## 📊 STEP 2: Configura Firestore Database

1. **Nel menu laterale** → "Firestore Database"
2. **Clicca** "Crea database"
3. **Modalità**: Seleziona "Inizia in modalità test" 
4. **Regione**: Scegli `europe-west1` (Amsterdam) per l'Europa
5. **Clicca** "Fine"
6. **Attendi** la configurazione (30 secondi)

## 🔑 STEP 3: Ottieni Credenziali Web App

1. **Vai su** "Impostazioni progetto" (icona ingranaggio in alto a sinistra)
2. **Scorri giù** fino a "Le tue app"
3. **Clicca** l'icona `</>` (Web)
4. **Nome app**: `Villa Azzurra Website`
5. **NON** spuntare "Configura anche Firebase Hosting"
6. **Clicca** "Registra app"
7. **COPIA** tutto il codice di configurazione che appare

## 📝 STEP 4: Incolla Credenziali nel Codice

Prendi il codice che hai copiato (simile a questo):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "villa-azzurra-bookings.firebaseapp.com",
  projectId: "villa-azzurra-bookings",
  storageBucket: "villa-azzurra-bookings.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

E sostituiscilo nel file `src/config/firebase.ts` del progetto.

## 🔒 STEP 5: Configura Regole di Sicurezza (IMPORTANTE!)

1. **In Firestore** → "Regole"
2. **Sostituisci** il contenuto con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permetti creazione pubblica e gestione admin delle prenotazioni
    match /booking-requests/{document} {
      allow create: if true;
      allow read, update, delete: if true;
    }
    
    // Permetti creazione pubblica e gestione admin dei messaggi
    match /contact-messages/{document} {
      allow create: if true;
      allow read, update, delete: if true;
    }
  }
}
```

3. **Clicca** "Pubblica"

## ✅ STEP 6: Test del Sistema

1. **Ricarica** il sito web
2. **Vai alla sezione** "Prenota il tuo Soggiorno"
3. **Compila** il form di test
4. **Invia** la richiesta
5. **Controlla Firebase** → Firestore Database
6. **Dovresti vedere** la collezione `booking-requests` con i dati

## 🔐 STEP 7: Accedi all'Admin Dashboard

1. **Vai su** `/admin` nel tuo sito
2. **Login**: 
   - Username: `admin`
   - Password: `villa2024`
3. **Dovresti vedere** la dashboard con le prenotazioni

## 📧 STEP 8: Email Automatiche (Opzionale - Produzione)

Per ora le email sono simulate (console.log). Per email reali:

1. **Integra SendGrid** (100 email/giorno gratis)
2. **O usa Firebase Functions** con Nodemailer
3. **O integra servizio SMTP** del tuo hosting

## 🎯 COSA OTTERRAI:

✅ **Database sicuro** per prenotazioni e contatti  
✅ **Dashboard admin** per gestire tutto  
✅ **Backup automatico** dei dati  
✅ **Scalabilità** fino a 50k operazioni/giorno gratis  
✅ **Sincronizzazione iCal** per Booking/Airbnb  
✅ **Metriche e grafici** in tempo reale  

## 🚨 LIMITI GRATUITI FIREBASE:

- **50.000 letture/giorno**
- **20.000 scritture/giorno** 
- **20.000 cancellazioni/giorno**
- **1 GB storage**

Per una casa vacanze normale, questi limiti sono più che sufficienti!

## 🆘 PROBLEMI COMUNI:

**❌ "Permission denied"**
→ Controlla le regole di sicurezza (Step 5)

**❌ "Firebase not initialized"** 
→ Verifica le credenziali in `src/config/firebase.ts`

**❌ "Collection doesn't exist"**
→ Normale! Si crea automaticamente alla prima prenotazione

---

**🎉 Una volta completato, avrai un sistema di prenotazioni professionale completamente funzionante!**