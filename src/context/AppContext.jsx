import { createContext, useState, useContext, useEffect } from 'react';

const AppContext = createContext();

// Hook to persist state in localStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export const getStreakData = (days) => {
  if (days >= 365) return { color: '#eab308', title: 'RANGO: ASCENSIÓN' }; // Dorado
  if (days >= 90) return { color: '#8b5cf6', title: 'RANGO: NIRVANA' }; // Morado
  if (days >= 30) return { color: '#044eda', title: 'RANGO: PURIFICACIÓN' }; // Azul fuerte
  if (days >= 10) return { color: '#ef4444', title: 'RANGO: DESPERTAR' }; // Rojo
  return { color: '#e2e8f0', title: 'RANGO: NEÓFITO' }; // Plata/Blanco
};

const DEFAULT_HABITS = [
  { id: 'habit_sleep', name: 'Dormir ≥ 7 horas', linked_variable: 'sleep_hours', active: true, created_at: Date.now() },
  { id: 'habit_training', name: 'Entrenar', linked_variable: 'training', active: true, created_at: Date.now() },
  { id: 'habit_deepwork', name: 'Deep Work ≥ 4 horas', linked_variable: 'deep_work', active: true, created_at: Date.now() }
];

export const AppProvider = ({ children }) => {


  const [streak, setStreak] = useLocalStorage('aszend_streak', 365);

  // FORCE STREAK TO 365 OVERRIDING LOCAL STORAGE FOR TESTING
  useEffect(() => {
    setStreak(365);
  }, []);
  const [rank, setRank] = useLocalStorage('aszend_rank', 1);
  const [activeMilestone, setActiveMilestone] = useState(null);

  // New state for Radar de Riesgo (Phase 1)
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage('aszend_auth', false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useLocalStorage('aszend_onboarding', false);
  const [userProfile, setUserProfile] = useLocalStorage('aszend_profile', null);
  
  const [dailyRisk, setDailyRisk] = useLocalStorage('aszend_dailyRisk', null);
  const [lastCheckInDate, setLastCheckInDate] = useLocalStorage('aszend_lastCheckIn', null);
  const [riskFactors, setRiskFactors] = useLocalStorage('aszend_riskFactors', []); // Array of strings to show "Por qué?"

  // Habit Tracker State
  const [habits, setHabits] = useLocalStorage('aszend_habits', DEFAULT_HABITS);
  const [habitLogs, setHabitsLogs] = useLocalStorage('aszend_habitLogs', {});

  // Panic Room State
  const [isPanicRoomActive, setIsPanicRoomActive] = useState(false);
  const [panicPushupsTarget, setPanicPushupsTarget] = useLocalStorage('aszend_panic_pushups', 20);

  const triggerMilestone = (days) => {
    const value = typeof days === 'number' ? days : 30;
    setActiveMilestone(value);
  };

  const triggerPanicRoom = () => setIsPanicRoomActive(true);
  const closePanicRoom = () => setIsPanicRoomActive(false);

  return (
    <AppContext.Provider value={{
      streak, setStreak,
      rank, setRank,
      activeMilestone, setActiveMilestone,
      triggerMilestone,
      isAuthenticated, setIsAuthenticated,
      hasCompletedOnboarding, setHasCompletedOnboarding,
      userProfile, setUserProfile,
      dailyRisk, setDailyRisk,
      lastCheckInDate, setLastCheckInDate,
      riskFactors, setRiskFactors,
      habits, setHabits,
      habitLogs, setHabitsLogs,
      isPanicRoomActive, triggerPanicRoom, closePanicRoom,
      panicPushupsTarget, setPanicPushupsTarget
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
