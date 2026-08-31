import os

control_path = "../aszend_app/src/pages/Control.jsx"
with open(control_path, "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace("Tu entorno protegido (Android System)", "Tu entorno protegido")
c = c.replace("Tu entorno estǭ preparado. Android Accesibility bloqueando", "Tu entorno estǭ preparado. Aszend estǭ bloqueando")
c = c.replace("Tu entorno está preparado. Android Accesibility bloqueando", "Tu entorno está preparado. Aszend está bloqueando")
c = c.replace('<AlertTriangle size={16} /> ACTIVAR PERMISOS DE ACCESIBILIDAD', '<AlertTriangle size={16} /> ACTIVAR BLOQUEO')

with open(control_path, "w", encoding="utf-8") as f:
    f.write(c)
