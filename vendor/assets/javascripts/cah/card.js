/* by Ben Hantoot */

(function ()
{
	var Card = function (content, userEntryEnabled, isBlack, blackType) { this.initialize(content, userEntryEnabled, isBlack, blackType) };
	var p = Card.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.name = "Card";
	window.Card = Card;

	// PROPERTIES //

	p.inr;
	p.isBlack;
	p.blackType;
	p.bg;
	p.textContent;
	p.textContainer;
	p.icon;
	p.extraIcon;
	p.i;
	p.outline;
	p.picked;

	p.initialize = function (content, userEntryEnabled, isBlack, blackType)
	{
		console.log(p + " / initialized!");

		this.Container_initialize();

		// setup vars
		this.textContent = content;
		var thisScope = this;
		this.userEntryEnabled = userEntryEnabled || false;
		this.isBlack = isBlack || false;
		this.blackType = blackType || "pick1";
		if (this.isBlack) this.blackType = blackType;
		this.i = 0;
		this.picked = false;

		// add inr
		this.inr = new createjs.Container();
		this.addChild(this.inr);
		this.inr.x = 125;
		this.inr.y = 175;

		// add outline
		this.outline = new createjs.Shape();
		this.outline.graphics.beginFill("#000000");
		this.outline.graphics.drawRoundRect(0, 0, 256, 356, 14);
		this.outline.graphics.endFill();
		this.outline.x = -128;
		this.outline.y = -178;
		this.inr.addChild(this.outline);
		this.outline.visible = false;

		// add bg
		this.bg = new createjs.Shape();
		var bgc = "#FFFFFF";
		if (this.isBlack) bgc = "#A20000";
		// if (this.userEntryEnabled) bgc = "#aaaaaa";
		this.bg.graphics.beginFill(bgc);
		this.bg.graphics.drawRoundRect(0, 0, 250, 350, 12);
		this.bg.graphics.endFill();
		this.bg.x = -125;
		this.bg.y = -175;
		this.inr.addChild(this.bg);

		// add text
		var txc = "#000000";
		if (this.isBlack) txc = "#FFFFFF";
		if (this.userEntryEnabled) txc = "#000000";
		this.textContainer = new createjs.Text(this.textContent, "bold 21px " + window.fontString, txc);
		this.textContainer.x = 28 - 125;
		this.textContainer.y = 24 - 175;
		this.textContainer.lineWidth = 196;
		this.textContainer.lineHeight = 28;
		this.inr.addChild(this.textContainer);
		this.textContainer.cache(-25, -25, 300, 400); // cache for performance

		// add icon(s)
		// if (this.isBlack) this.icon = new createjs.Bitmap("./Cards Against Humanity Lab_files/cardBottomBlack.png")
		// 	else this.icon = new createjs.Bitmap("./Cards Against Humanity Lab_files/cardBottom.png");
		// if (this.blackType == "pick2") this.extraIcon = new createjs.Bitmap("img/pick2.png"), this.addChild(this.extraIcon), this.extraIcon.x = 147, this.extraIcon.y = 224;
		// if (this.blackType == "pick3") this.extraIcon = new createjs.Bitmap("img/pick3.png"), this.addChild(this.extraIcon), this.extraIcon.x = 147, this.extraIcon.y = 224;
		// this.inr.addChild(this.icon);
		// this.icon.x = 29 - 125;
		// this.icon.y = 301 - 175;

		// mouse listeners
		if (!this.isBlack)
		{
			if (!rootMobileMode)
			{
				this.addEventListener("rollover", function () { thisScope.handleRollOver() } );
				this.addEventListener("rollout", function () { thisScope.handleRollOut() } );
			}
			this.addEventListener("click", function () { thisScope.handleClick() } );
		}
	}

	// METHODS //

	p.updateCardText = function (cardText)
	{
		this.textContent = cardText;
		this.textContainer.text = cardText;
		this.textContainer.updateCache();
	}

	p.setPicked = function ()
	{
		this.picked = true;
		this.outline.visible = true;
	}

	p.setUnpicked = function ()
	{
		this.picked = false;
		this.outline.visible = false;
	}

	p.handleRollOver = function (e)
	{
		document.body.style.cursor = "pointer";
		this.parent.addChild(this);
		TweenMax.to(this.inr, 0.13, {scaleX:1.05, scaleY:1.05, ease:Quint.easeOut});
	}

	p.handleRollOut = function (e)
	{
		document.body.style.cursor = "default";
		TweenMax.to(this.inr, 0.13, {scaleX:1.00, scaleY:1.00, ease:Quint.easeOut});
	}

	p.handleClick = function (e)
	{
		if (this.userEntryEnabled) {
			var altQuestion = prompt("Please enter your own question", "A better question");
			if (altQuestion == null) return;
			this.userEntryEnabled = false;
			this.textContent = altQuestion;
			this.textContainer.text = altQuestion;
			this.textContainer.updateCache();
			// return;
		}
		if (rootMobileMode && !window.mainContainer.inPick2Mode)
		{
			this.bg.graphics.clear();
			this.bg.graphics.beginFill("#999999");
			this.bg.graphics.drawRoundRect(0, 0, 250, 350, 12);
			this.bg.graphics.endFill();
		}

		window.mainContainer.onCardClicked(this.i, this);
	}
}());
