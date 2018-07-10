/* by Ben Hantoot */

(function ()
{
	var NoneBtn = function () { this.initialize() };
	var p = NoneBtn.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.name = "NoneBtn";
	window.NoneBtn = NoneBtn;
	
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
		this.bg.graphics.beginFill("#FF0000");
		this.bg.graphics.drawRoundRect(0, 0, 200, 200, 12);
		this.bg.graphics.endFill();
		this.bg.x = -100;
		this.bg.y = -100;
		this.inr.addChild(this.bg);
		
		// add txt
		this.txt = new createjs.Text("This sucks. None of these are funny.", "bold 21px " + window.fontString, "#FFFFFF");
		this.txt.lineWidth = 125;
		this.txt.lineHeight = 28;
		this.inr.addChild(this.txt);
		this.txt.x = -70;
		this.txt.y = -59;
		
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
		TweenMax.to(this.inr, 0.17, {scaleX:1.15, scaleY:1.15, ease:Expo.easeOut});
	}
	
	p.handleRollOut = function (e)
	{
		document.body.style.cursor = "default";
		TweenMax.to(this.inr, 0.17, {scaleX:1.00, scaleY:1.00, ease:Expo.easeOut});
	}
	
	p.handleClick = function (e)
	{
		if (rootMobileMode)
		{
			this.bg.graphics.clear();
			this.bg.graphics.beginFill("#999999");
			this.bg.graphics.drawRoundRect(0, 0, 200, 200, 12);
			this.bg.graphics.endFill();
		}
		
		window.mainContainer.onCardClicked(9999);
	}

}());