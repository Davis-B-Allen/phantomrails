/* by Ben Hantoot */

(function ()
{
	var SurveyBox = function (titleText, isAge, checkArray, xOff) { this.initialize(titleText, isAge, checkArray, xOff) };
	var p = SurveyBox.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.name = "SurveyBox";
	window.SurveyBox = SurveyBox;
	
	// PROPERTIES //
	
	p.box1;
	p.box2;
	p.titl;
	p.titleText;
	p.age;
	p.ageBar;
	p.ageSlider;
	p.ageSliderText;
	p.checkArray;
	p.checks;
	p.checkContainer;
	p.activeCheck;

	p.initialize = function (titleText, isAge, checkArray, xOff)
	{
		console.log(p + " / initialized!");

		this.Container_initialize();
		
		//setup vars
		this.activeCheck = null;
		this.titleText = titleText;
		this.isAge = isAge;
		this.checkArray = checkArray || null;
		this.xOff = xOff || null;
		this.checks = new Array();
		
		// add boxes
		this.box1 = new createjs.Shape();
		this.box1.graphics.beginFill("#FFFFFF");
		this.box1.graphics.rect(0, 0, 600, 50);
		this.box1.graphics.endFill();
		this.addChild(this.box1);
		
		this.box2 = new createjs.Shape();
		this.box2.graphics.beginFill("#000000");
		this.box2.graphics.rect(0, 0, 596, 46);
		this.box2.graphics.endFill();
		this.addChild(this.box2);
		this.box2.x = this.box2.y = 2;
		this.box1.y += 43;
		this.box2.y += 43;
		
		// add titl
		this.titl = new createjs.Text(this.titleText, "bold 18px " + window.fontString, "#FFFFFF");
		this.titl.x = 300;
		this.titl.textAlign = "center";
		this.addChild(this.titl);
		this.titl.y = 12;
		
		// add age stuff
		if (this.isAge)
		{
			this.addAgeStuff();
		}
		else // add checks
		{
			var sp = 60;
			
			this.checkContainer = new createjs.Container();
			this.checkContainer.x = this.xOff;
			this.addChild(this.checkContainer);
			
			var i;
			var l = this.checkArray.length;
			for (i = 0; i < l; i++)
			{
				this.addCheck(this.checkArray[i]);
			}
			
			this.checks[0].x = 12;
			
			for (i = 1; i < l; i++)
			{
				this.checks[i].x = this.checks[i-1].x + this.checks[i-1].getBounds().width + sp;
			}
		}
	}
	
	// METHODS //
	
	p.setRed = function ()
	{
		this.box1.graphics.beginFill("#FF0000");
		this.box1.graphics.rect(0, 0, 600, 50);
		this.box1.graphics.endFill();
	}
	
	p.setWhite = function ()
	{
		this.box1.graphics.beginFill("#FFFFFF");
		this.box1.graphics.rect(0, 0, 600, 50);
		this.box1.graphics.endFill();
	}
	
	p.addCheck = function (txt)
	{
		var check = new Check(txt);
		check.y = 55;
		this.checkContainer.addChild(check);
		this.checks.push(check);
		
		var thisScope = this;
		check.addEventListener("pressup", function (e)
		{
			thisScope.activeCheck = thisScope.checks.indexOf(check);
			check.setActiveState();
			
			for (var i = 0; i < thisScope.checks.length; i++)
			{
				var targ = thisScope.checks[i];
				if (targ != check)
				{
					targ.setOff();
				}
			}
		});
	}
	
	p.addAgeStuff = function ()
	{
		this.age = null;
		
		var leftAge = new createjs.Text("13", "bold 14px " + window.fontString, "#FFFFFF");
		this.addChild(leftAge);
		leftAge.x = 15;
		leftAge.y = 58;
		
		var rightAge = new createjs.Text("55+", "bold 14px " + window.fontString, "#FFFFFF");
		this.addChild(rightAge);
		rightAge.x = 566;
		rightAge.y = 58;
		
		this.ageBar = new createjs.Shape();
		this.ageBar.graphics.beginFill("#FFFFFF");
		this.ageBar.graphics.rect(0, 0, 510, 6);
		this.ageBar.graphics.endFill(); 
		this.ageBar.x = 45;
		this.ageBar.y = 65;
		this.addChild(this.ageBar);
		
		this.ageSlider = new createjs.Container();
		this.ageSlider.x = 300;
		this.ageSlider.y = 68;
		this.addChild(this.ageSlider);
		
		if (rootMobileMode)
		{
			var ageSliderHit = new createjs.Shape();
			ageSliderHit.graphics.beginFill("#000000");
			ageSliderHit.graphics.drawCircle(0, 0, 60);
			ageSliderHit.graphics.endFill();
			ageSliderHit.alpha = 0.01;
			this.ageSlider.addChild(ageSliderHit);
		}
		
		var ageSliderShape1 = new createjs.Shape();
		ageSliderShape1.graphics.beginFill("#000000");
		ageSliderShape1.graphics.drawCircle(0, 0, 20);
		ageSliderShape1.graphics.endFill();
		this.ageSlider.addChild(ageSliderShape1);
		
		var ageSliderShape2 = new createjs.Shape();
		ageSliderShape2.graphics.beginFill("#FFFFFF");
		ageSliderShape2.graphics.drawCircle(0, 0, 18);
		ageSliderShape2.graphics.endFill();
		this.ageSlider.addChild(ageSliderShape2);
		
		this.ageSliderText = new createjs.Text("?", "bold 22px " + window.fontString, "#000000");
		this.ageSlider.addChild(this.ageSliderText);
		this.ageSliderText.textAlign = "center";
		this.ageSliderText.x = 0;
		this.ageSliderText.y = -13;
		
		var thisScope = this;
		if (!rootMobileMode)
		{
			this.ageSlider.addEventListener("rollover", function () { thisScope.sliderOver() } );
			this.ageSlider.addEventListener("rollout", function () { thisScope.sliderOut() } );
			this.ageSlider.addEventListener("pressmove", function () { thisScope.dragSlider() } );
		}
		else
		{
			this.ageSlider.addEventListener("pressmove", function () { thisScope.dragSlider() } );
		}
	}
	
	p.sliderOver = function ()
	{
		document.body.style.cursor = "pointer";
	}

	p.sliderOut = function ()
	{
		document.body.style.cursor = "default";
	}
	
	p.dragSlider = function ()
	{
		var min = 60;
		var max = 540;
		
		var newX = stage.mouseX - this.x - window.mainContainer.intro.x;
		if (newX < min) newX = min;
		if (newX > max) newX = max;
		
		var prog = (newX - min)/(max - min);
		this.age = 13 + Math.round(prog * 42);
		this.ageSlider.x = newX;
		this.ageSliderText.text = this.age;
	}
}());