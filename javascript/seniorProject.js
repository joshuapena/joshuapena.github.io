var x10 = 0;
var x11 = 0;
var x20 = 0;
var x21 = 0;

document.getElementById("test1").innerHTML="Add '1'";
document.getElementById("test2").innerHTML="Add '1'";
document.getElementById("test3").innerHTML=x10;
document.getElementById("test4").innerHTML=x11;
document.getElementById("test5").innerHTML=x20;
document.getElementById("test6").innerHTML=x21;

function updateNumbers() {
  document.getElementById("test3").innerHTML=x10;
  document.getElementById("test4").innerHTML=x11;
  document.getElementById("test5").innerHTML=x20;
  document.getElementById("test6").innerHTML=x21;
}

$('#test1').click(function() {
  x20 += 1;
  
  if(x20 >= 10) {
    x20 = x20 % 10;
    x10 += 1;
  }
  updateNumbers();
});

$('#test2').click(function() {
  x21 += 1;
  
  if(x21 >= 10) {
    x21 = x21 % 10;
    x11 += 1;
  }
  
  updateNumbers();
});
