import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useAppContext } from './context/AppContext';
import PanicButton from './components/PanicButton';
import BottomNav from './components/BottomNav';
import MilestoneOverlay from './components/MilestoneOverlay';
import PanicRoom from './components/PanicRoom';

import Home from './pages/Home';
import Habits from './pages/Habits';
import Profile from './pages/Profile';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import Control from './pages/Control';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import SubscriptionTerms from './pages/SubscriptionTerms';

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
  const { isPanicRoomActive } = useAppContext();
  const location = useLocation();

  // DEV BYPASS: No authentication barriers for now.
  // We allow direct access to all routes to make testing easier.

  return (
    <div className="app-container">
      {isPanicRoomActive && <PanicRoom />}
      
      <MilestoneOverlay />
      
      <main className="main-content">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/habits" element={<PageWrapper><Habits /></PageWrapper>} />
            <Route path="/control" element={<PageWrapper><Control /></PageWrapper>} />
            <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
            <Route path="/terms" element={<PageWrapper><Terms /></PageWrapper>} />
            <Route path="/privacy" element={<PageWrapper><Privacy /></PageWrapper>} />
            <Route path="/sub-terms" element={<PageWrapper><SubscriptionTerms /></PageWrapper>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
      
      <div className="bottom-area">
        <PanicButton />
        <BottomNav />
      </div>
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
