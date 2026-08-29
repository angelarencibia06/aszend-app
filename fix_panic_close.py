with open("src/components/PanicRoom.jsx", "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("const { setIsPanicRoomActive } = useAppContext();", "const { closePanicRoom } = useAppContext();")
content = content.replace("  const closePanicRoom = () => {\n    setIsPanicRoomActive(false);\n  };\n", "")

with open("src/components/PanicRoom.jsx", "w", encoding="utf-8") as f:
    f.write(content)
