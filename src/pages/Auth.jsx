import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Eye, EyeOff } from 'lucide-react';
import '../styles/App.css';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuthenticated, setHasCompletedOnboarding, setUserProfile } = useAppContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin && formData.username) {
      setUserProfile({ name: formData.username, email: formData.email });
    }
    setIsAuthenticated(true);
    setHasCompletedOnboarding(true); // they are done with all setup
    navigate('/');
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#0a0a0f', color: '#fff', padding: '20px' }}>
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: '400px', margin: '0 auto', width: '100%' }}>
        
        {/* Header / Logo */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ color: 'var(--accent-neon)', fontFamily: 'Oswald', fontSize: '24px', letterSpacing: '2px', margin: '0 0 10px 0' }}>Aszend</h1>
          <h2 style={{ fontSize: '28px', margin: '0 0 8px 0', fontWeight: 'bold' }}>
            {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '14px', margin: 0 }}>
            {isLogin ? 'Recupera el control.' : 'Tu progreso. Tu privacidad.'}
          </p>
        </div>

        {/* Toggle Switch */}
        <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '4px', marginBottom: '30px' }}>
          <button 
            onClick={() => setIsLogin(false)}
            style={{ 
              flex: 1, padding: '12px', borderRadius: '10px', border: 'none', 
              background: !isLogin ? 'var(--accent-neon)' : 'transparent',
              color: !isLogin ? '#fff' : 'var(--text-muted)',
              fontWeight: 'bold', fontSize: '15px', transition: 'all 0.3s', cursor: 'pointer'
            }}
          >
            Registro
          </button>
          <button 
            onClick={() => setIsLogin(true)}
            style={{ 
              flex: 1, padding: '12px', borderRadius: '10px', border: 'none', 
              background: isLogin ? 'var(--accent-neon)' : 'transparent',
              color: isLogin ? '#fff' : 'var(--text-muted)',
              fontWeight: 'bold', fontSize: '15px', transition: 'all 0.3s', cursor: 'pointer'
            }}
          >
            Entrar
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <AnimatePresence mode="popLayout">
            {!isLogin && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
              >
                <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>Nombre de usuario</label>
                <input 
                  type="text" 
                  name="username"
                  placeholder="@tu_nombre"
                  value={formData.username}
                  onChange={handleChange}
                  
                  style={{
                    width: '100%', padding: '15px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                    color: '#fff', outline: 'none', fontSize: '16px'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>Email</label>
            <input 
              type="email" 
              name="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              
              style={{
                width: '100%', padding: '15px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                color: '#fff', outline: 'none', fontSize: '16px'
              }}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: '600' }}>Contraseña</label>
            <input 
              type={showPassword ? 'text' : 'password'} 
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              
              style={{
                width: '100%', padding: '15px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)',
                color: '#fff', outline: 'none', fontSize: '16px', letterSpacing: showPassword ? 'normal' : '3px'
              }}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute', right: '15px', bottom: '15px',
                background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer'
              }}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button 
            type="submit" 
            className="primary-btn pulse-btn"
            style={{ 
              marginTop: '10px', padding: '16px', borderRadius: '12px', 
              fontSize: '16px', fontWeight: 'bold', justifyContent: 'center' 
            }}
          >
            {isLogin ? 'Entrar' : 'Crear cuenta'}
          </button>
          
          {!isLogin && (
            <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '10px' }}>
              Tu perfil será completamente privado. Solo tú ves tu progreso.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
