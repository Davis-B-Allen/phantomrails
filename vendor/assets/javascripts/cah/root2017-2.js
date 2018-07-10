/* by Ben Hantoot */

var canvas;
var stage;
var mainContainer;
var W;
var H;
var rootMobileMode;
var isTablet;
var fontString;

function setup ()
{
	console.log("root / setup");

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) rootMobileMode = true
		else rootMobileMode = false;
	if (/iPad/i.test(navigator.userAgent)) isTablet = true
		else isTablet = false;

	canvas = document.getElementById('canvas');
	stage = new createjs.Stage(canvas);
	if (!rootMobileMode) createjs.Ticker.setFPS(30)
		else createjs.Ticker.setFPS(24);
	createjs.Ticker.addEventListener("tick", handleRootTick);

	init();
}

function handleRootTick ()
{
    stage.update();
}

function init ()
{
	console.log("root / init");

	fontString = "Helvetica Neue, Helvetica, Arial, sans";

	mainContainer = new MainContainer();
	stage.addChild(mainContainer);

	if (!rootMobileMode)
	{
		stage.enableMouseOver(60);
		window.onresize = resize;
		resize();
	}
	else
	{
		createjs.Touch.enable(stage, true, true);
		canvas.width = window.W = 640;
		canvas.height = window.H = 1253;
	}
}

function setFinalMobileStageSize ()
{
	if (!isTablet)
	{
		canvas.height = window.H = 2450;
	}
	else
	{
		canvas.height = window.H = 1147;
	}
}

function resize ()
{
	console.log("root / resize");

	var newW = window.innerWidth;
	if (newW < 1280) newW = 1280;
	canvas.width = window.W = newW;
	canvas.height = window.H = window.innerHeight;

	mainContainer.resize();
}

var whiteCards = [
	"Who am I?",
	"Who is important to me?",
	"What do I need to understand?",
	"What do I want to do?",
	"What am I grateful for and how do I give thanks?",
	"What does fairness mean to me?",
	"Where do the things I want come from?",
	"What will I do only if rewarded and what will I do for its own sake?",
	"Who am I living my life for?",
	"What does the idea of \"family\" mean to me?",
	"What is my relationship with nature?",
	"What do I give without expectation of return?",
	"What experiences do I want to have?",
	"What does the<br>idea of \"friend\"<br>mean to me?",
	"What is my attitude with respect to problems, trust, change and risk?",
	"What do I produce and for whom?",
	"What do I value and why?",
	"What does the idea of \"community\" mean to me?",
	"What do I need and what is needed of me?",
	"How do I return the investment made in me?",
	"What am I doing to develop better habits?",
	"When must I judge others and when must I reserve judgment?",
	"Am I blaming leaders for things that could be my responsibility?",
	"Why do I want to lead and what are my responsibilities to those who follow me?",
	"Will I do the right thing even when others will dislike me if I do?",
	"Would I rather defeat my enemies or live in peace with them?",
	"How might I benefit from more knowledge and when will I know enough to act?",
	"What rewards can I put off until later so I can concentrate on doing my best work now?",
	"How can I become more physically, mentally, and spiritually healthy?",
	"How can I make the world a better place?",
	"Do I have what I need for the future?",
	"Do I know what I want and do I know how to get it?",
	"Can I think mathematically, verbally, and emotionally?",
	"How am I influenced by other people?",
	"What questions am I failing to ask?",
	"How can I be more successful in the market for who I am?",
	"What are my better attributes?",
	"Who do I love, how and why?",
	"What gets me up every morning?",
	"What do I love to do?",
	"Can I, will I, and do I forgive myself and others?",
	"Can I undersand what others feel, think and do even if I  don't like them?",
	"How will I resist the forces of chaos?",
	"How can I get others to want me to meet their needs?",
	"What has been my story so far and what kind of experiences have I set myself up for?",
	"How can I be of service to mankind?",
	"What invented stories are useful in making sense of the world?",
	"When will I put myself at risk for the benefit of others?",
	"Am I who I say I am?",
	"Who do I answer to?",
	"How will I become more knowledgeable, skilled and wise?",
	"What are the rules that I live by and do I do what I say I will do?",
	"Is doing what I am doing worth my time?",
	"Why do I do what I do?",
	"I ask myself a sane question and answer it."
];

