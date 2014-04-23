var x10 = 0;
var x11 = 0;

document.getElementById("test1").innerHTML="Add '1'";
document.getElementById("test2").innerHTML="Add '1'";
document.getElementById("test3").innerHTML=x10;
document.getElementById("test4").innerHTML=x11;

function click00() {
  x10 += 1;
  document.getElementById("test3").innerHTML=x10;
}

function click01() {
  x11 += 1;
  document.getElementById("test4").innerHTML=x11;
}

$('#test1').click(function() {
  click00();
  
  if(x10 >= 10) {
    x10 = x10 % 10;
    document.getElementById("test4").innerHTML=x10;
    x11 += 1;
    document.getElementById("test4").innerHTML=x11;
  }
});

$('#test2').click(function() {
  click01();
});
