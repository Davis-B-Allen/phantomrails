var fs = require('fs');
var system = require('system');
var page = require('webpage').create();

var args = system.args;

var sourceTsv = "input/data/q8/Q8Me_details.tsv";
var contentTsv = "input/data/q8/Q8Me_en.tsv";
var contentTsv2 = "input/data/q8/Q8Me_en.tsv";

var defaultRemoteFileUrl = "https://ancient-fortress-56378.herokuapp.com/test";
var fileUrl = getFileUrl("input/html/cardBilingual.html");
var bleed = false;
var vpWidth = 1500;
var vpHeight = 2100;
var topicColumnName = "DisplayTopic";
var textColumnName = "DisplayText";
var outputPath = "output/";
var cardFont = "segoe";

function getFileUrl(str) {
  var pathName = fs.absolute(str).replace(/\\/g, '/');
  // Windows drive letter must be prefixed with a slash
  if (pathName[0] !== "/") {
    pathName = "/" + pathName;
  }
  return encodeURI("file://" + pathName);
};

function looksLikePath(someInputString) {
  return ((someInputString.indexOf('/') > -1) || (someInputString.indexOf("\\") > -1));
}

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

console.log("Args: ");
for (var i = 0; i < args.length; i++) {
  console.log(i + ": " + args[i]);
}

console.log("-------- Processing args");
if (args.length === 1) {
  console.log('No additional arguments passed when invoking this script');
} else {
  // --tsvdetails
  if (args.indexOf("--tsvdetails") > -1) {
    var tsvArg = args[args.indexOf("--tsvdetails") + 1];
    if (tsvArg) {
      sourceTsv = (looksLikePath(tsvArg)) ? tsvArg : "input/" + tsvArg;
      console.log(args.indexOf("--tsvdetails") + ": " + args[args.indexOf("--tsvdetails")] + ": " + args[args.indexOf("--tsvdetails") + 1]);
    } else {
      console.log("no tsvdetails argument found");
    }
  }

  // --tsvcontent
  if (args.indexOf("--tsvcontent") > -1) {
    var tsvArg = args[args.indexOf("--tsvcontent") + 1];
    if (tsvArg) {
      contentTsv = (looksLikePath(tsvArg)) ? tsvArg : "input/" + tsvArg;
      console.log(args.indexOf("--tsvcontent") + ": " + args[args.indexOf("--tsvcontent")] + ": " + args[args.indexOf("--tsvcontent") + 1]);
    } else {
      console.log("no tsvcontent argument found");
    }
  }

  // --tsvcontent2
  if (args.indexOf("--tsvcontent2") > -1) {
    var tsvArg = args[args.indexOf("--tsvcontent2") + 1];
    if (tsvArg) {
      contentTsv2 = (looksLikePath(tsvArg)) ? tsvArg : "input/" + tsvArg;
      console.log(args.indexOf("--tsvcontent2") + ": " + args[args.indexOf("--tsvcontent2")] + ": " + args[args.indexOf("--tsvcontent2") + 1]);
    } else {
      console.log("no tsvcontent2 argument found");
    }
  }

  // --remote
  var remoteFlag = false
  if (args.indexOf("--remote") > -1) {
    var remote = args[args.indexOf("--remote") + 1];
    if (remote) {
      remoteFlag = true;
      if (remote.toLowerCase() == "true") {
        fileUrl = defaultRemoteFileUrl;
      } else {
        fileUrl = remote;
      }
      console.log(args.indexOf("--remote") + ": " + args[args.indexOf("--remote")] + ": " + args[args.indexOf("--remote") + 1]);
    } else {
      console.log("no remote argument found");
    }
  }

  // --localalt
  if (args.indexOf("--localalt") > -1) {
    var localalt = args[args.indexOf("--localalt") + 1];
    if (localalt) {
      var localAltPath = (looksLikePath(localalt)) ? localalt : "input/html/" + localalt;
      fileUrl = getFileUrl(localAltPath);
      console.log(args.indexOf("--localalt") + ": " + args[args.indexOf("--localalt")] + ": " + args[args.indexOf("--localalt") + 1]);
      if (remoteFlag) {
        console.log("Both remote and localalt arguments detected. Defaulting to local source. To use remote source, please exclude localalt option");
      }
    } else {
      console.log("no localalt argument found");
    }
  }

  // --bleed
  if (args.indexOf("--bleed") > -1) {
    var bleedArg = args[args.indexOf("--bleed") + 1];
    if (bleedArg) {
      if (bleedArg.toLowerCase() == "true") {
        bleed = true;
        vpWidth = 1644;
        vpHeight = 2244;
      }
      console.log(args.indexOf("--bleed") + ": " + args[args.indexOf("--bleed")] + ": " + args[args.indexOf("--bleed") + 1]);
    } else {
      console.log("no bleed argument found");
    }
  }

  // --topic
  if (args.indexOf("--topic") > -1) {
    var topic = args[args.indexOf("--topic") + 1];
    if (topic) {
      var topicColumnName = topic;
    } else {
      console.log("no topic argument found");
    }
  }

  // --text
  if (args.indexOf("--text") > -1) {
    var text = args[args.indexOf("--text") + 1];
    if (text) {
      var textColumnName = text;
    } else {
      console.log("no text argument found");
    }
  }

  // --outputfolder
  if (args.indexOf("--outputfolder") > -1) {
    var outputArg = args[args.indexOf("--outputfolder") + 1];
    if (outputArg) {
      outputPath = (looksLikePath(outputArg)) ? outputArg : outputPath + outputArg + "/";
    } else {
      console.log("no output argument found");
    }
  }

  // --font
  if (args.indexOf("--font") > -1) {
    var font = args[args.indexOf("--font") + 1];
    if (font) {
      cardFont = font;
      console.log(args.indexOf("--font") + ": " + args[args.indexOf("--font")] + ": " + args[args.indexOf("--font") + 1]);
    } else {
      console.log("no output argument found");
    }
  }
}
console.log("-------- Done processing args");

