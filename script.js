var words = [];
var canvas;
var ctx;
var word;
var scoreMath = 0;
var initialLength = 4;
var levelup = 3;
var guessed = 0;
var message;
var player;
var initialHeight = 80;
var size = initialHeight;
var wrongCount = 0;
var gameStart;
var count;
var maha = 0.2;
var scoreTable = [localStorage.length];
var scoreTable2 = [localStorage.length];
var tableContent = ""; 
var valueHolder;
var i;
var j;
var difficultyLevel = "";

window.requestAnimFrame = (function() {
 return window.requestAnimationFrame ||
	 window.webkitRequestAnimationFrame ||
	 window.mozRequestAnimationFrame ||
	 window.oRequestAnimationFrame ||
	 window.msRequestAnimationFrame ||
	 function(callback) {
		 window.setTimeout(callback, 1000 / 60);
	 };
})();

	

function eks_de () {

	scoreMath = 0;
	initialLength = 4;
	levelup = 3;
	guessed = 0;
	initialHeight = 80;
	size = initialHeight;
	wrongCount = 0;
	count;
	maha = 0.2;
	scoreTable = [localStorage.length];
	scoreTable2 = [localStorage.length];
	tableContent = ""; 

	console.log("Leht laetud");
	message = "BIKINI BOTTOM.";
	scoreMath = 0;
	canvas = document.getElementById("screen");
	ctx = canvas.getContext("2d");	
	
	var width = window.innerWidth;
	var height = window.innerHeight;
		
	//size
	canvas.style.width = width;
	canvas.style.height = height;
		
	//resolutsioon
	canvas.width = width *2;
	canvas.height = height *2;

	if (gameStart == 1){
		loadWordsIntoArray();
	}	
	if (difficultyLevel == "easy"){
		maha = 0.2;
	} else if (difficultyLevel == "medium"){
		maha = 0.4;
	} else {
		maha = 0.6;
		//epilepsy();
	}
}

/*function epilepsy() {
	var rd = Math.floor(Math.random() * 256);
	var gr = Math.floor(Math.random() * 256);
	var bl = Math.floor(Math.random() * 256);
	var bgColor = "rgb(" + rd + "," + gr + "," + bl + ")";
	setTimeout(function() {document.body.style.background = bgColor;},2000);
}*/

function loadWordsIntoArray () {
	if (gameStart == 1){
	//ajax << vaata netist
	
	var xhttp = new XMLHttpRequest();

	// What happens after request is done:
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			
			//File contents
			words = this.responseText.split("\n");
			console.log(words);
			
			var temporary = [];
			
			//about every word
			for (var i = 0; i < words.length; i = i + 1) {
				
				var one_word = words[i];
				
				var one_word_length = one_word.length;
				
				if (temporary[one_word_length] == undefined) {	
					temporary[one_word_length] = [];
				}
				
				//adding a word
				temporary[one_word_length].push(one_word);
				
			}
			
			console.log(temporary);
			words = temporary; //sorted array
		
			var userName = prompt("USERNAME");
			if (userName) {
				//If entered
				player = userName;
			} else {
				//didn't enter
				player = "tundmatu";
			}
			
			function theTimer () {
				setTimeout(function(){ gameStart = 0; 
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					alert("Game Over. Saite " + localStorage.getItem(userName) + " punkti.");
					document.getElementById("Menuu").style.display = "block";
					drawTable();
				}, 30000);
			}
			theTimer();
			makeNewWord();
			count = 0;
			//60 FPS
			function animate () {
				if (gameStart == 1){
					requestAnimFrame(animate);
				}
				size = size - maha;	
				count += 1;	
				if(gameStart == 0){
					scoreMath = 0;
				}
				if (size < 10) {
					makeNewWord();
					//score lost
					scoreMath = scoreMath - 2000
					if (scoreMath < 0){
						scoreMath = 0
					}
				}				
				draw();
			}

			animate();
			if (gameStart == 1){ 
				requestAnimFrame(draw);
			}
			window.addEventListener("keypress", keyPress);
			
		}             
	};

xhttp.open("GET", "lemmad.txt", true);
xhttp.send();
	
	}	
}



