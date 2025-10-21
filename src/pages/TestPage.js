import React from 'react';
import PageTemplate from '../../components/PageTemplate';

/**
 * Page de test simple pour vérifier le fonctionnement
 */
const TestPage = () => {
  return (
    <PageTemplate title="Page de Test">
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Test de Page</h2>
        <p>Si vous voyez ceci, les pages fonctionnent !</p>
        <p>Date: {new Date().toLocaleString()}</p>
      </div>
    </PageTemplate>
  );
};

export default TestPage;