var cardContent = importTsv(contentTsv);
var cardContent2 = importTsv(contentTsv2);
var cardDetails = importTsv(sourceTsv);

// ignore the header rows, and concatenate them for later
var contentCardLabels = cardContent.shift();
var contentCardLabels2 = cardContent2.shift();
var detailCardLabels = cardDetails.shift();
var cardsLabels = detailCardLabels.concat(contentCardLabels);

var contentKeys = cardContent.map(function(item, index) {
  return item[contentCardLabels.indexOf("Face")];
});

var contentKeys2 = cardContent2.map(function(item, index) {
  return item[contentCardLabels2.indexOf("Face")];
});

var detailKeys = cardDetails.map(function(item, index) {
  return item[detailCardLabels.indexOf("Face")];
});



var sharedKeys = contentKeys.filter(function(row) {
  return contentKeys2.indexOf(row) !== -1;
});

var validKeys = sharedKeys.filter(function(row) {
  return detailKeys.indexOf(row) !== -1;
});




var validContent = cardContent.filter(function(row) {
  var key = row[contentCardLabels.indexOf("Face")];
  return validKeys.indexOf(key) !== -1;
});

var validContent2 = cardContent2.filter(function(row) {
  var key = row[contentCardLabels2.indexOf("Face")];
  return validKeys.indexOf(key) !== -1;
});

var cards = [];
var cards2 = [];

for (var i = 0; i < validKeys.length; i++) {
  var key = validContent[i][contentCardLabels.indexOf("Face")];
  var sharedDetails = cardDetails.filter(function(row) { return row[detailCardLabels.indexOf("Face")] === key; });
  cards.push(sharedDetails[0].concat(validContent[i]));

  var key2 = validContent2[i][contentCardLabels2.indexOf("Face")];
  var sharedDetails2 = cardDetails.filter(function(row) { return row[detailCardLabels.indexOf("Face")] === key2; });
  cards2.push(sharedDetails2[0].concat(validContent2[i]));
}

