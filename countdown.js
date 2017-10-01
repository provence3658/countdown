var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var R = 8;
var MARGIN_LEFT = 60;
var MARGIN_TOP = 30;

var ballColor = ["#fc624d","#ffb174","#f7f39a","#a3de83","#28cc9e","#bdf1f6","#b7abfb","#ff847c","#2c2d34"];
var balls =[];
const endTime = new Date(2017, 8, 29, 23, 59, 59);
// 计时小工具
// var endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600 * 1000);
var curShowTimeSeconds = 0;

window.onload = function() {
	// 屏幕自适应
	// WINDOW_WIDTH = document.body.clientWidth;
	// WINDOW_HEIGHT = document.body.clientHeight;

	// MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
	// R = Math.round(WINDOW_WIDTH * 4 / 5 / 108)-1;
	// MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;

	curShowTimeSeconds = getCurrentShowTimeSeconds();
	// 动画方法
	setInterval(
	 	function() {
	 		render(context);
	 		update();
	 	},
	 	50
	);
}

function update() {
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	var nextHours = parseInt(nextShowTimeSeconds/3600);
	var nextMinutes = parseInt(nextShowTimeSeconds%3600/60);
	var nextSeconds = parseInt(nextShowTimeSeconds%60);

	var curHours = parseInt(curShowTimeSeconds/3600);
	var curMinutes = parseInt(curShowTimeSeconds%3600/60);
	var curSeconds = parseInt(curShowTimeSeconds%60);

	if(nextSeconds != curSeconds) {
	 	if(parseInt(nextHours/10) != parseInt(curHours/10)) {
			addBalls(MARGIN_LEFT, MARGIN_TOP,parseInt(curHours/10));
		}
		if(parseInt(nextHours%10) != parseInt(curHours%10)) {
			addBalls(MARGIN_LEFT + 15*(R+1), MARGIN_TOP,parseInt(curHours%10));
		}
		if(parseInt(nextMinutes/10) != parseInt(curMinutes/10)) {
			addBalls(MARGIN_LEFT + 39*(R+1), MARGIN_TOP, parseInt(curMinutes/10));
		}
		if(parseInt(nextMinutes%10) != parseInt(curMinutes%10)) {
			addBalls(MARGIN_LEFT + 54*(R+1), MARGIN_TOP, parseInt(curMinutes%10));
		}
		if(parseInt(nextSeconds/10) != parseInt(curSeconds/10)) {
			addBalls(MARGIN_LEFT + 78*(R+1), MARGIN_TOP, parseInt(curSeconds/10));
		}
		if(parseInt(nextSeconds%10) != parseInt(curSeconds%10)) {
			addBalls(MARGIN_LEFT + 93*(R+1), MARGIN_TOP, parseInt(curSeconds%10));
		}
	 	curShowTimeSeconds = nextShowTimeSeconds;
	}
	updateBalls();
	console.log(balls.length);
}
function updateBalls() {
	for( var i = 0; i < balls.length; i++) {
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;
		if(balls[i].y >= WINDOW_HEIGHT - R) {
			balls[i].y = WINDOW_HEIGHT - R;
			balls[i].vy = -balls[i].vy * 0.75;
		}
	}
	var cnt = 0;
	for(var i = 0; i < balls.length; i++) {
		if(balls[i].x + R > 0 && balls[i].x - R < WINDOW_WIDTH) {
			balls[cnt++] = balls[i];
		}
	}
	while(balls.length > cnt) {
		balls.pop();
	}
}
function addBalls(x, y, num) {
	for(var i = 0; i < digit[num].length; i++) {
		for(var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1) {
				var aBall = {
					x:x+(2*j+1)*(R+1),
					y:y+(2*i+1)*(R+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1, Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:ballColor[Math.floor(Math.random()*ballColor.length)]
				};
				balls.push(aBall);
			}
		}
	}
}
function getCurrentShowTimeSeconds() {
	var curTime = new Date();
	var ret = endTime.getTime() - curTime.getTime();//ms
	ret = Math.round(ret/1000);//转换整数

	return ret >= 0 ? ret : 0;
}

function render(cxt) {
	
	cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
	var hour = parseInt(curShowTimeSeconds/3600);
	var minute = parseInt(curShowTimeSeconds%3600/60);
	var second = parseInt(curShowTimeSeconds%60);

	renderDigit(MARGIN_LEFT, MARGIN_TOP + 10, parseInt(hour/10), cxt);
	renderDigit(MARGIN_LEFT + 15*(R+1), MARGIN_TOP + 10, parseInt(hour%10), cxt);
	renderDigit(MARGIN_LEFT + 30*(R+1), MARGIN_TOP + 10, 10, cxt);
	renderDigit(MARGIN_LEFT + 39*(R+1), MARGIN_TOP + 10, parseInt(minute/10), cxt);
	renderDigit(MARGIN_LEFT + 54*(R+1), MARGIN_TOP + 10, parseInt(minute%10), cxt);
	renderDigit(MARGIN_LEFT + 69*(R+1), MARGIN_TOP + 10, 10, cxt);
	renderDigit(MARGIN_LEFT + 78*(R+1), MARGIN_TOP + 10, parseInt(second/10), cxt);
	renderDigit(MARGIN_LEFT + 93*(R+1), MARGIN_TOP + 10, parseInt(second%10), cxt);

	for(var i = 0; i < balls.length; i++) {
		cxt.fillStyle = balls[i].color;
		cxt.beginPath();
		cxt.arc(balls[i].x, balls[i].y, R, 0, 2*Math.PI);
		cxt.closePath();
		cxt.fill();
	}
}

function renderDigit(x, y, num, cxt) {

	cxt.fillStyle = "#a3de83";

	for(var i = 0; i < digit[num].length; i++) {
		for(var j = 0; j < digit[num][i].length; j++) {
			if(digit[num][i][j] == 1) {
				cxt.beginPath();
				cxt.arc(x+(2*j+1)*(R+1), y+(2*i+1)*(R+1), R, 0, 2*Math.PI);
				cxt.closePath();				
				cxt.fill();
			}
		}
	}	
}


