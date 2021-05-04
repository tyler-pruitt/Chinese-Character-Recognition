#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jan 17 03:39:35 2021
Data found at https://www.kaggle.com/gpreda/chinese-mnist
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

"""
For this data 100 people wrote each of the 15 characters 10 times

suite_id is for each volunteer (100 total)
sample_id is for each sample of each volunteer (10 total) 
    i.e. each volunteer writes each character 10 times
code is used to identify each character in their sequence
    i.e. code is the ith character in order
    i.e. 零 is 1, 二 is 2, ... 九 is 10,
value is the numerical value of the character i.e. 5
character is the actual symbol i.e. 五
"""

#url = '/kaggle/input/chinese-mnist/chinese_mnist.csv'
#csvData = pd.read_csv(url, low_memory=False)
csvData = pd.read_csv('chinese_mnist.csv', names=labels)

#output csv information to screen
print(csvData.describe())
print('')

print(csvData.head())
print('')
print(csvData.tail())
print('')


#load image data (15,000 images each 64 x 64 x 3)

def loadImagesFromFolder(folder):
    """
    imports the images held within a folder into a list of images
    """
    images, imgdict = [], {}
    count = 0
    
    for filename in os.listdir(folder):
        
        img = cv2.imread(os.path.join(folder,filename))
        #key is "input_suite_id_sample_id_code.jpg"
        key = filename
        
        if img is not None:
            images.append(img)
            imgdict[key] = img
    
    imgdata = np.array(images)
    
    return imgdata, imgdict

def filePathCol(csvData):
    """
    returns the file path of the associated image for the indices of the csv data
    """
    filePath = f"input_{csvData[0]}_{csvData[1]}_{csvData[2]}.jpg" #input_1_1_10.jpg    
    return filePath

directory = '/Users/tylerpruitt/Desktop/Coding/Machine Learning/chinese character recognition/data/data/'

imageData, imageDict = loadImagesFromFolder(directory)

#check to see how images and csv data are connected
plt.imshow(imageData[0])

csvData["file_path"] = csvData.apply(filePathCol, axis=1)

print(csvData.head())
print('')

csvDataArray = np.array(csvData)

#convert strings of numbers in csvDataArray into int type
for i in range(len(csvDataArray)):
    for j in range(4):
        try:
            csvDataArray[i][j] = int(csvDataArray[i][j])
        except:
            pass

print(csvDataArray)

#split into training data (12,000 images) and testing data (3,000 images) into an 80/20 split

"""
Note:
split should be in multiples of 10% because we need to split evenly so as to incorporate all
of the 100 participants and we need to split evenly so as to incorporate all of the characters
assuming that there is no important difference between the first couple characters written and
the last couple characters written (assuming same character as just mentioned) then since each
person only wrote each character 10 times we are limited to the degree in which we can split
because 10 is a discrete number that we have to split between our training data and our test
data
"""

#here we need to split based on sample_id (sample_id index is 1)

trainData = np.empty((12000, 6), dtype=np.ndarray)
testData = np.empty((3000, 6), dtype=np.ndarray)

trainCount, testCount = 0, 0

for i in range(1, len(csvDataArray)):
    if int(csvDataArray[i][1]) <= 8:
        trainData[trainCount] = csvDataArray[i]
        trainCount += 1
    else:
        testData[testCount] = csvDataArray[i]
        testCount += 1

trainFiles, testFiles = np.empty((12000), dtype=object), np.empty((3000), dtype=object)
trainLabels, testLabels = np.empty((12000), dtype=object), np.empty((3000), dtype=object)

for i in range(len(trainData)):
    trainFiles[i] = trainData[i][5]
    trainLabels[i] = trainData[i][4]

for i in range(len(testData)):
    testFiles[i] = testData[i][5]
    testLabels[i] = testData[i][4]

trainImages, testImages = np.empty((12000, 64, 64, 3), dtype=int), np.empty((3000, 64, 64, 3), dtype=int)

trainImgCount, testImgCount = 0, 0

for fileName in trainFiles:
    trainImages[trainImgCount] = imageDict[fileName]
    trainImgCount += 1

for fileName in testFiles:
    testImages[testImgCount] = imageDict[fileName]
    testImgCount += 1

trainImages = trainImages / 255
testImages = testImages / 255

#training data is (trainLabels, trainImages) and testing data is (testLabels, testImages)

#build the model
