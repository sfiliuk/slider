var pics = new Array("img/field.jpg","img/lake.jpg","img/moon.jpg","img/morning.jpg","img/shutterstock.jpg");
var iPic = 0, x=0;
var bubles;
var start = false;
function mf_moveRight(){
	$("#buble"+iPic+"").css("opacity","0.4");
	if (iPic==pics.length-1) iPic=-1;
	$("#slider img").first().fadeOut(1000,function(){
		$("#slider img").first().attr("src", pics[iPic+1]);
		$("#slider img").first().fadeIn(1000);
		iPic++;
		$("#buble"+iPic+"").css("opacity","0.8");
	});	
}
function mf_moveLeft(){
	$("#buble"+iPic+"").css("opacity","0.4");
	if (iPic == 0) iPic = pics.length;
	
	$("#slider img").first().fadeOut(500,function(){
		$("#slider img").first().attr("src", pics[iPic-1]);
		$("#slider img").first().fadeIn(500);
		iPic--;
		$("#buble"+iPic+"").css("opacity","0.8");
	});
}
function mf_choosePic(event){
	for (var i=0; i<bubles.length; i++)$(bubles[i]).css("opacity","0.4");
	for (var i=0; i<bubles.length; i++){
		if (bubles[i] == event.target) {
			$("#slider img").first().fadeOut(500,function(){
			$("#slider img").first().attr("src", pics[i]);
			$("#slider img").first().fadeIn(500);
			$(bubles[i]).css("opacity","0.8");
			iPic = i;
			});
			break;
		}
	}
}
function autoChange(){
	if(start){
		mf_moveRight();
		x = setTimeout(autoChange,5000);
	}
	else {
		start = true;
		x = setTimeout(autoChange,5000);
	}
}

function stopChange(){
	if(x){
		clearTimeout(x);
		x = 0;
		start = false;
	}
}
$(function(){
	
	for (var i = 0; i<pics.length; ++i){
		$(".bubles").append('<div id="buble'+ i + '"></div>');
		$("#buble"+ i + "").css({
			"display" : "inline-block",
			"margin" : "10px",
			"width" : "10px",
			"height" : "10px",
			"borderRadius" : "50%",
			"backgroundColor" : "white",
			"opacity" : "0.4",
			"zIndex" : "3"
		});
	}
	bubles = $(".bubles div");
	$(bubles[0]).css("opacity","0.8");
	$("div#slider").mouseenter(function(){$("#arrowL,#arrowR").fadeIn(1000, stopChange());});
	$("div#slider").mouseleave(function(){$("#arrowL,#arrowR").fadeOut(1000, autoChange());});
	$("#arrowL").click(mf_moveLeft);
	$("#arrowL").dblclick(mf_moveLeft);
	$("#arrowR").click(mf_moveRight);
	$("#arrowR").dblclick(mf_moveRight);
	$(".bubles div").on("mouseenter",function(event){$(event.target).css("opacity","0.8");});
	$(".bubles div").on("mouseleave",function(event){if (event.target != bubles[iPic])$(event.target).css("opacity","0.4");});
	$(".bubles div").on("click",mf_choosePic);
	autoChange();
});