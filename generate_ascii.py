import urllib.request
import sys

def convert_image_to_ascii(url, new_width=60):
    try:
        from PIL import Image
    except ImportError:
        print("Pillow library is missing. Install it using: pip install Pillow")
        return

    ASCII_CHARS = ["@", "#", "S", "%", "?", "*", "+", ";", ":", ",", "."]

    # download image
    urllib.request.urlretrieve(url, "temp_image.jpg")
    
    try:
        image = Image.open("temp_image.jpg")
    except Exception as e:
        print(e)
        return
    
    # resize image
    width, height = image.size
    aspect_ratio = height/width
    new_height = int(aspect_ratio * new_width * 0.5)
    image = image.resize((new_width, new_height))
    
    # convert to greyscale
    image = image.convert('L')
    
    pixels = image.getdata()
    
    # map pixels to ascii chars
    new_pixels = [ASCII_CHARS[pixel//25] for pixel in pixels]
    new_pixels = ''.join(new_pixels)
    
    # split string of chars into multiple strings of length equal to new width and create a list
    new_pixels_count = len(new_pixels)
    ascii_image = [new_pixels[index:index + new_width] for index in range(0, new_pixels_count, new_width)]
    ascii_image = "\n".join(ascii_image)
    
    print(ascii_image)

# Using a public domain brain illustration
brain_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Brain_outline.svg/512px-Brain_outline.svg.png"
convert_image_to_ascii(brain_url)
