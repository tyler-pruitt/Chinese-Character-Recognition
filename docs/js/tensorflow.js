var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

if (isMobile) {
  $('#paint').css({'width': '60%'});
  $('#number').css({'width': '30%', 'font-size': '240px'});
  $('#predict_button').css({'font-size': '50px'});
  $('#clear').css({'font-size': '50px'});
} else {
  $('#paint').css({'width': '300px'});
  $('#number').css({'width': '150px', 'font-size': '120px'});
  $('#predict_button').css({'font-size': '30px'});
  $('#clear').css({'font-size': '30px'});
}

var cw = $('#paint').width();
$('#paint').css({'height': cw + 'px'});

cw = $('#number').width();
$('#number').css({'height': cw + 'px'});

// From https://www.html5canvastutorials.com/labs/html5-canvas-paint-application/
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');

var compuetedStyle = getComputedStyle(document.getElementById('paint'));
canvas.width = parseInt(compuetedStyle.getPropertyValue('width'));
canvas.height = parseInt(compuetedStyle.getPropertyValue('height'));

var mouse = {x: 0, y: 0};

canvas.addEventListener('mousemove', function(e) {
  mouse.x = e.pageX - this.offsetLeft;
  mouse.y = e.pageY - this.offsetTop;
}, false);

context.lineWidth = isMobile ? 40 : 15;
context.lineJoin = 'round';
context.lineCap = 'round';

// Blue: '#0000FF', Black: '#000000', White: '#ffffff'
context.strokeStyle = '#ffffff';

// Make the canvas black instead of white
context.fillStyle='black';
context.fillRect(0,0,canvas.width,canvas.height);

canvas.addEventListener('mousedown', function(e) {
  context.moveTo(mouse.x, mouse.y);
  context.beginPath();
  canvas.addEventListener('mousemove', onPaint, false);
}, false);

canvas.addEventListener('mouseup', function() {
  canvas.removeEventListener('mousemove', onPaint, false);
}, false);

$('#predict_button').click(function(){
  $('#number').html('<img id="spinner" src="spinner.gif"/>');
  
  var img = new Image();
  img.onload = function() {
    context.drawImage(img, 0, 0, 64, 64);
    data = context.getImageData(0, 0, 64, 64).data;
    var input = [];

    for(var i = 0; i < data.length; i += 4) {
      input.push(data[i + 2] / 255);
    }

    console.log("Image Data:");
    console.log(input);

    predict(input);
  };
  img.src = canvas.toDataURL('image/png');
});

var onPaint = function() {
  context.lineTo(mouse.x, mouse.y);
  context.stroke();
};

tf.loadLayersModel('model/model.json').then(function(model) {
  window.model = model;
  console.log("Model Loaded Successfully.");
});

// http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html
// Set up touch events for mobile, etc
canvas.addEventListener('touchstart', function (e) {
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

var predict = function(input) {
  if (window.model) {
    window.model.predict([tf.tensor(input).reshape([1, 64, 64])]).array().then(function(scores){
      // Model Input Data
      console.log("Model Input:");
      console.log(tf.tensor(input).reshape([1, 64, 64]).data());

      // Process the data
      scores = scores[0];

      // The processed output from the model
      console.log("Model Output:");
      console.log(scores);

      var predictedIndex = scores.indexOf(Math.max(...scores));

      var characters = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];

      var predictedCharacter = characters[predictedIndex];
      $('#character').html(predictedCharacter);
      console.log("Predicted Character: " + predictedCharacter);

      var probability = scores[predictedIndex] * 100;
      var probabilityDisplay = probability.toString() + "%";
      $('#probability').html(probabilityDisplay);
      console.log("Probability: " + probabilityDisplay);

      $('#number').html(predictedCharacter);

      // Update bar plot with data (first remove previous data and then add new data)
      for (var i=0;i<15;i+=1) {
        removeData(barchart);
      }

      for (var i=0;i<15;i+=1) {
        addData(barchart, characters[i], scores[i]);
      }
    });
  } else {
    // The model takes a bit to load, if we are too fast, wait
    setTimeout(function(){predict(input)}, 50);
  }
}

$('#clear').click(function(){
  context.clearRect(0, 0, canvas.width, canvas.height);
  
  // If canvas is black, replace black color after clearing the canvas
  context.fillStyle='black';
  context.fillRect(0,0,canvas.width,canvas.height);

  $('#character').html('');
  $('#probability').html('');
  $('#number').html('');

  // Remove existing data and insert zeros
  for (var i=0;i<15;i+=1) {
    removeData(barchart);
  }
  
  var characters = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '千', '万', '亿'];

  for (var i=0;i<15;i+=1) {
    addData(barchart, characters[i], 0);
  }
});
