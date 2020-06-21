	var canvas, ctx, WIDTH, HEIGHT, FPS, tileSize, playing;
	var snake;
	var globalTouch = [], offset = [];

	var keys = {
		left: 37,
		up: 38,
		right: 39,
		down: 40
	}
		//Functions Mobile
	window.addEventListener("touchstart", touchStart);
	window.addEventListener("touchmove", touchMove);
	window.addEventListener("touchend", touchEnd);

		//Function Desktop (PCs e Notebooks)
	window.addEventListener("keydown", keyDown);

		//Function Responsive
	window.addEventListener("resize", resizeWindow);

	function touchEnd(e) {
		if (Math.abs(offset[0]) > Math.abs(offset[1]))
			snake.direction = [offset[0] / Math.abs(offset[0]), 0];

		else
			snake.direction = [0, offset[1] / Math.abs(offset[1])];
	}

	function touchMove(e) {
		var touch = e.touches [0];

		offset = [touch.pageX - globalTouch[0], touch.pageY - globalTouch[1]];
	}

	function touchStart (e) {
		e.preventDefault();

		var touch = e.touches[0]
		globalTouch = [touch.pageX, touch.pageY];

	}

	function keyDown (e) {

		if (!playing && (e.keyCode == keys.up || e.keyCode == keys.left || e.keyCode == keys.down || e.keyCode == keys.right))
			playing = true

		switch (e.keyCode){
			case keys.left:
				snake.direction = [-1, 0];
				break;

			case keys.up:
				snake.direction = [0, -1];
				break;

			case keys.right:
				snake.direction = [1, 0]
				break;

			case keys.down:
				snake.direction = [0, 1];
				break;
		}
	}

	function resizeWindow() {
		WIDTH = window.innerWidth;
		HEIGHT = window.innerHeight;

		canvas.width = WIDTH;
		canvas.height = HEIGHT;

		tileSize = Math.max(Math.floor(WIDTH / 60), Math.floor(HEIGHT / 60));
	}

	function init() {
		canvas = document.createElement("canvas");
		resizeWindow();
		document.body.appendChild(canvas);
		ctx = canvas.getContext("2d");

		FPS = 15;

		newGame();
		run();

	};

	function newGame() {
		snake = new Snake();
		playing = false;

	}

	function Snake () {
		this.body = [[10, 10], [10, 11], [10, 12]];
		this.color = "#000"
		this.direction = [0, -1];

		this.update = function() {
			var nextPos = [this.body[0][0] + this.direction[0], this.body[0][1] + this.direction[1]]
			if (!playing) {
				if (this.direction[1] == -1 && nextPos[1] <= (HEIGHT * 0.1 / tileSize))
					this.direction = [1, 0];

					else if (this.direction[0] == 1 && nextPos[0] >= (WIDTH * 0.9 / tileSize))
					this.direction = [0, 1];

					else if (this.direction[1] == 1 && nextPos[1] >= (HEIGHT * 0.9 / tileSize))
					this.direction = [-1, 0];

					else if (this.direction[0] == -1 && nextPos[0] <= (WIDTH * 0.1 / tileSize))
					this.direction = [0, -1];

			};

			if (nextPos[0] == this.body[1][0] && nextPos[1] == this.body[1][1]) {
				this.body.reverse();
				nextPos = [this.body[0][0] + this.direction[0], this.body[0][1] + this.direction[1]]
			}

			this.body.pop();
			this.body.splice(0, 0, nextPos);
		}

		this.draw = function() {
			ctx.fillStyle = this.color

			for (var i = 0; i < this.body.length; i++) {
				ctx.fillRect(this.body[i][0] * tileSize, this.body[i][1] * tileSize, tileSize, tileSize)
			}
		}
	}

	function update() {
		snake.update();

	};

	function run() {
		update();
		draw();

		setTimeout(run, 1000 / FPS)
	};

	function draw() {
		ctx.clearRect(0, 0, WIDTH, HEIGHT);

		snake.draw();
	};

	init();