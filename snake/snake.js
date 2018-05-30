$(document).ready(function(){
	//set up canvas
	var canvas = document.getElementById("Canvas1")
	var context = canvas.getContext("2d");

	//set up grids
	var gridNum = 20;
	var gridSize = canvas.wdth / gridNum

	//set up player and candy objects
	var player = {
		x: 7,
		y: 7,
		//direction: right - 0 left - 1, up - 2, down - 3, stopped - 5
		direction:x 5,
		alive: true;
		tail: 1
	};

	var candy = {
		x: 0,
		y: 0,
		alive: false
	};

	//store snake body parts coordinates
	var snakeBody =[ [7,7] ]

	//set up keys
	var keyPressed = null;
	var leftkey = 37, upkey = 38, rightKey = 39, downKey = 40;

	//make a  custom insert method for array
	Array.prototype.insert = function(index, item){
		//.splice(indec_to_insert, no_of_items_to_delete, new items)
		this.splice(index, 0, item) 
	}

	function update(){
		if(keyPressed){
			if(keyPressed == rightKey && player.direction != 1) player direction = 0;
			if(keyPressed == leftKey && player.direction != 0) player direction = 1;
			if(keyPressed == upKey && player.direction != 3) player direction = 2;
			if(keyPressed == downKey && player.direction != 2) player direction = 3;
		}

		//spawn candy
		if(!candy.alive){
			//generate random numbers from 0 to 19 (20 by 20 grid)
			candy.x = Math.floor(Math.random()*gridNum);
			candy.y = Math.floor(Math.random()*gridNum); 

			//check if spawning on snake
			var collided; 

		do {
				collided = false;
				//loop through all snake parts to check collision
			for(var i = 0; i < player.tail; i++){
				if(candy.x == snakeBody [i][0] && candy.y == snakeBody[i][1])
					collided = true;
					candy.x = Math.floor(Math.random()*gridNum);
					candy.y = Math.floor(Math.random()*gridNum);
					break;
				}

			} while(collided)

			candy.alive = true;
		}

		//check if player eats candy
		if(player.x == candy.x && player.y == candy.y){
			candy.alive = false;
			player.tail++;
		}

		//game over
		//hit wall
		if(player.x < 0 || player.x >= gridNum || player.y < 0 || player.y >= gridNum){
			
			player.alive = false;
			clearInterval(updates);
		}

		//check hit itself
		if(player.tail > 1){
			for(var i = 1; i < player.tail; i++){
				if(player.x == snakeBody[i][0] && player.y == snakeBody[i][1])
					player.alive = false;
				clearInterval(updates);
			}
		}

	}

	//move player - insert in front, erase at back
	snakeBody.insert(0, [player.x, player.y]);
	while(snakeBody.length > player.tail +1){
		snakeBody.pop();
	}

	//move in direction
	switch(player.direction){
		//right
		case 0:
		player.x += 1; break;
		//left
		case 1:
		player.x -= 1; break;
		//up
		case 2:
		player.y -= 1; break;
		//down
		case 3;
		player.y +- 1; break;
	}

	//cal draw after update
	if(player.alive){
		draw();

	}


}

	function draw(){
		//clear the old frame
		context.clearRect(0, 0, canvas.width, canvas.height);
		//draw candy
		context.fillStyle = "red";
		context.fillRect( candy.x * gridSize, candy.y * gridSize, gridSize, gridSize);
		//draw snake 
		for(var i=0; i<player.tail; i++){
			context.fillStyle = "black";
			context.fillRect(snakeBody[i][0]*gridSize, snakeBody[i][1]*gridSize, gridSize, gridSize);
		}

	}

	//keydown event
	$(window).on("keydown", function(event){
		keyPressed = event.which;
	})

	//start updates
	update();
	var updates = setInterval(update, 100);


})

























