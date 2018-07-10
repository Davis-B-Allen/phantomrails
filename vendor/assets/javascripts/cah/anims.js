slideToX = function (targ, end, t, progSplit, timeSplit, d)
{
	d = d || 0;
	
	var start = targ.x;
	var diff = end - start;
	var mid = start + progSplit * diff;
	
	var t1 = t * timeSplit;
	var t2 = t - t1;
	
	TweenMax.to(targ, t1, {delay:d, x:mid, ease:Expo.easeIn});
	TweenMax.to(targ, t2, {delay:d + t1, x:end, ease:Expo.easeOut});
}

slideToY = function (targ, end, t, progSplit, timeSplit, d)
{
	d = d || 0;
	
	var start = targ.y;
	var diff = end - start;
	var mid = start + progSplit * diff;
	
	var t1 = t * timeSplit;
	var t2 = t - t1;
	
	TweenMax.to(targ, t1, {delay:d, y:mid, ease:Expo.easeIn});
	TweenMax.to(targ, t2, {delay:d + t1, y:end, ease:Expo.easeOut})
}

waverToX = function (targ, end, t1, t2, str, d)
{
	d = d || 0;
	
	var start = targ.x;
	var s = 1;
	if (end < start) s = -1;
	str = s * str;
	var o1 = end + str;
	var o2 = end - 0.5 * str;
	var o3 = end + 0.25 * str;
	
	TweenMax.to(targ, t1, {delay:d, x:o1, ease:Quad.easeInOut});
	TweenMax.to(targ, t2, {delay:d + t1, x:o2, ease:Quad.easeInOut});
	TweenMax.to(targ, t2, {delay:d + t1 + t2, x:o3, ease:Quad.easeInOut});
	TweenMax.to(targ, t2, {delay:d + t1 + t2 * 2, x:end, ease:Quad.easeInOut});
}

waverToY = function (targ, end, t1, t2, str, d)
{
	d = d || 0;
	
	var start = targ.y;
	var s = 1;
	if (end < start) s = -1;
	str = s * str;
	var o1 = end + str;
	var o2 = end - 0.5 * str;
	var o3 = end + 0.25 * str;
	
	TweenMax.to(targ, t1, {delay:d, y:o1, ease:Quad.easeInOut});
	TweenMax.to(targ, t2, {delay:d + t1, y:o2, ease:Quad.easeInOut});
	TweenMax.to(targ, t2, {delay:d + t1 + t2, y:o3, ease:Quad.easeInOut});
	TweenMax.to(targ, t2, {delay:d + t1 + t2 * 2, y:end, ease:Quad.easeInOut});
}

waverToScale = function (targ, end, t1, t2, str, d)
{
	d = d || 0;
	
	var start = targ.scaleX;
	var s = 1;
	if (end < start) s = -1;
	str = s * str;
	var o1 = end + str;
	var o2 = end - 0.5 * str;
	var o3 = end + 0.25 * str;
	
	TweenMax.to(targ, t1, {delay:d, scaleX:o1, scaleY:o1, ease:Quad.easeInOut});
	TweenMax.to(targ, t2, {delay:d + t1, scaleX:o2, scaleY:o2, ase:Quad.easeInOut});
	TweenMax.to(targ, t2, {delay:d + t1 + t2, scaleX:o3, scaleY:o3, ease:Quad.easeInOut});
	TweenMax.to(targ, t2, {delay:d + t1 + t2 * 2, scaleX:end, scaleY:end, ease:Quad.easeInOut});
}

windOutToY = function (targ, end, t1, t2, wind, d, makeInvisible)
{
	d = d || 0;
	makeInvisible = true || makeInvisible;
	
	var start = targ.y;
	var s = 1;
	if (end < start) s = -1;
	wind = s * wind;
	var mid = start - wind;
	
	TweenMax.to(targ, t1, {delay:d, y:mid, ease:Expo.easeOut});
	TweenMax.to(targ, t2, {delay:d + t1, y:end, ease:Expo.easeIn});
	if (makeInvisible) TweenMax.set(targ, {delay:d + t1 + t2 + 1/30, alpha:0});
}