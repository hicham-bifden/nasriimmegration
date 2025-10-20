import React from 'react';
import Page from '../components/Page';
import './Pages.css';

const BlogPage = () => {
  return (
    <Page title="Blog & Actualités">
      <div className="blog-content">
        <div className="blog-intro">
          <h2>Blog & Actualités</h2>
          <p>Restez informé des dernières nouvelles en immigration et découvrez nos conseils d'experts.</p>
        </div>
        
        <div className="blog-categories">
          <div className="category-section">
            <h3>Actualités Immigration</h3>
            <div className="blog-posts">
              <div className="blog-post">
                <h4>Nouvelles Règles de Visa 2024</h4>
                <p>Découvrez les dernières modifications dans les politiques d'immigration américaines.</p>
                <span className="post-date">15 Octobre 2024</span>
              </div>
              <div className="blog-post">
                <h4>Changements dans le Processus Green Card</h4>
                <p>Les nouvelles procédures pour la demande de résidence permanente.</p>
                <span className="post-date">10 Octobre 2024</span>
              </div>
            </div>
          </div>
          
          <div className="category-section">
            <h3>Conseils d'Experts</h3>
            <div className="blog-posts">
              <div className="blog-post">
                <h4>Comment Préparer Votre Entretien Visa</h4>
                <p>Nos conseils pour réussir votre entretien à l'ambassade ou au consulat.</p>
                <span className="post-date">8 Octobre 2024</span>
              </div>
              <div className="blog-post">
                <h4>Documents Essentiels pour Votre Demande</h4>
                <p>La liste complète des documents nécessaires pour votre dossier d'immigration.</p>
                <span className="post-date">5 Octobre 2024</span>
              </div>
            </div>
          </div>
          
          <div className="category-section">
            <h3>Success Stories</h3>
            <div className="blog-posts">
              <div className="blog-post">
                <h4>Témoignage: De l'Afrique aux États-Unis</h4>
                <p>L'histoire inspirante de Marie qui a obtenu sa Green Card grâce à nos services.</p>
                <span className="post-date">3 Octobre 2024</span>
              </div>
              <div className="blog-post">
                <h4>Étudiant International: Un Parcours Réussi</h4>
                <p>Comment Ahmed a intégré une université américaine avec notre aide.</p>
                <span className="post-date">1 Octobre 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default BlogPage;
