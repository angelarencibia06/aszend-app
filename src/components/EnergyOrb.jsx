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
  viewIndex = 0,
  highestUnlockedIndex = 0,
  onSelectRank,
  className = ""
}) {
  const center = size / 2;
  const id = `solar_system_perfect_${size}`;

  // The path strings for the orbits
  const getOrbitPath = (rx, ry) => {
    return `M ${center + rx},${center} a ${rx},${ry} 0 1,0 -${rx * 2},0 a ${rx},${ry} 0 1,0 ${rx * 2},0`;
  };

  const orbits = [
    { rank: 3, rx: size * 0.18, ry: size * 0.07, duration: '40s', delay: '-10s', size: 9 }, 
    { rank: 2, rx: size * 0.28, ry: size * 0.11, duration: '60s', delay: '-40s', size: 10 }, 
    { rank: 1, rx: size * 0.38, ry: size * 0.15, duration: '80s', delay: '-80s', size: 11 }, 
    { rank: 0, rx: size * 0.48, ry: size * 0.19, duration: '100s', delay: '-60s', size: 12 }, 
  ];

  const renderPlanet = (orb) => {
    const rankIdx = orb.rank;
    const isLocked = rankIdx > highestUnlockedIndex;
    const isSelected = rankIdx === viewIndex;
    const c = isLocked ? { core: '#4b5563', mid: '#374151', outer: '#1f2937' } : RANKS[rankIdx];
    
    const scale = isSelected ? 1.5 : 1;
    const r = orb.size * scale;

    return (
      <g 
        key={`planet_${rankIdx}`}
        style={{ cursor: 'pointer' }}
        onClick={() => onSelectRank && onSelectRank(rankIdx)}
      >
        <animateMotion 
          dur={orb.duration} 
          repeatCount="indefinite" 
          path={getOrbitPath(orb.rx, orb.ry)} 
          begin={orb.delay}
        />
        
        <g style={{ transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }}>
          <defs>
            <radialGradient id={`${id}_planet_${rankIdx}`} cx="35%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity={isLocked ? "0.4" : "1"} />
              <stop offset="30%"  stopColor={c.core}  stopOpacity="1" />
              <stop offset="70%"  stopColor={c.outer} stopOpacity="1" />
              <stop offset="100%" stopColor={isLocked ? "#111827" : "#02040a"} stopOpacity="0.9" />
            </radialGradient>
            
            {/* Comet Tail Gradient */}
            <linearGradient id={`${id}_tail_${rankIdx}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={c.core} stopOpacity="0.8" />
              <stop offset="100%" stopColor={c.core} stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* 3D Saturn-style Rings (Matching isometric perspective) */}
          {!isLocked && rankIdx === 1 && (
            <ellipse cx="0" cy="0" rx={r * 2.5} ry={r * 0.8} fill="none" stroke={c.core} strokeWidth="1.5" strokeOpacity="0.6" transform="rotate(-15)" />
          )}
          {!isLocked && rankIdx === 2 && (
             <g transform="rotate(15)">
               <ellipse cx="0" cy="0" rx={r * 2.5} ry={r * 0.8} fill="none" stroke={c.core} strokeWidth="1" strokeOpacity="0.8" />
               <ellipse cx="0" cy="0" rx={r * 3} ry={r * 1} fill="none" stroke={c.mid} strokeWidth="0.5" strokeOpacity="0.4" />
             </g>
          )}
          {!isLocked && rankIdx === 3 && (
            <g transform="rotate(-30)">
               <ellipse cx="0" cy="0" rx={r * 2.2} ry={r * 0.6} fill="none" stroke={c.core} strokeWidth="2" strokeOpacity="0.5" />
               <circle cx="0" cy="0" r={r * 2.8} fill="none" stroke={c.core} strokeWidth="1" strokeDasharray="2 4" strokeOpacity="0.4" />
            </g>
          )}

          {/* Majestic Planet Glow */}
          {!isLocked && (
            <circle cx="0" cy="0" r={r * 2} fill={c.core} opacity={isSelected ? "0.6" : "0.3"} filter="url(#softGlow)" style={{ mixBlendMode: 'screen' }} />
          )}
          
          {/* Planet Body */}
          <circle cx="0" cy="0" r={r} fill={`url(#${id}_planet_${rankIdx})`} stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" />

          {/* Small Padlock */}
          {isLocked && (
            <g transform={`scale(0.4) translate(-10.65, -14.65)`}>
              <path d="M15.3 19.3V12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7v7.3m-13.3 0h9.3c1.8 0 3.3 1.5 3.3 3.3v10.7c0 1.8-1.5 3.3-3.3 3.3H16c-1.8 0-3.3-1.5-3.3-3.3V22.7c0-1.8 1.5-3.3 3.3-3.3z" stroke="#d1d5db" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          )}
        </g>
      </g>
    );
  };

  const isSunLocked = 4 > highestUnlockedIndex;
  const isSunSelected = viewIndex === 4;
  const sunColor = isSunLocked ? { core: '#4b5563', mid: '#374151', outer: '#1f2937' } : RANKS[4];
  const sunRadius = size * 0.18;
  const sunScale = isSunSelected ? 1.05 : 1;

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
          <radialGradient id={`${id}_sun_core`} cx="30%" cy="30%" r="70%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity={isSunLocked ? "0.3" : "1"} />
            <stop offset="15%"  stopColor="#fef08a" stopOpacity={isSunLocked ? "0.5" : "1"} />
            <stop offset="45%"  stopColor={sunColor.core}  stopOpacity="1" />
            <stop offset="80%"  stopColor={sunColor.outer}   stopOpacity="1" />
            <stop offset="100%" stopColor={isSunLocked ? "#111827" : "#7c2d12"} stopOpacity="0.9" />
          </radialGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="intenseGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="25" result="blur1" />
            <feGaussianBlur stdDeviation="10" result="blur2" />
            <feMerge>
              <feMergeNode in="blur1" />
              <feMergeNode in="blur2" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Dynamic Colored Orbit Lines */}
        <g fill="none">
          {orbits.map((orb, i) => (
            <ellipse 
              key={`orbit_path_${i}`} 
              cx={center} 
              cy={center} 
              rx={orb.rx} 
              ry={orb.ry} 
              stroke={RANKS[orb.rank].core} 
              strokeWidth="1" 
              strokeOpacity="0.15" 
            />
          ))}
        </g>

        {/* Majestic Central Sun (Ascensión) */}
        <g 
          transform={`translate(${center}, ${center})`}
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectRank && onSelectRank(4)}
        >
          <g style={{ transition: 'all 0.5s ease', animation: 'floatCenter 6s ease-in-out infinite alternate' }}>
            
            {/* Pulsing Ethereal Corona */}
            {!isSunLocked && (
              <circle 
                cx="0" cy="0" 
                r={sunRadius * 1.6 * sunScale} 
                fill={sunColor.core} 
                opacity="0.4" 
                filter="url(#intenseGlow)" 
                style={{ mixBlendMode: 'screen', animation: 'pulseCorona 4s ease-in-out infinite alternate' }} 
              />
            )}

            {/* Sci-Fi Energy Rings (Isometric Perspective) */}
            {!isSunLocked && (
              <g stroke={sunColor.core} strokeOpacity="0.7" strokeWidth="2" fill="none" style={{ animation: 'spinSlow 20s linear infinite' }}>
                <ellipse cx="0" cy="0" rx={sunRadius * 1.9 * sunScale} ry={sunRadius * 0.7 * sunScale} strokeDasharray="10 20" strokeLinecap="round" />
                <ellipse cx="0" cy="0" rx={sunRadius * 2.1 * sunScale} ry={sunRadius * 0.8 * sunScale} strokeOpacity="0.3" strokeWidth="1" />
              </g>
            )}

            {/* Solid Sun Core */}
            <circle cx="0" cy="0" r={sunRadius * sunScale} fill={`url(#${id}_sun_core)`} stroke="rgba(255,255,255,0.4)" strokeWidth="1" />

            {/* Padlock for Central Orb */}
            {isSunLocked && (
              <g transform={`scale(1) translate(-10.65, -14.65)`}>
                <path d="M15.3 19.3V12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7v7.3m-13.3 0h9.3c1.8 0 3.3 1.5 3.3 3.3v10.7c0 1.8-1.5 3.3-3.3 3.3H16c-1.8 0-3.3-1.5-3.3-3.3V22.7c0-1.8 1.5-3.3 3.3-3.3z" stroke="#d1d5db" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            )}
          </g>
        </g>

        {/* Small Planets */}
        {orbits.map(orb => renderPlanet(orb))}
      </svg>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatCenter {
          0% { transform: translateY(0px); } 
          100% { transform: translateY(-8px); }
        }
        @keyframes pulseCorona {
          0% { opacity: 0.3; transform: scale(0.95); }
          100% { opacity: 0.6; transform: scale(1.05); }
        }
        @keyframes spinSlow { 
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); } 
        }
      `}} />
    </div>
  );
}
