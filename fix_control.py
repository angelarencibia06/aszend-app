import os

control_path = "../aszend_app/src/pages/Control.jsx"
with open(control_path, "r", encoding="utf-8") as f:
    content = f.read()

# Restore setSites
content = content.replace("const [sites] = useLocalStorage('aszend_blocked_sites'", "const [sites, setSites] = useLocalStorage('aszend_blocked_sites'")

# Add addSite and removeSite functions right after newSite state
functions_to_insert = """
  const addSite = (e) => {
    e.preventDefault();
    const cleanSite = newSite.trim().toLowerCase();
    if (cleanSite && !sites.includes(cleanSite)) {
      setSites([...sites, cleanSite]);
      setNewSite('');
      setShowAddModal(false);
    }
  };

  const removeSite = (siteToRemove) => {
    setSites(sites.filter(site => site !== siteToRemove));
  };
"""

content = content.replace("const [newSite, setNewSite] = useState('');", "const [newSite, setNewSite] = useState('');\n" + functions_to_insert)

with open(control_path, "w", encoding="utf-8") as f:
    f.write(content)