var blackCards = [
	"Nobody cares about me.",
	"People are stupid.",
	"The world doesn't make sense.",
	"My work is stupid.",
	"I'm depressed.",
	"Life is unfair.",
	"I can't make a living.",
	"I hate my job.",
	"I hate my boss.",
	"My family doesn't care about me.",
	"The environment is going to hell.",
	"I can't get what I want.",
	"I hate my life.",
	"I don't have any friends.",
	"My problems are overwhelming.",
	"I don't have anything to offer anyone.",
	"People suck.",
	"The government should help me.",
	"Nobody gives me what I want.",
	"I'm getting paid too little for the effort I've put in.",
	"I keep doing the wrong thing.",
	"People should stop judging me.",
	"Our leaders don't care about me.",
	"Nobody listens to me.",
	"People hate it when I do the right thing.",
	"People are evil.",
	"I don't know enough.",
	"I don't get what I want.",
	"My life is a mess.",
	"The world sucks.",
	"The future is hopeless.",
	"Nobody does what I say.",
	"Everything is too confusing.",
	"I need new friends.",
	"My problems are unsolvable.",
	"I can't get a job.",
	"I'm unlovable.",
	"Nobody loves me.",
	"Life has no point.",
	"I have no talent.",
	"I'm angry and there is nothing I can do about it.",
	"People don't act in their best interest.",
	"Everything is falling apart.",
	"Nobody wants to pay me what I am worth.",
	"My life is going nowhere.",
	"Mankind is doomed.",
	"God is dead.",
	"Nobody will go out of their way to help me.",
	"People can't see me for who I really am.",
	"I can't seem to get things done.",
	"I feel incompetent.",
	"I feel cheated.",
	"I don't have enough time.",
	"Life is meaningless.",
	"Someone stole my identity and now I don't know who I am.",
	"The world held a vote and they asked me to leave the planet.",
	"College... can't get a job with it... can't get a job without it.",
	"I can't tell if you want fries with that or not.",
	"I received a love letter addressed to 'occupant.'",
	"My teacher gave me a bad grade and the law won't allow me to kill her.",
	"I like robbing banks, my parents criticized me, and now I need therapy.",
	"I can't find a job playing video games.",
	"My boss told me I have BO and yet he had bad breath.",
	"My parents say I was adopted.",
	"I am afraid of fresh air and plants.",
	"I gave my bank money and now they aren't returning it.",
	"I want to move to the Moon but NASA won't take my frequent flyer miles.",
	"My friends moved to another country to get away from me.",
	"My dog ate my homework and nobody believes me.",
	"My parents stopped giving me money because they ran out.",
	"My wife doesn't believe I am faithful and neither does my mistress.",
	"My church changed religions and now I don't know where to go.",
	"I need you to love me so you better do it right now.",
	"My private jet is a 747 but I need to upgrde to an Airbus 380.",
	"I want to be a superhero but nobody gave me a super power.",
	"I married you and now I realized it was a mistake.",
	"I voted for someone who wants to eliminate the vote.",
	"Some lunatic wants to blow up the world.",
	"My boss is asking me to steal and I can't say no.",
	"I got drafted to fight in the war on drugs.",
	"Nobody taught me how to live so nothing is my fault.",
	"If you hire me to run the world the next day I'll learn how to do it.",
	"My mental issues keep me from dealing with my physical issues.",
	"I want to kill all the people who want to make the world a better place than me.",
	"I invested all my money in a company that doesn't exist.",
	"I ran over a cat with a steamroller.",
	"Feelings are facts; thinking is overrated.",
	"Everyone cheats and the world grades on a curve.",
	"God doesn't answer my prayers.",
	"I want a job teaching people how to be unemployable.",
	"Nobody loves me as much as I do, but they should.",
	"My girlfriend ran off with the football team.",
	"I got up this morning to play You Against Humanity but it was a mistake.",
	"People should love making and doing things for me, but sometimes they don't.",
	"I can't sleep because Attila raped an ancester of mine.",
	"Nobody has any idea how hard it is for me to deal with them.",
	"I keep losing cards in You Against Humanity and I can't sleep until I find them.",
	"My job is to sell fresh air in a can but nobody is buying.",
	"My kindergarden teacher insulted me and now I am ruined for life.",
	"People are starvig in Africa and I'm worried sick about it.",
	"When they told me about the Greek gods I believed them.",
	"I rescued a cat from a steamroller and nobody gave me a medal.",
	"Nobody believes me when I tell them to trust me without question.",
	"My parents want me to show them my grades in college.",
	"I spent years in school and now my boss wants me to learn something new.",
	"If someone hits me I hit them back 10 times harder and yet some people don't like me.",
	"I am wasting time playing You Against Humanity",
	"My secret purpose is to make myself rich and some people have figured it out.",
	"I don't like myself.",
	"I started to write you a love letter and I realized I realized I am not in love.",
	"The world is stupid.",
	"I don't like work.",
	"I need to be praised at least once each hour.",
	"The last nine people I slept with are not returning my call.",
	"I don't have enough money to buy everything I see advertised.",
	"I don't feel like doing what I know I should do.",
	"My parents act as if they they have a right to tell me how I spend their money.",
	"My parents want me to get a job and move out of the house.",
	"Rich people are destroying everything.",
	"Somebody tried to talk to me on the bus when I was on Facebook.",
	"My mother has the hots for my boyfriend.",
	"People don't like me  for who I think I am.",
	"I can't afford to take any chances.",
	"I got a pony for my birthday but I want a unicorn.",
	"I'm a virgin and nobody cares.",
	"My family and friends should help me more.",
	"They made me turn off my phone on the airplane.",
	"People don't return favors.",
	"My cat ate my goldfish.",
	"My dog ate my cat.",
	"My sister ate my dog.",
	"My best friend ate my sister.",
	"I got in trouble when I just wanted to be happy.",
	"I am going through hell and people tell me to keep going.",
	"I broke up with my lover and all they could say was 'good riddance.'",
	"I'm tired of waiting even though I don't know what I'm waiting for.",
	"I'm addicted to booze, cigarettes, drugs, rock and roll.",
	"I told humanity to shape up and humanity told me to ship out.",
	"Everything is too expensive.",
	"I'm powerless to do anything.",
	"Nobody taught me to think and it isn't my fault.",
	"I voted for a moron and he made me Secretary of State.",
	"I'll never know everything.",
	"Nobody needs me.",
	"I loathe myself.",
	"My lover expects me to say 'I love you' when all I want is sex.",
	"I shouldn't have to do anything I don't want to do.",
	"I have no skills and it isn't my fault.",
	"I can't change the past and that's unfair.",
	"People only do what's best for them instead of what's best for me.",
	"I have to keep solving the same problems over and over.",
	"Everyone should get what they deserve.",
	"I was hired to run a hotel when I have no idea what I'm doing.",
	"I was elected president when I have no idea what I am doing.",
	"I spend too much time doing distracting things.",
	"People should be loyal to me without me being loyal to them.",
	"People don't believe my alternative facts.",
	"Nobody taught me to take responsibility so nothing is my fault.",
	"I'm bored so I want to start a war.",
	"Except for me, everyone is too self-righteous.",
	"I have too much to do to think about what's important.",
	"There's no point to anything."
];

