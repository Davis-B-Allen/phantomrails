/* by Ben Hantoot */

(function ()
{
	var Intro = function () { this.initialize() };
	var p = Intro.prototype = new createjs.Container();
	p.Container_initialize = p.initialize;
	p.name = "Intro";
	window.Intro = Intro;

	// PROPERTIES //

	p.bg;
	p.logo;
	p.txt1;
	p.txt2;
	p.copy;
	p.box1;
	p.box2;
	p.box3;
	p.box4;
	p.startBtn;
	p.cover;

	p.initialize = function ()
	{
		console.log(p + " / initialized!");

		this.Container_initialize();

		// setup vars
		// this.copy = "We constantly update CAH to keep it as fresh and hilarious as possible. Here, in the Lab, you can help us improve the game by playing a few simluated rounds. Each round, pick the white card that's funniest in combination with the black card. If nothing seems hilarious, just click the 'none of these are funny' button. \r\n\r\nWe promise not to use your data for evil.";
		this.copy = "Introduction and maybe rules go here. If someone came to you with this complaint, which of these questions would be best for them to ask themself?";

		// add bg
		this.bg = new createjs.Shape();
		this.bg.graphics.beginFill("#000000");
		this.bg.graphics.rect(0, 0, 4000, 3000);
		this.bg.graphics.endFill();
		this.addChild(this.bg);
		this.bg.x = -1200;
		this.bg.y = -1000;

		// add logo
		// this.logo = new createjs.Bitmap('./Cards Against Humanity Lab_files/logo.png');
		// this.addChild(this.logo);
		// this.logo.x = 197;
		// this.logo.y = 244;

		// add text
		this.txt1 = new createjs.Text("Cards Against Inanity Lab", "bold 30px " + window.fontString, "#FFFFFF");
		this.addChild(this.txt1);
		this.txt1.x = 199;
		// this.txt1.y = 486;
		this.txt1.y = 244;

		this.txt2 = new createjs.Text(this.copy, "18px " + window.fontString, "#FFFFFF");
		this.addChild(this.txt2);
		this.txt2.x = 199;
		// this.txt2.y = 559;
		this.txt2.y = 313;
		this.txt2.lineHeight = 30;
		this.txt2.lineWidth = 550;

		//add boxen
		this.box1 = new SurveyBox("How old are you?", true);
		this.addChild(this.box1);
		this.box1.x = 800;
		this.box1.y = 186;

		this.box2 = new SurveyBox("Your gender?", false, ["Male","Female","Other"], 142);
		this.addChild(this.box2);
		this.box2.x = 800;
		this.box2.y = this.box1.y + 123;

		this.box3 = new SurveyBox("How many times have you played Cards Against Humanity?", false, ["Haven't played","Once","A few times","Many times!"], 0);
		this.addChild(this.box3);
		this.box3.x = 800;
		this.box3.y = this.box2.y + 123;

		this.box4 = new SurveyBox("Where do you live?", false, ["USA","Can","AU","UK","Other EU","Other"], 0);
		this.addChild(this.box4);
		this.box4.x = 800;
		this.box4.y = this.box3.y + 123;

		// add startBtn
		var thisScope = this;
		this.startBtn = new StartBtn();
		this.addChild(this.startBtn);
		this.startBtn.x = 675;
		this.startBtn.y = this.box3.y + 91;
		if (!rootMobileMode) this.startBtn.addEventListener("click", function () { thisScope.onStartBtnClick() })
			else this.startBtn.addEventListener("pressup", function () { thisScope.onStartBtnClick() })

		// add cover
		this.cover = new createjs.Shape();
		this.cover.graphics.beginFill("#000000");
		this.cover.graphics.rect(0, 0, 4000, 3000);
		this.cover.graphics.endFill();
		this.addChild(this.cover);
		this.cover.x = -1200;
		this.cover.y = -1000;
		this.cover.alpha = 0;

		// realign for mobile
		if (rootMobileMode)
		{
			// this.logo.x = this.logo.y = 50;
			this.txt1.x = 50;
			this.txt1.y = 292;
			this.txt2.x = 50;
			this.txt2.y = 364;

			var sc = 0.897
			var boxSp = 96;
			this.box1.scaleX = this.box1.scaleY = this.box2.scaleX = this.box2.scaleY = this.box3.scaleX = this.box3.scaleY = this.box4.scaleX = this.box4.scaleY = sc;
			this.box1.x = this.box2.x = this.box3.x = this.box4.x = 50;
			this.box1.y = 643;
			this.box2.y = this.box1.y + boxSp;
			this.box3.y = this.box2.y + boxSp;
			this.box4.y = this.box3.y + boxSp;

			this.startBtn.scaleX = this.startBtn.scaleY = sc;
			this.startBtn.x = -62;
			this.startBtn.y = this.box4.y + 26;
		}

		// animate in
		if (!rootMobileMode)
		{
			this.animateInDesktop();
		}
		else
		{
			this.animateInMobile();
		}
	}

	// METHODS //

	p.animateInMobile = function ()
	{
		// var objects = [this.logo, this.txt1, this.txt2, this.box1, this.box2, this.box3, this.box4, this.startBtn];
		var objects = [this.txt1, this.txt2, this.box1, this.box2, this.box3, this.box4, this.startBtn];
		for (var i = 0; i < objects.length; i++)
		{
			var targ = objects[i];
			TweenMax.from(targ, 0.60, {delay:0.60 + 0.08 * i, alpha:0, y:targ.y + 150, ease:Expo.easeOut});
		}
	}

	p.animateInDesktop = function ()
	{
		var t1 = 0.15;
		var t2 = 0.13;
		var st = 8;
		var sp = 0.07;
		var d = 0.60;
		var _x = 500;
		var _x2 = 700;

		// this.logo.endX = this.logo.x;
		// this.logo.x = _x;
		// waverToX(this.logo, this.logo.endX, t1, t2, st, d);
		// TweenMax.from(this.logo, t1, {delay:d, alpha:0, ease:Quad.easeOut});

		this.txt1.endX = this.txt1.x;
		this.txt1.x = _x;
		waverToX(this.txt1, this.txt1.endX, t1, t2, st, d + sp);
		TweenMax.from(this.txt1, t1, {delay:d + sp, alpha:0, ease:Quad.easeOut});

		this.txt2.endX = this.txt2.x;
		this.txt2.x = _x;
		waverToX(this.txt2, this.txt2.endX, t1, t2, st, d + sp * 2);
		TweenMax.from(this.txt2, t1, {delay:d + sp * 2, alpha:0, ease:Quad.easeOut});

		this.box1.endX = this.box1.x;
		this.box1.x = _x2;
		waverToX(this.box1, this.box1.endX, t1, t2, st, d + sp * 3);
		TweenMax.from(this.box1, t1, {delay:d + sp * 3, alpha:0, ease:Quad.easeOut});

		this.box2.endX = this.box2.x;
		this.box2.x = _x2;
		waverToX(this.box2, this.box2.endX, t1, t2, st, d + sp * 4);
		TweenMax.from(this.box2, t1, {delay:d + sp * 4, alpha:0, ease:Quad.easeOut});

		this.box3.endX = this.box3.x;
		this.box3.x = _x2;
		waverToX(this.box3, this.box3.endX, t1, t2, st, d + sp * 5);
		TweenMax.from(this.box3, t1, {delay:d + sp * 5, alpha:0, ease:Quad.easeOut});

		this.box4.endX = this.box4.x;
		this.box4.x = _x2;
		waverToX(this.box4, this.box4.endX, t1, t2, st, d + sp * 6);
		TweenMax.from(this.box4, t1, {delay:d + sp * 6, alpha:0, ease:Quad.easeOut});

		this.startBtn.endX = this.startBtn.x;
		this.startBtn.x = _x2;
		waverToX(this.startBtn, this.startBtn.endX, t1, t2, st, d + sp * 7);
		TweenMax.from(this.startBtn, t1, {delay:d + sp * 7, alpha:0, ease:Quad.easeOut});
	}

	p.onStartBtnClick = function ()
	{
		var ok = true;

		if (this.box1.age == null) this.box1.setRed(), ok = false
			else this.box1.setWhite();

		if (this.box2.activeCheck == null) this.box2.setRed(), ok = false
			else this.box2.setWhite();

		if (this.box3.activeCheck == null) this.box3.setRed(), ok = false
			else this.box3.setWhite();

		if (this.box4.activeCheck == null) this.box4.setRed(), ok = false
			else this.box4.setWhite();

		if (ok) window.mainContainer.killIntro();
	}
}());
