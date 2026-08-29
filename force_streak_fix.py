import os

file_path = "src/context/AppContext.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

find_str = """export const AppProvider = ({ children }) => {
  // FORCE STREAK TO 365 FOR TESTING PURPOSES
  useEffect(() => {
    localStorage.setItem('aszend_streak', 365);
  }, []);"""

replace_str = """export const AppProvider = ({ children }) => {
"""

if "FORCE STREAK TO 365" in content:
    content = content.replace(find_str, replace_str)

# Now do it correctly with the hook setter
find_str_2 = """  const [streak, setStreak] = useLocalStorage('aszend_streak', 12);"""
replace_str_2 = """  const [streak, setStreak] = useLocalStorage('aszend_streak', 365);

  // FORCE STREAK TO 365 OVERRIDING LOCAL STORAGE FOR TESTING
  useEffect(() => {
    setStreak(365);
  }, []);"""

content = content.replace(find_str_2, replace_str_2)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
