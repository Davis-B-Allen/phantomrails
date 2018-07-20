/* by Ben Hantoot */

(function ()
{
	var MainContainer = function () { this.initialize() };
	var p = MainContainer.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.name = "MainContainer";
	window.MainContainer = MainContainer;

	// PROPERTIES //

	p.MIN_TIME = 3000;
	p.PICK_2_CHANCE = 0.10;
	p.cardWidth = 250;
	p.cardHeight = 350;
	p.cardSpacer = 15;
	p.handSize = 10;
	p.extraUserEntryCard = true;
	p.numStandardWhiteCards;
	p.defaultCardsWidth;
	p.defaultCardsHeight;
	p.cardContainer;
	p.currentWhiteCards;
	p.currentWhiteCardIndices;
	p.currentBlackCard;
	p.currentBlackCardIndex;
	p.previousBlackCardIndices;
	p.count;
	p.userInfo;
	p.startTime;
	p.counter;
	p.counterCount;
	p.counterTitle;
	p.intro;
	p.bg;
	p.inPick2Mode;
	p.pick2Card1Index;
	p.counterBg;
	p.introKilled;

	p.initialize = function ()
	{
		console.log(p + " / initialized!");

		this.Container_initialize();

		// setup vars
		this.defaultCardsWidth = 5 * this.cardWidth + 4 * this.cardSpacer;
		this.defaultCardsHeight = 3 * this.cardHeight + 2 * this.cardSpacer;
		this.previousBlackCardIndices = new Array();
		this.pick2Card1Index = null;
		this.introKilled = false;

		// setup white cards
		if (this.extraUserEntryCard){
			this.numStandardWhiteCards = this.handSize - 1;
		} else {
			this.numStandardWhiteCards = this.handSize;
		}

		//add bg
		this.bg = new createjs.Shape();
		this.bg.graphics.beginFill("#E0E0E0");
		this.bg.graphics.rect(0, 0, 4000, 3000);
		this.bg.graphics.endFill();
		this.addChild(this.bg);
		this.bg.visible = false;

		// add container
		this.cardContainer = new createjs.Container();
		this.addChild(this.cardContainer);

		// add counter bg for mobile
		if (rootMobileMode)
		{
			this.counterBg = new createjs.Shape();
			this.counterBg.graphics.beginFill("#000000");
			this.counterBg.graphics.rect(0, 0, 640, 50);
			this.counterBg.graphics.endFill();
			this.addChild(this.counterBg);
		}

		// add counter
		this.count = 0;
		this.counter = new createjs.Container();
		this.addChild(this.counter);
		if (!rootMobileMode)
		{
			this.counterTitle = new createjs.Text("Rounds completed:", "bold 18px " + window.fontString, "#000000");
			this.counterCount = new createjs.Text("0", "bold 72px " + window.fontString, "#000000");
			this.counterCount.y = 15;
			this.counter.x = 24;
			this.counter.y = 20;
		}
		else
		{
			this.counterTitle = new createjs.Text("Rounds completed:", "bold 16px " + window.fontString, "#FFFFFF");
			this.counterCount = new createjs.Text("0", "bold 47px " + window.fontString, "#FFFFFF");
			this.counterCount.y = -19;
			this.counterCount.x = 158;
			this.counter.x = 225;
			this.counter.y = 15;
		}

		this.counter.addChild(this.counterTitle);
		this.counter.addChild(this.counterCount);

		// // add intro
		// this.intro = new Intro();
		// this.addChild(this.intro);

		// skip intro
		this.userInfo =
		{
			age:this.unify(30, 3),
			gender:0,
			experience:3,
			location:0
		};
		this.skipIntro();
	}

	// METHODS //

	p.skipIntro = function ()
	{
		if (!this.introKilled)
		{
			this.introKilled = true;

			var thisScope = this;
			TweenMax.delayedCall(0.50, function ()
			{
				thisScope.removeChild(thisScope.intro);
				thisScope.animateIn();

				if (rootMobileMode)
				{
					createjs.Touch.disable(stage);
					window.setFinalMobileStageSize();
				}
			});
		}
	}

	p.killIntro = function ()
	{
		if (!this.introKilled)
		{
			this.introKilled = true;

			this.userInfo =
			{
				age:this.unify(this.intro.box1.age, 3),
				gender:this.intro.box2.activeCheck,
				experience:this.intro.box3.activeCheck,
				location:this.intro.box4.activeCheck
			};

			var thisScope = this;
			TweenMax.to(this.intro.cover, 0.30, {alpha:1, ease:Sine.easeIn});
			TweenMax.delayedCall(0.50, function ()
			{
				thisScope.removeChild(thisScope.intro);
				thisScope.animateIn();

				if (rootMobileMode)
				{
					createjs.Touch.disable(stage);
					window.setFinalMobileStageSize();
				}
			});
		}
	}

	p.animateIn = function ()
	{
		this.bg.visible = true;
		var thisScope = this;
		TweenMax.from(this.bg, 0.80, {alpha:0, ease:Sine.easeOut});
		TweenMax.delayedCall(0.80, function () {
			thisScope.createNewHand();
		});
	}

	p.resize = function ()
	{
		this.cardContainer.x = W / 2;
		this.cardContainer.scaleX = this.cardContainer.scaleY = 0.92 * W / (this.defaultCardsWidth);
		if (this.cardContainer.scaleY * this.defaultCardsHeight > H * 0.92)
		{
			this.cardContainer.scaleX = this.cardContainer.scaleY = 0.92 * H / (this.defaultCardsHeight);
		}
		this.cardContainer.y = (H - this.cardContainer.scaleY * this.defaultCardsHeight) / 2;

		if (this.intro)
		{
			this.intro.x = Math.round((W - 1600)/2);
			this.intro.y = Math.round((H - 1000)/2);
		}
	}

	p.getWhiteCardIndices = function (numWhiteCards)
	{
		var indices = new Array();
		var cards = new Array();

		var newIndex;
		for (var i = 0; i < numWhiteCards; i++)
		{
			newIndex = Math.floor(whiteCards.length * Math.random());
			while (indices.indexOf(newIndex) != -1 || window.whiteCards[newIndex] == "*.") newIndex = Math.floor(whiteCards.length * Math.random());
			indices.push(newIndex);
		}

		return indices;
	}

	p.getBlackCardIndex = function ()
	{
		var newIndex = Math.floor(blackCards.length * Math.random());
		while (this.previousBlackCardIndices.indexOf(newIndex) != -1 || window.blackCards[newIndex] == "*.")
		{
			newIndex = Math.floor(blackCards.length * Math.random());
		}

		if (this.count < 10) this.previousBlackCardIndices.push(newIndex)
			else this.previousBlackCardIndices[this.count % 10] = newIndex;

		return newIndex;
	}

	p.getBlackCardIndex2 = function ()
	{
		var newIndex = Math.floor(blackCards2.length * Math.random());
		return newIndex;
	}

	p.createNewHand = function ()
	{
		this.counterCount.text = this.count; // set counter

		// add skip
		this.noneBtn = new NoneBtn();
		this.cardContainer.addChild(this.noneBtn);
		this.noneBtn.x = -this.defaultCardsWidth/2 + 3 * (this.cardWidth + this.cardSpacer);

		// // add Update Prompt button
		this.updatePromptBtn = new UpdatePromptBtn();
		this.cardContainer.addChild(this.updatePromptBtn);
		this.updatePromptBtn.x = -this.defaultCardsWidth/2 + 3 * (this.cardWidth + this.cardSpacer);
		this.updatePromptBtn.y = 182;

		// add cards
		this.count++;
		this.startTime = (new Date).getTime();

		// black cards
		// var r = Math.random();
		// if (r > this.PICK_2_CHANCE)
		// {
			this.inPick2Mode = false;
			this.currentBlackCardIndex = this.getBlackCardIndex(); // pick 1
			this.currentBlackCard = new Card(blackCards[this.currentBlackCardIndex], false, true);
		// }
		// else // pick2
		// {
		// 	this.inPick2Mode = true;
		// 	this.currentBlackCardIndex = this.getBlackCardIndex2();
		// 	this.currentBlackCard = new Card(blackCards2[this.currentBlackCardIndex], false, true, "pick2");
		// }
		this.currentBlackCard.i = this.currentBlackCardIndex;
		this.cardContainer.addChild(this.currentBlackCard);
		this.currentBlackCard.x = -this.cardWidth/2;

		// white cards
		this.currentWhiteCards = new Array();
		this.currentWhiteCardIndices = this.getWhiteCardIndices(this.numStandardWhiteCards);
		if (this.extraUserEntryCard) this.currentWhiteCardIndices.push(9998);
		// this.currentWhiteCardIndices = this.getWhiteCardIndices(this.handSize);
		var i;
		for (i = 0; i < this.numStandardWhiteCards; i++)
		{
			var card = new Card(whiteCards[this.currentWhiteCardIndices[i]]);
			this.cardContainer.addChild(card);
			card.x = -this.defaultCardsWidth/2 + i * (this.cardWidth + this.cardSpacer);
			card.y = this.cardHeight + this.cardSpacer;
			card.i = this.currentWhiteCardIndices[i];
			if (i > 4)
			{
				card.x -= 5 * (this.cardWidth + this.cardSpacer);
				card.y += (this.cardHeight + this.cardSpacer);
			}

			this.currentWhiteCards.push(card);
		}
		if (this.extraUserEntryCard) {
			var card = new Card("______ _____ ____ _______ _______ __ ___ _____ _______? \n\n(Click me to \nENTER your own response.)", true);
			card.i = 9998
			this.cardContainer.addChild(card);
			card.x = -this.defaultCardsWidth/2 + i * (this.cardWidth + this.cardSpacer);
			card.y = this.cardHeight + this.cardSpacer;
			card.i = this.currentWhiteCardIndices[i];
			card.x -= 5 * (this.cardWidth + this.cardSpacer);
			card.y += (this.cardHeight + this.cardSpacer);
			this.currentWhiteCards.push(card);
		}

		// reposition for mobile
		if (rootMobileMode)
		{
			this.cardContainer.x = this.cardContainer.y = 0;

			if (!isTablet)
			{
				this.currentBlackCard.x = 50;
				this.currentBlackCard.y = 100;

				for (i = 0; i < this.handSize; i++)
				{
					card = this.currentWhiteCards[i];
					card.x = 50 + 290 * (i % 2);
					card.y = 490 + 390 * Math.floor(i/2);
				}

				this.noneBtn.x = 336;
				this.noneBtn.y = 100;

				this.updatePromptBtn.x = 336;
				this.updatePromptBtn.y = 282;
			}
			else
			{
				var sc = 170/250;
				var sy = 100;

				this.currentBlackCard.x = 50;
				this.currentBlackCard.y = sy;
				this.currentBlackCard.scaleX = this.currentBlackCard.scaleY = sc;

				for (i = 0; i < this.handSize; i++)
				{
					card = this.currentWhiteCards[i];
					card.scaleX = card.scaleY = sc;
					card.x = 50 + 185 * ((i+2) % 3);
					card.y = sy + (sc * 350 + 15) * Math.floor((i+2)/3);
				}

				this.noneBtn.scaleX = this.noneBtn.scaleY = sc;
				this.noneBtn.x = 235;
				this.noneBtn.y = 98;

				this.updatePromptBtn.scaleX = this.updatePromptBtn.scaleY = sc;
				this.updatePromptBtn.x = 235;
				this.updatePromptBtn.y = 98 + 182*sc;
			}
		}

		this.animateInHand();
	}

	p.animateInHand = function ()
	{
		// lag
		var lag = 0.10;

		// re-enable mouse
		this.cardContainer.mouseEnabled = true;

		if (!rootMobileMode)
		{
			window.scrollTo(0, 0);

			// black card
			var currentBlackCardY = this.currentBlackCard.y;
			this.currentBlackCard.y = 1130;
			this.currentBlackCard.alpha = 0;

			slideToY(this.currentBlackCard, currentBlackCardY, 0.88, 0.90, 0.28, lag);
			TweenMax.to(this.currentBlackCard, 0.20, {delay:lag, alpha:1, ease:Quad.easeOut});

			// white cards
			for (var i = 0; i < this.handSize; i++)
			{
				var targ = this.currentWhiteCards[i];
				var d = lag + 0.40 + 0.040 * i;
				var currentWhiteCardY = targ.y;
				targ.y = 1130;
				targ.alpha = 0;
				waverToY(targ, currentWhiteCardY, 0.23, 0.15, 10, d);
				TweenMax.to(targ, 0.20, {delay:d, alpha:1, ease:Quad.easeOut});
			}

			// none btn
			this.noneBtn.alpha = 0;
			TweenMax.to(this.noneBtn, 0.50, {delay:1.20, alpha:1, ease:Quad.easeOut})

			// update Prompt btn
			this.updatePromptBtn.alpha = 0;
			TweenMax.to(this.updatePromptBtn, 0.50, {delay:1.20, alpha:1, ease:Quad.easeOut})
		}
		else
		{
			var t = 0.50;
			var sp = 0.06;
			var sl = 90;

			TweenMax.from(this.currentBlackCard, t, {delay:lag, y: this.currentBlackCard.y + sl, alpha:0, ease:Quint.easeOut});
			TweenMax.from(this.noneBtn, t, {delay:lag + sp, y: this.noneBtn.y + sl, alpha:0, ease:Quint.easeOut});
			TweenMax.from(this.updatePromptBtn, t, {delay:lag + sp, y: this.updatePromptBtn.y + sl, alpha:0, ease:Quint.easeOut});
			for (var i = 0; i < this.handSize; i++)
			{
				var targ = this.currentWhiteCards[i];
				TweenMax.from(targ, t, {delay:lag + sp * 2 + sp * i, y:targ.y + sl, alpha:0, ease:Quint.easeOut});
			}
		}
	}

	p.onAltPromptSubmitted = function (altPrompt)
	{
		this.currentBlackCard.updateCardText(altPrompt);
	}

	p.onCardClicked = function (i, cardClicked)
	{
		var thisScope = this;

		var chosenAnswer = "No Answer";
		if (cardClicked != null) chosenAnswer = cardClicked.textContent;
		if (i != 9999 && this.inPick2Mode && (this.pick2Card1Index == null || this.pick2Card1Index == i))
		{
			if (!cardClicked.picked)
			{
				cardClicked.setPicked();
				this.pick2Card1Index = i;
			}
			else
			{
				cardClicked.setUnpicked();
				this.pick2Card1Index = null;
			}
		}
		else
		{
			var totalTime = (new Date).getTime() - this.startTime;
			if (totalTime > this.MIN_TIME)
			{
				if (i == 9999 && this.inPick2Mode)
				{
					this.formatAndSendResult(totalTime, chosenAnswer, i, i);
				}
				else if (this.pick2Card1Index == null)
				{
					this.formatAndSendResult(totalTime, chosenAnswer, i);
				}
				else
				{
					this.formatAndSendResult(totalTime, chosenAnswer, this.pick2Card1Index, i);
				}
			}

			// kill mouse
			this.cardContainer.mouseEnabled = false;

			// reset pick 2 values
			this.pick2Card1Index = null;

			// animate out
			var t, sp, j, targ, d, lag;

			if (!rootMobileMode)
			{
				t = 0.27;
				sp = 0.028;
				lag = 0;
				var dbase = 0.21;
				var endY = -500;

				TweenMax.to(this.currentBlackCard, t, {y:-370, alpha:0, ease:Expo.easeIn});
				TweenMax.to(this.noneBtn, 0.25, {alpha:0, ease:Quad.easeOut});
				TweenMax.to(this.updatePromptBtn, 0.25, {alpha:0, ease:Quad.easeOut});
				for (j = 0; j < this.handSize; j++)
				{
					targ = this.currentWhiteCards[j];
					targ.handleRollOut(null); // play rollout anims
					d = dbase + sp * j;
					TweenMax.to(targ, t, {delay:d, y:endY, alpha:0, ease:Expo.easeIn});
				}

				// clear out and do next hand
				TweenMax.delayedCall(dbase + sp * 9 + t, function () {
					while (thisScope.cardContainer.getNumChildren() > 0) thisScope.cardContainer.removeChildAt(0);
					thisScope.createNewHand();
				});
			}
			else
			{
				t = 0.35;
				sp = 0.05;
				lag = 0.15;

				TweenMax.to(this.currentBlackCard, t, {delay:lag, alpha:0, ease:Quad.easeIn});
				TweenMax.to(this.noneBtn, t, {delay:lag + sp, alpha:0, ease:Quad.easeIn});
				TweenMax.to(this.updatePromptBtn, t, {delay:lag + sp, alpha:0, ease:Quad.easeIn});
				for (j = 0; j < this.handSize; j++)
				{
					targ = this.currentWhiteCards[j];
					targ.handleRollOut(null); // play rollout anims
					d = lag + sp * 2 + sp * j;
					TweenMax.to(targ, t, {delay:d, alpha:0, ease:Quad.easeIn});
				}

				// clear out and do next hand
				TweenMax.delayedCall(lag + sp * 11 + t + 0.10, function () {
					while (thisScope.cardContainer.getNumChildren() > 0) thisScope.cardContainer.removeChildAt(0);
					thisScope.createNewHand();
				});
			}
		}
	}

	p.formatAndSendResult = function (totalTime, chosenAnswer, i, i2, i3)
	{
		var result = this.unify(this.userInfo.age, 3) + "/" + this.userInfo.gender.toString() + "/" + this.userInfo.experience.toString() + "/" + this.userInfo.location.toString() + "/";
		if (i2)
		{
			result += "9" + this.unify(this.currentBlackCardIndex, 3) + "/" + this.unify(i) + "/";
		}
		else
		{
			result += this.unify(this.currentBlackCardIndex) + "/" + this.unify(i) + "/";
		}
		result += this.currentBlackCard.textContent + "/";
		result += chosenAnswer + "/";
		if (i3) { result += this.unify(i2) + "/" + this.unify(i3) + "/" }
			else if (i2) { result += this.unify(i2) + "/9999/" }
			else { result += "9999/9999/" };
		for (var j = 0; j < this.handSize; j++) result += this.unify(this.currentWhiteCardIndices[j]) + "/";
		for (var j = 0; j < this.handSize; j++) result += this.currentWhiteCards[j].textContent + "/";
		result += this.unify(totalTime, 6);

		console.log("Result: " + result);
		window.writeToDatabase(result);
	}

	p.unify = function (input, l)
	{
		l = l || 4;
		var string = input.toString();
		while(string.length < l) string = "0" + string;
		return string;
	}
}());
