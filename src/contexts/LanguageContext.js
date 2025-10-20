import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('fr');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'fr' ? 'en' : 'fr');
  };

  const translations = {
    fr: {
      home: 'Accueil',
      visa: 'Visa',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact',
      search: 'Rechercher...',
      welcome: 'Bienvenue chez Immigway Visa Agency',
      description: 'Votre partenaire de confiance pour tous vos besoins d\'immigration et de visa.',
      mainServices: 'Nos Services Principaux',
      greenCard: 'Demande de Green Card',
      greenCardDesc: 'Assistance complète pour votre demande de résidence permanente aux États-Unis.',
      ptePrep: 'Préparation PTE',
      ptePrepDesc: 'Formation intensive pour réussir votre test d\'anglais PTE Academic.',
      toeflPrep: 'Préparation TOEFL',
      toeflPrepDesc: 'Préparation complète pour votre test TOEFL avec nos experts.',
      getStarted: 'Commencer',
      aboutUs: 'À Propos de Notre Entreprise',
      aboutTitle: 'Nous aidons à transformer vos rêves en réalité',
      aboutDesc: 'Immigway Visa Consultancy a été créé pour fournir des services premium uniques dans le monde de l\'éducation et de la migration.',
      visaEligibility: 'Vérification de toutes les éligibilités Visa',
      examFacilitation: 'Facilitation d\'examens approuvés',
      fastestProcessing: 'Traitement de formulaire Visa le plus rapide avec des agents d\'immigration experts',
      educationalAffiliation: 'Affiliation avec des institutions éducatives du monde entier'
    },
    en: {
      home: 'Home',
      visa: 'Visa',
      services: 'Services',
      blog: 'Blog',
      contact: 'Contact',
      search: 'Search...',
      welcome: 'Welcome to Immigway Visa Agency',
      description: 'Your trusted partner for all your immigration and visa needs.',
      mainServices: 'Our Main Services',
      greenCard: 'Green Card Application',
      greenCardDesc: 'Complete assistance for your permanent residence application in the United States.',
      ptePrep: 'PTE Preparation',
      ptePrepDesc: 'Intensive training to pass your PTE Academic English test.',
      toeflPrep: 'TOEFL Preparation',
      toeflPrepDesc: 'Complete preparation for your TOEFL test with our experts.',
      getStarted: 'Get Started',
      aboutUs: 'About Our Company',
      aboutTitle: 'We help Making your dream into Reality',
      aboutDesc: 'Immigway Visa Consultancy was created to provide uniquely designed premium services in the world of education and migration.',
      visaEligibility: 'Checking all Visa Eligibilities',
      examFacilitation: 'Approved Exam Facilitation',
      fastestProcessing: 'Fastest Visa form processing with expert immigration agents',
      educationalAffiliation: 'Affiliation with Educational Institutions from over the world'
    }
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
