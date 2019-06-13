import cv2, numpy as np
import os


direc = "C://Users/ramap/Documents/Portfolio/images"
os.chdir(direc)
print(os.getcwd())



#replaces a previous image with a resized image if wanted
def resize(image_name, direc, newDim:tuple, final_name):
    os.chdir(direc)
    img = cv2.imread(image_name, -1)
    new_img = cv2.resize(img, newDim)
    cv2.imwrite(final_name, new_img)

def turn_to_white(image_name, direc, final_name):
    os.chdir(direc)
    img = cv2.imread(image_name, -1)
    pixel_array = img.tolist()
    for pixel_row in pixel_array:
        for pixel in pixel_row:
            for k in range(0,3):
                pixel[k] = 255

    cv2.imwrite(final_name, np.array(pixel_array))

turn_to_white('github (1).png', direc, 'github.png')