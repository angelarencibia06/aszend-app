new_css = """
/* NEW ANIMATIONS AND LOCK STATES */
@keyframes floatSphere {
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
}

@keyframes spinRing {
  0% { transform: translate(-50%, -50%) rotate(-25deg) scale(1); }
  50% { transform: translate(-50%, -50%) rotate(155deg) scale(1.05); }
  100% { transform: translate(-50%, -50%) rotate(335deg) scale(1); }
}

.animated-sphere {
  animation: floatSphere 4s ease-in-out infinite;
}

.spinning-ring {
  animation: spinRing 12s linear infinite;
  border-color: rgba(255, 255, 255, 0.4) !important;
}

.carousel-item.locked .sphere-wrapper {
  opacity: 0.5;
  filter: grayscale(100%);
}
"""

with open("src/styles/Home2.css", "a", encoding="utf-8") as f:
    f.write(new_css)
