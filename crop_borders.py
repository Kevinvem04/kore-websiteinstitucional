from PIL import Image

files = [
    'public/images/novidades/meio-ambiente/cafeipirangasenhor.webp',
    'public/images/novidades/meio-ambiente/cafeipirangasenhores.webp'
]

crop_amount = 5 # pixels to crop from each edge

for file in files:
    try:
        img = Image.open(file)
        width, height = img.size
        
        left = crop_amount
        top = crop_amount
        right = width - crop_amount
        bottom = height - crop_amount
        
        cropped = img.crop((left, top, right, bottom))
        cropped.save(file, 'WEBP', quality=100)
        print(f"Cropped {file} from {width}x{height} to {right-left}x{bottom-top}")
    except Exception as e:
        print(f"Error processing {file}: {e}")