// console.log(cards);
// console.log("######################");
// console.log("######################");
// console.log("######################");
// console.log("######################");
// console.log(cards2);

// Leave the line below uncommented to only export a few cards. Keep it commented to export all cards
// cards = cards.slice(39,42);

// MAKESHIFT WORKAROUND
// add an additional row for first time run through
// for some reason, the first image exported with bleed gets fucked up. this is a shitty workaround
cards.unshift(cards[0]);
cards2.unshift(cards2[0]);

// viewportSize being the actual size of the headless browser
page.viewportSize = { width: vpWidth, height: vpHeight };

page.open(fileUrl, function() {
  var currentCard;
  var currentCard2;
  for (var i = 0; i < cards.length; i++) {
    currentCard = cards[i];
    currentCard2 = cards2[i];
    page.evaluate(function(currentCard,cardsLabels,bleed,topicColumnName,textColumnName,cardFont,currentCard2) {
      if (bleed) {
        document.body.style.margin = "72px"
      } else {
        document.body.style.margin = "0";
      }
      var qCard = document.getElementsByClassName('qcard')[0];
      var cardTitle1 = document.getElementById('q-card-name-1');
      var cardTitle2 = document.getElementById('q-card-name-2');
      var cardQuestion = document.getElementById('q-card-question');
      var cardCommand = document.getElementById('q-card-command-1');
      var cardQuestionText = document.getElementById('q-card-question-text-1');
      var cardQuestionText2 = document.getElementById('q-card-question-text-2');
      var qCardFooter = document.getElementsByClassName('q-card-footer')[0];
      cardTitle1.innerHTML = currentCard[cardsLabels.indexOf(topicColumnName)];
      cardTitle1.style.fontFamily = cardFont;
      cardTitle1.style.color = currentCard[cardsLabels.indexOf("Color")];
      cardTitle2.innerHTML = currentCard2[cardsLabels.indexOf(topicColumnName)];
      cardTitle2.style.fontFamily = cardFont;
      cardTitle2.style.color = currentCard[cardsLabels.indexOf("Color")];
      // cardQuestion.innerHTML = "<p>" + "问你自己:" + "</p>" + "<p>" + currentCard[cardsLabels.indexOf(textColumnName)] + "</p>";
      cardCommand.innerHTML = currentCard[cardsLabels.indexOf("Command")];
      cardQuestionText.innerHTML = currentCard[cardsLabels.indexOf(textColumnName)];
      cardQuestionText2.innerHTML = currentCard2[cardsLabels.indexOf(textColumnName)];
      cardQuestion.style.fontFamily = cardFont;
      qCard.style.background = currentCard[cardsLabels.indexOf("BackgroundColor")];
      cardQuestion.style.color = currentCard[cardsLabels.indexOf("qTextColor")];
      qCardFooter.style.color = currentCard[cardsLabels.indexOf("footerColor")];
      if (bleed) {
        document.body.style.background = currentCard[cardsLabels.indexOf("BackgroundColor")];
        qCard.style.border = "none";
      }

      var numbers = document.getElementsByClassName('number-suit');
      for(var i = 0; i < numbers.length; i++) {
        numbers[i].innerHTML = currentCard[cardsLabels.indexOf("NumDisp")] + "<br><span class=\"card-suit\">" + currentCard[cardsLabels.indexOf("SymDisp")] + "</span>";
        numbers[i].style.color = currentCard[cardsLabels.indexOf("Color")];
      }
    }, currentCard,cardsLabels,bleed,topicColumnName,textColumnName,cardFont,currentCard2);
    page.render(outputPath + 'card' + i + '.png');
  }
  // MAKESHIFT WORKAROUND
  // Delete the first card
  fs.remove(outputPath + 'card' + 0 + '.png');
  phantom.exit();
});
