new_css = """
/* RANKS CAROUSEL */
.ranks-section {
  width: 100%;
  overflow: hidden;
  margin-top: 20px;
}

.carousel-container {
  width: 100%;
  position: relative;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  align-items: center;
  gap: 40px;
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.carousel-item {
  opacity: 0.4;
  transform: scale(0.7);
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  cursor: pointer;
}

.carousel-item.active {
  opacity: 1;
  transform: scale(1.1);
}

.sphere-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sphere {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: relative;
}

.orbital-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 40%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  transform: translate(-50%, -50%) rotate(-25deg);
  pointer-events: none;
}

.highlight {
  position: absolute;
  top: 15%;
  left: 20%;
  width: 25%;
  height: 25%;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  filter: blur(2px);
}

.streak-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 16px;
  border-radius: 20px;
  border: 1px solid;
  font-size: 14px;
}

/* QUICK ACTIONS */
.quick-actions {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 10px;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: transform 0.2s, color 0.2s;
}

.action-btn:active {
  transform: scale(0.95);
}

.action-btn:hover {
  color: #fff;
}

.action-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
}

.action-btn span {
  font-size: 12px;
  font-weight: 500;
}
"""

with open("src/styles/Home2.css", "a", encoding="utf-8") as f:
    f.write(new_css)
