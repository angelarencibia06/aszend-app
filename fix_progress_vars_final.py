import re

with open('src/pages/Home.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove the block I added earlier
target_block = r'''  const nextRankReq = viewIndex < RANKS.length - 1 \? RANKS\[viewIndex \+ 1\]\.req : null;
  const nextRankName = viewIndex < RANKS\.length - 1 \? RANKS\[viewIndex \+ 1\]\.name : null;
  const currentReq = RANKS\[viewIndex\]\.req;
  const targetReq = nextRankReq \|\| currentReq;
  const progressPercent = nextRankReq \? Math\.min\(100, Math\.max\(0, \(\(currentStreak - currentReq\) / \(targetReq - currentReq\)\) \* 100\)\) : 100;
  const daysToNext = nextRankReq \? Math\.max\(0, targetReq - currentStreak\) : 0;
  const displayNextName = nextRankName;
  const displayDaysLeft = daysToNext;
  const displayProgress = progressPercent;'''

content = re.sub(target_block, '', content)

# Update the display variables in the JSX
content = content.replace('{displayNextName}', '{nextRankName}')
content = content.replace('{displayDaysLeft}', '{daysToNext}')
content = content.replace('{displayProgress}', '{progressPercent}')

with open('src/pages/Home.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
