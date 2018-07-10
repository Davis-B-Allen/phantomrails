/* by Ben Hantoot */

(function ()
{
	var StartBtn = function () { this.initialize() };
	var p = StartBtn.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.name = "StartBtn";
	window.StartBtn = StartBtn;
	
	// PROPERTIES //
	
	p.inr;
	p.bg;
	p.txt;
	p.ro;
	p.roContainer;
	p.roTxt;

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
		this.bg.graphics.drawRoundRect(0, 0, 600, 100, 12);
		this.bg.graphics.endFill();
		this.inr.addChild(this.bg);
		
		// add txt
		this.txt = new createjs.Text("Start!", "bold 30px " + window.fontString, "#000000");
		this.txt.textAlign = "center";
		this.inr.addChild(this.txt);
		this.txt.x = 300;
		this.txt.y = 30;
		
		// add rollover
		this.roContainer = new createjs.Container();
		this.inr.addChild(this.roContainer);
		this.ro = new createjs.Shape();
		this.ro.graphics.beginFill("#000000");
		this.ro.graphics.drawRoundRect(4, 4, 592, 92, 10);
		this.ro.graphics.endFill();
		this.roContainer.addChild(this.ro);
		this.roContainer.visible = false;
		this.roTxt = new createjs.Text("Start!", "bold 30px " + window.fontString, "#FFFFFF");
		this.roTxt.textAlign = "center";
		this.roContainer.addChild(this.roTxt);
		this.roTxt.x = 300;
		this.roTxt.y = 30;
		
		// mouse listeners
		var thisScope = this;
		if (!rootMobileMode)
		{
			this.addEventListener("rollover", function () { thisScope.handleRollOver() } );
			this.addEventListener("rollout", function () { thisScope.handleRollOut() } );
		}
		else
		{
			this.addEventListener("mousedown", function () { thisScope.handleTouchDown() } );
			this.addEventListener("pressup", function () { thisScope.handleTouchUp() } );
		}
	}
	
	// METHODS //
	
	p.handleRollOver = function (e)
	{
		document.body.style.cursor = "pointer";
		this.roContainer.visible = true;
	}
	
	p.handleRollOut = function (e)
	{
		document.body.style.cursor = "default";
		this.roContainer.visible = false;
	}
	
	p.handleTouchDown = function (e)
	{
		this.roContainer.visible = true;
	}
	
	p.handleTouchUp = function (e)
	{
		this.roContainer.visible = false;
	}
}());