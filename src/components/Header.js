import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaChevronDown, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import MenuService from '../services/menuService';
import './Header.css';

/**
 * Composant Header - Barre de navigation principale
 * 
 * Ce composant gère :
 * - La navigation principale avec menus déroulants en tableau (mega menu)
 * - Le logo de l'entreprise
 * - La barre de recherche
 * - Le sélecteur de langue (FR/EN)
 * - Les liens spéciaux (Rendez-vous, Test Email)
 * 
 * Design : Menu en tableau comme dans l'image avec colonnes organisées
 */
const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * Charger le menu depuis la base de données
   */
  const loadMenu = async () => {
    try {
      setLoading(true);
      
      // Charger le menu depuis l'API
      const menu = await MenuService.getMenu();
      console.log('Menu chargé:', menu);
      console.log('Premier élément:', menu[0]);
      setMenuItems(menu);
    } catch (err) {
      console.error('Erreur lors du chargement du menu:', err);
      setMenuItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Charger le menu au montage du composant
  useEffect(() => {
    loadMenu();
  }, []);

  // Afficher un indicateur de chargement
  if (loading) {
    return (
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo">
              <div className="logo-text">
                <img src="/images/logo1-2.png" alt="Nasri Immigration logo" />
              </div>
            </Link>
            <div className="loading-menu">Chargement du menu...</div>
          </div>
        </div>
      </header>
    );
  }

  /**
   * Rendu du composant Header
   * Structure : Logo + Navigation + Actions (Recherche, Langue)
   */
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo de l'entreprise avec icône d'avion et texte IMMIGWAY */}
          <Link to="/" className="logo">
            <div className="logo-icon">
               
            </div>
            <div className="logo-text">
              <img src="/images/logo1-2.png" alt="Nasri Immigration logo" />
            </div>
          </Link>

          {/* Navigation principale avec menus déroulants en tableau */}
          <nav className="navigation">
            <ul className="nav-list">
              {menuItems.map((item, index) => (
                <li 
                  key={index} 
                  className={`nav-item ${item.has_dropdown ? 'dropdown' : ''}`}
                  onMouseEnter={() => item.has_dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link to={item.path} className="nav-link">
                    {item.name}
                    {item.has_dropdown && <FaChevronDown className="dropdown-arrow" />}
                  </Link>
                  
                  {/* Menu déroulant en tableau (mega menu) */}
                  {activeDropdown === item.name && item.has_dropdown && (
                    <div className="mega-menu">
                      <div className="mega-menu-content">
                        {item.columns.map((column, columnIndex) => (
                          <div key={columnIndex} className="mega-menu-column">
                            <h3 className="mega-menu-title">{column.title}</h3>
                            <ul className="mega-menu-list">
                              {column.items.map((subItem, subIndex) => (
                                <li key={subIndex}>
                                  <Link to={subItem.path} className="mega-menu-link">
                                    {subItem.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
              
              {/* Liens spéciaux pour les fonctionnalités */}
              <li className="nav-item">
                <Link to="/appointment" className="nav-link appointment-link">
                  📅 Rendez-vous
                </Link>
              </li>

              {/* -- IGNORE --- 
              <li className="nav-item">
                <Link to="/email-test" className="nav-link test-link">
                  🧪 Test Email
                </Link>
              </li>
              */}
            </ul>
          </nav>

          {/* Actions du header : Recherche, Langue */}
          <div className="header-actions">
            {/* Bouton de test temporaire */}
            <button 
              onClick={() => setActiveDropdown('Services')}
              style={{background: 'red', color: 'white', padding: '5px 10px', marginRight: '10px'}}
            >
              Test Menu
            </button>
            
            {/* Barre de recherche */}
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input 
                type="text" 
                placeholder={t('search')} 
                className="search-input" 
              />
            </div>
            
            {/* Sélecteur de langue FR/EN */}
            <div className="language-selector">
              <button onClick={toggleLanguage} className="language-btn">
                <FaGlobe className="language-icon" />
                {language === 'fr' ? 'FR' : 'EN'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;