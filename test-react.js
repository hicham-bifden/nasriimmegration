const http = require('http');

// Test simple pour vérifier si React se charge
const testReact = () => {
  const options = {
    hostname: 'localhost',
    port: 3025,
    path: '/',
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log('✅ Serveur React répond');
      console.log('📄 HTML reçu:', data.length, 'caractères');
      
      if (data.includes('bundle.js')) {
        console.log('✅ Bundle JavaScript trouvé');
      } else {
        console.log('❌ Bundle JavaScript manquant');
      }
      
      if (data.includes('id="root"')) {
        console.log('✅ Div root trouvée');
      } else {
        console.log('❌ Div root manquante');
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Erreur:', e.message);
  });

  req.end();
};

console.log('🧪 Test du serveur React...');
testReact();