function keyPress (event){
	
	//console.log(event);
	
	if( event.key == word.charAt(0)) {
		
		word = word.slice(1);
		scoreMath = scoreMath + 70 + Math.round(Math.random()*30) + (guessed*30);
		
		
		if (localStorage.getItem(player) < scoreMath) {
			localStorage.setItem(player, scoreMath);
        }
        
		if (word.length > 4) {
			scoreMath = scoreMath + (word.length*50)
        }
        

		if (scoreMath > 1000) {		
			message = "WOW"	
        } else {
            message = "BIKINI BOTTOM."
        }
        
		if (scoreMath > 4000) {		
			message = "AMAZING"		
        }
        
		if (scoreMath > 10000) {		
			message = "EXCELLENT"		
        }
        
		if (scoreMath > 20000) {		
			message = "FANTASTIC"		
        }
        
		if (scoreMath > 50000) {		
			message = "INSANE"		
		}
		
		if (word.length == 0) {
			guessed = guessed + 1;	
			console.log("Arvatud: " + guessed);
			makeNewWord();
		} else {
		} 
			
	} else {
        wrongCount = wrongCount + 1;
        if (wrongCount > 5){
            makeNewWord();
            if (guessed>0){
                guessed = guessed - 1;
            }
        }

		if (guessed > 1) {		
			message = "OUCH"		
		}
		
		if (scoreMath > 0) {
            scoreMath = scoreMath - 70 - Math.round(Math.random()*30);
            if (scoreMath < 0) {
                scoreMath = 0;
            }
        }
	}

	//console.log(event);
}
function makeNewWord(){
	if (gameStart == 1){
    	var extra_length = Math.floor(guessed / levelup);
    
		//This lengths random index
		var random_index = Math.round(Math.random() * (words[initialLength].length-1));
		word = words[initialLength+extra_length][random_index];
	
		//Return to initialHeight
		size = initialHeight;
	}
}

function draw(){
	if (gameStart == 1){
		// x and y
		var x = canvas.width / 2;
		var y = canvas.height / 2;
		
		console.log(x + " " + y);
		
		ctx.clearRect(0,0,canvas.width,canvas.height);
		
		//drawing Canvas
		ctx.textAlign = "center";
		ctx.font = size + "px Courier";
		
		ctx.fillStyle = "#000000" ;
		
		//OverWrite the X
		var word_x = x - ctx.measureText(word[i]).width/2
	
	for (var i = 0; i < word.length; i++) {
		var letterSpacing = ctx.measureText(word[i]).width;
		ctx.fillText(word[i], word_x + (letterSpacing * i) + letterSpacing, y);
	}
	
//SCORE
	ctx.textAlign = "center";
	ctx.font = "50px Courier";
	
	var score = "score: " + scoreMath;
	ctx.fillText(score, x, y/1.2);
	
	//MESSAGE
	
	ctx.textAlign = "center";
	ctx.font = " bold 120px Courier";
	
	ctx.fillStyle = "#DC143C" ;
	ctx.fillText(message, x, y/1.4);
}
}

function drawTable(){
	document.getElementById("Leaderboard").style.display="none";
	for (i=0; i < localStorage.length; i++){
		var info = localStorage.getItem(localStorage.key(i));
		scoreTable[i] = info;
		scoreTable.sort(function(a, b){return b - a});
	}
	for (i=0; i < localStorage.length; i++){
		for (j=0; j < localStorage.length; j++){
			var itemValue = localStorage.getItem(localStorage.key(j));
			if (scoreTable[i] == itemValue){
				scoreTable2[i] = localStorage.key(j);
			}
		}
	}
	tableContent = "";
	document.getElementById("tableBody").innerHTML = tableContent;
	for (i = 0; i < 10; i++) { 
		if(scoreTable[i] != null){
			tableContent += "<tr>" + "<th>"+ (i+1) + "</th>" + "<td>" + scoreTable2[i] + "</td>" + "<td>" + scoreTable[i] + "</td>" + "</tr>";
		} else {""}
		document.getElementById("tableBody").innerHTML = tableContent;
	}
}
