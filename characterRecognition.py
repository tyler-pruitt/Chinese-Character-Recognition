#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jan 17 03:39:35 2021

@author: tylerpruitt
"""

#import packages
import tensorflow as tf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import cv2

#load chinese_mnist.csv data
labels = ('suite_id', 'sample_id', 'code', 'value', 'character')

# url = '/kaggle/input/chinese-mnist/chinese_mnist.csv'
# csvData = pd.read_csv(url, low_memory=False)
csvData = pd.read_csv('chinese_mnist.csv', names=labels)

print(csvData.describe())
print('')

print(csvData.head())
print('')
print(csvData.tail())
print('')


#load image data

imageData = np.array((15000, 64, 64))

def loadImagesFromFolder(folder):
    images = []
    count = 0
    for filename in os.listdir(folder):
        img = cv2.imread(os.path.join(folder,filename))
        if img is not None:
            images.append(img)
            if count <= 10:
                print(filename)
                if count == 10:
                    print('')
                count+=1
    return images

def filePathCol(csvData):    
    filePath = f"input_{csvData[0]}_{csvData[1]}_{csvData[2]}.jpg" #input_1_1_10.jpg    
    return filePath

folder = '/Users/tylerpruitt/Desktop/Programming/Machine Learning/chinese character recognition/data/data/'

images = loadImagesFromFolder(folder)

imageData = np.array(images)

#check to see how images and csv data are connected
plt.imshow(imageData[0])

csvData["file_path"] = csvData.apply(filePathCol, axis=1)
print(csvData.head())
print('')

#split the data
