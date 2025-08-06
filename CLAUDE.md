# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React TypeScript vacation rental website for "Villa Azzurra" - a Tuscan villa booking platform. The application features a multilingual (Italian/English) frontend with Firebase backend for booking management and an admin dashboard.

## Development Commands

- `npm run dev` - Start development server (Vite on port 5173)
- `npm run build` - Build for production using Vite
- `npm run lint` - Run ESLint for code quality checks
- `npm run preview` - Preview production build locally

## Code Quality
- Run `npm run lint` before commits to ensure code quality
- TypeScript strict mode is enabled for type safety
- ESLint configured with React hooks and refresh plugins

## Architecture Overview

### Frontend Structure
- **Single Page Application** built with React 18 + TypeScript
- **Routing**: React Router v7 with `/` (main site) and `/admin` (dashboard) routes
- **Styling**: Tailwind CSS for responsive design
- **Build Tool**: Vite for fast development and optimized builds

### Component Architecture
- **App.tsx**: Main application with React Router, language state (`'it' | 'en'`), and admin authentication via localStorage
- **Components**: 13 modular page section components in `/src/components/`
  - Main site: Header, Hero, About, Gallery, Services, Calendar, Booking, Reviews, Location, Contact, Footer, CookieBanner
  - Admin: AdminLogin, AdminDashboard
- **Data Layer**: Centralized multilingual content in `/src/data/content.ts` with `siteConfig` and `content` objects
- **Services**: Firebase Firestore operations in `/src/services/bookingService.ts` with TypeScript interfaces
- **Utils**: Seasonal pricing calculations in `/src/utils/pricingUtils.ts`

### Backend Integration
- **Firebase Firestore**: NoSQL database for bookings and contact messages
- **Collections**: `booking-requests` and `contact-messages`
- **Real-time Updates**: Admin dashboard with live data synchronization
- **iCal Export**: Generate calendar feeds for external booking platforms

### Admin System
- **Authentication**: Simple localStorage-based admin login (admin/villa2024)
- **Dashboard**: Complete booking management with status updates, analytics, and iCal export
- **Status Management**: booking statuses (pending, confirmed, cancelled, completed)

## Key Configuration Files

- **Firebase Config**: `src/config/firebase.ts` - Contains Firebase credentials
- **Content Management**: `src/data/content.ts` - All multilingual text content
- **Pricing Logic**: `src/utils/pricingUtils.ts` - Rate calculations for bookings
- **Tailwind Config**: `tailwind.config.js` - Custom styling configuration

## Firebase Setup

The project uses Firebase Firestore for data persistence. Configuration details are in `FIREBASE_SETUP.md`. Key points:
- Production Firebase project is already configured
- Security rules allow public creation, admin management
- Collections are created automatically on first use

## Development Patterns

- **No Tests**: Project doesn't include test framework setup (Jest, Vitest, etc. not configured)
- **Language Pattern**: Pass `currentLanguage: 'it' | 'en'` prop to all components for i18n
- **Component Props**: All main components follow pattern: `({ currentLanguage }: { currentLanguage: 'it' | 'en' })`
- **Content Access**: Use `content.section[currentLanguage].property` pattern for multilingual text
- **State Management**: Simple useState for language and admin auth, no external state library
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints (sm:, md:, lg:, xl:)
- **Icons**: Uses Lucide React icon library throughout
- **Date Handling**: date-fns v4 for date operations and formatting
- **TypeScript**: Strict typing with interfaces for Firebase data models

## Content Customization

All content is centralized in `src/data/content.ts` for easy customization:
- Site information and contact details
- Navigation labels in both languages
- Section content for all page components
- Business information and pricing

## Admin Dashboard Features

- **Authentication**: Username `admin`, Password `villa2024` (localStorage-based)
- **Real-time Data**: Live Firebase Firestore synchronization for bookings and contacts
- **Analytics**: Recharts visualization with booking trends and status distribution
- **Booking Management**: Change status (pending → confirmed → completed), delete bookings
- **Contact Management**: View messages, mark as read/unread
- **iCal Export**: Generate .ics calendar files for external platform synchronization
- **Status Workflow**: pending → confirmed → cancelled/completed
- **Data Export**: Download booking data for external systems

## Key Dependencies

- **React 18** with TypeScript for UI
- **React Router DOM v7** for routing
- **Firebase v12** for backend (Firestore only, no Auth)  
- **Tailwind CSS v3** for styling (no custom CSS variables)
- **Lucide React** for icons
- **Recharts v3** for admin analytics charts
- **date-fns v4** for date manipulation
- **Vite v5** for build tooling