import 'flexboxgrid';
import './styles/styles.scss';
import './styles/styles.scss';

var ui = {
	gameTable: document.querySelector('.game__table'),
	gameLineA: document.querySelector('.gameLine__a'),
	gameLineZ: document.querySelector('.gameLine__z'),
	gameLineE: document.querySelector('.gameLine__e'),
	gameLineR: document.querySelector('.gameLine__r')
}

window.addEventListener('keydown', function (e) {
	if (e.keyCode === 65) {
		ui.gameLineA.style.background = "blue";
	}
	if (e.keyCode === 90) {
		ui.gameLineZ.style.background = "yellow";
	}
	if (e.keyCode === 69) {
		ui.gameLineE.style.background = "pink";
	}
	if (e.keyCode === 82) {
		ui.gameLineR.style.background = "brown";
	}
	if (e.keyCode === 32) {
		ui.gameLineA.style.background = "green";
		ui.gameLineZ.style.background = "green";
		ui.gameLineE.style.background = "green";
		ui.gameLineR.style.background = "green";
	}
})

window.addEventListener('keyup', function (e) {
	if (e.keyCode === 65) { // a
		ui.gameLineA.style.background = "";
	}
	if (e.keyCode === 90) { // z
		ui.gameLineZ.style.background = "";
	}
	if (e.keyCode === 69) { // e
		ui.gameLineE.style.background = "";
	}
	if (e.keyCode === 82) { // r
		ui.gameLineR.style.background = "";
	}
	if (e.keyCode === 32) { // spacebar
		ui.gameLineA.style.background = "";
		ui.gameLineZ.style.background = "";
		ui.gameLineE.style.background = "";
		ui.gameLineR.style.background = "";
	}
})

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

var map = {};
onkeydown = function(e){
    map[e.keyCode] = e.type == 'keydown';

	if(map[32] && map[65] && ui.gameLineA.innerHTML === "oui") { // spacebar + A
	    map = {};
	    console.log("success");
	}    
}




