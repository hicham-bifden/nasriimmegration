import React from 'react';
import Page from '../components/Page';
import './Pages.css';

const VisaPage = () => {
  return (
    <Page title="Services Visa">
      <div className="visa-content">
        <div className="visa-intro">
          <h2>Nos Services Visa</h2>
          <p>Nous offrons une gamme complète de services visa pour vous accompagner dans votre projet d'immigration.</p>
        </div>
        
        <div className="visa-types">
          <h3>Types de Visas</h3>
          <div className="visa-grid">
            <div className="visa-card">
              <h4>Visa Touristique</h4>
              <p>Visa B-1/B-2 pour les voyages touristiques et d'affaires aux États-Unis.</p>
            </div>
            <div className="visa-card">
              <h4>Visa Étudiant</h4>
              <p>Visa F-1 pour les études aux États-Unis dans des institutions accréditées.</p>
            </div>
            <div className="visa-card">
              <h4>Visa Travail</h4>
              <p>Visa H-1B pour les travailleurs spécialisés aux États-Unis.</p>
            </div>
            <div className="visa-card">
              <h4>Visa Famille</h4>
              <p>Visa de regroupement familial pour rejoindre vos proches aux États-Unis.</p>
            </div>
          </div>
        </div>
        
        <div className="visa-process">
          <h3>Notre Processus</h3>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <h4>Consultation</h4>
              <p>Évaluation de votre situation et conseils personnalisés.</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h4>Préparation</h4>
              <p>Rassemblement et préparation de tous les documents nécessaires.</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h4>Soumission</h4>
              <p>Dépôt de votre demande avec suivi complet du processus.</p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h4>Suivi</h4>
              <p>Accompagnement jusqu'à l'obtention de votre visa.</p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default VisaPage;
