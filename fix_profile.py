with open("src/pages/Profile.jsx", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Remove the settings button from the header
header_old = """      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ fontSize: '28px', margin: 0, fontFamily: 'Oswald', textTransform: 'uppercase' }}>Mi Perfil</h1>
        <button onClick={() => setActiveMenu('settings')} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#fff', padding: '10px', borderRadius: '12px', cursor: 'pointer' }}>
          <Settings size={20} />
        </button>
      </div>"""

header_new = """      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <h1 style={{ fontSize: '28px', margin: 0, fontFamily: 'Oswald', textTransform: 'uppercase' }}>Mi Perfil</h1>
      </div>"""

content = content.replace(header_old, header_new)

# 2. Add the Settings menu item back to the list
menu_old = """          <ChevronRight size={20} color="var(--text-muted)" />
        </div>
      </div>"""

menu_new = """          <ChevronRight size={20} color="var(--text-muted)" />
        </div>

        <div onClick={() => setActiveMenu('settings')} className="glass-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 20px', borderRadius: '16px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Settings size={20} color="#9ca3af" />
            </div>
            <div>
              <p style={{ margin: '0 0 2px 0', fontWeight: '600', fontSize: '15px' }}>Configuración</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)' }}>Cuenta, notificaciones, privacidad...</p>
            </div>
          </div>
          <ChevronRight size={20} color="var(--text-muted)" />
        </div>
      </div>"""

content = content.replace(menu_old, menu_new)

with open("src/pages/Profile.jsx", "w", encoding="utf-8") as f:
    f.write(content)
