var x = new Array(7);
for (var i = 0; i < 7; i++) {
  x[i] = new Array(8);
}

for (var i = 0; i < 7; i++) {
  for (var j = 0; j < 8; j++) {
    x[i][j] = 0;
  }
}

function updateNumbers() {
  for (var i = 0; i < 7; i++) {
    for (var j = 0; j < 8; j ++) {
      document.getElementById("num" + i + j).innerHTML = x[i][j];
    }
  }
}

$('#add1').click(function() {
  x[6][0] += 1;
  updateNumbers();
});

$('#add2').click(function() {
  x[6][1] += 1;
  updateNumbers();
});

$('#add3').click(function() {
  x[6][2] += 1;
  updateNumbers();
});

$('#add4').click(function() {
  x[6][3] += 1;
  updateNumbers();
});

$('#add5').click(function() {
  x[6][4] += 1;
  updateNumbers();
});

$('#add6').click(function() {
  x[6][5] += 1;
  updateNumbers();
});

$('#add7').click(function() {
  x[6][6] += 1;
  updateNumbers();
});

$('#add8').click(function() {
  x[6][7] += 1;
  updateNumbers();
});

$(document).ready(function() {
  updateNumbers();  
});
