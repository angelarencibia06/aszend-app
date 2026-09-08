import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import { AppProvider, useAppContext } from './context/AppContext';
import BottomNav from './components/BottomNav';
import MilestoneOverlay from './components/MilestoneOverlay';
import PanicRoom from './components/PanicRoom';

const Home = lazy(() => import('./pages/Home'));
const Habits = lazy(() => import('./pages/Habits'));
const Profile = lazy(() => import('./pages/Profile'));
const Onboarding = lazy(() => import('./pages/Onboarding'));
const Auth = lazy(() => import('./pages/Auth'));
const Control = lazy(() => import('./pages/Control'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const SubscriptionTerms = lazy(() => import('./pages/SubscriptionTerms'));

import './index.css';
import './styles/App.css';

// Animated Route Wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="page-wrapper"
    >
      {children}
    </motion.div>
  );
};

const AppContent = () => {
  const { isPanicRoomActive, triggerPanicRoom } = useAppContext();
  const location = useLocation();

  const isPublicRoute = location.pathname === '/' || location.pathname === '/auth' || location.pathname === '/onboarding';
  const showProtocolBtn = ['/home', '/habits', '/control'].includes(location.pathname);

  // DEV BYPASS: Commented out strict funnel so the user can navigate freely
  /*
  // Strict funnel: Onboarding -> Auth -> App
  if (!hasCompletedOnboarding && location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />;
  }
  
  if (hasCompletedOnboarding && !isAuthenticated && location.pathname !== '/auth') {
    return <Navigate to="/auth" replace />;
  }

  // If authenticated and trying to access auth/onboarding, redirect to home
  if (isAuthenticated && isPublicRoute) {
    return <Navigate to="/" replace />;
  }
  */

  return (
    <div className="app-container">
      {isPanicRoomActive && <PanicRoom />}
      
      <MilestoneOverlay />
      
      <main className={`main-content ${!isPublicRoute ? 'with-nav' : ''}`}>
        <AnimatePresence mode="wait">
          <Suspense fallback={
            <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <div className="w-8 h-8 rounded-full border-2 border-[#2563EB] border-t-transparent animate-spin" />
            </div>
          }>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Onboarding />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/home" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/habits" element={<PageWrapper><Habits /></PageWrapper>} />
              <Route path="/control" element={<PageWrapper><Control /></PageWrapper>} />
              <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
              <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
              <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
              <Route path="/sub-terms" element={<PageWrapper><SubscriptionTerms /></PageWrapper>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      
      {/* Show bottom nav everywhere for dev bypass except onboarding/auth */}
      {!isPublicRoute && (
        <div className="bottom-area">
          {showProtocolBtn && (
            <div className="protocolo-btn-container" style={{ margin: '0 auto', width: '100%' }}>
              <div className="protocolo-btn-glow"></div>
              <button className="protocolo-btn" onClick={triggerPanicRoom}>
                <Zap size={18} strokeWidth={2.5} />
                ACTIVAR PROTOCOLO DE CONTROL
              </button>
            </div>
          )}
          <BottomNav />
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
    </AppProvider>
  );
}

export default App;
