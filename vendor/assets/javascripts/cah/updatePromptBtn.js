(function ()
{
	var UpdatePromptBtn = function () { this.initialize() };
	var p = UpdatePromptBtn.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.name = "UpdatePromptBtn";
	window.UpdatePromptBtn = UpdatePromptBtn;

	// PROPERTIES //

	p.inr;
	p.bg;
	p.txt;

	p.initialize = function ()
	{
		console.log(p + " / initialized!");

		this.Container_initialize();

		// add inr
		this.inr = new createjs.Container();
		this.addChild(this.inr);
		this.inr.x = 125;
		this.inr.y = 175;

		// add bg
		this.bg = new createjs.Shape();
		this.bg.graphics.beginFill("#FFFFFF");
		this.bg.graphics.drawRoundRect(0, 0, 250, 167, 12);
		this.bg.graphics.endFill();
		this.bg.x = -125;
		this.bg.y = -175;
		this.inr.addChild(this.bg);

		// add txt
		this.txt = new createjs.Text("Write my own", "bold 21px " + window.fontString, "#A20000");
		this.txt.lineWidth = 196;
		this.txt.lineHeight = 28;
		this.inr.addChild(this.txt);
		this.txt.x = 28 - 125;
		this.txt.y = 24 - 175;

		// mouse listeners
		var thisScope = this;
		if (!rootMobileMode)
		{
			this.addEventListener("rollover", function () { thisScope.handleRollOver() } );
			this.addEventListener("rollout", function () { thisScope.handleRollOut() } );
		}
		this.addEventListener("click", function () { thisScope.handleClick() } );
	}

	// METHODS //

	p.handleRollOver = function (e)
	{
		document.body.style.cursor = "pointer";
		TweenMax.to(this.inr, 0.13, {scaleX:1.05, scaleY:1.05, ease:Expo.easeOut});
	}

	p.handleRollOut = function (e)
	{
		document.body.style.cursor = "default";
		TweenMax.to(this.inr, 0.13, {scaleX:1.00, scaleY:1.00, ease:Expo.easeOut});
	}

	p.handleClick = function (e)
	{
		if (rootMobileMode)
		{
			this.bg.graphics.clear();
			this.bg.graphics.beginFill("#999999");
			this.bg.graphics.drawRoundRect(0, 0, 250, 167, 12);
			this.bg.graphics.endFill();
		}

    var altPrompt = prompt("Please enter your own prompt.", "A different prompt");
    if (altPrompt == null) return;
    window.mainContainer.onAltPromptSubmitted(altPrompt);
		// window.mainContainer.onCardClicked(9999);
	}

}());
