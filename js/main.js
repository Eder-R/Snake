window.onload = function () {

	var stage = document.getElementById('stage');
	var ctx = stage.getContext("2d");
	document.addEventListener("keydown",keypush);
	setInterval(game, 60);

	const vel = 1;

	var vx = vy = 0;

	//TAM cobra
	var px = 10;
	var py = 15;

	//TAM && Quantidade de peças
	var tp = 20;
	var qp = 20;

	//tamanho da maçã
	var ax = 15;
	var ay = 15;

	var trail = [];
	tail = 5;

	function game() {
		px += vx;
		py += vy;
		if (px < 0) {
			px = qp - 1;
		}
		if (px > qp - 1) {
			px = 0;
		}
		if (py < 0) {
			py = qp - 1;
		}
		if (py > qp - 1) {
			py = 0;
		}

		//FUNDO DO JOGO
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, stage.width, stage.height);
		//FRUTA / MAÇÃ
		ctx.fillStyle = "Red";
		ctx.fillRect(ax * tp, ay * tp, tp, tp);
		//RASTRO DA COBRA
		ctx.fillStyle = "gray";
		for (var i = 0; i < trail.length; i++) {
			ctx.fillRect(trail[i].x * tp, trail[i].y * tp, tp, tp);

			if (trail[i].x == px && trail[i].y == py) {
				vx = vy = 0;
				tail = 5;
			}
		}

		trail.push({
			x: px,
			y: py
		})
		while (trail.length > tail) {
			trail.shift();
		}

		if (ax == px && ay == py) {
			tail++;
			ax = Math.floor(Math.random() * qp)
			ay = Math.floor(Math.random() * qp)
		}

	}

	function keypush(event) {
		switch (event.keyCode) {
			case 37:	//SETA ESQUERDA
				vx = -vel;
				vy= 0;
				break;
			case 38:	//SETA CIMA
				vx = 0;
				vy= -vel;
				break;
			case 39:	//SETA DIREITA
				vx = vel;
				vy= 0;
				break;
			case 40:	//SETA BAIXO
				vx = 0;
				vy= vel;
				break;

			default:
				break;
		}

	}
}