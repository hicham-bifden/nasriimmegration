import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/Header';


// Pages principales
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import AppointmentPage from './pages/AppointmentPage';
import EmailTestPage from './pages/EmailTestPage';

// Pages Services
import ImmigrationConsultingPage from './pages/services/ImmigrationConsultingPage';
import FullRepresentationPage from './pages/services/FullRepresentationPage';
import GCMSNotesPage from './pages/services/GCMSNotesPage';

// Pages Immigrate - Express Entry
import ExpressEntryUltimateGuidePage from './pages/immigrate/express-entry/ExpressEntryUltimateGuidePage';
import ExpressEntryStepByStepPage from './pages/immigrate/express-entry/ExpressEntryStepByStepPage';
import ExpressEntryLatestDrawsPage from './pages/immigrate/express-entry/ExpressEntryLatestDrawsPage';
import ExpressEntryImproveCRSPage from './pages/immigrate/express-entry/ExpressEntryImproveCRSPage';

// Pages Immigrate - PNP
import PNPPage from './pages/immigrate/pnp/PNPPage';
import PNPLiveMonitorPage from './pages/immigrate/pnp/PNPLiveMonitorPage';
import PNPInDemandOccupationsPage from './pages/immigrate/pnp/PNPInDemandOccupationsPage';

// Pages Immigrate - Québec
import QuebecPage from './pages/immigrate/quebec/QuebecPage';
import PEQPage from './pages/immigrate/quebec/PEQPage';
import RSWPPage from './pages/immigrate/quebec/RSWPPage';

// Pages Immigrate - Business
import BusinessPage from './pages/immigrate/business/BusinessPage';
import StartupVisaPage from './pages/immigrate/business/StartupVisaPage';

// Pages Immigrate - Other
import OtherPage from './pages/immigrate/other/OtherPage';
import AIPPage from './pages/immigrate/other/AIPPage';

// Pages Sponsor
import SponsorPage from './pages/sponsor/SponsorPage';
import FamilySponsorPage from './pages/sponsor/FamilySponsorPage';
import ParentsSponsorPage from './pages/sponsor/ParentsSponsorPage';

// Pages Work
import WorkPage from './pages/work/WorkPage';
import WorkOverviewPage from './pages/work/WorkOverviewPage';
import TFWPPage from './pages/work/tfwp/TFWPPage';
import LMIARequiredPage from './pages/work/tfwp/LMIARequiredPage';
import SAWPPage from './pages/work/tfwp/SAWPPage';
import IMPPage from './pages/work/imp/IMPPage';
import LMIAExemptPage from './pages/work/imp/LMIAExemptPage';
import IECPage from './pages/work/imp/IECPage';
import PGWPPage from './pages/work/imp/PGWPPage';
import BOWPPage from './pages/work/imp/BOWPPage';
import WithoutPermitPage from './pages/work/WithoutPermitPage';

// Pages Study
import StudyPage from './pages/study/StudyPage';
import StudyOverviewPage from './pages/study/StudyOverviewPage';
import StudyStepByStepPage from './pages/study/StudyStepByStepPage';

// Pages Visit
import VisitPage from './pages/visit/VisitPage';
import VisitorVisaPage from './pages/visit/VisitorVisaPage';
import ETAPage from './pages/visit/ETAPage';

// Pages Resources - Tools
import CRSCalculatorPage from './pages/resources/tools/CRSCalculatorPage';
import PNPEligibilityPage from './pages/resources/tools/PNPEligibilityPage';
import NOCFinderPage from './pages/resources/tools/NOCFinderPage';
import ECAGuidePage from './pages/resources/tools/ECAGuidePage';
import TradeAgreementsPage from './pages/resources/tools/TradeAgreementsPage';

// Pages Resources - Life
import MovingChecklistPage from './pages/resources/life/MovingChecklistPage';
import SINGuidePage from './pages/resources/life/SINGuidePage';
import HealthInsurancePage from './pages/resources/life/HealthInsurancePage';

// Pages Resources - Cities
import MontrealPage from './pages/resources/cities/MontrealPage';
import TorontoPage from './pages/resources/cities/TorontoPage';

import './App.css';

/**
 * Composant principal de l'application React
 * 
 * Ce composant gère :
 * - Le routage de l'application avec React Router
 * - Le contexte de langue pour l'internationalisation
 * - La structure générale de l'application
 * - Toutes les routes vers les différentes pages
 * 
 * Structure des routes :
 * - / : Page d'accueil avec Hero, Features, Services, About
 * - /services/* : Pages des services d'immigration
 * - /immigrate/* : Pages des programmes d'immigration
 * - /sponsor/* : Pages du parrainage familial
 * - /work/* : Pages des permis de travail
 * - /study/* : Pages des études au Canada
 * - /visit/* : Pages des visas de visite
 * - /resources/* : Pages des ressources et outils
 * - /appointment : Page de prise de rendez-vous
 * - /email-test : Page de test EmailJS
 */
