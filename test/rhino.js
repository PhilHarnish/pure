// Load dependencies
load('../js/env.rhino.js')
Envjs.log = function () {}

// Load page
window.onload = function () {
  load('../js/jquery.js')
  load('../js/pure2.js')
  print("Page loaded:")
  print($('body').text())
  print("After pure script:")
  load('testCode_jquery.js')
  print($('body').text())
};

window.location = "testPage_jquery.html"


