import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaChevronDown, FaGlobe } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
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

  /**
   * Structure du menu selon le schéma exact avec design en tableau
   * Chaque menu déroulant est organisé en colonnes comme dans l'image
   */
  const menuItems = [
    
    {
      name: 'Services',
      path: '/services',
      hasDropdown: true,
      columns: [
        {
          title: 'Services Principaux',
          items: [
            { name: 'Immigration Consulting Services', path: '/services/immigration-consulting' },
            { name: 'Full Immigration Representation', path: '/services/full-representation' },
            { name: 'GCMS Notes', path: '/services/gcms-notes' }
          ]
        }
      ]
    },
    {
      name: 'Immigrate',
      path: '/immigrate',
      hasDropdown: true,
      columns: [
        {
          title: 'Express Entry',
          items: [
            { name: 'Express Entry – The Ultimate Guide', path: '/immigrate/express-entry/ultimate-guide' },
            { name: 'Express Entry – Step-by-Step Guide', path: '/immigrate/express-entry/step-by-step' },
            { name: 'Express Entry – Latest Draws', path: '/immigrate/express-entry/latest-draws' },
            { name: 'How to improve CRS score', path: '/immigrate/express-entry/improve-crs' }
          ]
        },
        {
          title: 'Provincial Programs',
          items: [
            { name: 'Provincial Nominee Programs (PNP)', path: '/immigrate/pnp' },
            { name: 'PNP Live Monitor', path: '/immigrate/pnp/live-monitor' },
            { name: 'PNP In-Demand Occupations', path: '/immigrate/pnp/in-demand-occupations' }
          ]
        },
        {
          title: 'Québec Programs',
          items: [
            { name: 'Québec Immigration Programs', path: '/immigrate/quebec' },
            { name: 'PEQ – Programme de l\'Expérience Québécoise', path: '/immigrate/quebec/peq' },
            { name: 'Regular Skilled Worker Program (RSWP)', path: '/immigrate/quebec/rswp' }
          ]
        },
        {
          title: 'Other Programs',
          items: [
            { name: 'Business Immigration Programs', path: '/immigrate/business' },
            { name: 'Start-Up Visa Program', path: '/immigrate/business/startup-visa' },
            { name: 'Atlantic Immigration Program (AIP)', path: '/immigrate/other/aip' }
          ]
        }
      ]
    },
    {
      name: 'Sponsor',
      path: '/sponsor',
      hasDropdown: true,
      columns: [
        {
          title: 'Family Sponsorship',
          items: [
            { name: 'Sponsor a Spouse, Partner or Children', path: '/sponsor/family' },
            { name: 'Sponsor Parents or Grandparents', path: '/sponsor/parents' }
          ]
        }
      ]
    },
    {
      name: 'Work',
      path: '/work',
      hasDropdown: true,
      columns: [
        {
          title: 'Work Programs',
          items: [
            { name: 'Work in Canada Overview', path: '/work/overview' },
            { name: 'Temporary Foreign Worker Program (TFWP)', path: '/work/tfwp' },
            { name: 'LMIA required', path: '/work/tfwp/lmia-required' },
            { name: 'SAWP – Seasonal Agricultural Worker Program', path: '/work/tfwp/sawp' }
          ]
        },
        {
          title: 'International Mobility',
          items: [
            { name: 'International Mobility Program (IMP)', path: '/work/imp' },
            { name: 'LMIA exempt', path: '/work/imp/lmia-exempt' },
            { name: 'IEC – International Experience Canada', path: '/work/imp/iec' },
            { name: 'PGWP – Post-Graduation Work Permit', path: '/work/imp/pgwp' },
            { name: 'BOWP – Bridging Open Work Permit', path: '/work/imp/bowp' },
            { name: 'Work without a Work Permit', path: '/work/without-permit' }
          ]
        }
      ]
    },
    {
      name: 'Study',
      path: '/study',
      hasDropdown: true,
      columns: [
        {
          title: 'Study Programs',
          items: [
            { name: 'Study in Canada Overview', path: '/study/overview' },
            { name: 'Study Permit – Step-by-Step Guide', path: '/study/step-by-step' }
          ]
        }
      ]
    },
    {
      name: 'Visit',
      path: '/visit',
      hasDropdown: true,
      columns: [
        {
          title: 'Visit Options',
          items: [
            { name: 'Visitor Visa (TRV)', path: '/visit/visitor-visa' },
            { name: 'eTA – Electronic Travel Authorization', path: '/visit/eta' }
          ]
        }
      ]
    },
    {
      name: 'Resources',
      path: '/resources',
      hasDropdown: true,
      columns: [
        {
          title: 'Tools & Templates',
          items: [
            { name: 'CRS Calculator', path: '/resources/tools/crs-calculator' },
            { name: 'PNP Eligibility Tool', path: '/resources/tools/pnp-eligibility' },
            { name: 'NOC Finder / NOC 2021 Guide', path: '/resources/tools/noc-finder' },
            { name: 'ECA Guide', path: '/resources/tools/eca-guide' },
            { name: 'Canada\'s Free Trade Agreements', path: '/resources/tools/trade-agreements' }
          ]
        },
        {
          title: 'Life in Canada',
          items: [
            { name: 'Moving to Canada Checklist', path: '/resources/life/moving-checklist' },
            { name: 'SIN Number Guide', path: '/resources/life/sin-guide' },
            { name: 'Health Insurance in Canada', path: '/resources/life/health-insurance' }
          ]
        },
        {
          title: 'City Guides',
          items: [
            { name: 'Montreal', path: '/resources/cities/montreal' },
            { name: 'Toronto', path: '/resources/cities/toronto' }
          ]
        }
      ]
    }
  ];

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
              <img src ="/images/logo1-2.png" alt= "Nasri Immigration logo" />
            </div>
          </Link>

          {/* Navigation principale avec menus déroulants en tableau */}
          <nav className="navigation">
            <ul className="nav-list">
              {menuItems.map((item, index) => (
                <li 
                  key={index} 
                  className={`nav-item ${item.hasDropdown ? 'dropdown' : ''}`}
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link to={item.path} className="nav-link">
                    {item.name}
                    {item.hasDropdown && <FaChevronDown className="dropdown-arrow" />}
                  </Link>
                  
                  {/* Menu déroulant en tableau (mega menu) */}
                  {activeDropdown === item.name && item.hasDropdown && (
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