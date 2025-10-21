const http = require('http');

// Test pour vérifier les erreurs JavaScript
const testJavaScript = () => {
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
      
      if (data.includes('bundle.js')) {
        console.log('✅ Bundle JavaScript trouvé');
        
        // Test du bundle
        const bundleOptions = {
          hostname: 'localhost',
          port: 3025,
          path: '/static/js/bundle.js',
          method: 'GET'
        };
        
        const bundleReq = http.request(bundleOptions, (bundleRes) => {
          let bundleData = '';
          
          bundleRes.on('data', (chunk) => {
            bundleData += chunk;
          });
          
          bundleRes.on('end', () => {
            console.log('✅ Bundle JavaScript chargé:', bundleData.length, 'caractères');
            
            if (bundleData.includes('React')) {
              console.log('✅ React trouvé dans le bundle');
            } else {
              console.log('❌ React non trouvé dans le bundle');
            }
            
            if (bundleData.includes('App')) {
              console.log('✅ App trouvé dans le bundle');
            } else {
              console.log('❌ App non trouvé dans le bundle');
            }
            
            // Vérifier les erreurs de syntaxe
            if (bundleData.includes('SyntaxError') || bundleData.includes('ReferenceError')) {
              console.log('❌ Erreurs JavaScript détectées');
            } else {
              console.log('✅ Aucune erreur de syntaxe détectée');
            }
          });
        });
        
        bundleReq.on('error', (e) => {
          console.error('❌ Erreur bundle:', e.message);
        });
        
        bundleReq.end();
      } else {
        console.log('❌ Bundle JavaScript manquant');
      }
    });
  });

  req.on('error', (e) => {
    console.error('❌ Erreur:', e.message);
  });

  req.end();
};

console.log('🧪 Test JavaScript...');
testJavaScript();
