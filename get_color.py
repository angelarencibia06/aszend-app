from PIL import Image
import sys

def get_dominant_blue(image_path):
    img = Image.open(image_path)
    img = img.convert('RGB')
    
    blues = []
    for x in range(img.width):
        for y in range(img.height):
            r, g, b = img.getpixel((x, y))
            # Find pixels where blue is dominant
            if b > r + 30 and b > g + 30 and b > 100:
                blues.append((r, g, b))
                
    if not blues:
        print("No blue found")
        sys.exit(1)
        
    avg_r = sum(c[0] for c in blues) // len(blues)
    avg_g = sum(c[1] for c in blues) // len(blues)
    avg_b = sum(c[2] for c in blues) // len(blues)
    
    print(f"#{avg_r:02x}{avg_g:02x}{avg_b:02x}")

if __name__ == "__main__":
    get_dominant_blue(sys.argv[1])
