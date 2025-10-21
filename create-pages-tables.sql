-- Tables pour le contenu des pages
-- Ce script crée les tables pour gérer le contenu des pages dynamiquement

USE nasri_bdd;

-- Table pour les pages de contenu
CREATE TABLE IF NOT EXISTS pages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(255) NOT NULL UNIQUE,
    title_fr VARCHAR(255) NOT NULL,
    title_en VARCHAR(255) NOT NULL,
    content_fr TEXT,
    content_en TEXT,
    image_url VARCHAR(500),
    meta_description_fr VARCHAR(500),
    meta_description_en VARCHAR(500),
    keywords VARCHAR(500),
    is_published BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insérer les pages de services
INSERT INTO pages (slug, title_fr, title_en, content_fr, content_en, image_url) VALUES
(
    'immigration-consulting',
    'Services de Consultation en Immigration',
    'Immigration Consulting Services',
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
    
    '<h2>Our Immigration Consulting Services</h2>
    <p>We offer professional consulting services to guide you through your Canadian immigration process.</p>
    
    <h3>Our Services Include:</h3>
    <ul>
        <li><strong>Eligibility Assessment</strong> - Complete analysis of your profile</li>
        <li><strong>Strategic Advice</strong> - Planning your immigration journey</li>
        <li><strong>Document Preparation</strong> - Assistance with all your documents</li>
        <li><strong>Personalized Follow-up</strong> - Support throughout the process</li>
    </ul>
    
    <h3>Why Choose Our Services?</h3>
    <p>With over 10 years of experience in immigration, our team of experts guarantees quality service and personalized advice tailored to your situation.</p>
    
    <div class="cta-section">
        <h3>Ready to Get Started?</h3>
        <p>Contact us today for a free consultation and discover your immigration options.</p>
    </div>',
    
    '/images/services/immigration-consulting.jpg'
),

(
    'full-representation',
    'Représentation Complète en Immigration',
    'Full Immigration Representation',
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
    
    '<h2>Full Immigration Representation</h2>
    <p>Our full representation service provides complete support for your Canadian immigration application.</p>
    
    <h3>This Service Includes:</h3>
    <ul>
        <li><strong>Complete File Management</strong> - We handle everything</li>
        <li><strong>Communication with Authorities</strong> - We are your official representative</li>
        <li><strong>Regular Follow-up</strong> - Constant updates on progress</li>
        <li><strong>Legal Support</strong> - Immigration law expertise</li>
    </ul>
    
    <h3>Benefits of Our Representation:</h3>
    <p>By choosing our full representation service, you benefit from our expertise and network of contacts in immigration. We are committed to advancing your file efficiently and professionally.</p>
    
    <div class="cta-section">
        <h3>Need Full Representation?</h3>
        <p>Let us handle your immigration file from A to Z. Contact us for more information.</p>
    </div>',
    
    '/images/services/full-representation.jpg'
);

-- Vérifier les données insérées
SELECT slug, title_fr, LENGTH(content_fr) as content_length FROM pages;
