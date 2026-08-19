from PIL import Image, ImageFilter
import os

files = [
    'public/images/novidades/meio-ambiente/cafeipirangasenhor.webp',
    'public/images/novidades/meio-ambiente/cafeipirangasenhores.webp'
]

scale = 4

for file in files:
    img = Image.open(file)
    if img.mode != 'RGB':
        img = img.convert('RGB')
    
    new_size = (img.width * scale, img.height * scale)
    upscaled = img.resize(new_size, Image.Resampling.LANCZOS)
    
    sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
    
    sharpened.save(file, 'WEBP', quality=95)
    print(f"Upscaled {file} from {img.size} to {new_size}")
