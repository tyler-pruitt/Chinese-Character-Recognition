// Determine if the user is using a mobile device or not
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

// Set up mobile settings
if (isMobile) {
  $('#paint').css({'width': '60%'});
  $('#character').css({'font-size': '100px'});
  $('#predictButton').css({'font-size': '40px'});
  $('#clearButton').css({'font-size': '40px'});
} else {
  $('#paint').css({'width': '300px'});
  $('#character').css({'font-size': '120px'});
  $('#predictButton').css({'font-size': '20px'});
  $('#clearButton').css({'font-size': '20px'});
}

var cw = $('#paint').width();
$('#paint').css({'height': cw + 'px'});

// From https://www.html5canvastutorials.com/labs/html5-canvas-paint-application/
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var compuetedStyle = getComputedStyle(document.getElementById('paint'));
canvas.width = parseInt(compuetedStyle.getPropertyValue('width'));
canvas.height = parseInt(compuetedStyle.getPropertyValue('height'));

var mouse = {x: 0, y: 0};

// Write on the canvas when the mouse is moving
canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

// Adjust line width and shape
context.lineWidth = isMobile ? 40 : 10;
context.lineJoin = 'round';
context.lineCap = 'round';

// Set stroke color to white
// Blue: '#0000FF', Black: '#000000', White: '#ffffff'
context.strokeStyle = '#ffffff';

// Make the canvas black instead of white
context.fillStyle='black';
context.fillRect(0,0,canvas.width,canvas.height);

// Start writing on the canvas when mouse is pressed down
canvas.addEventListener('mousedown', function(e) {
  context.moveTo(mouse.x, mouse.y);
  context.beginPath();
  canvas.addEventListener('mousemove', onPaint, false);
}, false);

// Stop writing on the canvas when the mouse is lifted up
canvas.addEventListener('mouseup', function() {
  canvas.removeEventListener('mousemove', onPaint, false);
}, false);

// Predict button
$('#predictButton').click(function(){
  // Insert loading spinner into number slot
  $('#character').html('<img id="spinner" src="spinner.gif"/>');
  
  // Retrieve image data
  var img = new Image();
  img.onload = function() {
    context.drawImage(img, 0, 0, 64, 64);
    data = context.getImageData(0, 0, 64, 64).data;
    var input = [];

    for(var i = 0; i < data.length; i += 4) {
      input.push(data[i + 2] / 255);
    }

    // Model input data
    console.log("Model Input:");
    console.log(input);

    // Predict character given image data
    predict(input);
  };
  img.src = canvas.toDataURL('image/png');
});

var onPaint = function() {
  context.lineTo(mouse.x, mouse.y);
  context.stroke();
};

// Load the model
tf.loadLayersModel('model/model.json').then(function(model) {
  window.model = model;
  console.log("Model Loaded Successfully.");
});

// http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
// Set up touch events for mobile, etc
canvas.addEventListener('touchstart', function (e) {
  mouse = getTouchPos(canvas, e);
  var touch = e.touches[0];
  canvas.dispatchEvent(new MouseEvent('mousedown', {
    clientX: touch.clientX,
    clientY: touch.clientY
  }));
}, false);

canvas.addEventListener('touchend', function (e) {
  canvas.dispatchEvent(new MouseEvent('mouseup', {}));
}, false);

canvas.addEventListener('touchmove', function (e) {
  var touch = e.touches[0];
  canvas.dispatchEvent(new MouseEvent('mousemove', {
    clientX: touch.clientX,
    clientY: touch.clientY
  }));
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
  var rect = canvasDom.getBoundingClientRect();
  return {
    x: touchEvent.touches[0].clientX - rect.left,
    y: touchEvent.touches[0].clientY - rect.top
  };
}

// Prevent scrolling when touching the canvas
document.body.addEventListener('touchstart', function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);

document.body.addEventListener('touchend', function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);

document.body.addEventListener('touchmove', function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);

// Prediction function
var predict = function(input) {
  if (window.model) {
    // If the model is loaded, make a prediction with reshaped input
    window.model.predict([tf.tensor(input).reshape([1, 64, 64])]).array().then(function(scores){
      // Process the data
      scores = scores[0];

      // The processed output from the model
      console.log("Model Output:");
      console.log(scores);

      // Determine the highest score's index
      var predictedIndex = scores.indexOf(Math.max(...scores));

      var characters = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];

      // Determine the predicted character and output to website and console
      var predictedCharacter = characters[predictedIndex];
      $('#character').html(predictedCharacter);
      console.log("Predicted Character: " + predictedCharacter);

      var probability = scores[predictedIndex] * 100;

      var probabilityDisplay = probability.toString() + "%";
      console.log("Probability: " + probabilityDisplay);

      // Round probability to three decimals
      const roundedProbability = Math.round(probability * 1000) / 1000;
      var roundedProbabilityDisplay = roundedProbability.toString() + "%";
      $('#probability').html(roundedProbabilityDisplay);

      // Update bar plot with data
      // First remove previous data
      for (var i=0;i<15;i+=1) {
        removeData(barchart);
      }

      // Add new data
      for (var i=0;i<15;i+=1) {
        addData(barchart, characters[i], scores[i]);
      }
    });
  } else {
    // The model takes a bit to load, if we are too fast, wait
    setTimeout(function(){predict(input)}, 50);
  }
}

// Clear button
$('#clearButton').click(function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // If canvas is black, replace black color after clearing the canvas
  context.fillStyle='black';
  context.fillRect(0,0,canvas.width,canvas.height);

  $('#character').html('');
  $('#probability').html('');

  // Remove existing data in bar chart
  for (var i=0;i<15;i+=1) {
    removeData(barchart);
  }
  
  // Insert 0's for data in bar chart (i.e. reset the bar chart)
  var characters = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];

  for (var i=0;i<15;i+=1) {
    addData(barchart, characters[i], 0);
  }
});
