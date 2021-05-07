#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Thu May  6 01:46:41 2021

@author: tylerpruitt
"""

import matplotlib.pyplot as plt
import os
import cv2

def loadImages(folder):
    """
    imports the images held within a folder into a list of images
    """
    images, imgdict = [], {}
    
    for filename in os.listdir(folder):
        
        img = cv2.imread(os.path.join(folder,filename),0)
        #key is "input_suite_id_sample_id_code.jpg"
        key = filename
        
        if img is not None:
            images.append(img)
            imgdict[key] = img
    
    return imgdict

def filePathCol(csvData):
    """
    returns the file path of the associated image for the indices of the csv data
    """
    filePath = f"input_{csvData[0]}_{csvData[1]}_{csvData[2]}.jpg" #input_1_1_10.jpg    
    return filePath

def disp(image):
    """
    displays the image in grayscale without axes
    """
    plt.imshow(image, cmap="gray")
    plt.axis("off")
    plt.show()

