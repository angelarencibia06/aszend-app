import os
import re

file_path = "../aszend_landing/src/App.tsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

old_svg_elements = """        <circle cx="140" cy="140" r="132" fill="none" stroke={c.mid} strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 10" />

        <ellipse cx="140" cy="140" rx="114" ry="30"
          fill="none" stroke={c.mid}  strokeWidth="1.5" strokeOpacity="0.45"
          className="ring-a" />

        <ellipse cx="140" cy="140" rx="90" ry="22"
          fill="none" stroke={c.core} strokeWidth="1"   strokeOpacity="0.3"
          className="ring-b" />

        <ellipse cx="140" cy="140" rx="70" ry="16"
          fill="none" stroke={c.core} strokeWidth="0.8" strokeOpacity="0.2"
          className="ring-c" />

        <circle cx="140" cy="140" r="80" fill={c.mid} fillOpacity="0.2" filter={`url(#${id}h)`} />"""

new_svg_elements = """        {c.level >= 5 && <circle cx="140" cy="140" r="132" fill="none" stroke={c.mid} strokeWidth="0.5" strokeOpacity="0.15" strokeDasharray="4 10" className="ring-a" />}

        {c.level >= 2 && <ellipse cx="140" cy="140" rx="114" ry="30"
          fill="none" stroke={c.mid}  strokeWidth="1.5" strokeOpacity="0.45"
          className="ring-a" />}

        {c.level >= 3 && <ellipse cx="140" cy="140" rx="90" ry="22"
          fill="none" stroke={c.core} strokeWidth="1"   strokeOpacity="0.3"
          className="ring-b" />}

        {c.level >= 4 && <ellipse cx="140" cy="140" rx="70" ry="16"
          fill="none" stroke={c.core} strokeWidth="0.8" strokeOpacity="0.2"
          className="ring-c" />}

        <circle cx="140" cy="140" r="80" fill={c.mid} fillOpacity={c.level >= 4 ? 0.3 : 0.15} filter={`url(#${id}h)`} />
        {c.level >= 5 && <circle cx="140" cy="140" r="100" fill={c.core} fillOpacity="0.25" filter={`url(#${id}h)`} className="ring-c" />}"""

content = content.replace(old_svg_elements, new_svg_elements)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
