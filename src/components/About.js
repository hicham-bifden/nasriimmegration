import React from 'react';
import { FaPhone, FaCheck,  } from 'react-icons/fa';
import './About.css';

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-image-section">
            <div className="about-image">
              <div className="image-placeholder">
                 <img src="/images/h1-success-img-1.webp" alt="About Us" />
              </div>
              
              <div className="call-out-box">
                <div className="call-icon">
                  <FaPhone />
                </div>
                <div className="call-text">
                  <div className="call-label">Call For Consultation</div>
                  <div className="call-number">+01 567 114 3312</div>
                </div>
              </div>
              
              <div className="stats-box">
                <div className="stats-content">
                  <div className="stats-label">Served Client</div>
                  <div className="stats-number">Successful 127865</div>
                  
                  <div className="countries-info">
                    <span>Canada</span>
                    <div className="flags">🇺🇸</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="about-text-section">
            <div className="about-badge">
              <span className="airplane-icon">✈</span>
              <span>ABOUT OUR COMPANY</span>
            </div>
            
            <h2 className="about-title">
              Une Histoire Bâtie sur l'Expérience et le Succès
            </h2>
            
            <div className="about-description">
              <h3>Votre Partenaire Expert pour une Transition Réussie au Canada</h3>
              <p>Chez Nasri immigration services, nous comprenons parfaitement les défis du parcours d'immigration, car nous avons été exactement à votre place. Nous avons nous aussi parcouru d'innombrables pages web, faisant preuve de détermination et de patience, pour réussir à concrétiser notre rêve canadien.</p>
              <p>Chaque année, le Canada ouvre ses portes à 400 000 nouveaux arrivants. Avec la bonne orientation et un soutien expert, vous pouvez faire partie de cette nation qui célèbre activement l'immigration et la diversité. C'est précisément ce que nous vous offrons : un réseau de conseils objectifs et indépendants pour tous les aspects de votre projet au Canada.</p>
            </div>
            
             
            
            <div className="features-list">
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Fastest Visa form processing with expert immigration agents</span>
              </div>
              <div className="feature-item">
                <FaCheck className="check-icon" />
                <span>Affiliation with Educational Institutions from over the world</span>
              </div>
            </div>
            
            <button className="about-button">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
