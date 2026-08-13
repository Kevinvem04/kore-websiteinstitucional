import sys
import subprocess
import os

try:
    from PIL import Image
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    from PIL import Image

def process_image(input_path, output_path):
    if not os.path.exists(input_path):
        print(f"Error: {input_path} not found.")
        sys.exit(1)

    img = Image.open(input_path).convert("RGBA")
    
    # Upscale 4x
    new_size = (img.width * 4, img.height * 4)
    img = img.resize(new_size, Image.Resampling.LANCZOS)
    
    data = img.getdata()
    new_data = []
    
    for item in data:
        r, g, b, a = item
        # If it's grayscale (r,g,b are close to each other)
        if abs(r-g) < 25 and abs(g-b) < 25 and abs(r-b) < 25:
            intensity = (r + g + b) // 3
            # Convert black text to white text, and white bg to transparent
            alpha = 255 - intensity
            new_data.append((255, 255, 255, alpha))
        else:
            # Colored pixel (Red K). 
            # The red K has white background anti-aliasing.
            # Let's try to remove the white halo.
            # If r,g,b are high (mixed with white), we reduce g and b to recover red, and drop alpha.
            # This is a bit complex, so we'll just keep the color but make very bright pixels slightly transparent
            if r > 200 and g > 200 and b > 200:
                new_data.append((255, 255, 255, 0))
            else:
                new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"Successfully processed and saved to {output_path}")

process_image("public/images/sobre/logo kore.PNG", "public/images/sobre/logo-kore-transparent.png")
