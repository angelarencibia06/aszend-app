with open("src/pages/Home.jsx", "r", encoding="utf-8") as f:
    content = f.read()

old_logic = """  // Next rank logic
  const activeRankDef = RANKS[activeIndex];
  const isLocked = currentStreak < activeRankDef.req;
  let nextRankReq = null;
  let nextRankName = null;
  
  if (!isLocked && activeIndex < RANKS.length - 1) {
    nextRankReq = RANKS[activeIndex + 1].req;
    nextRankName = RANKS[activeIndex + 1].name;
  }

  const daysToNext = nextRankReq ? nextRankReq - currentStreak : 0;
  const progressPercent = nextRankReq ? Math.min(100, Math.max(0, ((currentStreak - activeRankDef.req) / (nextRankReq - activeRankDef.req)) * 100)) : 100;"""

new_logic = """  // Next rank logic
  let highestUnlockedIndex = 0;
  for (let i = 0; i < RANKS.length; i++) {
    if (currentStreak >= RANKS[i].req) {
      highestUnlockedIndex = i;
    }
  }

  const activeRankDef = RANKS[activeIndex];
  const isLocked = currentStreak < activeRankDef.req;
  const isActualCurrentRank = activeIndex === highestUnlockedIndex;
  
  let nextRankReq = null;
  let nextRankName = null;
  
  // Only show progress bar if they are viewing their ACTUAL current rank
  if (isActualCurrentRank && activeIndex < RANKS.length - 1) {
    nextRankReq = RANKS[activeIndex + 1].req;
    nextRankName = RANKS[activeIndex + 1].name;
  }

  const daysToNext = nextRankReq ? nextRankReq - currentStreak : 0;
  const progressPercent = nextRankReq ? Math.min(100, Math.max(0, ((currentStreak - activeRankDef.req) / (nextRankReq - activeRankDef.req)) * 100)) : 100;"""

content = content.replace(old_logic, new_logic)
content = content.replace("das mǭs", "días más")

with open("src/pages/Home.jsx", "w", encoding="utf-8") as f:
    f.write(content)
