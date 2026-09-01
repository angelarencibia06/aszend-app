import os

with open('src/pages/Onboarding.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# We need to remove the gap-4 from the parent container that was making space for the button
old = """        return (
          <div className="flex flex-col min-h-full px-5 pb-6 pt-2 gap-4">
            <div className="flex-1 flex flex-col justify-center gap-5">"""
new = """        return (
          <div className="flex flex-col min-h-full px-5 pb-6 pt-2">
            <div className="flex-1 flex flex-col justify-center gap-5">"""

code = code.replace(old, new)

# And remove the empty div at the bottom if it exists
empty_bottom = """            </div>
            
          </div>
        );"""
empty_bottom_fix = """            </div>
          </div>
        );"""
code = code.replace(empty_bottom, empty_bottom_fix)

with open('src/pages/Onboarding.jsx', 'w', encoding='utf-8') as f:
    f.write(code)
