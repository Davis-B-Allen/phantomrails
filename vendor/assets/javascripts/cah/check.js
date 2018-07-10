/* by Ben Hantoot */

(function ()
{
	var Check = function (txt_content) { this.initialize(txt_content) };
	var p = Check.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.name = "Check";
	window.Check = Check;
	
	// PROPERTIES //
	
	p.shp;
	p.txt;
	p.txt_content;
	p.active;
	p.dot;
	p.hitArea;

	p.initialize = function (txt_content)
	{
		console.log(p + " / initialized!");

		this.Container_initialize();
		this.txt_content = txt_content;
		this.active = false;
		
		// add shp
		this.shp = new createjs.Shape();
		this.shp.graphics.beginFill("#FFFFFF");
		this.shp.graphics.rect(0, 0, 26, 26);
		this.shp.graphics.endFill();
		this.addChild(this.shp);
		
		// add dot
		this.dot = new createjs.Shape();
		this.dot.graphics.beginFill("#000000");
		this.dot.graphics.drawCircle(0, 0, 3);
		this.dot.graphics.endFill();
		this.addChild(this.dot);
		this.dot.x = this.dot.y = 13;

		// add txt
		this.txt = new createjs.Text(this.txt_content, "18px " + window.fontString, "#FFFFFF");
		this.addChild(this.txt);
		this.txt.y = 3;
		this.txt.x = 35;
		
		// add hitArea
		this.hitArea = new createjs.Shape();
		this.hitArea.graphics.beginFill("#000000");
		this.hitArea.graphics.rect(0, 0, this.txt.getBounds().width + 50, 26);
		this.hitArea.graphics.endFill();
		this.addChild(this.hitArea);
		this.hitArea.alpha = 0.01;
		
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
		
		// set off
		this.setOff();
	}
	
	// METHODS //
	
	p.setActiveState = function ()
	{	
		if (!this.active)
		{
			this.active = true;
			this.dot.visible = true;
			this.shp.alpha = 1.00;
			this.txt.alpha = 1.00;
		}
	}
	
	p.setOff = function ()
	{
		this.active = false;
		this.dot.visible = false;
		this.shp.alpha = 0.30;
		this.txt.alpha = 0.60;
	}
	
	p.handleRollOver = function ()
	{
		document.body.style.cursor = "pointer";
		this.shp.scaleX = this.shp.scaleY = 24/26;
		this.shp.x = this.shp.y = 1;
	}
	
	p.handleRollOut = function ()
	{
		document.body.style.cursor = "default";
		this.shp.scaleX = this.shp.scaleY = 1;
		this.shp.x = this.shp.y = 0;
	}
	
	p.handleTouchDown = function ()
	{
		this.shp.alpha = 1.00;
		this.txt.alpha = 1.00;
	}
	
	p.handleTouchUp = function ()
	{
		if (!this.active)
		{
			this.shp.alpha = 0.30;
			this.txt.alpha = 0.60;
		}
	}
}());