import os

css = """
/* ONBOARDING 2.0 */
.onboarding-page {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #050505;
  color: #fff;
  padding: 24px;
}
.slide-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  max-width: 400px;
  margin: 0 auto;
  width: 100%;
}
.icon-wrapper {
  width: 90px;
  height: 90px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 32px;
}
.slide-title {
  font-size: 32px;
  font-weight: 900;
  font-family: 'Oswald', sans-serif;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}
.slide-desc {
  font-size: 15px;
  color: #9ca3af;
  line-height: 1.5;
  margin: 0 0 40px 0;
}
.stats-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.stat-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 16px;
  border-radius: 16px;
  text-align: left;
}
.stat-text h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  font-weight: 700;
}
.stat-text span {
  font-size: 13px;
  color: #9ca3af;
}

.benefits-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.benefit-row {
  display: flex;
  align-items: center;
  gap: 16px;
  text-align: left;
  font-size: 15px;
  font-weight: 600;
}
.benefit-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  flex-shrink: 0;
}

.pricing-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.price-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.05);
  padding: 20px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}
.price-card.selected {
  background: rgba(139, 92, 246, 0.05);
  border-color: rgba(139, 92, 246, 0.5);
}
.price-card.highlight {
  border-color: #8b5cf6;
}
.recommended-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: #8b5cf6;
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  padding: 4px 12px;
  border-radius: 12px;
  letter-spacing: 1px;
}
.radio-circle {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}
.price-card.selected .radio-circle {
  border-color: #8b5cf6;
}
.radio-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #8b5cf6;
}
.price-info {
  display: flex;
  flex-direction: column;
  text-align: left;
}
.price-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 4px;
}
.price-cost {
  font-size: 18px;
  font-weight: 800;
}
.price-cost small {
  font-size: 12px;
  color: #9ca3af;
  font-weight: 400;
}

.onboarding-footer {
  padding: 20px 0;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
}
.progress-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  transition: all 0.3s;
}
.dot.active {
  width: 24px;
}
.next-btn {
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  font-size: 16px;
  font-weight: 800;
  justify-content: center;
  border: none;
  color: #fff;
  cursor: pointer;
}
"""
with open("../aszend_app/src/styles/App.css", "a", encoding="utf-8") as f:
    f.write(css)
