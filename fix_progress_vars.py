import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# I will inject the calculation logic right before it's used.
target = r'\{nextRankReq && viewIndex === highestUnlockedIndex && \('
replacement = r'''{(() => {
          const nextRankReq = viewIndex < RANKS.length - 1 ? RANKS[viewIndex + 1].req : null;
          const nextRankName = viewIndex < RANKS.length - 1 ? RANKS[viewIndex + 1].name : null;
          const prevReq = viewIndex > 0 ? RANKS[viewIndex - 1].req : 0;
          const currentReq = RANKS[viewIndex].req;
          const targetReq = nextRankReq || currentReq;
          const progressPercent = nextRankReq ? Math.min(100, Math.max(0, ((currentStreak - currentReq) / (targetReq - currentReq)) * 100)) : 100;
          const daysToNext = nextRankReq ? Math.max(0, targetReq - currentStreak) : 0;
          
          return nextRankReq && viewIndex === highestUnlockedIndex && (
'''

content = re.sub(target, replacement, content)
content = content.replace('<span>Progreso a {displayNextName}</span>', '<span>Progreso a {nextRankName}</span>')
content = content.replace('<span>{displayDaysLeft} das mǭs</span>', '<span>{daysToNext} días más</span>')
content = content.replace('style={{ width: `${displayProgress}%`', 'style={{ width: `${progressPercent}%`')
content = content.replace('background: viewRank.core, boxShadow: `0 0 10px \n${viewRank.core}` }}', 'background: viewRank.core, boxShadow: `0 0 10px ${viewRank.core}` }}')
content = content.replace('background: viewRank.core, boxShadow: `0 0 10px ${viewRank.core}` }}', 'background: viewRank.core, boxShadow: `0 0 10px ${viewRank.core}` }}')
# Close the IIFE parenthesis
content = content.replace('</div>\n          )}\n  \n          {/* Action Buttons */}', '</div>\n          )\n        })()}\n  \n          {/* Action Buttons */}')

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
