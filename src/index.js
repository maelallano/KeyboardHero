import 'flexboxgrid';
import './styles/styles.scss';
import './styles/styles.scss';

var game = (combTableFinal) => {

	var ui = {
		gameTable: document.querySelector('.game__table'),
		gameLineAll: document.querySelectorAll('.gameLine td'),
		gameLineA: document.querySelector('.gameLine__a'),
		gameLineZ: document.querySelector('.gameLine__z'),
		gameLineE: document.querySelector('.gameLine__e'),
		gameLineR: document.querySelector('.gameLine__r'),
		scoreSpan: document.querySelector('.scoreSpan'),
		multiplierSpan: document.querySelector('.multiplierSpan')
	};

	var speed = 500;

	var combsSucceeded = 0;

	var score = 0;
	ui.scoreSpan.innerHTML = score;

	var multiplier = 1;
	ui.multiplierSpan.innerHTML = multiplier;
	var multiplierCounter = 0;

	const maxScore = 50;
	var scoreByTurn = maxScore; // the max score the player can earn with one right combo

	// var combTableFinal = [
	// 	[0, 1, 1, 0],
	// 	[1, 0, 1, 1],
	// 	[0, 1, 1, 0],
	// 	[1, 1, 1, 1],
	// 	[0, 0, 1, 0],
	// 	[1, 0, 0, 1],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[1, 0, 1, 1],
	// 	[0, 1, 1, 0],
	// 	[1, 1, 1, 1],
	// 	[0, 0, 1, 0],
	// 	[1, 0, 0, 1],
	// 	[0, 1, 1, 0],
	// ];
	// var combTableFinal = [
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// 	[0, 1, 1, 0],
	// ];
	var combTableFinalLength = combTableFinal.length;

	var combTable = [];

	var gameOver = () => {
		document.querySelector('.containerEndGameDiv').style.display = "";
		document.querySelector('.endGameDiv__score').innerHTML = "Score: " + score;
		document.querySelector('.endGameDiv__combsSucceeded').innerHTML = "Combinaisons réussies: " + combsSucceeded + "/" + combTableFinalLength + ", " + Math.floor((combsSucceeded/combTableFinalLength) * 100) + "% de réussite"
		console.log('wesh');
	}

	var render = () => {
		for (var j = 0; j < combTable.length; j++) {
			for (var i = 0; i < combTable[j].length; i++) {
				if (combTable[j][i]) {
					ui.gameTable.rows[j].cells[i].innerHTML = '<div class="note"></div>';
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
		if (ui.gameLineA.innerHTML == "<div class=\"note\"></div>" || ui.gameLineZ.innerHTML == '<div class=\"note\"></div>'
			 || ui.gameLineE.innerHTML == '<div class=\"note\"></div>' || ui.gameLineR.innerHTML == '<div class=\"note\"></div>') {
			combTable.pop();
		}
		var i = 0;
		while (i < combTable.length) {
			var j = 0;
			while (j < combTable[i].length) {
				if (combTable[i][j] === 1) {
					if ((ui.gameLineAll[0].innerHTML || ui.gameLineAll[1].innerHTML || ui.gameLineAll[2].innerHTML || ui.gameLineAll[3].innerHTML) && scoreByTurn) {
						multiplier = 1;
						ui.multiplierSpan.innerHTML = multiplier;
					}
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

	}, speed)

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
			if (ui.gameLineAll[i].innerHTML == "<div class=\"note\"></div>") {
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

		ui.gameLineA.style.background = map[65] ? "grey" : ""; // a
		ui.gameLineZ.style.background = map[90] ? "grey" : ""; // z
		ui.gameLineE.style.background = map[69] ? "grey" : ""; // e
		ui.gameLineR.style.background = map[82] ? "grey" : ""; // r

		if (map[32]) { // spacebar + a
			if (checkIfRightComb(map[65], map[90], map[69], map[82])) {
			    console.log("success");
				ui.gameLineA.style.background = "green";
				ui.gameLineZ.style.background = "green";
				ui.gameLineE.style.background = "green";
				ui.gameLineR.style.background = "green";

				score += (scoreByTurn * multiplier);
				multiplierCounter += 1;
				if (multiplierCounter % 4 === 0) {
					multiplier += multiplier >= 4 ? 0 : 1;
				}
				combsSucceeded += scoreByTurn ? 1 : 0;
				scoreByTurn = 0;
				ui.scoreSpan.innerHTML = score;
				ui.multiplierSpan.innerHTML = multiplier;

			    return;
			}
		}
		if (map[32]) { // spacebar
	    	console.log("fail");
			ui.gameLineA.style.background = "red";
			ui.gameLineZ.style.background = "red";
			ui.gameLineE.style.background = "red";
			ui.gameLineR.style.background = "red";

	    	multiplierCounter = 0;
		}
	}
}
var level1 = [
	[0, 1, 1, 0],
	[1, 0, 0, 0],
	[0, 1, 1, 0],
	[1, 0, 0, 0],
	[0, 1, 1, 0],
	[1, 0, 0, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 0],
	[1, 0, 1, 0],
	[0, 1, 0, 0],
	[0, 0, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 0],
	[1, 0, 1, 0],
	[0, 1, 0, 0],
	[0, 0, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[1, 0, 0, 0],
	[0, 1, 1, 0],
	[1, 0, 0, 0],
	[0, 1, 1, 0],
	[1, 0, 0, 0],
	[0, 1, 1, 0]
];

var level2 = [
	[1, 1, 1, 1],
	[1, 1, 1, 1],
	[0, 1, 1, 0],
	[1, 0, 0, 1],
	[0, 1, 1, 0],
	[1, 0, 0, 1],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 1],
	[1, 1, 0, 0],
	[1, 1, 1, 1],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 1],
	[1, 1, 0, 0],
	[1, 1, 1, 1],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 1],
	[1, 1, 0, 0],
	[1, 1, 1, 1],
	[0, 0, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 0],
	[1, 0, 1, 0],
	[0, 1, 0, 1],
	[0, 0, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[1, 0, 0, 1],
	[0, 1, 1, 0],
	[1, 0, 0, 1],
	[0, 1, 1, 0],
	[1, 0, 0, 1],
	[0, 1, 1, 0]
];

var level3 = [
	[1, 0, 0, 0],
	[1, 0, 0, 0],
	[1, 1, 1, 0],
	[0, 1, 1, 1],
	[1, 1, 1, 0],
	[0, 1, 1, 1],
	[1, 1, 1, 0],
	[0, 1, 1, 1],
	[0, 1, 1, 0],
	[1, 0, 0, 1],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 0],
	[1, 0, 1, 0],
	[0, 1, 0, 1],
	[0, 0, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 0, 1, 0],
	[1, 0, 1, 0],
	[0, 1, 0, 1],
	[0, 0, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[0, 1, 1, 0],
	[1, 0, 0, 1],
	[0, 1, 1, 0],
	[1, 0, 0, 1],
	[0, 1, 1, 0],
	[1, 0, 0, 1],
	[0, 1, 1, 0]
];

var currLevel;

document.querySelector('.containerEndGameDiv').style.display = "none";

document.querySelectorAll('.startGameDiv__play')[0].addEventListener('click', function () {
	document.querySelector('.containerStartGameDiv').style.display = "none";
	currLevel = 0;
	game(level1);
});
document.querySelectorAll('.startGameDiv__play')[1].addEventListener('click', function () {
	document.querySelector('.containerStartGameDiv').style.display = "none";
	currLevel = 1;
	game(level2);
});
document.querySelectorAll('.startGameDiv__play')[2].addEventListener('click', function () {
	document.querySelector('.containerStartGameDiv').style.display = "none";
	currLevel = 2;
	game(level3);
});

document.querySelector('.endGameDiv__replay').addEventListener('click', function () {
	document.querySelector('.containerEndGameDiv').style.display = "none";
	var level1 = [
		[0, 1, 1, 0],
		[1, 0, 0, 0],
		[0, 1, 1, 0],
		[1, 0, 0, 0],
		[0, 1, 1, 0],
		[1, 0, 0, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 0],
		[1, 0, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 0],
		[1, 0, 1, 0],
		[0, 1, 0, 0],
		[0, 0, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[1, 0, 0, 0],
		[0, 1, 1, 0],
		[1, 0, 0, 0],
		[0, 1, 1, 0],
		[1, 0, 0, 0],
		[0, 1, 1, 0]
	];

	var level2 = [
		[1, 1, 1, 1],
		[1, 1, 1, 1],
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 1],
		[1, 1, 0, 0],
		[1, 1, 1, 1],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 1],
		[1, 1, 0, 0],
		[1, 1, 1, 1],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 1],
		[1, 1, 0, 0],
		[1, 1, 1, 1],
		[0, 0, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 0],
		[1, 0, 1, 0],
		[0, 1, 0, 1],
		[0, 0, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0]
	];

	var level3 = [
		[1, 0, 0, 0],
		[1, 0, 0, 0],
		[1, 1, 1, 0],
		[0, 1, 1, 1],
		[1, 1, 1, 0],
		[0, 1, 1, 1],
		[1, 1, 1, 0],
		[0, 1, 1, 1],
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 0],
		[1, 0, 1, 0],
		[0, 1, 0, 1],
		[0, 0, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 0, 1, 0],
		[1, 0, 1, 0],
		[0, 1, 0, 1],
		[0, 0, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0],
		[1, 0, 0, 1],
		[0, 1, 1, 0]
	];

	if (currLevel === 0)
		game(level1)
	else if (currLevel === 1)
		game(level2)
	else if (currLevel === 2)
		game(level3)
});

document.querySelectorAll('.goBackToMenu_Btn')[0].addEventListener('click', function () {
	location.reload();
});
document.querySelectorAll('.goBackToMenu_Btn')[1].addEventListener('click', function () {
	location.reload();
});











