import React from 'react';

const RANKS = [
  { id: 1, name: 'PULSO', number: '01', core: '#3b82f6', mid: '#2563eb', outer: '#1d4ed8', req: 0, level: 1 },
  { id: 2, name: 'AURA', number: '02', core: '#a855f7', mid: '#9333ea', outer: '#7e22ce', req: 7, level: 2 },
  { id: 3, name: 'NÚCLEO', number: '03', core: '#10b981', mid: '#059669', outer: '#047857', req: 30, level: 3 },
  { id: 4, name: 'ÉTER', number: '04', core: '#f97316', mid: '#ea580c', outer: '#c2410c', req: 90, level: 4 },
  { id: 5, name: 'ASCENSIÓN', number: '05', core: '#facc15', mid: '#eab308', outer: '#ca8a04', req: 365, level: 5 },
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
    ? { core: '#374151', mid: '#1f2937', outer: '#111827', level: 1 }
    : baseRank;
  
  const id = `orb_${rankIndex}_${size}`;
  const center = size / 2;
  const orbRadius = size * 0.18; // Size for the central orb

  // Render rings based on rank
  const renderRings = () => {
    
    
    const ringColor = locked ? '#6b7280' : c.core;
    const ringOpacity = locked ? 0.4 : 0.6;
    
    return (
      <g stroke={ringColor} strokeOpacity={ringOpacity} strokeWidth="2" fill="none">
        {/* AURA (1) */}
        {rankIndex === 1 && (
          <ellipse cx={center} cy={center} rx={size * 0.35} ry={size * 0.1} transform={`rotate(-20 ${center} ${center})`} />
        )}
        
        {/* NÚCLEO (2) */}
        {rankIndex === 2 && (
          <>
            <ellipse cx={center} cy={center} rx={size * 0.35} ry={size * 0.12} transform={`rotate(-30 ${center} ${center})`} />
            <ellipse cx={center} cy={center} rx={size * 0.35} ry={size * 0.12} transform={`rotate(30 ${center} ${center})`} />
          </>
        )}
        
        {/* ÉTER (3) */}
        {rankIndex === 3 && (
          <>
            <ellipse cx={center} cy={center} rx={size * 0.32} ry={size * 0.1} transform={`rotate(0 ${center} ${center})`} />
            <ellipse cx={center} cy={center} rx={size * 0.32} ry={size * 0.1} transform={`rotate(60 ${center} ${center})`} />
            <ellipse cx={center} cy={center} rx={size * 0.32} ry={size * 0.1} transform={`rotate(120 ${center} ${center})`} />
            {/* Outer dashed circle */}
            <circle cx={center} cy={center} r={size * 0.4} strokeDasharray="4 8" strokeWidth="1" strokeOpacity="0.3" />
          </>
        )}
        
        {/* ASCENSIÓN (4) */}
        {rankIndex === 4 && (
          <>
            <ellipse cx={center} cy={center} rx={size * 0.35} ry={size * 0.08} transform={`rotate(0 ${center} ${center})`} />
            <ellipse cx={center} cy={center} rx={size * 0.35} ry={size * 0.08} transform={`rotate(45 ${center} ${center})`} />
            <ellipse cx={center} cy={center} rx={size * 0.35} ry={size * 0.08} transform={`rotate(90 ${center} ${center})`} />
            <ellipse cx={center} cy={center} rx={size * 0.35} ry={size * 0.08} transform={`rotate(135 ${center} ${center})`} />
            {/* Outer dashed circle */}
            <circle cx={center} cy={center} r={size * 0.45} strokeDasharray="6 6" strokeWidth="2" strokeOpacity="0.5" />
            {/* Intense glow ray for sun */}
            {!locked && <circle cx={center} cy={center} r={size * 0.3} fill={`url(#${id}_beam)`} opacity="0.5" stroke="none"  />}
          </>
        )}
      </g>
    );
  };

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
            <stop offset="0%"   stopColor="#ffffff" stopOpacity={locked ? "0.3" : "0.9"} />
            <stop offset="20%"  stopColor={c.core}  stopOpacity="1" />
            <stop offset="60%"  stopColor={c.mid}   stopOpacity="1" />
            <stop offset="85%"  stopColor={c.outer}   stopOpacity="1" />
            <stop offset="100%" stopColor="#02040a" stopOpacity="1" />
          </radialGradient>

          {/* Ambient Glow */}
          <radialGradient id={`${id}_glow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.core} stopOpacity={locked ? "0.1" : "0.4"} />
            <stop offset="100%" stopColor={c.core} stopOpacity="0" />
          </radialGradient>

          
        </defs>

        {/* Ambient background glow */}
        <circle cx={center} cy={center} r={orbRadius * 2.5} fill={`url(#${id}_glow)`} />

        {/* Rings */}
        {renderRings()}

        {/* Main Central Orb */}
        <circle 
          cx={center} 
          cy={center} 
          r={orbRadius} 
          fill={`url(#${id}_core)`} 
          
          style={{
            transformBox: 'fill-box', 
            transformOrigin: 'center',
            animation: animated && !locked ? `pulseOrb 4s ease-in-out infinite alternate` : 'none'
          }}
        />
        
        {/* Padlock Icon if locked */}
        {locked && (
          <g transform={`translate(${center - 24}, ${center - 24})`}>
            <rect width="48" height="48" fill="transparent" />
            {/* We overlay a Lucide icon using an SVG path for a lock manually to keep it inside SVG */}
            <path 
              d="M15.3 19.3V12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7v7.3m-13.3 0h9.3c1.8 0 3.3 1.5 3.3 3.3v10.7c0 1.8-1.5 3.3-3.3 3.3H16c-1.8 0-3.3-1.5-3.3-3.3V22.7c0-1.8 1.5-3.3 3.3-3.3z" 
              stroke="#9ca3af" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" 
            />
          </g>
        )}
      </svg>
      
      {animated && !locked && (
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes pulseOrb {
            0% { transform: scale(0.97); opacity: 0.95; }
            100% { transform: scale(1.03); opacity: 1; }
          }
        `}} />
      )}
    </div>
  );
}
