// Create the array
var x = new Array(7);
for (var i = 0; i < 7; i++) {
  x[i] = new Array(8);
}

// Initalize the Array
for (var i = 0; i < 7; i++) {
  for (var j = 0; j < 8; j++) {
    x[i][j] = 0;
  }
}

// Update the values from the start
function initalUpdateNumbers() {
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 8; j++) {
      document.getElementById("num" + i + j).value = x[i][j];
    }
  }
}

// Update the values on the screen
function updateNumbers() {
  for (var i = 7; i > -1; i--) {
    for (var j = 6; j > 0; j--) {
      x[j][i] = parseInt(document.getElementById("num" + j + i).value);
      if (x[j][i] >= 10) {
        x[j - 1][i] = parseInt(document.getElementById("num" + (j - 1) + i).value);
        x[j][i] = x[j][i] % 10;
        document.getElementById("num" + (j - 1) + i).value = x[j - 1][i] + 1;
      }
      document.getElementById("num" + j + i).value = x[j][i];
    }
    x[0][i] = parseInt(document.getElementById("num0" + i).value);
    document.getElementById("num0" + i).value = x[0][i];
  }
}


// Add one to the last row
$('#add1').click(function() {
  x[6][0] = parseInt(document.getElementById("num60").value) + 1;
  document.getElementById("num60").value = x[6][0];
  updateNumbers();
});

$('#add2').click(function() {
  document.getElementById("num61").value = parseInt(document.getElementById("num61").value) + 1;
  updateNumbers();

});

$('#add3').click(function() {
  document.getElementById("num62").value = parseInt(document.getElementById("num62").value) + 1;
  updateNumbers();
});

$('#add4').click(function() {
  document.getElementById("num63").value = parseInt(document.getElementById("num63").value) + 1;
  updateNumbers();
});

$('#add5').click(function() {
  document.getElementById("num64").value = parseInt(document.getElementById("num64").value) + 1;
  updateNumbers();
});

$('#add6').click(function() {
  document.getElementById("num65").value = parseInt(document.getElementById("num65").value) + 1;
  updateNumbers();
});

$('#add7').click(function() {
  document.getElementById("num66").value = parseInt(document.getElementById("num66").value) + 1;
  updateNumbers();
});

$('#add8').click(function() {
  document.getElementById("num67").value = parseInt(document.getElementById("num67").value) + 1;
  updateNumbers();
});

// Add row to row
$('#clear').click(function() {
  for (var i = 6; i > -1; i--) {
    for (var j = 6; j > -1; j--) {
      document.getElementById("num" + j + (i + 1)).value = 
        parseInt(document.getElementById("num" + j + (i + 1)).value) + 
        parseInt(document.getElementById("num" + j + i).value);
      updateNumbers();
    }
  }
});


// Start of the page
$(document).ready(function() {
  initalUpdateNumbers();
});

// Allows only Number Keys
function isNumberKey(evt) {
  var charCode = (evt.which) ? evt.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
}
