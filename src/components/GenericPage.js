import React from 'react';
import PageTemplate from './PageTemplate';

/**
 * Page générique simplifiée pour tous les éléments du menu
 * 
 * Cette page affiche le titre et permet à l'utilisateur d'ajouter le contenu
 * Structure standardisée pour toutes les pages du menu
 * 
 * @param {string} title - Titre de la page
 * @param {string} subtitle - Sous-titre optionnel
 */
const GenericPage = ({ title, subtitle }) => {
  return (
    <PageTemplate 
      title={title} 
      subtitle={subtitle || `Page ${title} - Contenu à ajouter`}
    >
      <div className="content-card">
        <h2>{title}</h2>
        <p>
          Cette page est prête pour votre contenu. Vous pouvez maintenant ajouter :
        </p>
        <ul>
          <li>Description détaillée du service/programme</li>
          <li>Processus étape par étape</li>
          <li>Exigences et critères d'éligibilité</li>
          <li>Tarifs et modalités</li>
          <li>FAQ et conseils</li>
          <li>Liens vers d'autres ressources</li>
        </ul>
      </div>

      <div className="content-card">
        <h2>Informations Générales</h2>
        <p>
          <strong>Statut :</strong> Page créée et prête pour le contenu<br/>
          <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR')}<br/>
          <strong>Prochaine étape :</strong> Ajouter le contenu spécifique
        </p>
      </div>

      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <a href="/appointment" className="action-button">
          Prendre un Rendez-vous
        </a>
        <a href="/contact" className="action-button">
          Nous Contacter
        </a>
      </div>
    </PageTemplate>
  );
};

export default GenericPage;