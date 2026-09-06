import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Just put the variables right after `const isViewLocked = viewIndex > highestUnlockedIndex;`
target = r'const isViewLocked = viewIndex > highestUnlockedIndex;'
replacement = r'''const isViewLocked = viewIndex > highestUnlockedIndex;
  
  const nextRankReq = viewIndex < RANKS.length - 1 ? RANKS[viewIndex + 1].req : null;
  const nextRankName = viewIndex < RANKS.length - 1 ? RANKS[viewIndex + 1].name : null;
  const currentReq = RANKS[viewIndex].req;
  const targetReq = nextRankReq || currentReq;
  const progressPercent = nextRankReq ? Math.min(100, Math.max(0, ((currentStreak - currentReq) / (targetReq - currentReq)) * 100)) : 100;
  const daysToNext = nextRankReq ? Math.max(0, targetReq - currentStreak) : 0;
  const displayNextName = nextRankName;
  const displayDaysLeft = daysToNext;
  const displayProgress = progressPercent;
'''

content = content.replace(target, replacement)

# Fix the encoding gibberish for días más
content = content.replace('{displayDaysLeft} das mǭs', '{displayDaysLeft} días más')
content = content.replace('{displayDaysLeft} dÃ\xadas mÇ\xads', '{displayDaysLeft} días más')
content = content.replace('das mǭs', 'días más')

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
