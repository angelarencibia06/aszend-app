import { NavLink } from 'react-router-dom';
import { Home, CheckSquare, Shield, User } from 'lucide-react';
import '../styles/BottomNav.css';

const BottomNav = () => {
  return (
    <nav className="bottom-nav glass-panel">
      <NavLink to="/home" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <Home size={22} />
        <span>Mando</span>
      </NavLink>
      
      <NavLink to="/habits" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <CheckSquare size={22} />
        <span>Hábitos</span>
      </NavLink>
      
      <NavLink to="/control" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <Shield size={22} />
        <span>Control</span>
      </NavLink>
      
      <NavLink to="/profile" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
        <User size={22} />
        <span>Perfil</span>
      </NavLink>
    </nav>
  );
};

export default BottomNav;
