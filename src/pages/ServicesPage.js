import React from 'react';
import PageTemplate from '../components/PageTemplate';

/**
 * Page Services - Services d'immigration
 * 
 * Cette page présente les différents services d'immigration offerts par IMMIGWAY :
 * - Immigration Consulting Services
 * - Full Immigration Representation  
 * - GCMS Notes
 * 
 * Chaque service est présenté avec une description détaillée et un appel à l'action.
 */
const ServicesPage = () => {
  return (
    <PageTemplate 
      title="Services d'Immigration" 
      subtitle="Des services professionnels pour votre parcours d'immigration au Canada"
    >
      <div className="content-card">
        <h2>Nos Services d'Immigration</h2>
        <p>
          Chez IMMIGWAY, nous offrons une gamme complète de services d'immigration 
          pour vous accompagner dans votre projet de vie au Canada. Nos experts 
          certifiés vous guident à chaque étape du processus.
        </p>
      </div>

      <div className="feature-list">
        <div className="feature-item">
          <h4>Immigration Consulting Services</h4>
          <p>
            Consultation personnalisée pour évaluer votre éligibilité aux différents 
            programmes d'immigration canadienne. Nous analysons votre profil et vous 
            recommandons la meilleure stratégie.
          </p>
          <a href="/services/immigration-consulting" className="action-button">
            En savoir plus
          </a>
        </div>

        <div className="feature-item">
          <h4>Full Immigration Representation</h4>
          <p>
            Représentation complète pour votre dossier d'immigration. Nous nous 
            occupons de toute la paperasserie, des démarches administratives et 
            du suivi de votre dossier.
          </p>
          <a href="/services/full-representation" className="action-button">
            En savoir plus
          </a>
        </div>

        <div className="feature-item">
          <h4>GCMS Notes</h4>
          <p>
            Accès aux notes GCMS (Global Case Management System) pour suivre l'état 
            de votre dossier d'immigration. Transparence totale sur le processus 
            de traitement.
          </p>
          <a href="/services/gcms-notes" className="action-button">
            En savoir plus
          </a>
        </div>
      </div>

      <div className="content-card">
        <h2>Pourquoi Choisir IMMIGWAY ?</h2>
        <ul>
          <li><strong>Expertise certifiée :</strong> Nos consultants sont certifiés par l'ICCRC</li>
          <li><strong>Taux de réussite élevé :</strong> Plus de 95% de nos dossiers sont approuvés</li>
          <li><strong>Suivi personnalisé :</strong> Un consultant dédié à votre dossier</li>
          <li><strong>Transparence :</strong> Communication régulière sur l'avancement</li>
          <li><strong>Support multilingue :</strong> Service en français et en anglais</li>
        </ul>
      </div>
    </PageTemplate>
  );
};

export default ServicesPage;