function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          {/* Header fixe avec navigation principale */}
          <Header />
          
          {/* Routes de l'application */}
          <Routes>
            {/* Page d'accueil avec tous les composants */}
            <Route path="/" element={
              <>
              <Swiper /> 
              
               <About />
                <Features />
                <Services />
                
              </>
            } />
            
            {/* Pages principales */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/email-test" element={<EmailTestPage />} />
            
            {/* Routes Services */}
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/services/immigration-consulting" element={<ImmigrationConsultingPage />} />
            <Route path="/services/full-representation" element={<FullRepresentationPage />} />
            <Route path="/services/gcms-notes" element={<GCMSNotesPage />} />
            
            {/* Routes Immigrate */}
            <Route path="/immigrate" element={<ServicesPage />} />
            
            {/* Routes Express Entry */}
            <Route path="/immigrate/express-entry" element={<ServicesPage />} />
            <Route path="/immigrate/express-entry/ultimate-guide" element={<ExpressEntryUltimateGuidePage />} />
            <Route path="/immigrate/express-entry/step-by-step" element={<ExpressEntryStepByStepPage />} />
            <Route path="/immigrate/express-entry/latest-draws" element={<ExpressEntryLatestDrawsPage />} />
            <Route path="/immigrate/express-entry/improve-crs" element={<ExpressEntryImproveCRSPage />} />
            
            {/* Routes PNP */}
            <Route path="/immigrate/pnp" element={<PNPPage />} />
            <Route path="/immigrate/pnp/live-monitor" element={<PNPLiveMonitorPage />} />
            <Route path="/immigrate/pnp/in-demand-occupations" element={<PNPInDemandOccupationsPage />} />
            
            {/* Routes Québec */}
            <Route path="/immigrate/quebec" element={<QuebecPage />} />
            <Route path="/immigrate/quebec/peq" element={<PEQPage />} />
            <Route path="/immigrate/quebec/rswp" element={<RSWPPage />} />
            
            {/* Routes Business */}
            <Route path="/immigrate/business" element={<BusinessPage />} />
            <Route path="/immigrate/business/startup-visa" element={<StartupVisaPage />} />
            
            {/* Routes Other Programs */}
            <Route path="/immigrate/other" element={<OtherPage />} />
            <Route path="/immigrate/other/aip" element={<AIPPage />} />
            
            {/* Routes Sponsor */}
            <Route path="/sponsor" element={<SponsorPage />} />
            <Route path="/sponsor/family" element={<FamilySponsorPage />} />
            <Route path="/sponsor/parents" element={<ParentsSponsorPage />} />
            
            {/* Routes Work */}
            <Route path="/work" element={<WorkPage />} />
            <Route path="/work/overview" element={<WorkOverviewPage />} />
            <Route path="/work/tfwp" element={<TFWPPage />} />
            <Route path="/work/tfwp/lmia-required" element={<LMIARequiredPage />} />
            <Route path="/work/tfwp/sawp" element={<SAWPPage />} />
            <Route path="/work/imp" element={<IMPPage />} />
            <Route path="/work/imp/lmia-exempt" element={<LMIAExemptPage />} />
            <Route path="/work/imp/iec" element={<IECPage />} />
            <Route path="/work/imp/pgwp" element={<PGWPPage />} />
            <Route path="/work/imp/bowp" element={<BOWPPage />} />
            <Route path="/work/without-permit" element={<WithoutPermitPage />} />
            
            {/* Routes Study */}
            <Route path="/study" element={<StudyPage />} />
            <Route path="/study/overview" element={<StudyOverviewPage />} />
            <Route path="/study/step-by-step" element={<StudyStepByStepPage />} />
            
            {/* Routes Visit */}
            <Route path="/visit" element={<VisitPage />} />
            <Route path="/visit/visitor-visa" element={<VisitorVisaPage />} />
            <Route path="/visit/eta" element={<ETAPage />} />
            
            {/* Routes Resources */}
            <Route path="/resources" element={<ServicesPage />} />
            
            {/* Routes Tools & Templates */}
            <Route path="/resources/tools" element={<ServicesPage />} />
            <Route path="/resources/tools/crs-calculator" element={<CRSCalculatorPage />} />
            <Route path="/resources/tools/pnp-eligibility" element={<PNPEligibilityPage />} />
            <Route path="/resources/tools/noc-finder" element={<NOCFinderPage />} />
            <Route path="/resources/tools/eca-guide" element={<ECAGuidePage />} />
            <Route path="/resources/tools/trade-agreements" element={<TradeAgreementsPage />} />
            
            {/* Routes Life in Canada */}
            <Route path="/resources/life" element={<ServicesPage />} />
            <Route path="/resources/life/moving-checklist" element={<MovingChecklistPage />} />
            <Route path="/resources/life/sin-guide" element={<SINGuidePage />} />
            <Route path="/resources/life/health-insurance" element={<HealthInsurancePage />} />
            
            {/* Routes City Guides */}
            <Route path="/resources/cities" element={<ServicesPage />} />
            <Route path="/resources/cities/montreal" element={<MontrealPage />} />
            <Route path="/resources/cities/toronto" element={<TorontoPage />} />
            
            {/* Route par défaut - redirige vers l'accueil */}
            <Route path="*" element={
              <>
                <Hero />
                <Features />
                <Services />
                <About />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;