var blackCards2 = [
	"In a world ravaged by __________, our only solace is __________.",
	"Introducing the amazing superhero/sidekick duo! It's __________ and __________.",
	"In M. Night Shyamalan's new movie, Bruce Willis discovers that __________ had really been __________ all along.",
	"That's right, I killed __________. How, you ask? __________.",
	"Step 1: __________. Step 2:__________. Step 3: Profit.",
	"They said we were crazy. They said we couldn't put __________ inside of __________. They were wrong.",
	"When I was tripping on acid, __________ turned into __________.",
	"And the Academy Award for __________ goes to __________.",
	"I never truly understood __________ until I encountered __________.",
	"__________ is a slippery slope that leads to __________.",
	"Lifetime presents '__________, the Story of __________.' ",
	"For my next trick, I will pull __________ out of __________.",
	"Listen, son. If you want to get involved with __________, I won't stop you. Just steer clear of __________.",
	"If God didn't want us to enjoy __________, he wouldn't have given us __________.",
	"__________ would be woefully incomplete without __________.",
	"I spent my whole life working toward __________ only to have it ruined by __________.",
	"My mom freaked out when she looked at my browser history and found __________.com/__________.",
	"Before __________, all we had was __________.",
	"You haven't truly lived until you've experienced __________ and __________ at the same time.",
	"__________. Hours of fun. Easy to use. Perfect for __________.",
	"After months of practice with __________, I think I'm finally ready for __________.",
	"Having problems with __________? Try __________.",
	"Dear Sir or Madam, We regret to inform you that the Office of __________ has denied your request for __________.",
	"In a pinch, __________ can be a suitable substitute for __________.",
	"My life is ruled by a vicious cycle of __________ and __________.",
	"Michael Bay's new three-hour action epic pits __________ against __________.",
	"Forget everything you know about __________, because now we've supercharged it with __________.",
	"We never did find __________, but along the way, we sure learned a lot about __________.",
	"Patient presents with __________. Likely a result of __________.",
	"You know, once you get past __________, __________ ain't so bad.",
	"If you can't handle __________, you'd better stay away from __________.",
	"Oprah's book of the month is '__________ For __________: A story of hope.' ",
	"Heed my voice, mortals! I am the god of __________, and I will not tolerate __________.",
	"Every step towards __________ gets me a little bit closer to __________.",
	"I am become __________, destroyer of __________.",
	"Adventure. Romance. __________. From Paramount Pictures, '__________.' ",
	"This year's hottest album is '__________' by __________.",
	"In return for my soul, the Devil promime __________, but all I got was __________.",
	"Honey, I have a new roleplay I want to try tonight! You can be __________, and I'll be __________.",
	"__________ may pass, but __________ will last forever.",
	"In the beginning, there was __________. And the Lord said 'Let there be __________.'",
	"Well if __________ is good enough for __________, it's good enough for me.",
	"__________ will never be the same after __________.",
	"__________ be all like __________.",
	"In line with our predictions, we find a robust correlation between __________ and __________ (p<.05).",
	"In an attempt to recreate conditions just after the Big Bang, physicists at the LHC are observing collisions between __________ and __________.",
	"Today on Mythbusters, we find out how long __________ can withstand __________.",
	"Critics are raving about HBO's new Game of Thrones spin-off, '__________ of __________.'",
	"I need you like __________ needs __________.",
	"Such __________. Very __________. Wow.",
	"__________ is way better in __________ mode."
];
