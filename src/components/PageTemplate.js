import React from 'react';
import './PageTemplate.css';

/**
 * Composant générique pour toutes les pages du site
 * 
 * Ce composant fournit :
 * - Une structure de page standardisée
 * - Un titre principal et un sous-titre
 * - Une zone de contenu principale
 * - Un design cohérent avec le reste du site
 * 
 * @param {string} title - Titre principal de la page
 * @param {string} subtitle - Sous-titre optionnel
 * @param {React.ReactNode} children - Contenu de la page
 * @param {string} className - Classes CSS additionnelles
 */
const PageTemplate = ({ title, subtitle, children, className = '' }) => {
  return (
    <div className={`page-template ${className}`}>
      {/* En-tête de la page avec titre et sous-titre */}
      <div className="page-header">
        <div className="container">
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>

      {/* Contenu principal de la page */}
      <div className="page-content">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
