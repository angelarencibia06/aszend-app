import React from 'react';

const RANKS = [
  { id: 1, name: 'PULSO', number: '01', core: '#93c5fd', mid: '#2563eb', outer: '#1e3a8a', req: 0, level: 1 },
  { id: 2, name: 'AURA', number: '02', core: '#c4b5fd', mid: '#7c3aed', outer: '#4c1d95', req: 7, level: 2 },
  { id: 3, name: 'NÚCLEO', number: '03', core: '#6ee7b7', mid: '#059669', outer: '#065f46', req: 30, level: 3 },
  { id: 4, name: 'ÉTER', number: '04', core: '#fdba74', mid: '#ea580c', outer: '#9a3412', req: 90, level: 4 },
  { id: 5, name: 'ASCENSIÓN', number: '05', core: '#fde68a', mid: '#d97706', outer: '#92400e', req: 365, level: 5 },
];

export function EnergyOrb({
  size = 280,
  rankIndex = 0,
  animated = true,
  className = "",
  locked = false
}) {
  const baseRank = RANKS[rankIndex] ?? RANKS[0];
  const c = locked 
    ? { core: '#6b7280', mid: '#374151', outer: '#111827', level: baseRank.level }
    : baseRank;
  
  const id = `o${rankIndex}x${size}`;

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: size * 1.7,
          height: size * 1.7,
          background: `radial-gradient(circle, ${c.mid}22 0%, transparent 68%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          position: 'absolute'
        }}
      />
      <svg
        width={size}
        height={size}
        viewBox="0 0 280 280"
        className={`relative z-10 ${animated && !locked ? "orb-float" : ""}`}
        style={{ position: 'relative', zIndex: 10, overflow: 'visible' }}
      >
        <defs>
          <radialGradient id={`${id}g`} cx="38%" cy="32%" r="65%">
            <stop offset="0%"   stopColor={c.core}  stopOpacity="1" />
            <stop offset="55%"  stopColor={c.mid}   stopOpacity="0.95" />
            <stop offset="100%" stopColor={c.outer}  stopOpacity="0.75" />
          </radialGradient>
          <filter id={`${id}f`} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="10" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id={`${id}h`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>

        {!locked && (
          <>
            {/* LEVEL 2 */}
            {c.level === 2 && <ellipse cx="140" cy="140" rx="120" ry="30" fill="none" stroke={c.mid} strokeWidth="2" strokeOpacity="0.7" transform="rotate(20 140 140)" />}
            
            {/* LEVEL 3 */}
            {c.level === 3 && (
              <>
                <ellipse cx="140" cy="140" rx="120" ry="25" fill="none" stroke={c.mid} strokeWidth="2" strokeOpacity="0.8" transform="rotate(35 140 140)" />
                <ellipse cx="140" cy="140" rx="120" ry="25" fill="none" stroke={c.mid} strokeWidth="2" strokeOpacity="0.8" transform="rotate(-35 140 140)" />
              </>
            )}

            {/* LEVEL 4 */}
            {c.level === 4 && (
              <>
                <ellipse cx="140" cy="140" rx="115" ry="20" fill="none" stroke={c.mid} strokeWidth="2.5" strokeOpacity="0.9" transform="rotate(0 140 140)" />
                <ellipse cx="140" cy="140" rx="115" ry="20" fill="none" stroke={c.mid} strokeWidth="2.5" strokeOpacity="0.9" transform="rotate(60 140 140)" />
                <ellipse cx="140" cy="140" rx="115" ry="20" fill="none" stroke={c.mid} strokeWidth="2.5" strokeOpacity="0.9" transform="rotate(120 140 140)" />
                <circle cx="140" cy="140" r="130" fill="none" stroke={c.core} strokeWidth="1" strokeOpacity="0.5" strokeDasharray="5 15" className={animated ? "orb-spin" : ""} style={{ transformOrigin: '140px 140px' }} />
              </>
            )}

            {/* LEVEL 5 */}
            {c.level === 5 && (
              <>
                <ellipse cx="140" cy="140" rx="125" ry="15" fill="none" stroke={c.core} strokeWidth="3" strokeOpacity="1" transform="rotate(0 140 140)" />
                <ellipse cx="140" cy="140" rx="125" ry="15" fill="none" stroke={c.core} strokeWidth="3" strokeOpacity="1" transform="rotate(45 140 140)" />
                <ellipse cx="140" cy="140" rx="125" ry="15" fill="none" stroke={c.core} strokeWidth="3" strokeOpacity="1" transform="rotate(90 140 140)" />
                <ellipse cx="140" cy="140" rx="125" ry="15" fill="none" stroke={c.core} strokeWidth="3" strokeOpacity="1" transform="rotate(135 140 140)" />
                <circle cx="140" cy="140" r="135" fill="none" stroke={c.mid} strokeWidth="2" strokeOpacity="0.6" strokeDasharray="10 20" className={animated ? "orb-spin-reverse" : ""} style={{ transformOrigin: '140px 140px' }} />
                <circle cx="140" cy="140" r="105" fill={c.core} fillOpacity="0.4" filter={`url(#${id}h)`} />
              </>
            )}
          </>
        )}

        <circle cx="140" cy="140" r="80" fill={c.mid} fillOpacity={c.level >= 4 && !locked ? 0.35 : 0.15} filter={`url(#${id}h)`} />

        <circle cx="140" cy="140" r="75"
          fill={`url(#${id}g)`}
          filter={`url(#${id}f)`}
          className={animated && !locked ? "orb-pulse" : ""}
          style={{ transformOrigin: "140px 140px" }}
        />

        <ellipse cx="113" cy="111" rx="22" ry="14" fill="white" fillOpacity="0.18" />
        <ellipse cx="104" cy="104" rx="8"  ry="5"  fill="white" fillOpacity="0.28" />
        
        {locked && (
          <g transform="translate(128, 128) scale(1)">
            <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="rgba(255,255,255,0.8)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
        )}
      </svg>
    </div>
  );
}
