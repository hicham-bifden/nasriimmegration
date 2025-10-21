-- Insérer les pages de services dans la table existante
-- Ce script utilise la structure existante de la table pages

USE nasri_bdd;

-- Insérer les pages de services
INSERT INTO pages (slug, title, content, meta_description, is_published) VALUES
(
    'immigration-consulting',
    'Services de Consultation en Immigration',
    '<h2>Nos Services de Consultation en Immigration</h2>
    <p>Nous offrons des services de consultation professionnels pour vous accompagner dans votre processus d\'immigration au Canada.</p>
    
    <h3>Nos Services Incluent :</h3>
    <ul>
        <li><strong>Évaluation de l\'éligibilité</strong> - Analyse complète de votre profil</li>
        <li><strong>Conseil stratégique</strong> - Planification de votre parcours d\'immigration</li>
        <li><strong>Préparation des documents</strong> - Assistance pour tous vos documents</li>
        <li><strong>Suivi personnalisé</strong> - Accompagnement tout au long du processus</li>
    </ul>
    
    <h3>Pourquoi Choisir Nos Services ?</h3>
    <p>Avec plus de 10 ans d\'expérience dans le domaine de l\'immigration, notre équipe d\'experts vous garantit un service de qualité et des conseils personnalisés adaptés à votre situation.</p>
    
    <div class="cta-section">
        <h3>Prêt à Commencer ?</h3>
        <p>Contactez-nous dès aujourd\'hui pour une consultation gratuite et découvrez vos options d\'immigration.</p>
    </div>',
    'Services de consultation professionnels en immigration au Canada. Évaluation, conseil stratégique et accompagnement personnalisé.',
    1
),

(
    'full-representation',
    'Représentation Complète en Immigration',
    '<h2>Représentation Complète en Immigration</h2>
    <p>Notre service de représentation complète vous offre un accompagnement total dans votre démarche d\'immigration au Canada.</p>
    
    <h3>Ce Service Comprend :</h3>
    <ul>
        <li><strong>Gestion complète du dossier</strong> - Nous nous occupons de tout</li>
        <li><strong>Communication avec les autorités</strong> - Nous sommes votre représentant officiel</li>
        <li><strong>Suivi régulier</strong> - Mises à jour constantes sur l\'avancement</li>
        <li><strong>Support juridique</strong> - Expertise en droit de l\'immigration</li>
    </ul>
    
    <h3>Avantages de Notre Représentation :</h3>
    <p>En choisissant notre service de représentation complète, vous bénéficiez de notre expertise et de notre réseau de contacts dans le domaine de l\'immigration. Nous nous engageons à faire avancer votre dossier de manière efficace et professionnelle.</p>
    
    <div class="cta-section">
        <h3>Besoin d\'une Représentation Complète ?</h3>
        <p>Laissez-nous gérer votre dossier d\'immigration de A à Z. Contactez-nous pour plus d\'informations.</p>
    </div>',
    'Service de représentation complète en immigration. Gestion totale du dossier, communication avec les autorités et support juridique.',
    1
);

-- Vérifier les données insérées
SELECT slug, title, LENGTH(content) as content_length FROM pages WHERE slug IN ('immigration-consulting', 'full-representation');
