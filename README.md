# Chinese-Character-Recognition
A repo for machine-learning powered image classification of handwritten Chinese characters

## Website (Still in Progress)
URL: https://tyler-pruitt.github.io/Chinese-Character-Recognition/

## Packages Used
TensorFlow, Numpy, Pandas, Matplotlib, CV2, OS

## Data
Found at https://www.kaggle.com/gpreda/chinese-mnist

For this data 100 people wrote each of the 15 characters 10 times

### suite_id
suite_id is for each volunteer (100 total)

### sample_id
sample_id is for each sample of each volunteer (10 total) 
i.e. each volunteer writes each character 10 times
    
### code
code is used to identify each character in their sequence
i.e. code is the ith character in order

i.e. 零 is 1, 一 is 2, 二 is 3, ... 九 is 10

### value
value is the numerical value of the character i.e. 5

### character
character is the actual symbol i.e. 五

## Model Performance
Optimizer: ADAM

Loss function: Sparse Categorical Cross Entropy

### Training Data (80%)
Epochs: 15

Loss: 0.0844

Accuracy: 0.9890 (98.90%)

### Testing Data (20%)
Loss: 0.8035

Accuracy: 0.7753 (77.53%)

### A Closer Look

Note: The outputs of these models are given in the range from 0 to 14. In order to convert to characters, you can use this convenient dictionary

```python
digit_to_char = {0:'零', 1:'一', 2:'二', 3:'三', 4:'四', 5:'五', 6:'六', 7:'七', 8:'八', 9:'九', 10:'十', 11:'百', 12:'千', 13:'万', 14:'亿'}
```

#### 50th Test Image
Prediction data:

```python
In [1]: predictData[50]
Out [1]: array([3.6610535e-07, 1.8792988e-28, 2.2422669e-12, 1.7063133e-10,
       2.6500999e-09, 5.2112355e-06, 3.2691182e-07, 8.3664847e-05,
       3.6446830e-13, 9.9990106e-01, 1.1595256e-14, 5.7882625e-07,
       9.6461701e-09, 3.3319463e-07, 8.4753528e-06], dtype=float32)
```

<img src="https://github.com/tyler-pruitt/Chinese-Character-Recognition/blob/main/images/testimage50.png" style="width:64;height:64;" />

<img src="https://github.com/tyler-pruitt/Chinese-Character-Recognition/blob/main/images/barplot50.png" style="width:1000;height:500;" />

#### 500th Test Image
Prediction data:

 ```python
 In [2]: predictData[500]
 
 Out [2]: array([3.83269071e-04, 4.26350415e-21, 5.74980230e-10, 5.73274974e-07,
       4.58842493e-04, 8.47115181e-03, 6.79080131e-07, 1.44536525e-05,
       8.73805250e-10, 1.13052677e-03, 2.78494355e-07, 9.84949350e-01,
       2.79740023e-04, 4.30813758e-03, 2.93952530e-06], dtype=float32)
 ```

<img src="https://github.com/tyler-pruitt/Chinese-Character-Recognition/blob/main/images/testimage500.png" style="width:64;height:64;" />

<img src="https://github.com/tyler-pruitt/Chinese-Character-Recognition/blob/main/images/barplot500.png" style="width:1000;height:500;" />

## To Use

### Option A

#### 1) Load the models into your file

In your Python code, enter the following code to import the models

```python
import tensorflow as tf

model = tf.keras.models.load_model('./saved_model', compile=True)
probability_model = tf.keras.models.load_model('./saved_probability_model', compile=True)
```

The outputs of these models are given in the range from 0 to 14. In order to convert to characters, you can use this convenient dictionary

```python
digit_to_char = {0:'零', 1:'一', 2:'二', 3:'三', 4:'四', 5:'五', 6:'六', 7:'七', 8:'八', 9:'九', 10:'十', 11:'百', 12:'千', 13:'万', 14:'亿'}
```

You can then use this model in for other uses! Enjoy!

### Option B

#### 1) Download 'archive.zip' and 'ChinCharRecog.py'

#### 2) Unpack 'archive.zip' and ensure that its contents are in the same directory as 'ChinCharRecog.py'
This should include the 'data' folder, the 'chinese_mnist.csv' csv file, and 'chinese_mnist.tfrecords'. 
For future reference let's call this directory 'folder1'.

#### 3) Inside of 'ChinCharRecog.py' change the variable 'directory' on line 81
Change 'directory' to the /folder1/data/data/ directory. On macOS, this might like something like '/Users/user_name_here/Desktop/folder1/data/data/'.

#### 4) Run the file 'ChinCharRecog.py' and enjoy!
