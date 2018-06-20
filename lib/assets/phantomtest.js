var fs = require('fs');
var system = require('system');

var args = system.args;

var outputFolder = args[1]
var sourceTsv = args[2]
var contentTsv = args[3]



/**
 * imports a .tsv file and returns an array of arrays
 * @param  {str} sourcePath path to source .tsv file
 * @return {str[][]}        returns an array of arrays of strings
 */
function importTsv(sourcePath) {
  var rows = [];
  var file_h = fs.open(sourcePath, 'r');
  var line = file_h.readLine();
  while (line) {
    var elements = line.split("\t");
    rows.push(elements);
    line = file_h.readLine();
  }
  file_h.close();
  return rows;
}


var cardContent = importTsv(contentTsv);
var cardDetails = importTsv(sourceTsv);

// ignore the header rows, and concatenate them for later
var contentCardLabels = cardContent.shift();
var detailCardLabels = cardDetails.shift();
var cardsLabels = detailCardLabels.concat(contentCardLabels);

var contentKeys = cardContent.map(function(item, index) {
  return item[contentCardLabels.indexOf("Face")];
});

var detailKeys = cardDetails.map(function(item, index) {
  return item[detailCardLabels.indexOf("Face")];
});

var sharedKeys = contentKeys.filter(function(row) {
    return detailKeys.indexOf(row) !== -1;
});

var cards = []

for (var i = 0; i < sharedKeys.length; i++) {
  var key = sharedKeys[i];
  var sharedDetails = cardDetails.filter(function(row) { return row[detailCardLabels.indexOf("Face")] === key; });
  var sharedContent = cardContent.filter(function(row) { return row[contentCardLabels.indexOf("Face")] === key; });
  cards.push(sharedDetails[0].concat(sharedContent[0]))
}

for (var i = 0; i < cards.length; i++) {
  console.log(cards[i]);
}


var page = require('webpage').create();
page.open('https://google.com/', function() {
  console.log(outputFolder + 'google.png');
  console.log(outputFolder + 'google2.png');
  page.render(outputFolder + 'google.png');
  page.render(outputFolder + 'google2.png');
  phantom.exit();
});
