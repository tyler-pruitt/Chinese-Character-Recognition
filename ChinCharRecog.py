#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Jan 17 03:39:35 2021
Last Updated on Tue May 18 06:59 2021
Author: Tyler Pruitt
"""

# Import packages
import tensorflow as tf
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import cv2

# Import helper functions
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
    filePath = f"input_{csvData[0]}_{csvData[1]}_{csvData[2]}.jpg"
    return filePath

def displayImage(image, name=""):
    """
    displays the image in grayscale with name in the title if given one
    """
    if name == "":
        plt.figure(frameon=False)
    plt.imshow(image, cmap="gray")
    plt.title(name)
    plt.axis("off")
    plt.show()

# Load chinese_mnist.csv data
labels = ('suite_id', 'sample_id', 'code', 'value', 'character')
characters = ('零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿')

"""
For this data 100 people wrote each of the 15 characters 10 times

suite_id is for each volunteer (100 total)
sample_id is for each sample of each volunteer (10 total) 
    i.e. each volunteer writes each character 10 times
code is used to identify each character in their sequence
    i.e. code is the ith character in order
    i.e. 零 is 1, 一 is 2, 二 is 3, ... 九 is 10,
value is the numerical value of the character i.e. 5
character is the actual symbol i.e. 五
"""

csvData = pd.read_csv('chinese_mnist.csv', names=labels)

# Output csv information to screen
print(csvData.describe(), end="\n\n")

print(csvData.head(), end="\n\n")
print(csvData.tail(), end="\n\n")


# Load image data (15,000 images each 64 x 64)
directory = '/Users/tylerpruitt/Desktop/Coding/Machine Learning/chinese character recognition/data/data/'

imageDict = loadImages(directory)

# Check to see how images and csv data are connected
displayImage(imageDict["input_1_1_10.jpg"], "input_1_1_10.jpg")

csvData["file_path"] = csvData.apply(filePathCol, axis=1)

print(csvData.head(), end="\n\n")

csvDataArray = np.array(csvData)

# Convert strings of numbers in csvDataArray into int type
for i in range(len(csvDataArray)):
    for j in range(4):
        try:
            csvDataArray[i][j] = int(csvDataArray[i][j])
        except:
            pass

print(csvDataArray, end="\n\n")

# Split into training data (12,000 images) and testing data (3,000 images) into an 80/20 split

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

# Here we need to 80/20 split based on sample_id (sample_id index is 1)

split = 0.8

trainData = np.empty((int(15000*split), 6), dtype=np.ndarray)
testData = np.empty((15000 - int(15000*split), 6), dtype=np.ndarray)

trainCount, testCount = 0, 0

for i in range(1, len(csvDataArray)):
    if int(csvDataArray[i][1]) <= int(10*split):
        trainData[trainCount] = csvDataArray[i]
        trainCount += 1
    else:
        testData[testCount] = csvDataArray[i]
        testCount += 1

trainFiles = trainData[:,5]
testFiles = testData[:,5]

trainCharacters = trainData[:,4]
testCharacters = testData[:,4]

trainLabels = trainData[:,2]
testLabels = testData[:,2]

trainLabels = np.asarray(trainLabels).astype(np.float32)
testLabels = np.asarray(testLabels).astype(np.float32)

# Subtract 1 from each train label and test label to meet input format for model
for i in range(len(trainLabels)):
    trainLabels[i] -= 1

for i in range(len(testLabels)):
    testLabels[i] -= 1

trainImages, testImages = np.empty((12000, 64, 64), dtype=int), np.empty((3000, 64, 64), dtype=int)

trainImgCount, testImgCount = 0, 0

for fileName in trainFiles:
    trainImages[trainImgCount] = imageDict[fileName]
    trainImgCount += 1

for fileName in testFiles:
    testImages[testImgCount] = imageDict[fileName]
    testImgCount += 1

trainImages = trainImages / 255
testImages = testImages / 255

# Training data is (trainLabels, trainImages) and testing data is (testLabels, testImages)

# Build the model
model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(64, 64)),
    tf.keras.layers.Dense(128, activation="relu"),
    tf.keras.layers.Dense(15)
])

# Compile the model
model.compile(optimizer="adam", loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=["accuracy"])

# Train the model with the training data
model.fit(trainImages, trainLabels, epochs=15)

# Test the model with the testing data
print("Evaluating testing data...")
test_loss, test_acc = model.evaluate(testImages, testLabels, verbose=1)
print("Test accuracy: " + str(round(test_acc*100, 3)) + "%")
print("Test loss:", round(test_loss, 5), end="\n\n")

# Test model's prediction about other characters in the testing data
modelProbability = tf.keras.Sequential([model, tf.keras.layers.Softmax()])

PredictionData = modelProbability.predict(testImages)

# Check predictions on the 50th and 500th images in the testing data and show images
barPlotAxis = (0,1,2,3,4,5,6,7,8,9,10,11,12,13,14)

print("Expected value for testImages[50]:", testCharacters[50])
print("Model's prediction on testImages[50]", characters[np.argmax(PredictionData[50])])
displayImage(testImages[50])
plt.bar(barPlotAxis, PredictionData[50])

print("Expected value for testImages[500]:", testCharacters[500])
print("Model's prediction on testImages[500]", characters[np.argmax(PredictionData[500])])
displayImage(testImages[500])
plt.bar(barPlotAxis, PredictionData[500])

# Save the model and the probability model
ModelFilePath = "./saved_model"

tf.keras.models.save_model(model, ModelFilePath)

ModelProbabilityFilePath = "./saved_probability_model"

tf.keras.models.save_model(modelProbability, ModelProbabilityFilePath)

# Load the model to check that it works
NewModel = tf.keras.models.load_model(ModelFilePath, compile=True)
