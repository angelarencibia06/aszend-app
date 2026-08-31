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
  const id = `solar_system_3d_${size}`;
  const centralRank = RANKS[viewIndex] || RANKS[0];
  const isCentralLocked = viewIndex > highestUnlockedIndex;

  // 3D Perspective Radii for the orbits
  const innerRx = size * 0.35;
  const innerRy = size * 0.12;
  
  const outerRx = size * 0.45;
  const outerRy = size * 0.18;

  // The 4 other ranks that will be orbiting
  const orbitingRanks = RANKS.map((r, i) => ({ ...r, originalIndex: i })).filter(r => r.originalIndex !== viewIndex);

  // Hardcoded positions on the 2 ellipses for the 4 planets to look like 3D depth
  const planetPositions = [
    { cx: center - innerRx, cy: center, size: 8, delay: 0 },                                  // Left, Inner
    { cx: center + innerRx, cy: center, size: 8, delay: 0.5 },                                // Right, Inner
    { cx: center - outerRx * 0.7, cy: center + outerRy * 0.7, size: 12, delay: 0.2 },         // Bottom-Left, Outer (Closer = bigger)
    { cx: center + outerRx * 0.7, cy: center - outerRy * 0.7, size: 6, delay: 0.7 },          // Top-Right, Outer (Further = smaller)
  ];

  // Static stars background
  const stars = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      x: Math.random() * size,
      y: Math.random() * size,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.1
    }));
  }, [size]);

  // Render a specific small planet
  const renderPlanet = (rankData, pos, index) => {
    const isLocked = rankData.originalIndex > highestUnlockedIndex;
    const c = isLocked ? { core: '#374151', mid: '#1f2937', outer: '#111827' } : rankData;
    const r = pos.size;

    return (
      <g 
        key={`planet_${rankData.originalIndex}`}
        transform={`translate(${pos.cx}, ${pos.cy})`}
        style={{ cursor: 'pointer', transition: 'all 0.3s ease', animation: `floatPlanet 4s ease-in-out ${pos.delay}s infinite alternate` }}
        onClick={() => onSelectRank && onSelectRank(rankData.originalIndex)}
      >
        <defs>
          <radialGradient id={`${id}_planet_${rankData.originalIndex}`} cx="35%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity={isLocked ? "0.3" : "0.9"} />
            <stop offset="20%"  stopColor={c.core}  stopOpacity="1" />
            <stop offset="85%"  stopColor={c.outer} stopOpacity="1" />
            <stop offset="100%" stopColor="#02040a" stopOpacity="1" />
          </radialGradient>
        </defs>
        
        {/* Glow */}
        {!isLocked && (
          <circle r={r * 2.5} fill={c.core} opacity="0.3" filter="blur(6px)" />
        )}
        
        {/* Planet Core */}
        <circle r={r} fill={`url(#${id}_planet_${rankData.originalIndex})`} />

        {/* Small Padlock for locked planets */}
        {isLocked && (
          <g transform={`translate(-5, -5) scale(0.4)`}>
            <path d="M15.3 19.3V12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7v7.3m-13.3 0h9.3c1.8 0 3.3 1.5 3.3 3.3v10.7c0 1.8-1.5 3.3-3.3 3.3H16c-1.8 0-3.3-1.5-3.3-3.3V22.7c0-1.8 1.5-3.3 3.3-3.3z" stroke="#9ca3af" strokeWidth="4" fill="none" strokeLinecap="round" />
          </g>
        )}
      </g>
    );
  };

  const centerColor = isCentralLocked ? { core: '#374151', mid: '#1f2937', outer: '#111827' } : centralRank;
  const centerRadius = size * 0.18;

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
          <radialGradient id={`${id}_center_core`} cx="35%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#ffffff" stopOpacity={isCentralLocked ? "0.3" : "0.95"} />
            <stop offset="25%"  stopColor={centerColor.core}  stopOpacity="1" />
            <stop offset="70%"  stopColor={centerColor.mid}   stopOpacity="1" />
            <stop offset="100%" stopColor="#02040a" stopOpacity="1" />
          </radialGradient>

          {/* Volumetric Light Beam for Central Orb */}
          <linearGradient id={`${id}_beam`} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={centerColor.core} stopOpacity={isCentralLocked ? "0.1" : "0.5"} />
            <stop offset="40%" stopColor={centerColor.mid} stopOpacity={isCentralLocked ? "0.05" : "0.15"} />
            <stop offset="100%" stopColor={centerColor.outer} stopOpacity="0" />
          </linearGradient>

          <filter id="centerGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Stars Background */}
        <g>
          {stars.map((star, i) => (
            <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="#ffffff" opacity={star.opacity} />
          ))}
        </g>

        {/* 3D Perspective Orbital Ellipses */}
        <g stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" fill="none">
          <ellipse cx={center} cy={center} rx={innerRx} ry={innerRy} />
          <ellipse cx={center} cy={center} rx={outerRx} ry={outerRy} />
        </g>

        {/* Volumetric Light Beam (below the orb) */}
        {!isCentralLocked && (
          <polygon 
            points={`${center - 25},${center} ${center + 25},${center} ${center + 80},${size} ${center - 80},${size}`} 
            fill={`url(#${id}_beam)`} 
            style={{ animation: 'pulseBeam 4s infinite alternate' }}
          />
        )}

        {/* Render planets on orbits */}
        {orbitingRanks.map((rankData, i) => renderPlanet(rankData, planetPositions[i], i))}

        {/* Massive Central Orb */}
        <g 
          transform={`translate(${center}, ${center})`}
          style={{ cursor: 'default' }}
        >
          {/* Ambient Glow */}
          {!isCentralLocked && (
            <circle r={centerRadius * 2} fill={centerColor.core} opacity="0.25" filter="url(#centerGlow)" />
          )}

          {/* Central Orb Core */}
          <circle r={centerRadius} fill={`url(#${id}_center_core)`} style={{ animation: 'floatCenter 6s ease-in-out infinite alternate' }} />

          {/* Padlock for Central Orb */}
          {isCentralLocked && (
            <g transform={`translate(-16, -16) scale(1.3)`}>
              <path d="M15.3 19.3V12c0-4.8 3.9-8.7 8.7-8.7s8.7 3.9 8.7 8.7v7.3m-13.3 0h9.3c1.8 0 3.3 1.5 3.3 3.3v10.7c0 1.8-1.5 3.3-3.3 3.3H16c-1.8 0-3.3-1.5-3.3-3.3V22.7c0-1.8 1.5-3.3 3.3-3.3z" stroke="#9ca3af" strokeWidth="2.5" fill="none" strokeLinecap="round" />
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
      `}} />
    </div>
  );
}
