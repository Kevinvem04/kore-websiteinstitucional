from PIL import Image

img_path = r"public/images/sobre/fundador.webp"
backup_path = r"public/images/sobre/fundador_backup.webp"

# Create backup
with open(img_path, 'rb') as f_in, open(backup_path, 'wb') as f_out:
    f_out.write(f_in.read())

# Open image
img = Image.open(img_path)
width, height = img.size

# Crop 25 pixels from the top and 25 pixels from the right
left = 0
top = 25
right = width - 25
bottom = height

cropped_img = img.crop((left, top, right, bottom))
cropped_img.save(img_path, quality=95)
print(f"Cropped from {width}x{height} to {right-left}x{bottom-top}. Saved successfully.")
