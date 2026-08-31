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

  // Adjusted 3D Perspective Radii for the 4 orbits to be nicely spaced
  // Angles chosen to place one planet in each quadrant:
  // Orbit 1 (Inner) - Éter: bottom-left (145 deg)
  // Orbit 2 - Núcleo: bottom-right (35 deg)
  // Orbit 3 - Aura: top-right (315 deg)
  // Orbit 4 (Outer) - Pulso: top-left (215 deg)
  const orbits = [
    { rank: 3, rx: size * 0.18, ry: size * 0.07, angle: 145, size: 8 }, 
    { rank: 2, rx: size * 0.27, ry: size * 0.11, angle: 35,  size: 8 }, 
    { rank: 1, rx: size * 0.36, ry: size * 0.15, angle: 315, size: 8 }, 
    { rank: 0, rx: size * 0.45, ry: size * 0.19, angle: 215, size: 8 }, 
  ];

  const getCoordsOnEllipse = (rx, ry, angleDeg) => {
    const rad = angleDeg * (Math.PI / 180);
    return {
      cx: center + rx * Math.cos(rad),
      cy: center + ry * Math.sin(rad)
    };
  };

  const renderPlanet = (rankIdx, rx, ry, angleDeg, pSize) => {
    const isLocked = rankIdx > highestUnlockedIndex;
    const isSelected = rankIdx === viewIndex;
    const c = isLocked ? { core: '#4b5563', mid: '#374151', outer: '#1f2937' } : RANKS[rankIdx];
    
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
        <g style={{ transition: 'all 0.3s ease', animation: `floatPlanet 4s ease-in-out ${rankIdx * 0.7}s infinite alternate` }}>
          <defs>
            <radialGradient id={`${id}_planet_${rankIdx}`} cx="35%" cy="35%" r="65%">
              <stop offset="0%"   stopColor="#ffffff" stopOpacity={isLocked ? "0.4" : "0.9"} />
              <stop offset="20%"  stopColor={c.core}  stopOpacity="1" />
              <stop offset="75%"  stopColor={c.outer} stopOpacity="1" />
              <stop offset="100%" stopColor={isLocked ? "#111827" : "#02040a"} stopOpacity="0.8" />
            </radialGradient>
          </defs>
          
          {/* Planet Glow */}
          {!isLocked && (
            <circle cx="0" cy="0" r={r * 2.5} fill={c.core} opacity={isSelected ? "0.5" : "0.2"} filter="blur(5px)" />
          )}
          
          {/* Planet Core (Added subtle stroke to define the true edge) */}
          <circle cx="0" cy="0" r={r} fill={`url(#${id}_planet_${rankIdx})`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

          {/* Selection indicator */}
          {isSelected && (
            <circle cx="0" cy="0" r={r + 6} stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 3" fill="none" style={{ animation: 'spinSlow 8s linear infinite' }} />
          )}

          {/* Small Padlock (Mathematically centered) */}
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
  const sunRadius = size * 0.16;
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
          <radialGradient id={`${id}_sun_core`} cx="35%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity={isSunLocked ? "0.3" : "0.95"} />
            <stop offset="25%"  stopColor={sunColor.core}  stopOpacity="1" />
            <stop offset="70%"  stopColor={sunColor.mid}   stopOpacity="1" />
            <stop offset="100%" stopColor={isSunLocked ? "#111827" : "#02040a"} stopOpacity="0.8" />
          </radialGradient>

          {/* Soft Volumetric Light Pillar */}
          <linearGradient id={`${id}_pillar`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={sunColor.core} stopOpacity={isSunLocked ? "0.1" : "0.4"} />
            <stop offset="100%" stopColor={sunColor.outer} stopOpacity="0" />
          </linearGradient>

          <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="20" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 3D Perspective Orbital Ellipses */}
        <g stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" fill="none">
          {orbits.map((orb, i) => (
            <ellipse key={`orbit_path_${i}`} cx={center} cy={center} rx={orb.rx} ry={orb.ry} />
          ))}
        </g>

        {/* Soft Volumetric Light Pillar (Behind center orb) */}
        {!isSunLocked && (
          <ellipse 
            cx={center} 
            cy={center + size * 0.15} 
            rx={sunRadius * 1.2} 
            ry={size * 0.25} 
            fill={`url(#${id}_pillar)`} 
            filter="blur(15px)"
            style={{ animation: 'pulsePillar 4s ease-in-out infinite alternate' }}
          />
        )}

        {/* Render planets on orbits */}
        {orbits.map(orb => renderPlanet(orb.rank, orb.rx, orb.ry, orb.angle, orb.size))}

        {/* Massive Central Orb (Ascensión) */}
        <g 
          transform={`translate(${center}, ${center})`}
          style={{ cursor: 'pointer' }}
          onClick={() => onSelectRank && onSelectRank(4)}
        >
          <g style={{ transition: 'all 0.3s ease', animation: 'floatCenter 6s ease-in-out infinite alternate' }}>
            {/* Ambient Glow */}
            {!isSunLocked && (
              <circle cx="0" cy="0" r={sunRadius * 2.2} fill={sunColor.core} opacity="0.3" filter="url(#softGlow)" />
            )}

            {/* Central Orb Core */}
            <circle cx="0" cy="0" r={sunRadius * sunScale} fill={`url(#${id}_sun_core)`} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />

            {/* Sun Selection indicator */}
            {isSunSelected && (
              <circle cx="0" cy="0" r={sunRadius * sunScale + 14} stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 4" fill="none" style={{ animation: 'spinSlow 10s linear infinite' }} />
            )}

            {/* Padlock for Central Orb (Mathematically centered) */}
            {isSunLocked && (
              <g transform={`scale(1) translate(-10.65, -14.65)`}>
                <path d="M15.3 19.3V12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7v7.3m-13.3 0h9.3c1.8 0 3.3 1.5 3.3 3.3v10.7c0 1.8-1.5 3.3-3.3 3.3H16c-1.8 0-3.3-1.5-3.3-3.3V22.7c0-1.8 1.5-3.3 3.3-3.3z" stroke="#d1d5db" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </g>
            )}
          </g>
        </g>
      </svg>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes floatPlanet { 
          0% { transform: translateY(0px); } 
          100% { transform: translateY(-6px); } 
        }
        @keyframes floatCenter {
          0% { transform: translateY(0px); } 
          100% { transform: translateY(-8px); }
        }
        @keyframes pulsePillar {
          0% { opacity: 0.6; transform: scaleY(0.95); }
          100% { opacity: 1; transform: scaleY(1.05); }
        }
        @keyframes spinSlow { 
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); } 
        }
      `}} />
    </div>
  );
}
