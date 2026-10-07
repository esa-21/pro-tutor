import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { TutorProfileModal } from './components/TutorProfileModal';
import { InteractiveTutorFinder } from './components/InteractiveTutorFinder';
import { TutorRequestModal } from './components/TutorRequestModal';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { FindTutorPage } from './pages/FindTutorPage';
import { PricingPage } from './pages/PricingPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { TestimonialsPage } from './pages/TestimonialsPage';
import { BecomeTutorPage } from './pages/BecomeTutorPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { BlogPage } from './pages/BlogPage';
import { LearningTipsPage } from './pages/LearningTipsPage';
import { CareersPage } from './pages/CareersPage';
import { LegalPages } from './pages/LegalPages';
import { LoginPage, RegisterPage } from './pages/AuthPages';

// Dashboards
import { StudentDashboard } from './pages/dashboards/StudentDashboard';
import { ParentDashboard } from './pages/dashboards/ParentDashboard';
import { TutorDashboard } from './pages/dashboards/TutorDashboard';
import { AdminDashboard } from './pages/dashboards/AdminDashboard';

const AppContent: React.FC = () => {
  const { activeRoute, currentUser } = useApp();

  const renderCurrentView = () => {
    switch (activeRoute) {
      case 'home':
        return <HomePage />;
      case 'about':
        return <AboutPage />;
      case 'services':
        return <ServicesPage />;
      case 'find-tutor':
        return <FindTutorPage />;
      case 'pricing':
        return <PricingPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'become-tutor':
        return <BecomeTutorPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'blog':
        return <BlogPage />;
      case 'learning-tips':
        return <LearningTipsPage />;
      case 'careers':
        return <CareersPage />;
      case 'privacy':
      case 'terms':
      case 'refund':
      case 'help':
        return <LegalPages initialTab={activeRoute} />;
      case 'login':
        return <LoginPage />;
      case 'student-register':
        return <RegisterPage initialRole="student" />;
      case 'parent-register':
        return <RegisterPage initialRole="parent" />;
      case 'tutor-register':
        return <RegisterPage initialRole="tutor" />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'dashboard':
        if (currentUser?.role === 'admin') return <AdminDashboard />;
        if (currentUser?.role === 'parent') return <ParentDashboard />;
        if (currentUser?.role === 'tutor') return <TutorDashboard />;
        return <StudentDashboard />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {renderCurrentView()}
      </main>
      <Footer />

      {/* Global Modals & Wizards */}
      <TutorProfileModal />
      <InteractiveTutorFinder />
      <TutorRequestModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
