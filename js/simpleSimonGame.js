$(document).ready(function(){
	"use strict";

//=================================================================
// Global Variables
//=================================================================
var memoryArray = [];
var levelCounter = 0 
var level = $("#countDisplay");

//=================================================================
// Generates random number for random Simon/Computer's turn
//=================================================================

function newMemory() {
	var temp = Math.floor((Math.random() * 4) + 1);
	var i = 0;
	var intervalId;

	switch(temp) {
		case 1:
			memoryArray.push("#buttonGreen");
			break;
		case 2:
			memoryArray.push("#buttonRed");
			break;
		case 3:
			memoryArray.push("#buttonYellow");
			break;
		case 4:
			memoryArray.push("#buttonBlue");
			break;
	}
//=================================================================
// Tells the computer to enter random input, then prompt user turn
//=================================================================
	levelCounter ++;
	level.html(levelCounter);
	intervalId = setInterval(function(){
		
		if(i < memoryArray.length){
			animateRandomSquare(memoryArray[i], 400);
			i++;
		} else {
			usersTurn();
			clearInterval(intervalId);
		}
	}, 850);
}

//=================================================================
// Start button animation
//=================================================================

function animateStartButton (buttonId, speed) {
	$(buttonId) .animate({
		opacity: .5
	}, 250, function(){
		$(buttonId).animate({
			opacity: 1
		}, 250);
	})
};

//=================================================================
// Animation for Random Squares (Computer's Turn)
//=================================================================

function animateRandomSquare (buttonId, speed) {
	$(buttonId) .animate({
		opacity: 1
	}, speed, function(){
		$(buttonId).animate({
			opacity: .5
		}, speed);
	})
};

//=================================================================
// Animates the button/click on Players turn  
//=================================================================

function usersTurn() {
	var clickCount = 0;

	$(".fourButtons").on("click", function(){
		var clickedId = "#" + $(this).attr("id");
		animateRandomSquare(clickedId, 180);
//=================================================================
// Makes sure the Players turn matches the Simon/Computer's turn
//=================================================================
		if (clickedId == memoryArray[clickCount]){
			if (clickCount == memoryArray.length -1 ) {
				newMemory();
				clickCount = 0;
//=================================================================
//Turns off Player click function during Simon/Computer's turn
//=================================================================
				$(".fourButtons").off("click");
			} else {
				clickCount++;
			}
		} else {
			memoryArray = [];
			$("#textTitle").css("visibility", "hidden");
			$(".gameOver").css("visibility", "visible");
			$(".fourButtons").off("click");
		}
	})
}

//=================================================================
// Makes the start button clear the array and counter when clicked
//=================================================================

$("#startButton").click(function(){
	levelCounter = 0;
	memoryArray = [];
	newMemory();
});

//=================================================================
// Animates the start button
//=================================================================

$("#startButton").on("click", function(){
	var clickedId = "#" + $(this).attr("id");
	animateStartButton(clickedId, 180);
	$(".gameOver").css("visibility", "hidden");
	$("#textTitle").css("visibility", "visible");
});

});