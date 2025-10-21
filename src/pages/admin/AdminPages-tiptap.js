import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Strike from '@tiptap/extension-strike';
import Code from '@tiptap/extension-code';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import Youtube from '@tiptap/extension-youtube';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import HardBreak from '@tiptap/extension-hard-break';
import History from '@tiptap/extension-history';
import Placeholder from '@tiptap/extension-placeholder';
import PageService from '../../services/pageService';
import './AdminPages.css';

/**
 * Composant d'administration pour gérer les pages avec éditeur WYSIWYG complet
 * Fichier: src/pages/admin/AdminPages.js
 */
const AdminPages = () => {
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Configuration de l'éditeur Tiptap simplifié
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      TextStyle,
      Color,
      TextAlign,
      Underline,
      Strike,
      Code,
      Superscript,
      Subscript,
      Highlight,
      FontFamily,
      Table,
      TableRow,
      TableHeader,
      TableCell,
      Youtube,
      HorizontalRule,
      Blockquote,
      CodeBlock,
      HardBreak,
      History,
      Placeholder.configure({
        placeholder: 'Commencez à écrire...',
      }),
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
        // Pour l'instant, on utilise une liste statique
        const staticPages = [
          { id: 1, slug: 'immigration-consulting', title: 'Services de Consultation en Immigration' },
          { id: 2, slug: 'full-representation', title: 'Représentation Complète en Immigration' }
        ];
        setPages(staticPages);
      } catch (err) {
        console.error('Erreur lors du chargement des pages:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  // Charger une page sélectionnée
  const loadPage = async (page) => {
    try {
      setSelectedPage(page);
      const pageData = await PageService.getPageBySlug(page.slug);
      
      if (editor) {
        editor.commands.setContent(pageData.content);
      }
    } catch (err) {
      console.error('Erreur lors du chargement de la page:', err);
      setMessage('Erreur lors du chargement de la page');
    }
  };

  // Sauvegarder les modifications
  const savePage = async () => {
    if (!selectedPage || !editor) return;

    try {
      setSaving(true);
      setMessage('');

      const content = editor.getHTML();
      
      await PageService.savePage(selectedPage.slug, {
        content: content,
        title: selectedPage.title,
        meta_description: selectedPage.meta_description || ''
      });
      
      setMessage('Page sauvegardée avec succès !');
      
      setTimeout(() => {
        setMessage('');
      }, 3000);
      
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      setMessage('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  // Fonction pour ajouter une image
  const addImage = () => {
    const url = window.prompt('URL de l\'image:');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  // Fonction pour ajouter une vidéo YouTube
  const addYouTube = () => {
    const url = window.prompt('URL YouTube:');
    if (url) {
      editor?.chain().focus().setYoutubeVideo({ src: url }).run();
    }
  };

  // Fonction pour ajouter un tableau
  const addTable = () => {
    editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="loading">Chargement des pages...</div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Administration des Pages</h1>
        <p>Gérez le contenu de vos pages avec l'éditeur WYSIWYG complet</p>
      </div>

      <div className="admin-content">
        {/* Liste des pages */}
        <div className="pages-list">
          <h2>Pages Disponibles</h2>
          <div className="pages-grid">
            {pages.map((page) => (
              <div 
                key={page.id} 
                className={`page-card ${selectedPage?.id === page.id ? 'selected' : ''}`}
                onClick={() => loadPage(page)}
              >
                <h3>{page.title}</h3>
                <p>Slug: {page.slug}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Éditeur */}
        {selectedPage && (
          <div className="editor-section">
            <div className="editor-header">
              <h2>Édition: {selectedPage.title}</h2>
              <div className="editor-actions">
                <button 
                  onClick={savePage} 
                  disabled={saving}
                  className="save-btn"
                >
                  {saving ? 'Sauvegarde...' : 'Sauvegarder'}
                </button>
              </div>
            </div>

            {message && (
              <div className={`message ${message.includes('Erreur') ? 'error' : 'success'}`}>
                {message}
              </div>
            )}

            {/* Barre d'outils complète */}
            <div className="editor-toolbar">
              {/* Formatage de base */}
              <div className="toolbar-group">
                <button
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={editor?.isActive('bold') ? 'is-active' : ''}
                  title="Gras"
                >
                  <strong>B</strong>
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={editor?.isActive('italic') ? 'is-active' : ''}
                  title="Italique"
                >
                  <em>I</em>
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleUnderline().run()}
                  className={editor?.isActive('underline') ? 'is-active' : ''}
                  title="Souligné"
                >
                  <u>U</u>
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleStrike().run()}
                  className={editor?.isActive('strike') ? 'is-active' : ''}
                  title="Barré"
                >
                  <s>S</s>
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleCode().run()}
                  className={editor?.isActive('code') ? 'is-active' : ''}
                  title="Code"
                >
                  &lt;/&gt;
                </button>
              </div>

              {/* Titres */}
              <div className="toolbar-group">
                <button
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                  className={editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                  title="Titre 1"
                >
                  H1
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                  className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                  title="Titre 2"
                >
                  H2
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                  className={editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                  title="Titre 3"
                >
                  H3
                </button>
              </div>

              {/* Listes */}
              <div className="toolbar-group">
                <button
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  className={editor?.isActive('bulletList') ? 'is-active' : ''}
                  title="Liste à puces"
                >
                  •
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  className={editor?.isActive('orderedList') ? 'is-active' : ''}
                  title="Liste numérotée"
                >
                  1.
                </button>
              </div>

              {/* Alignement */}
              <div className="toolbar-group">
                <button
                  onClick={() => editor?.chain().focus().setTextAlign('left').run()}
                  className={editor?.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
                  title="Aligner à gauche"
                >
                  ⬅️
                </button>
                <button
                  onClick={() => editor?.chain().focus().setTextAlign('center').run()}
                  className={editor?.isActive({ textAlign: 'center' }) ? 'is-active' : ''}
                  title="Centrer"
                >
                  ↔️
                </button>
                <button
                  onClick={() => editor?.chain().focus().setTextAlign('right').run()}
                  className={editor?.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
                  title="Aligner à droite"
                >
                  ➡️
                </button>
                <button
                  onClick={() => editor?.chain().focus().setTextAlign('justify').run()}
                  className={editor?.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}
                  title="Justifier"
                >
                  ⬌
                </button>
              </div>

              {/* Couleurs */}
              <div className="toolbar-group">
                <input
                  type="color"
                  onChange={(e) => editor?.chain().focus().setColor(e.target.value).run()}
                  title="Couleur du texte"
                />
                <button
                  onClick={() => editor?.chain().focus().setHighlight({ color: '#fbbf24' }).run()}
                  className={editor?.isActive('highlight') ? 'is-active' : ''}
                  title="Surligner"
                >
                  🖍️
                </button>
              </div>

              {/* Éléments spéciaux */}
              <div className="toolbar-group">
                <button
                  onClick={() => editor?.chain().focus().setLink({ href: window.prompt('URL du lien:') }).run()}
                  className={editor?.isActive('link') ? 'is-active' : ''}
                  title="Lien"
                >
                  🔗
                </button>
                <button
                  onClick={addImage}
                  title="Image"
                >
                  🖼️
                </button>
                <button
                  onClick={addYouTube}
                  title="Vidéo YouTube"
                >
                  📺
                </button>
                <button
                  onClick={addTable}
                  title="Tableau"
                >
                  📊
                </button>
              </div>

              {/* Éléments de structure */}
              <div className="toolbar-group">
                <button
                  onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                  className={editor?.isActive('blockquote') ? 'is-active' : ''}
                  title="Citation"
                >
                  "
                </button>
                <button
                  onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                  className={editor?.isActive('codeBlock') ? 'is-active' : ''}
                  title="Bloc de code"
                >
                  { }
                </button>
                <button
                  onClick={() => editor?.chain().focus().setHorizontalRule().run()}
                  title="Ligne horizontale"
                >
                  ➖
                </button>
              </div>

              {/* Historique */}
              <div className="toolbar-group">
                <button
                  onClick={() => editor?.chain().focus().undo().run()}
                  disabled={!editor?.can().undo()}
                  title="Annuler"
                >
                  ↶
                </button>
                <button
                  onClick={() => editor?.chain().focus().redo().run()}
                  disabled={!editor?.can().redo()}
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPages;