import os

css = """
.science-list-v2 {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}
.sci-card-v2 {
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 20px;
  padding: 20px;
  text-align: center;
}
.sci-card-v2 h3 {
  margin: 0 0 8px 0;
  font-size: 18px;
  font-weight: 800;
  color: #fff;
}
.sci-card-v2 p {
  margin: 0;
  font-size: 14px;
  color: #9ca3af;
  line-height: 1.4;
}
"""

with open("../aszend_app/src/styles/App.css", "a", encoding="utf-8") as f:
    f.write(css)
