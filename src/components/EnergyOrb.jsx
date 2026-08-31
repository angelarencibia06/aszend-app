import React from 'react';

const RANKS = [
  { id: 1, name: 'PULSO', number: '01', core: '#3b82f6', mid: '#2563eb', outer: '#1d4ed8', req: 0, level: 1 },
  { id: 2, name: 'AURA', number: '02', core: '#8b5cf6', mid: '#7c3aed', outer: '#5b21b6', req: 7, level: 2 },
  { id: 3, name: 'NÚCLEO', number: '03', core: '#10b981', mid: '#059669', outer: '#047857', req: 30, level: 3 },
  { id: 4, name: 'ÉTER', number: '04', core: '#f59e0b', mid: '#d97706', outer: '#b45309', req: 90, level: 4 },
  { id: 5, name: 'ASCENSIÓN', number: '05', core: '#f59e0b', mid: '#ea580c', outer: '#9a3412', req: 365, level: 5 },
];

export function EnergyOrb({
  size = 320,
  rankIndex = 0,
  animated = true,
  className = "",
  locked = false
}) {
  const baseRank = RANKS[rankIndex] ?? RANKS[0];
  const c = locked 
    ? { core: '#4b5563', mid: '#374151', outer: '#1f2937', level: 1 }
    : baseRank;
  
  const id = `orb_${rankIndex}_${size}`;
  const center = size / 2;
  const orbRadius = size * 0.22; // Slightly smaller for premium look

  // Planet definitions with rich colors
  const planets = [
    { id: 'p1', cx: center - 90, cy: center - 50, r: 4, color: '#a78bfa', glow: '#8b5cf6' },
    { id: 'p2', cx: center + 70, cy: center - 80, r: 6, color: '#fcd34d', glow: '#f59e0b' },
    { id: 'p3', cx: center + 120, cy: center - 20, r: 5, color: '#6ee7b7', glow: '#10b981' },
    { id: 'p4', cx: center + 100, cy: center + 60, r: 5, color: '#fdba74', glow: '#ea580c' },
    { id: 'p5', cx: center - 80, cy: center + 40, r: 6, color: '#fca5a5', glow: '#ef4444' },
    { id: 'p6', cx: center + 30, cy: center - 90, r: 4, color: '#9ca3af', glow: '#6b7280' },
  ];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative z-10"
        style={{ position: 'relative', zIndex: 10, overflow: 'visible' }}
      >
        <defs>
          {/* Main Orb 3D Gradient */}
          <radialGradient id={`${id}_core`} cx="35%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="25%"  stopColor="#93c5fd" stopOpacity="1" />
            <stop offset="60%"  stopColor={c.core}  stopOpacity="1" />
            <stop offset="85%"  stopColor={c.mid}   stopOpacity="1" />
            <stop offset="100%" stopColor="#02040a" stopOpacity="1" />
          </radialGradient>

          {/* Volumetric Light Beam */}
          <linearGradient id={`${id}_beam`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={c.core} stopOpacity="0.4" />
            <stop offset="40%" stopColor={c.mid} stopOpacity="0.1" />
            <stop offset="100%" stopColor={c.outer} stopOpacity="0" />
          </linearGradient>

          {/* Planet Glow Filter */}
          <filter id="planetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="ringGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Glow */}
        <circle cx={center} cy={center} r={orbRadius * 2.5} fill={`url(#${id}_beam)`} opacity="0.3" filter="blur(20px)" />

        {/* Volumetric Light Beam (below the orb) */}
        <polygon 
          points={`${center - 40},${center} ${center + 40},${center} ${center + 120},${size} ${center - 120},${size}`} 
          fill={`url(#${id}_beam)`} 
        />

        {/* Orbital Rings */}
        <g stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" fill="none" filter="url(#ringGlow)">
          <ellipse cx={center} cy={center} rx={size * 0.38} ry={size * 0.12} transform={`rotate(-15 ${center} ${center})`} />
          <ellipse cx={center} cy={center} rx={size * 0.45} ry={size * 0.18} transform={`rotate(10 ${center} ${center})`} />
          <ellipse cx={center} cy={center} rx={size * 0.3} ry={size * 0.25} transform={`rotate(-45 ${center} ${center})`} />
        </g>

        {/* Main Central Orb */}
        <circle 
          cx={center} 
          cy={center} 
          r={orbRadius} 
          fill={`url(#${id}_core)`} 
          filter={animated ? "drop-shadow(0 0 30px rgba(59, 130, 246, 0.5))" : "none"}
        />

        {/* Planets */}
        {planets.map((p, i) => {
          const delay = i * 0.5;
          return (
            <g key={p.id}>
              {animated ? (
                <g style={{ animation: `float 6s ease-in-out ${delay}s infinite` }}>
                  <circle 
                    cx={p.cx} cy={p.cy} r={p.r} 
                    fill={p.color} 
                    filter="url(#planetGlow)" 
                    style={{ 
                      transformBox: 'fill-box', 
                      transformOrigin: 'center',
                      animation: `pulseGlow 3s ease-in-out ${delay}s infinite alternate` 
                    }}
                  />
                </g>
              ) : (
                <circle cx={p.cx} cy={p.cy} r={p.r} fill={p.color} filter="url(#planetGlow)" />
              )}
            </g>
          );
        })}
      </svg>
      
      {animated && (
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes float { 
            0%, 100% { transform: translateY(0px); } 
            50% { transform: translateY(-8px); } 
          }
          @keyframes pulseGlow {
            0% { opacity: 0.6; transform: scale(0.9); }
            100% { opacity: 1; transform: scale(1.1); }
          }
        `}} />
      )}
    </div>
  );
}
