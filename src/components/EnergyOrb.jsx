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
  const orbRadius = size * 0.25; 

  // Planet definitions (x, y relative to center, color, size, delay)
  const planets = [
    { id: 'p1', cx: 30, cy: 70, r: 4, color: '#a78bfa', glow: '#8b5cf6' },
    { id: 'p2', cx: 120, cy: 30, r: 6, color: '#fcd34d', glow: '#f59e0b' },
    { id: 'p3', cx: 270, cy: 90, r: 5, color: '#6ee7b7', glow: '#10b981' },
    { id: 'p4', cx: 240, cy: 220, r: 5, color: '#fdba74', glow: '#ea580c' },
    { id: 'p5', cx: 50, cy: 180, r: 6, color: '#fca5a5', glow: '#ef4444' },
    { id: 'p6', cx: 210, cy: 50, r: 5, color: '#9ca3af', glow: '#6b7280' },
  ];

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${c.mid}33 0%, transparent 60%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          position: 'absolute'
        }}
      />
      
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="relative z-10"
        style={{ position: 'relative', zIndex: 10, overflow: 'visible' }}
      >
        <defs>
          <radialGradient id={`${id}g`} cx="40%" cy="30%" r="60%">
            <stop offset="0%"   stopColor="#93c5fd" stopOpacity="1" />
            <stop offset="20%"  stopColor={c.core}  stopOpacity="0.95" />
            <stop offset="70%"  stopColor={c.mid}   stopOpacity="0.9" />
            <stop offset="100%" stopColor={c.outer} stopOpacity="0.8" />
          </radialGradient>
          
          <filter id={`${id}f`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="planetGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className={animated && !locked ? "orb-slow-spin" : ""} style={{ transformOrigin: `${center}px ${center}px` }}>
          {/* Orbital Rings */}
          <ellipse cx={center} cy={center} rx={size * 0.45} ry={size * 0.15} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" transform={`rotate(15 ${center} ${center})`} />
          <ellipse cx={center} cy={center} rx={size * 0.38} ry={size * 0.2} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" transform={`rotate(-20 ${center} ${center})`} />
          <ellipse cx={center} cy={center} rx={size * 0.42} ry={size * 0.12} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" transform={`rotate(45 ${center} ${center})`} />
          
          {/* Planets */}
          {!locked && planets.map((p, i) => (
            <g key={p.id}>
              {/* Glow */}
              <circle cx={p.cx} cy={p.cy} r={p.r * 2} fill={p.glow} opacity="0.4" filter="url(#planetGlow)" />
              {/* Planet Core */}
              <circle cx={p.cx} cy={p.cy} r={p.r} fill={p.color} />
              {/* Planet Highlight */}
              <circle cx={p.cx - p.r * 0.3} cy={p.cy - p.r * 0.3} r={p.r * 0.3} fill="#fff" opacity="0.8" />
            </g>
          ))}
        </g>

        {/* Main Central Orb */}
        <circle 
          cx={center} cy={center} r={orbRadius}
          fill={`url(#${id}g)`}
          filter={`url(#${id}f)`}
          className={animated && !locked ? "orb-pulse" : ""}
          style={{ transformOrigin: `${center}px ${center}px` }}
        />

        {/* Glossy Highlights for 3D effect */}
        <ellipse cx={center - orbRadius * 0.3} cy={center - orbRadius * 0.4} rx={orbRadius * 0.4} ry={orbRadius * 0.25} fill="white" fillOpacity="0.2" transform={`rotate(-30 ${center - orbRadius * 0.3} ${center - orbRadius * 0.4})`} />
        <circle cx={center - orbRadius * 0.45} cy={center - orbRadius * 0.55} r={orbRadius * 0.1} fill="white" fillOpacity="0.4" />
        
        {/* Core shadow for depth */}
        <path d={`M ${center - orbRadius} ${center} A ${orbRadius} ${orbRadius} 0 0 0 ${center + orbRadius} ${center} A ${orbRadius} ${orbRadius * 0.6} 0 0 1 ${center - orbRadius} ${center}`} fill="#000" opacity="0.3" />

      </svg>
      
      {/* Light ray from bottom */}
      {!locked && (
        <div style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', width: '2px', height: '80px', background: 'linear-gradient(to top, transparent, rgba(59, 130, 246, 0.6))', filter: 'blur(1px)' }} />
      )}
    </div>
  );
}
