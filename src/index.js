import 'flexboxgrid';
import './styles/styles.scss';
import './styles/styles.scss';

var ui = {
	gameTable: document.querySelector('.game__table'),
	gameLineAll: document.querySelectorAll('.gameLine td'),
	gameLineA: document.querySelector('.gameLine__a'),
	gameLineZ: document.querySelector('.gameLine__z'),
	gameLineE: document.querySelector('.gameLine__e'),
	gameLineR: document.querySelector('.gameLine__r')
}

// window.addEventListener('keydown', function (e) {
// 	if (e.keyCode === 65) {
// 		ui.gameLineA.style.background = "blue";
// 	}
// 	if (e.keyCode === 90) {
// 		ui.gameLineZ.style.background = "yellow";
// 	}
// 	if (e.keyCode === 69) {
// 		ui.gameLineE.style.background = "pink";
// 	}
// 	if (e.keyCode === 82) {
// 		ui.gameLineR.style.background = "brown";
// 	}
// 	if (e.keyCode === 32) {
// 		ui.gameLineA.style.background = "green";
// 		ui.gameLineZ.style.background = "green";
// 		ui.gameLineE.style.background = "green";
// 		ui.gameLineR.style.background = "green";
// 	}
// })

// window.addEventListener('keyup', function (e) {
// 	if (e.keyCode === 65) { // a
// 		ui.gameLineA.style.background = "";
// 	}
// 	if (e.keyCode === 90) { // z
// 		ui.gameLineZ.style.background = "";
// 	}
// 	if (e.keyCode === 69) { // e
// 		ui.gameLineE.style.background = "";
// 	}
// 	if (e.keyCode === 82) { // r
// 		ui.gameLineR.style.background = "";
// 	}
// 	if (e.keyCode === 32) { // spacebar
// 		ui.gameLineA.style.background = "";
// 		ui.gameLineZ.style.background = "";
// 		ui.gameLineE.style.background = "";
// 		ui.gameLineR.style.background = "";
// 	}
// })

var combTableFinal = [
	[0, 1, 1, 0],
	[1, 0, 1, 1],
	[0, 1, 1, 0],
	[1, 0, 1, 1],
	[0, 1, 1, 0],
	[1, 0, 1, 1],
	[0, 1, 1, 0]
];

var combTable = [];

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

}, 1000)

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
	// console.log(triedComb)

	for (var i = 0; i < ui.gameLineAll.length; i++) {
		if (ui.gameLineAll[i].innerHTML === "oui") {
			rightComb.push(true);
		} else {
			rightComb.push(false);
		}
	}

	console.log("rightComb :", rightComb);
	console.log("triedComb :", triedComb);

	if (compareArray(rightComb, triedComb)) {
		return true;
	}

	return false;
};

var map = {};

onkeydown = onkeyup = function(e){
    map[e.keyCode] = e.type === 'keydown';

	ui.gameLineA.style.background = map[65] ? "blue" : ""; // a
	ui.gameLineZ.style.background = map[90] ? "yellow" : ""; // z
	ui.gameLineE.style.background = map[69] ? "pink" : ""; // e
	ui.gameLineR.style.background = map[82] ? "brown" : ""; // r

	if (map[32]) { // spacebar + a
		// if (map[65] && ui.gameLineA.innerHTML === "oui") {
		//     console.log("success");
		// 	ui.gameLineA.style.background = "green";
		// 	ui.gameLineZ.style.background = "green";
		// 	ui.gameLineE.style.background = "green";
		// 	ui.gameLineR.style.background = "green";

		//     return;
		// }
		console.log(map[65])
		if (checkIfRightComb(map[65], map[90], map[69], map[82])) {
		    console.log("success");
			ui.gameLineA.style.background = "green";
			ui.gameLineZ.style.background = "green";
			ui.gameLineE.style.background = "green";
			ui.gameLineR.style.background = "green";

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



