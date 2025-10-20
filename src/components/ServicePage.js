import React from 'react';
import Page from './Page';
import '../pages/Pages.css';

const ServicePage = ({ serviceNumber, subServiceNumber, title, description }) => {
  return (
    <Page title={title}>
      <div className="service-page-content">
        <div className="service-intro">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        
        <div className="service-details">
          <div className="service-info">
            <h3>Informations sur le Service</h3>
            <div className="info-grid">
              <div className="info-item">
                <h4>Service Principal</h4>
                <p>Service {serviceNumber}</p>
              </div>
              <div className="info-item">
                <h4>Sous-Service</h4>
                <p>Service {serviceNumber}.{subServiceNumber}</p>
              </div>
              <div className="info-item">
                <h4>Durée</h4>
                <p>2-4 semaines</p>
              </div>
              <div className="info-item">
                <h4>Prix</h4>
                <p>À partir de 299$ CAD</p>
              </div>
            </div>
          </div>
          
          <div className="service-process">
            <h3>Processus</h3>
            <div className="process-steps">
              <div className="step">
                <div className="step-number">1</div>
                <h4>Consultation Initiale</h4>
                <p>Évaluation de vos besoins et conseils personnalisés.</p>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <h4>Préparation</h4>
                <p>Rassemblement et préparation de tous les documents.</p>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <h4>Soumission</h4>
                <p>Dépôt de votre demande avec suivi complet.</p>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <h4>Suivi</h4>
                <p>Accompagnement jusqu'à l'obtention du résultat.</p>
              </div>
            </div>
          </div>
          
          <div className="service-benefits">
            <h3>Avantages</h3>
            <div className="benefits-list">
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Service personnalisé</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Suivi complet</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Expertise professionnelle</span>
              </div>
              <div className="benefit-item">
                <span className="benefit-icon">✓</span>
                <span>Garantie de satisfaction</span>
              </div>
            </div>
          </div>
          
          <div className="service-cta">
            <button className="cta-button">
              Demander un Devis
            </button>
            <button className="secondary-button">
              Contactez-nous
            </button>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ServicePage;
