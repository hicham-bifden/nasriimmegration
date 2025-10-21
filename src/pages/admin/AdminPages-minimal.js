import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import PageService from '../../services/pageService';
import './AdminPages.css';

/**
 * Composant d'administration avec éditeur Tiptap minimal
 */
const AdminPages = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Configuration de l'éditeur Tiptap minimal
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
  });

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
      
      // Mettre à jour le contenu de l'éditeur
      if (editor && pageData) {
        editor.commands.setContent(pageData.content || '');
      }
      
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
    if (!selectedPage || !editor) return;

    try {
      setSaving(true);
      const content = editor.getHTML();
      
      await PageService.savePage(selectedPage.slug, {
        content: content,
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
        <p>Gérez le contenu de vos pages avec l'éditeur WYSIWYG</p>
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
        {selectedPage && editor && (
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

            {/* Barre d'outils Tiptap minimal */}
            <div className="editor-toolbar">
              <div className="toolbar-group">
                <button
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  className={editor.isActive('bold') ? 'is-active' : ''}
                  title="Gras"
                >
                  <strong>B</strong>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  className={editor.isActive('italic') ? 'is-active' : ''}
                  title="Italique"
                >
                  <em>I</em>
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleStrike().run()}
                  className={editor.isActive('strike') ? 'is-active' : ''}
                  title="Barré"
                >
                  <s>S</s>
                </button>
              </div>

              <div className="toolbar-group">
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                  title="Titre 1"
                >
                  H1
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                  title="Titre 2"
                >
                  H2
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                  title="Titre 3"
                >
                  H3
                </button>
              </div>

              <div className="toolbar-group">
                <button
                  onClick={() => editor.chain().focus().toggleBulletList().run()}
                  className={editor.isActive('bulletList') ? 'is-active' : ''}
                  title="Liste à puces"
                >
                  • Liste
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleOrderedList().run()}
                  className={editor.isActive('orderedList') ? 'is-active' : ''}
                  title="Liste numérotée"
                >
                  1. Liste
                </button>
              </div>

              <div className="toolbar-group">
                <button
                  onClick={() => editor.chain().focus().toggleBlockquote().run()}
                  className={editor.isActive('blockquote') ? 'is-active' : ''}
                  title="Citation"
                >
                  "
                </button>
                <button
                  onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                  className={editor.isActive('codeBlock') ? 'is-active' : ''}
                  title="Bloc de code"
                >
                  &lt;/&gt;
                </button>
              </div>

              <div className="toolbar-group">
                <button
                  onClick={() => editor.chain().focus().setHorizontalRule().run()}
                  title="Ligne horizontale"
                >
                  ─
                </button>
                <button
                  onClick={() => editor.chain().focus().undo().run()}
                  disabled={!editor.can().undo()}
                  title="Annuler"
                >
                  ↶
                </button>
                <button
                  onClick={() => editor.chain().focus().redo().run()}
                  disabled={!editor.can().redo()}
                  title="Refaire"
                >
                  ↷
                </button>
              </div>
            </div>

            {/* Zone d'édition */}
            <div className="editor-content">
              <EditorContent editor={editor} />
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
