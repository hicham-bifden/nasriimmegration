import React, { useState, useEffect } from 'react';
import PageService from '../../services/pageService';
import './AdminPages.css';

/**
 * Composant d'administration simplifié pour tester
 */
const AdminPages = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Charger la liste des pages
  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        // Liste des pages disponibles
        const availablePages = [
          { slug: 'immigration-consulting', title: 'Services de Consultation en Immigration' },
          { slug: 'full-representation', title: 'Représentation Complète en Immigration' }
        ];
        setPages(availablePages);
      } catch (error) {
        console.error('Erreur lors du chargement des pages:', error);
        setMessage('Erreur lors du chargement des pages');
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  // Charger le contenu d'une page
  const loadPageContent = async (pageSlug) => {
    try {
      setLoading(true);
      const pageData = await PageService.getPageBySlug(pageSlug);
      setSelectedPage(pageData);
      setMessage('');
    } catch (error) {
      console.error('Erreur lors du chargement de la page:', error);
      setMessage('Erreur lors du chargement de la page');
    } finally {
      setLoading(false);
    }
  };

  // Sauvegarder une page
  const savePage = async () => {
    if (!selectedPage) return;

    try {
      setSaving(true);
      await PageService.savePage(selectedPage.slug, {
        content: selectedPage.content,
        title: selectedPage.title,
        meta_description: selectedPage.meta_description
      });
      setMessage('Page sauvegardée avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      setMessage('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-pages">
        <div className="admin-header">
          <h1>Admin Pages</h1>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-pages">
      <div className="admin-header">
        <h1>Admin Pages</h1>
        <p>Gérez le contenu de vos pages</p>
      </div>

      {message && (
        <div className={`message ${message.includes('Erreur') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <div className="admin-content">
        {/* Liste des pages */}
        <div className="pages-list">
          <h2>Pages disponibles</h2>
          <div className="pages-grid">
            {pages.map((page) => (
              <div
                key={page.slug}
                className={`page-card ${selectedPage?.slug === page.slug ? 'selected' : ''}`}
                onClick={() => loadPageContent(page.slug)}
              >
                <h3>{page.title}</h3>
                <p>Slug: {page.slug}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Éditeur de contenu */}
        {selectedPage && (
          <div className="content-editor">
            <h2>Éditer: {selectedPage.title}</h2>
            
            <div className="editor-section">
              <label>Titre:</label>
              <input
                type="text"
                value={selectedPage.title}
                onChange={(e) => setSelectedPage({
                  ...selectedPage,
                  title: e.target.value
                })}
              />
            </div>

            <div className="editor-section">
              <label>Description:</label>
              <textarea
                value={selectedPage.meta_description || ''}
                onChange={(e) => setSelectedPage({
                  ...selectedPage,
                  meta_description: e.target.value
                })}
                rows="3"
              />
            </div>

            <div className="editor-section">
              <label>Contenu HTML:</label>
              <textarea
                value={selectedPage.content}
                onChange={(e) => setSelectedPage({
                  ...selectedPage,
                  content: e.target.value
                })}
                rows="15"
                placeholder="Contenu HTML de la page..."
              />
            </div>

            <div className="editor-actions">
              <button
                onClick={savePage}
                disabled={saving}
                className="save-button"
              >
                {saving ? 'Sauvegarde...' : 'Sauvegarder'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPages;
