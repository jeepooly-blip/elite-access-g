import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        services: 'Expertise',
        portfolio: 'Portfolio',
        concierge: 'Concierge',
        login: 'Member Entry'
      },
      hero: {
        title: 'Excellence Without Compromise',
        subtitle: 'Premier luxury concierge service offering exclusive VIP access to the world\'s most prestigious events - F1 Paddock Club, Wimbledon, Royal Ascot, and the Monaco Grand Prix.',
        cta: 'Request Access'
      },
      concierge: {
        title: 'Bespoke Concierge',
        subtitle: 'Our specialists are at your disposal to fulfill any request, from private aviation to exclusive event access, anywhere in the world.',
        form: {
          name: 'Name',
          email: 'Email',
          service: 'Sector',
          message: 'Requirements',
          submit: 'Signal Concierge',
          success: 'Transmission received. Our acquisitions team will contact you shortly.'
        }
      }
    }
  },
  fr: {
    translation: {
      nav: {
        services: 'Expertise',
        portfolio: 'Portfolio',
        concierge: 'Concierge',
        login: 'Accès Membre'
      },
      hero: {
        title: 'L\'Excellence Sans Compromis',
        subtitle: 'Service de conciergerie de luxe offrant un accès VIP exclusif aux événements les plus prestigieux au monde - F1 Paddock Club, Wimbledon, Royal Ascot et le Grand Prix de Monaco.',
        cta: 'Demander l\'Accès'
      },
      concierge: {
        title: 'Conciergerie Sur Mesure',
        subtitle: 'Nos spécialistes sont à votre disposition pour répondre à toutes vos demandes, de l\'aviation privée à l\'accès exclusif aux événements, partout dans le monde.',
        form: {
          name: 'Nom',
          email: 'Email',
          service: 'Secteur',
          message: 'Exigences',
          submit: 'Signaler la Conciergerie',
          success: 'Transmission reçue. Notre équipe d\'acquisitions vous contactera sous peu.'
        }
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
