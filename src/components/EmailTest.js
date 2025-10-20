import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG } from '../config/emailjs';

const EmailTest = () => {
  const [testData, setTestData] = useState({
    serviceId: EMAILJS_CONFIG.serviceId,
    templateId: EMAILJS_CONFIG.templateId,
    publicKey: EMAILJS_CONFIG.publicKey
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleTestEmail = async () => {
    setIsLoading(true);
    setResult('');

    try {
      // Initialiser EmailJS avec la clé publique
      emailjs.init(testData.publicKey);

      // Données de test
      const templateParams = {
        name: 'Test Client',
        email: 'test@example.com',
        phone: '+1 555 123 4567',
        service: 'Consultation Visa',
        date: new Date().toLocaleDateString('fr-FR'),
        time: '10:00',
        message: 'Ceci est un test d\'envoi d\'email',
        to_email: 'hicham.bifden@gmail.com'
      };

      // Envoyer l'email de test
      const response = await emailjs.send(
        testData.serviceId,
        testData.templateId,
        templateParams
      );

      setResult(`✅ Email envoyé avec succès ! Status: ${response.status}`);
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      setResult(`❌ Erreur: ${error.text || error.message || 'Configuration incorrecte'}`);
    }

    setIsLoading(false);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h2>Test de Configuration EmailJS</h2>
      
      <div style={{ marginBottom: '1rem' }}>
        <label>Service ID:</label>
        <input
          type="text"
          value={testData.serviceId}
          onChange={(e) => setTestData({...testData, serviceId: e.target.value})}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Template ID:</label>
        <input
          type="text"
          value={testData.templateId}
          onChange={(e) => setTestData({...testData, templateId: e.target.value})}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Public Key:</label>
        <input
          type="text"
          value={testData.publicKey}
          onChange={(e) => setTestData({...testData, publicKey: e.target.value})}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <button
          onClick={handleTestEmail}
          disabled={isLoading}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            flex: 1
          }}
        >
          {isLoading ? 'Envoi en cours...' : 'Tester l\'envoi d\'email'}
        </button>
        
        <button
          onClick={() => {
            setTestData({
              serviceId: EMAILJS_CONFIG.serviceId,
              templateId: EMAILJS_CONFIG.templateId,
              publicKey: EMAILJS_CONFIG.publicKey
            });
            setResult('✅ Configuration mise à jour avec vos clés EmailJS !');
          }}
          style={{
            background: '#27ae60',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem',
            flex: 1
          }}
        >
          Charger mes clés
        </button>
      </div>

      {result && (
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          borderRadius: '8px',
          background: result.includes('✅') ? '#d4edda' : '#f8d7da',
          color: result.includes('✅') ? '#155724' : '#721c24'
        }}>
          {result}
        </div>
      )}

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Instructions :</h3>
        <ol>
          <li>Allez sur <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer">EmailJS.com</a></li>
          <li>Créez un compte gratuit</li>
          <li>Dans "Email Services", ajoutez Gmail</li>
          <li>Dans "Email Templates", créez un template avec ces variables :</li>
          <ul>
            <li>{'{{name}}'} - Nom du client</li>
            <li>{'{{email}}'} - Email du client</li>
            <li>{'{{phone}}'} - Téléphone</li>
            <li>{'{{service}}'} - Service demandé</li>
            <li>{'{{date}}'} - Date du rendez-vous</li>
            <li>{'{{time}}'} - Heure du rendez-vous</li>
            <li>{'{{message}}'} - Message du client</li>
          </ul>
          <li>Copiez votre Service ID, Template ID et Public Key</li>
          <li>Remplacez les valeurs ci-dessus</li>
          <li>Cliquez sur "Tester l'envoi d'email"</li>
        </ol>
      </div>
    </div>
  );
};

export default EmailTest;
