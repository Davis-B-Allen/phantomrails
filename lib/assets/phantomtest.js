var system = require('system');
var args = system.args;

var outputFolder = args[1]

var page = require('webpage').create();
page.open('https://google.com/', function() {
  console.log(outputFolder + 'google.png');
  console.log(outputFolder + 'google2.png');
  page.render(outputFolder + 'google.png');
  page.render(outputFolder + 'google2.png');
  phantom.exit();
});
