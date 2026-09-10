export const RANKS = [
  { id: 1, name: 'PULSO', number: '01', color1: '#60a5fa', color2: '#2563eb', shadow: 'rgba(59, 130, 246, 0.5)', req: 0, level: 1 },
  { id: 2, name: 'AURA', number: '02', color1: '#c084fc', color2: '#7e22ce', shadow: 'rgba(168, 85, 247, 0.5)', req: 7, level: 2 },
  { id: 3, name: 'NÚCLEO', number: '03', color1: '#34d399', color2: '#059669', shadow: 'rgba(16, 185, 129, 0.5)', req: 30, level: 3 },
  { id: 4, name: 'ÉTER', number: '04', color1: '#fb923c', color2: '#ea580c', shadow: 'rgba(249, 115, 22, 0.5)', req: 90, level: 4 },
  { id: 5, name: 'DOMINIO', number: '05', color1: '#fcd34d', color2: '#d97706', shadow: 'rgba(252, 211, 77, 0.5)', req: 365, level: 5 },
];

export const getStreakData = (days) => {
  if (days >= 365) return { color: '#eab308', title: 'RANGO: DOMINIO' }; // Dorado
  if (days >= 90) return { color: '#8b5cf6', title: 'RANGO: NIRVANA' }; // Morado
  if (days >= 30) return { color: '#044eda', title: 'RANGO: PURIFICACIÓN' }; // Azul fuerte
  if (days >= 10) return { color: '#ef4444', title: 'RANGO: DESPERTAR' }; // Rojo
  return { color: '#3b82f6', title: 'RANGO: INICIADO' }; // Azul base
};
