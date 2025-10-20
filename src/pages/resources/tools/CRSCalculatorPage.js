import React, { useState } from 'react';
import PageTemplate from '../../../components/PageTemplate';

/**
 * Page CRS Calculator - Calculateur de Score CRS
 * 
 * Cette page fournit un calculateur interactif pour le Comprehensive Ranking System (CRS) :
 * - Calcul automatique du score CRS
 * - Facteurs humains (âge, éducation, expérience, langue)
 * - Facteurs du conjoint
 * - Facteurs de transfert
 * - Facteurs supplémentaires (offre d'emploi, nomination provinciale)
 * 
 * Le calculateur aide les candidats à évaluer leur éligibilité et à identifier
 * les améliorations possibles pour augmenter leur score.
 */
const CRSCalculatorPage = () => {
  // États pour stocker les valeurs du formulaire
  const [formData, setFormData] = useState({
    // Facteurs humains
    age: '',
    education: '',
    experience: '',
    firstLanguage: { speaking: '', listening: '', reading: '', writing: '' },
    secondLanguage: { speaking: '', listening: '', reading: '', writing: '' },
    
    // Facteurs du conjoint
    spouseEducation: '',
    spouseExperience: '',
    spouseLanguage: { speaking: '', listening: '', reading: '', writing: '' },
    
    // Facteurs supplémentaires
    jobOffer: false,
    provincialNomination: false,
    canadianEducation: false,
    canadianWorkExperience: false,
    siblingInCanada: false
  });

  const [totalScore, setTotalScore] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({});

  /**
   * Met à jour les données du formulaire
   * @param {string} field - Nom du champ à mettre à jour
   * @param {any} value - Nouvelle valeur
   */
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  /**
   * Met à jour les scores de langue
   * @param {string} language - 'firstLanguage' ou 'secondLanguage'
   * @param {string} skill - 'speaking', 'listening', 'reading', 'writing'
   * @param {string} value - Nouvelle valeur
   */
  const handleLanguageChange = (language, skill, value) => {
    setFormData(prev => ({
      ...prev,
      [language]: {
        ...prev[language],
        [skill]: value
      }
    }));
  };

  /**
   * Calcule le score CRS total basé sur les données du formulaire
   */
  const calculateCRSScore = () => {
    let score = 0;
    let breakdown = {
      humanFactors: 0,
      spouseFactors: 0,
      transferFactors: 0,
      additionalFactors: 0
    };

    // Calcul des facteurs humains (max 500 points)
    // Âge
    const age = parseInt(formData.age);
    if (age >= 20 && age <= 29) score += 110;
    else if (age >= 18 && age <= 19) score += 99;
    else if (age >= 30 && age <= 35) score += 105;
    else if (age >= 36 && age <= 40) score += 100;
    else if (age >= 41 && age <= 45) score += 95;
    else if (age >= 46 && age <= 50) score += 90;

    // Éducation
    const educationPoints = {
      'phd': 140,
      'masters': 126,
      'bachelors': 112,
      'diploma': 84,
      'highschool': 28
    };
    score += educationPoints[formData.education] || 0;

    // Expérience professionnelle
    const experiencePoints = {
      '5plus': 80,
      '4': 80,
      '3': 80,
      '2': 80,
      '1': 40,
      '0': 0
    };
    score += experiencePoints[formData.experience] || 0;

    // Première langue officielle
    const firstLangScore = calculateLanguageScore(formData.firstLanguage);
    score += firstLangScore;

    // Deuxième langue officielle
    const secondLangScore = calculateLanguageScore(formData.secondLanguage);
    score += secondLangScore;

    breakdown.humanFactors = score;

    // Facteurs du conjoint (max 40 points)
    let spouseScore = 0;
    if (formData.spouseEducation) {
      const spouseEducationPoints = {
        'phd': 10,
        'masters': 10,
        'bachelors': 10,
        'diploma': 5,
        'highschool': 0
      };
      spouseScore += spouseEducationPoints[formData.spouseEducation] || 0;
    }

    if (formData.spouseExperience) {
      const spouseExperiencePoints = {
        '5plus': 10,
        '4': 10,
        '3': 10,
        '2': 10,
        '1': 5,
        '0': 0
      };
      spouseScore += spouseExperiencePoints[formData.spouseExperience] || 0;
    }

    const spouseLangScore = calculateLanguageScore(formData.spouseLanguage);
    spouseScore += spouseLangScore;

    score += spouseScore;
    breakdown.spouseFactors = spouseScore;

    // Facteurs supplémentaires (max 600 points)
    let additionalScore = 0;
    if (formData.jobOffer) additionalScore += 200;
    if (formData.provincialNomination) additionalScore += 600;
    if (formData.canadianEducation) additionalScore += 30;
    if (formData.canadianWorkExperience) additionalScore += 50;
    if (formData.siblingInCanada) additionalScore += 15;

    score += additionalScore;
    breakdown.additionalFactors = additionalScore;

    setTotalScore(score);
    setScoreBreakdown(breakdown);
  };

  /**
   * Calcule le score de langue basé sur les compétences
   * @param {object} language - Objet contenant les scores de langue
   * @returns {number} Score total de langue
   */
  const calculateLanguageScore = (language) => {
    const { speaking, listening, reading, writing } = language;
    
    // Logique simplifiée pour le calcul des points de langue
    // Dans la réalité, c'est plus complexe avec des combinaisons spécifiques
    let score = 0;
    
    if (speaking === 'clb9' && listening === 'clb9' && reading === 'clb9' && writing === 'clb9') {
      score = 128; // Première langue officielle - CLB 9+
    } else if (speaking === 'clb7' && listening === 'clb7' && reading === 'clb7' && writing === 'clb7') {
      score = 110; // Première langue officielle - CLB 7-8
    } else if (speaking === 'clb5' && listening === 'clb5' && reading === 'clb5' && writing === 'clb5') {
      score = 95; // Première langue officielle - CLB 5-6
    }

    return score;
  };

  return (
    <PageTemplate 
      title="CRS Calculator" 
      subtitle="Calculateur de Score CRS pour Express Entry"
    >
      <div className="content-card">
        <h2>Calculateur de Score CRS</h2>
        <p>
          Utilisez ce calculateur pour estimer votre score CRS (Comprehensive Ranking System) 
          et évaluer vos chances d'être invité à postuler pour la résidence permanente au Canada.
        </p>
      </div>

      <div className="calculator-form">
        <div className="form-section">
          <h3>Facteurs Humains</h3>
          
          <div className="form-group">
            <label>Âge</label>
            <select 
              value={formData.age} 
              onChange={(e) => handleInputChange('age', e.target.value)}
            >
              <option value="">Sélectionnez votre âge</option>
              <option value="18">18 ans</option>
              <option value="19">19 ans</option>
              <option value="20">20 ans</option>
              <option value="25">25 ans</option>
              <option value="30">30 ans</option>
              <option value="35">35 ans</option>
              <option value="40">40 ans</option>
              <option value="45">45 ans</option>
              <option value="50">50 ans</option>
            </select>
          </div>

          <div className="form-group">
            <label>Niveau d'Éducation</label>
            <select 
              value={formData.education} 
              onChange={(e) => handleInputChange('education', e.target.value)}
            >
              <option value="">Sélectionnez votre niveau</option>
              <option value="phd">Doctorat (PhD)</option>
              <option value="masters">Maîtrise</option>
              <option value="bachelors">Baccalauréat</option>
              <option value="diploma">Diplôme d'études collégiales</option>
              <option value="highschool">Études secondaires</option>
            </select>
          </div>

          <div className="form-group">
            <label>Expérience Professionnelle</label>
            <select 
              value={formData.experience} 
              onChange={(e) => handleInputChange('experience', e.target.value)}
            >
              <option value="">Sélectionnez votre expérience</option>
              <option value="0">Moins de 1 an</option>
              <option value="1">1 an</option>
              <option value="2">2 ans</option>
              <option value="3">3 ans</option>
              <option value="4">4 ans</option>
              <option value="5plus">5 ans ou plus</option>
            </select>
          </div>

          <div className="form-group">
            <label>Première Langue Officielle</label>
            <div className="language-skills">
              <select 
                value={formData.firstLanguage.speaking} 
                onChange={(e) => handleLanguageChange('firstLanguage', 'speaking', e.target.value)}
              >
                <option value="">Expression orale</option>
                <option value="clb9">CLB 9+</option>
                <option value="clb7">CLB 7-8</option>
                <option value="clb5">CLB 5-6</option>
              </select>
              <select 
                value={formData.firstLanguage.listening} 
                onChange={(e) => handleLanguageChange('firstLanguage', 'listening', e.target.value)}
              >
                <option value="">Compréhension orale</option>
                <option value="clb9">CLB 9+</option>
                <option value="clb7">CLB 7-8</option>
                <option value="clb5">CLB 5-6</option>
              </select>
              <select 
                value={formData.firstLanguage.reading} 
                onChange={(e) => handleLanguageChange('firstLanguage', 'reading', e.target.value)}
              >
                <option value="">Compréhension écrite</option>
                <option value="clb9">CLB 9+</option>
                <option value="clb7">CLB 7-8</option>
                <option value="clb5">CLB 5-6</option>
              </select>
              <select 
                value={formData.firstLanguage.writing} 
                onChange={(e) => handleLanguageChange('firstLanguage', 'writing', e.target.value)}
              >
                <option value="">Expression écrite</option>
                <option value="clb9">CLB 9+</option>
                <option value="clb7">CLB 7-8</option>
                <option value="clb5">CLB 5-6</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Facteurs Supplémentaires</h3>
          
          <div className="checkbox-group">
            <label>
              <input 
                type="checkbox" 
                checked={formData.jobOffer}
                onChange={(e) => handleInputChange('jobOffer', e.target.checked)}
              />
              Offre d'emploi valide au Canada (+200 points)
            </label>
            
            <label>
              <input 
                type="checkbox" 
                checked={formData.provincialNomination}
                onChange={(e) => handleInputChange('provincialNomination', e.target.checked)}
              />
              Nomination provinciale (+600 points)
            </label>
            
            <label>
              <input 
                type="checkbox" 
                checked={formData.canadianEducation}
                onChange={(e) => handleInputChange('canadianEducation', e.target.checked)}
              />
              Études au Canada (+30 points)
            </label>
            
            <label>
              <input 
                type="checkbox" 
                checked={formData.canadianWorkExperience}
                onChange={(e) => handleInputChange('canadianWorkExperience', e.target.checked)}
              />
              Expérience de travail au Canada (+50 points)
            </label>
            
            <label>
              <input 
                type="checkbox" 
                checked={formData.siblingInCanada}
                onChange={(e) => handleInputChange('siblingInCanada', e.target.checked)}
              />
              Frère/sœur citoyen canadien (+15 points)
            </label>
          </div>
        </div>

        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <button 
            className="action-button"
            onClick={calculateCRSScore}
          >
            Calculer mon Score CRS
          </button>
        </div>
      </div>

      {totalScore > 0 && (
        <div className="content-card">
          <h2>Résultat du Calcul</h2>
          <div className="score-result">
            <div className="total-score">
              <h3>Score CRS Total : {totalScore} points</h3>
            </div>
            
            <div className="score-breakdown">
              <h4>Détail du Score :</h4>
              <ul>
                <li>Facteurs humains : {scoreBreakdown.humanFactors} points</li>
                <li>Facteurs du conjoint : {scoreBreakdown.spouseFactors} points</li>
                <li>Facteurs supplémentaires : {scoreBreakdown.additionalFactors} points</li>
              </ul>
            </div>

            <div className="score-interpretation">
              <h4>Interprétation :</h4>
              {totalScore >= 470 ? (
                <p style={{ color: '#27ae60' }}>
                  <strong>Excellent !</strong> Votre score est très élevé. Vous avez de très bonnes chances 
                  d'être invité à postuler lors des prochains tirages Express Entry.
                </p>
              ) : totalScore >= 400 ? (
                <p style={{ color: '#f39c12' }}>
                  <strong>Bon score !</strong> Votre score est compétitif. Vous pourriez être invité 
                  selon les conditions du marché. Considérez améliorer certains aspects.
                </p>
              ) : (
                <p style={{ color: '#e74c3c' }}>
                  <strong>Score à améliorer.</strong> Votre score pourrait être insuffisant pour 
                  être invité. Consultez nos conseils pour améliorer votre profil.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="content-card">
        <h2>Conseils pour Améliorer votre Score</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h4>Améliorer ses Compétences Linguistiques</h4>
            <p>
              Obtenez des scores élevés aux tests IELTS/CELPIP et TEF/TCF. 
              Chaque point CLB supplémentaire peut augmenter significativement votre score.
            </p>
          </div>

          <div className="feature-item">
            <h4>Obtenir une Offre d'Emploi</h4>
            <p>
              Une offre d'emploi valide au Canada peut vous donner jusqu'à 200 points 
              supplémentaires au CRS.
            </p>
          </div>

          <div className="feature-item">
            <h4>Nomination Provinciale</h4>
            <p>
              Une nomination provinciale (PNP) vous donne automatiquement 600 points 
              supplémentaires, garantissant une invitation.
            </p>
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <a href="/immigrate/express-entry/improve-crs" className="action-button">
          Guide pour Améliorer son Score CRS
        </a>
        <a href="/appointment" className="action-button">
          Consultation Gratuite
        </a>
      </div>
    </PageTemplate>
  );
};

export default CRSCalculatorPage;
