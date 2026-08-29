import os
import re

css_path = "../aszend_app/src/styles/Home2.css"
if os.path.exists(css_path):
    with open(css_path, "r", encoding="utf-8") as f:
        css = f.read()

    # Fix the ring base styles to be perfectly circular but smaller, and we rely on 3D rotation
    css = re.sub(r'\.ring-[1-4] \{.*?width: 150%; height: 40%;.*?\}', lambda m: m.group(0).replace('width: 150%; height: 40%;', 'width: 115%; height: 115%;'), css, flags=re.DOTALL)
    
    # Change rotateX(60deg) to rotateX(75deg) in keyframes to make them look elliptical
    css = css.replace("rotateX(60deg)", "rotateX(75deg)")
    
    with open(css_path, "w", encoding="utf-8") as f:
        f.write(css)


checkin_path = "../aszend_app/src/styles/CheckIn.css"
new_checkin_css = """
.checkin-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center; /* Center float */
  padding: 20px;
}

.checkin-full-modal {
  width: 100%;
  max-width: 400px;
  max-height: 90vh;
  background: linear-gradient(180deg, #13141c 0%, #0a0a0f 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.checkin-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  background: rgba(255,255,255,0.02);
}

.back-btn {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 50%;
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s;
}
.back-btn:active { transform: scale(0.9); }

.checkin-title {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0;
  color: #fff;
}

.checkin-scroll-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}

.checkin-scroll-content::-webkit-scrollbar {
  width: 4px;
}
.checkin-scroll-content::-webkit-scrollbar-thumb {
  background: rgba(255,255,255,0.1);
  border-radius: 4px;
}

.checkin-subtitle {
  font-size: 14px;
  color: var(--text-secondary);
  margin: 0 0 15px 0;
  line-height: 1.5;
}

.time-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(37, 99, 235, 0.15);
  border: 1px solid rgba(37, 99, 235, 0.3);
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: #60a5fa;
  margin-bottom: 30px;
  box-shadow: 0 0 15px rgba(37, 99, 235, 0.1);
}

.questions-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.question-block label {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 12px;
}

.options-row {
  display: flex;
  gap: 10px;
}

.opt-pill {
  flex: 1;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.08);
  color: var(--text-muted);
  padding: 14px 10px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.opt-pill::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%);
  opacity: 0;
  transition: opacity 0.25s;
}

.opt-pill:active {
  transform: scale(0.97);
}

.opt-pill.active {
  background: rgba(37, 99, 235, 0.15);
  border-color: #3b82f6;
  color: #fff;
  box-shadow: 0 0 20px rgba(37, 99, 235, 0.2), inset 0 0 15px rgba(37, 99, 235, 0.1);
}

.opt-pill.active::after {
  opacity: 1;
}

.calculate-btn {
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: #fff;
  border: 1px solid rgba(255,255,255,0.2);
  padding: 18px;
  border-radius: 16px;
  font-size: 15px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 800;
  margin-top: 40px;
  cursor: pointer;
  box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.calculate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px -5px rgba(37, 99, 235, 0.6);
}

.calculate-btn:active:not(:disabled) {
  transform: translateY(1px);
}

.calculate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
  background: #1f2937;
  border-color: rgba(255,255,255,0.05);
  color: var(--text-muted);
}
"""

with open(checkin_path, "w", encoding="utf-8") as f:
    f.write(new_checkin_css)
