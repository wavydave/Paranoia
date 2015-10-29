
var timeStart = Math.floor(new Date().getTime() / 1000);
var timer = setInterval( function(){
	var timeNow = Math.floor(new Date().getTime() / 1000);
	document.getElementById('clock').innerHTML = timeNow - timeStart;
}, 1000);



