/*
Alma Sanchez
Take Home Quiz
For some reason it doesn't always register that the mouse is released, not sure why
*/
(function() {
	"use strict";

	window.onload = function() {
		// Button calls
		var colorButton = document.getElementById("color");
		colorButton.onclick = colorIt;

		var moveButton = document.getElementById("move");
		moveButton.onclick = moveIt;

		var numSelect = document.getElementById("count");
		numSelect.onchange = createRectangles;

		// Make the whole page listen for mouse up
		document.body.addEventListener("mouseup", mouseUp);
		createRectangles();
		// colorIt();
		// moveIt();
	};
		/*	==============================
				creates the number of rectangles specified in the select.
		=========================== */
	function createRectangles() { 
		document.getElementById("rectanglearea").innerHTML = "";
		var count = document.getElementById("count").value;

		var i;
		// finish the functions here
		for(i = 0; i < count; i++){
			var rectangle = document.createElement("div");
			var parent = document.getElementById("rectanglearea");
			rectangle.className = "rectangle";
			rectangle.addEventListener("mousedown", mouseDown);
			// Since I want the rectangle area to listen add, add it to the parent
			parent.appendChild(rectangle);
		}
	}
	/*	==============================
		   	Randomly color all of the rectangles
		=========================== */
    function colorIt() {
		var rects = document.querySelectorAll("#rectanglearea .rectangle");
		// var area = document.getElementById("rectanglearea");
		for(var i = 0; i < rects.length; i++) {
			var red = Math.floor(Math.random() * 256);
			var green = Math.floor(Math.random() * 256);
			var blue = Math.floor(Math.random() * 256);
			var opacity = Math.random();
			
			rects[i].style.backgroundColor = "rgba(" + red + "," + green + "," + blue + "," + opacity + ")";
		}
    }

	/*	==============================
			Randomly position all the rectangles
		===========================*/
	function moveIt() {
		// Select all element with the class .rectangle
		var rects = document.querySelectorAll("#rectanglearea .rectangle");
		var area = document.getElementById("rectanglearea");

		// Set height and width
		var areaWidth = window.getComputedStyle(area, null).getPropertyValue("width");
		var areaWidthValue = parseInt(areaWidth);
		var areaHeight = window.getComputedStyle(area, null).getPropertyValue("height");
		var areaHeightValue = parseInt(areaHeight);
		// Get border width
		var borderWidth = window.getComputedStyle(area, null).getPropertyValue("border-width");
		var borderWidthNumber = parseInt(borderWidth);

		var rectangleWidth = 60;
		// need to work more on getting rectangle width using a class
		// var rectangle = getElementById
		// window.getComputedStyle(rects, null).getPropertyValue("width");
		// var rectangleWidthNumber = parseInt(borderWidth);

		for(var i = 0; i < rects.length; i++) {
			// get random number * (.area width - rectagle length - borderWidth * 2)
			var widthDifference = areaWidthValue - rectangleWidth - (borderWidthNumber * 2);
			var heightDifference = areaHeightValue - rectangleWidth - (borderWidthNumber * 2);
			
			var randomWidthNum = Math.floor(Math.random() * widthDifference/11);
			var randomHeightNum = Math.floor(Math.random() * heightDifference/3);
			console.log(randomHeightNum + " is the height");
			// move squares
			rects[i].style.position = "relative";			
			rects[i].style.left = randomWidthNum + "px";
			console.log("random num left" + randomWidthNum);
			rects[i].style.top = randomHeightNum + "px";
			console.log("random num top" + randomHeightNum);
		}
	}
	/*	==============================
			Click and make rectangle go away
		===========================*/
		var prevX,
			prevY,
			newX,
			newY,
			dragging = false,
			draggedObject;

	function mouseDown(event){
		this.style.zindex = "10";
		
		// Make it go away
		// Could delete node but my prefernce was to hide it
		// this.parentNode.removeChild(this);
		this.style.visibility = "hidden";

		//makes dragging = 'true'
		dragging = true;
		//Record the current cursor location. 
		// and save the the current cursor location to prevX and prevY
		prevX = event.clientX;
		prevY = event.clientY;
		draggedObject = this;
		console.log("Mouse pressed!");
		// this.parentNode.addEventListener("mouseup", mouseUp);
	}
	
	function mouseUp(event){
		if(dragging === true){
			// release the mouse
			console.log("Mouse has been freed!");
			newX = event.clientX;
			newY = event.clientY;
			dragging = false;		
			// Begin drawing
			mouseMove();
		}
		// else{
		// 	console.log("You did not click on a rectagle");
		// }
	}

	function mouseMove(){
		console.log("moving!!!!!");
		draggedObject.style.position = "absolute";

		// sqrt((x1 -x2)^2 + (y1 - y2)^2)
		var deltaX,
			deltaY;
		// Get the distance
		deltaX = newX - prevX;
		deltaY = newY - prevY;

		// Get old X position of rectangle
		// var oldRectPositionX = window.getComputedStyle(draggedObject,null).getPropertyValue("top");
		// var oldRectPositionValueX = parseInt(oldRectPositionX);
		// // Get old Y position of rectangle
		// var oldRectPositionY = window.getComputedStyle(draggedObject,null).getPropertyValue("left");
		// var oldRectPositionValueY = parseInt(oldRectPositionY);

		var newPosX = prevX + deltaX;
		var newPosY = prevY + deltaY;

		draggedObject.style.left = newPosX + "px";
		draggedObject.style.top = newPosY + "px";
		
		// Draw the rectangle in the new spot
		draggedObject.style.visibility = "visible";

		// drags the rectangle while dragging == true
		// 1) compute the distance of dragging (clientX-prevX) do the same for Y.
		// var distance = Math.sqrt(nowX - prevX + nowY - prevY);
		// 2) grab the rectangle's original position (this is from the style attributes) 

		// 3) set the rectangle's new position (by adding the displacement to the Old position in 2) 

		// 4). This is crucial.  You want the rectangle to be updated while you drag.  So you have to keep save the current mouse location ClientX and ClientY to prevX and PrevY
		console.log("Done ******");
	}
})();