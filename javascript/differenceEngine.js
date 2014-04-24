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

updateNumbers();
