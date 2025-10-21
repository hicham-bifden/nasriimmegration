import React from 'react';
import PageTemplate from '../components/PageTemplate';
import SwiperComponent from '../components/Swiper';
import './Pages.css';

const HomePage = () => {
  return (
    <PageTemplate title="Accueil">
      {/* Slider avec Swiper */}
      <SwiperComponent />
      
      <div className="home-content">
        <div className="welcome-section">
          <h2>Bienvenue chez Immigway Visa Agency</h2>
          <p>Votre partenaire de confiance pour tous vos besoins d'immigration et de visa.</p>
        </div>
        
        <div className="services-overview">
          <h3>Nos Services Principaux</h3>
          <div className="services-grid">
            <div className="service-card">
              <h4>Demande de Green Card</h4>
              <p>Assistance complète pour votre demande de résidence permanente aux États-Unis.</p>
            </div>
            <div className="service-card">
              <h4>Préparation PTE</h4>
              <p>Formation intensive pour réussir votre test d'anglais PTE Academic.</p>
            </div>
            <div className="service-card">
              <h4>Préparation TOEFL</h4>
              <p>Préparation complète pour votre test TOEFL avec nos experts.</p>
            </div>
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default HomePage;
