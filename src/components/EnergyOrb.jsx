import React, { useMemo } from 'react';
import { Lock } from 'lucide-react';

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
  const id = `solar_system_${size}`;

  // Radii for the orbits
  const orbits = [
    { rank: 3, r: size * 0.16, color: RANKS[3].core, angle: 45, size: 10 },  // Éter
    { rank: 2, r: size * 0.25, color: RANKS[2].core, angle: 210, size: 10 }, // Núcleo
    { rank: 1, r: size * 0.35, color: RANKS[1].core, angle: 90, size: 10 },  // Aura
    { rank: 0, r: size * 0.45, color: RANKS[0].core, angle: 315, size: 10 }, // Pulso
  ];

  // Static stars background
  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      x: Math.random() * size,
      y: Math.random() * size,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.1
    }));
  }, [size]);

  // Helper to get coordinates on a circle
  const getCoords = (radius, angleDeg) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return {
      x: center + radius * Math.cos(rad),
      y: center + radius * Math.sin(rad)
    };
  };

  // Render a specific planet
  const renderPlanet = (rankIdx, cx, cy, pSize) => {
    const isLocked = rankIdx > highestUnlockedIndex;
    const isSelected = rankIdx === viewIndex;
    const c = isLocked ? { core: '#374151', mid: '#1f2937', outer: '#111827' } : RANKS[rankIdx];
    
    // Scale up if selected
    const scale = isSelected ? 1.4 : 1;
    const r = pSize * scale;

    return (
      <g 
        key={`planet_${rankIdx}`}
        transform={`translate(${cx}, ${cy})`}
        style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
        onClick={() => onSelectRank && onSelectRank(rankIdx)}
      >
        <defs>
          <radialGradient id={`${id}_planet_${rankIdx}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity={isLocked ? "0.3" : "0.9"} />
            <stop offset="20%"  stopColor={c.core}  stopOpacity="1" />
            <stop offset="85%"  stopColor={c.outer} stopOpacity="1" />
            <stop offset="100%" stopColor="#02040a" stopOpacity="1" />
          </radialGradient>
        </g>
        
        {/* Glow */}
        {!isLocked && (
          <circle r={r * 2.5} fill={c.core} opacity={isSelected ? "0.4" : "0.15"} filter="blur(8px)" />
        )}
        
        {/* Rings for planets */}
        <g stroke={c.core} strokeOpacity="0.6" strokeWidth="1" fill="none">
          {rankIdx === 1 && (
            <ellipse rx={r * 1.8} ry={r * 0.4} transform="rotate(-20)" />
          )}
          {rankIdx === 2 && (
            <>
              <ellipse rx={r * 1.8} ry={r * 0.5} transform="rotate(-30)" />
              <ellipse rx={r * 1.8} ry={r * 0.5} transform="rotate(30)" />
            </>
          )}
          {rankIdx === 3 && (
            <>
              <ellipse rx={r * 1.6} ry={r * 0.4} transform="rotate(0)" />
              <ellipse rx={r * 1.6} ry={r * 0.4} transform="rotate(60)" />
              <ellipse rx={r * 1.6} ry={r * 0.4} transform="rotate(120)" />
            </>
          )}
        </g>

        {/* Planet Core */}
        <circle r={r} fill={`url(#${id}_planet_${rankIdx})`} />

        {/* Selection indicator */}
        {isSelected && (
          <circle r={r + 6} stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 3" fill="none" style={{ animation: 'spinSlow 10s linear infinite' }} />
        )}

        {/* Padlock for locked planets */}
        {isLocked && (
          <g transform={`translate(-6, -6) scale(0.5)`}>
            <path d="M15.3 19.3V12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7v7.3m-13.3 0h9.3c1.8 0 3.3 1.5 3.3 3.3v10.7c0 1.8-1.5 3.3-3.3 3.3H16c-1.8 0-3.3-1.5-3.3-3.3V22.7c0-1.8 1.5-3.3 3.3-3.3z" stroke="#9ca3af" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        )}
      </g>
    );
  };

  // Center Sun (Ascensión)
  const isSunLocked = 4 > highestUnlockedIndex;
  const sunColor = isSunLocked ? { core: '#374151', mid: '#1f2937', outer: '#111827' } : RANKS[4];
  const sunRadius = size * 0.08;
  const isSunSelected = viewIndex === 4;
  const sunScale = isSunSelected ? 1.2 : 1;

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
            <stop offset="0%"   stopColor="#ffffff" stopOpacity={isSunLocked ? "0.3" : "0.9"} />
            <stop offset="20%"  stopColor={sunColor.core}  stopOpacity="1" />
            <stop offset="85%"  stopColor={sunColor.outer} stopOpacity="1" />
            <stop offset="100%" stopColor="#02040a" stopOpacity="1" />
          </radialGradient>
        </defs>

        {/* Stars Background */}
        <g>
          {stars.map((star, i) => (
            <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="#ffffff" opacity={star.opacity} />
          ))}
        </g>

        {/* Orbit Lines */}
        <g style={{ animation: 'spinSlow 60s linear infinite', transformOrigin: `${center}px ${center}px` }}>
          {orbits.map((orb, i) => (
            <circle 
              key={`orbit_${i}`}
              cx={center} 
              cy={center} 
              r={orb.r} 
              stroke={orb.color} 
              strokeWidth="1.5" 
              fill="none" 
              opacity="0.5"
            />
          ))}

          {/* Render planets on orbits */}
          {orbits.map((orb) => {
            const coords = getCoords(orb.r, orb.angle);
            return renderPlanet(orb.rank, coords.x, coords.y, orb.size);
          })}
        </g>

        {/* Center Sun (Ascensión) */}
        <g 
          transform={`translate(${center}, ${center})`}
          style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
          onClick={() => onSelectRank && onSelectRank(4)}
        >
          {/* Sun Glow */}
          {!isSunLocked && (
            <circle r={sunRadius * 3} fill={sunColor.core} opacity={isSunSelected ? "0.5" : "0.2"} filter="blur(15px)" />
          )}

          {/* Sun Rings */}
          <g stroke={sunColor.core} strokeOpacity="0.8" strokeWidth="1.5" fill="none">
            <ellipse rx={sunRadius * 1.8 * sunScale} ry={sunRadius * 0.4 * sunScale} transform="rotate(0)" />
            <ellipse rx={sunRadius * 1.8 * sunScale} ry={sunRadius * 0.4 * sunScale} transform="rotate(45)" />
            <ellipse rx={sunRadius * 1.8 * sunScale} ry={sunRadius * 0.4 * sunScale} transform="rotate(90)" />
            <ellipse rx={sunRadius * 1.8 * sunScale} ry={sunRadius * 0.4 * sunScale} transform="rotate(135)" />
          </g>

          {/* Sun Core */}
          <circle r={sunRadius * sunScale} fill={`url(#${id}_sun_core)`} />

          {/* Sun Selection indicator */}
          {isSunSelected && (
            <circle r={sunRadius * sunScale + 12} stroke="#ffffff" strokeWidth="1.5" strokeDasharray="3 4" fill="none" style={{ animation: 'spinSlow 10s linear infinite' }} />
          )}

          {/* Padlock for Sun */}
          {isSunLocked && (
            <g transform={`translate(-8, -8) scale(0.66)`}>
              <path d="M15.3 19.3V12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7v7.3m-13.3 0h9.3c1.8 0 3.3 1.5 3.3 3.3v10.7c0 1.8-1.5 3.3-3.3 3.3H16c-1.8 0-3.3-1.5-3.3-3.3V22.7c0-1.8 1.5-3.3 3.3-3.3z" stroke="#9ca3af" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
          )}
        </g>
      </svg>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spinSlow { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
