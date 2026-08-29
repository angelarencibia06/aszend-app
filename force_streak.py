import os

file_path = "src/context/AppContext.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Look for the AppProvider definition to insert a useEffect
find_str = "export const AppProvider = ({ children }) => {"

replace_str = """export const AppProvider = ({ children }) => {
  // FORCE STREAK TO 365 FOR TESTING PURPOSES
  useEffect(() => {
    localStorage.setItem('aszend_streak', 365);
  }, []);
"""

if "FORCE STREAK TO 365" not in content:
    content = content.replace(find_str, replace_str)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
