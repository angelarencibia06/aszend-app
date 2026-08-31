import React, { useMemo } from 'react';

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
  const id = `solar_system_static_${size}`;

  // 3D Perspective Radii for the 4 orbits
  const orbits = [
    { rank: 3, rx: size * 0.16, ry: size * 0.05, angle: 135, size: 8 },  // Orbit 1 (Inner): Éter
    { rank: 2, rx: size * 0.26, ry: size * 0.09, angle: 0, size: 8 },    // Orbit 2: Núcleo
    { rank: 1, rx: size * 0.36, ry: size * 0.13, angle: 315, size: 8 },  // Orbit 3: Aura
    { rank: 0, rx: size * 0.46, ry: size * 0.18, angle: 180, size: 8 },  // Orbit 4 (Outer): Pulso
  ];

  // Helper to get coordinates on an ellipse based on an angle
  const getCoordsOnEllipse = (rx, ry, angleDeg) => {
    const rad = angleDeg * (Math.PI / 180);
    return {
      cx: center + rx * Math.cos(rad),
      cy: center + ry * Math.sin(rad)
    };
  };

  // Render a specific small planet
  const renderPlanet = (rankIdx, rx, ry, angleDeg, pSize) => {
    const isLocked = rankIdx > highestUnlockedIndex;
    const isSelected = rankIdx === viewIndex;
    const c = isLocked ? { core: '#374151', mid: '#1f2937', outer: '#111827' } : RANKS[rankIdx];
    
    // Scale up if selected
    const scale = isSelected ? 1.4 : 1;
    const r = pSize * scale;
    const pos = getCoordsOnEllipse(rx, ry, angleDeg);

    return (
      <g 
        key={`planet_${rankIdx}`}
        transform={`translate(${pos.cx}, ${pos.cy})`}
        style={{ cursor: 'pointer' }}
        onClick={() => onSelectRank && onSelectRank(rankIdx)}
      >
        <g style={{ transition: 'all 0.3s ease', animation: `floatPlanet 4s ease-in-out ${rankIdx * 0.5}s infinite alternate` }}>
          <defs>
            <radialGradient id={`${id}_planet_${rankIdx}`} cx="35%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity={isLocked ? "0.3" : "0.9"} />
              <stop offset="20%"  stopColor={c.core}  stopOpacity="1" />
              <stop offset="85%"  stopColor={c.outer} stopOpacity="1" />
              <stop offset="100%" stopColor="#02040a" stopOpacity="1" />
            </radialGradient>
          </defs>
          
          {/* Glow */}
          {!isLocked && (
            <circle r={r * 2.5} fill={c.core} opacity={isSelected ? "0.4" : "0.15"} filter="blur(6px)" />
          )}
          
          {/* Planet Core */}
          <circle r={r} fill={`url(#${id}_planet_${rankIdx})`} />

          {/* Selection indicator */}
          {isSelected && (
            <circle r={r + 6} stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 3" fill="none" style={{ animation: 'spinSlow 10s linear infinite' }} />
          )}

          {/* Padlock for locked planets */}
          {isLocked && (
            <g transform={`translate(-5, -5) scale(0.4)`}>
              <path d="M15.3 19.3V12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7v7.3m-13.3 0h9.3c1.8 0 3.3 1.5 3.3 3.3v10.7c0 1.8-1.5 3.3-3.3 3.3H16c-1.8 0-3.3-1.5-3.3-3.3V22.7c0-1.8 1.5-3.3 3.3-3.3z" stroke="#9ca3af" strokeWidth="4" fill="none" strokeLinecap="round" />
            </g>
          )}
        </g>
      </g>
    );
  };

  // Center Sun (Ascensión - Rank 4)
  const isSunLocked = 4 > highestUnlockedIndex;
  const isSunSelected = viewIndex === 4;
  const sunColor = isSunLocked ? { core: '#374151', mid: '#1f2937', outer: '#111827' } : RANKS[4];
  const sunRadius = size * 0.16;
  const sunScale = isSunSelected ? 1.1 : 1;

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
          <radialGradient id={`${id}_sun_core`} cx="35%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity={isSunLocked ? "0.3" : "0.95"} />
            <stop offset="25%"  stopColor={sunColor.core}  stopOpacity="1" />
            <stop offset="70%"  stopColor={sunColor.mid}   stopOpacity="1" />
            <stop offset="100%" stopColor="#02040a" stopOpacity="1" />
          </radialGradient>

          {/* Volumetric Light Beam for Central Orb */}
          <linearGradient id={`${id}_beam`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={sunColor.core} stopOpacity={isSunLocked ? "0.15" : "0.5"} />
            <stop offset="40%" stopColor={sunColor.mid} stopOpacity={isSunLocked ? "0.05" : "0.15"} />
            <stop offset="100%" stopColor={sunColor.outer} stopOpacity="0" />
          </linearGradient>

          <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 3D Perspective Orbital Ellipses */}
        <g stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" fill="none">
          {orbits.map((orb, i) => (
            <ellipse key={`orbit_path_${i}`} cx={center} cy={center} rx={orb.rx} ry={orb.ry} />
          ))}
        </g>

        {/* Volumetric Light Beam (below the orb) */}
        <polygon 
          points={`${center - 25},${center} ${center + 25},${center} ${center + 80},${size} ${center - 80},${size}`} 
          fill={`url(#${id}_beam)`} 
          style={{ animation: 'pulseBeam 4s infinite alternate' }}
        />

        {/* Render planets on orbits */}
        {orbits.map(orb => renderPlanet(orb.rank, orb.rx, orb.ry, orb.angle, orb.size))}

        {/* Massive Central Orb (Ascensión) */}
        <g 
          transform={`translate(${center}, ${center})`}
          style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
          onClick={() => onSelectRank && onSelectRank(4)}
        >
          {/* Ambient Glow */}
          {!isSunLocked && (
            <circle r={sunRadius * 2} fill={sunColor.core} opacity="0.25" filter="url(#centerGlow)" />
          )}

          {/* Central Orb Core */}
          <circle r={sunRadius * sunScale} fill={`url(#${id}_sun_core)`} style={{ animation: 'floatCenter 6s ease-in-out infinite alternate' }} />

          {/* Sun Selection indicator */}
          {isSunSelected && (
            <circle r={sunRadius * sunScale + 12} stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 4" fill="none" style={{ animation: 'spinSlow 10s linear infinite' }} />
          )}

          {/* Padlock for Central Orb */}
          {isSunLocked && (
            <g transform={`translate(-12, -12) scale(1)`}>
              <path d="M15.3 19.3V12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7v7.3m-13.3 0h9.3c1.8 0 3.3 1.5 3.3 3.3v10.7c0 1.8-1.5 3.3-3.3 3.3H16c-1.8 0-3.3-1.5-3.3-3.3V22.7c0-1.8 1.5-3.3 3.3-3.3z" stroke="#9ca3af" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}
        </g>
      </svg>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatPlanet { 
          0% { transform: translateY(0px); } 
          100% { transform: translateY(-5px); } 
        }
        @keyframes floatCenter {
          0% { transform: translateY(0px) scale(0.98); } 
          100% { transform: translateY(-8px) scale(1.02); }
        }
        @keyframes pulseBeam {
          0% { opacity: 0.7; }
          100% { opacity: 1; }
        }
        @keyframes spinSlow { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
