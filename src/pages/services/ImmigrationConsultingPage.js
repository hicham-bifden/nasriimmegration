import React, { useState, useEffect } from 'react';
import PageService from '../../services/pageService';
import PageTemplate from '../../components/PageTemplate';
import '../../components/DynamicPage.css';

/**
 * Page des services de consultation en immigration
 * Cette page charge le contenu depuis la base de données
 */
const ImmigrationConsultingPage = () => {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const pageData = await PageService.getPageBySlug('immigration-consulting');
        
        if (!pageData) {
          throw new Error('Page non trouvée');
        }
        
        setPage(pageData);
      } catch (err) {
        console.error('Erreur lors du chargement de la page:', err);
        setError(err.message || 'Page non trouvée');
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, []);

  if (loading) {
    return (
      <PageTemplate title="Chargement...">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement de la page...</p>
        </div>
      </PageTemplate>
    );
  }

  if (error || !page) {
    return (
      <PageTemplate title="Page non trouvée">
        <div className="error-container">
          <h2>Page non trouvée</h2>
          <p>La page que vous recherchez n'existe pas ou n'est plus disponible.</p>
        </div>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate title={page.title}>
      <div className="dynamic-page">
        {/* Image de la page si disponible */}
        {page.image_url && (
          <div className="page-image">
            <img 
              src={page.image_url} 
              alt={page.title}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        )}
        
        {/* Contenu HTML de la page */}
        <div 
          className="page-content"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
        
        {/* Meta description si disponible */}
        {page.meta_description && (
          <div className="page-meta">
            <p className="meta-description">{page.meta_description}</p>
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default ImmigrationConsultingPage;
