import React from 'react';
import Page from '../components/Page';
import './Pages.css';

const ContactPage = () => {
  return (
    <Page title="Contactez-Nous">
      <div className="contact-content">
        <div className="contact-intro">
          <h2>Contactez-Nous</h2>
          <p>Notre équipe d'experts est là pour vous accompagner dans votre projet d'immigration.</p>
        </div>
        
        <div className="contact-info">
          <div className="contact-methods">
            <div className="contact-method">
              <h3>Informations de Contact</h3>
              <div className="contact-details">
                <div className="detail">
                  <h4>📞 Téléphone</h4>
                  <p>+01 567 114 3312</p>
                </div>
                <div className="detail">
                  <h4>📧 Email</h4>
                  <p>info@immigway.com</p>
                </div>
                <div className="detail">
                  <h4>📍 Adresse</h4>
                  <p>123 Immigration Street<br />Montreal, QC H1A 1A1<br />Canada</p>
                </div>
                <div className="detail">
                  <h4>🕒 Heures d'Ouverture</h4>
                  <p>Lundi - Vendredi: 9h00 - 18h00<br />Samedi: 9h00 - 15h00<br />Dimanche: Fermé</p>
                </div>
              </div>
            </div>
            
            <div className="contact-method">
              <h3>Formulaire de Contact</h3>
              <form className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nom Complet</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input type="tel" id="phone" name="phone" />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service Intéressé</label>
                  <select id="service" name="service">
                    <option value="">Sélectionnez un service</option>
                    <option value="green-card">Demande de Green Card</option>
                    <option value="pte">Préparation PTE</option>
                    <option value="toefl">Préparation TOEFL</option>
                    <option value="visa">Services Visa</option>
                    <option value="education">Services Éducatifs</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="5" required></textarea>
                </div>
                <button type="submit" className="submit-btn">Envoyer le Message</button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="office-locations">
          <h3>Nos Bureaux</h3>
          <div className="locations-grid">
            <div className="location">
              <h4>Bureau Principal - Montréal</h4>
              <p>123 Immigration Street<br />Montreal, QC H1A 1A1<br />Canada</p>
              <p>📞 +01 567 114 3312</p>
            </div>
            <div className="location">
              <h4>Bureau - Toronto</h4>
              <p>456 Visa Avenue<br />Toronto, ON M1B 2C3<br />Canada</p>
              <p>📞 +01 416 555 0123</p>
            </div>
            <div className="location">
              <h4>Bureau - Vancouver</h4>
              <p>789 Immigration Blvd<br />Vancouver, BC V1A 2B3<br />Canada</p>
              <p>📞 +01 604 555 0456</p>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default ContactPage;
