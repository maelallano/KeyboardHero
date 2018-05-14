import 'flexboxgrid';
import './styles/styles.scss';
import './styles/styles.scss';

var game = () => {

	var ui = {
		gameTable: document.querySelector('.game__table'),
		gameLineAll: document.querySelectorAll('.gameLine td'),
		gameLineA: document.querySelector('.gameLine__a'),
		gameLineZ: document.querySelector('.gameLine__z'),
		gameLineE: document.querySelector('.gameLine__e'),
		gameLineR: document.querySelector('.gameLine__r'),
		scoreSpan: document.querySelector('.scoreSpan')
	};

	var score = 0;
	ui.scoreSpan.innerHTML = score;

	const maxScore = 1
	var scoreByTurn = maxScore; // the max score the player can earn with one right combo

	var combTableFinal = [
		[0, 1, 1, 0],
		[1, 0, 1, 1],
		[0, 1, 1, 0],
		[1, 1, 1, 1],
		[0, 0, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[1, 0, 1, 1],
		[0, 1, 1, 0],
		[1, 1, 1, 1],
		[0, 0, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0]
	];
	var combTableFinalLength = combTableFinal.length;

	var combTable = [];

	var gameOver = () => {
		document.querySelector('.containerEndGameDiv').style.display = "";
		document.querySelector('.endGameDiv__score').innerHTML = "Score: " + score + "/" + combTableFinalLength + ", " + Math.floor((score/combTableFinalLength) * 100) + "% de réussite"
		console.log('wesh');
	}

	var render = () => {
		for (var j = 0; j < combTable.length; j++) {
			for (var i = 0; i < combTable[j].length; i++) {
				if (combTable[j][i]) {
					ui.gameTable.rows[j].cells[i].innerHTML = 'oui';
				} else {
					ui.gameTable.rows[j].cells[i].innerHTML = '';
				}
			}
		}

		scoreByTurn = maxScore;
	}

	var interval = setInterval(function () {
		checkIfRightComb(1, 1, 1, 1);
		if (combTableFinal.length) {
			combTable.unshift(combTableFinal.shift());
		} else {
			combTable.unshift(["", "", "", ""]);
		}
		if (ui.gameLineA.innerHTML === 'oui' || ui.gameLineZ.innerHTML === 'oui'
			 || ui.gameLineE.innerHTML === 'oui' || ui.gameLineR.innerHTML === 'oui') {
			combTable.pop();
		}
		var i = 0;
		while (i < combTable.length) {
			var j = 0;
			while (j < combTable[i].length) {
				if (combTable[i][j] === 1) {
					render();
					return;
				}
				j++;
			}
			i++;
		}

		render();
		clearInterval(interval);
		gameOver();

	}, 800)

	var compareArray = (a1, a2) => {
		for (var i = 0; i < a1.length; i++) {
			if (a1[i] !== a2[i]) {
				return false;
			}
		}
		return true;
	}

	var checkIfRightComb = (a, z, e, r) => {
		var rightComb = [];
		var triedComb = [a, z, e, r];

		for (var i = 0; i < triedComb.length; i++) {
			if(!triedComb[i]) {
				triedComb[i] = false;
			}
		}

		for (var i = 0; i < ui.gameLineAll.length; i++) {
			if (ui.gameLineAll[i].innerHTML === "oui") {
				rightComb.push(true);
			} else {
				rightComb.push(false);
			}
		}

		var checkIfNull = 0;
		for (var i = 0; i < rightComb.length; i++) {
			if (!rightComb[i]) {
				checkIfNull++;
			}
		}
		if (checkIfNull === rightComb.length) {
			return false;
		}

		if (compareArray(rightComb, triedComb)) {
			return true;
		}

		return false;
	};

	var map = {};

	onkeydown = onkeyup = function(e){
	    map[e.keyCode] = e.type === 'keydown';
	    console.log();

		ui.gameLineA.style.background = map[65] ? "blue" : ""; // a
		ui.gameLineZ.style.background = map[90] ? "yellow" : ""; // z
		ui.gameLineE.style.background = map[69] ? "pink" : ""; // e
		ui.gameLineR.style.background = map[82] ? "brown" : ""; // r

		if (map[32]) { // spacebar + a
			if (checkIfRightComb(map[65], map[90], map[69], map[82])) {
			    console.log("success");
				ui.gameLineA.style.background = "green";
				ui.gameLineZ.style.background = "green";
				ui.gameLineE.style.background = "green";
				ui.gameLineR.style.background = "green";

				score += scoreByTurn;
				scoreByTurn = 0;
				ui.scoreSpan.innerHTML = score;

			    return;
			}
		}
		if (map[32]) { // spacebar
	    	console.log("fail");
			ui.gameLineA.style.background = "red";
			ui.gameLineZ.style.background = "red";
			ui.gameLineE.style.background = "red";
			ui.gameLineR.style.background = "red";
		}
	}
}

document.querySelector('.containerEndGameDiv').style.display = "none";

document.querySelector('.startGameDiv__play').addEventListener('click', function () {
	document.querySelector('.containerStartGameDiv').style.display = "none";
	game();
});

document.querySelector('.endGameDiv__replay').addEventListener('click', function () {
	document.querySelector('.containerEndGameDiv').style.display = "none";
	game();
});









