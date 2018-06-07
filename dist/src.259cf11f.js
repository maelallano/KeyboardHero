// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],5:[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":6}],4:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":5}],3:[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":5}],2:[function(require,module,exports) {
'use strict';

require('flexboxgrid');

require('./styles/styles.scss');

var game = function game(combTableFinal) {

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

	var maxScore = 50;
	var scoreByTurn = maxScore; // the max score the player can earn with one right combo

	var combTableFinalLength = combTableFinal.length;

	var combTable = [];

	var gameOver = function gameOver() {
		document.querySelector('.containerEndGameDiv').style.display = "";
		document.querySelector('.endGameDiv__score').innerHTML = "Score: " + score;
		document.querySelector('.endGameDiv__combsSucceeded').innerHTML = "Combinaisons réussies: " + combsSucceeded + "/" + combTableFinalLength + ", " + Math.floor(combsSucceeded / combTableFinalLength * 100) + "% de réussite";
		console.log('wesh');
	};

	var render = function render() {
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
	};

	var interval = setInterval(function () {
		checkIfRightComb(1, 1, 1, 1);
		if (combTableFinal.length) {
			combTable.unshift(combTableFinal.shift());
		} else {
			combTable.unshift(["", "", "", ""]);
		}
		if (ui.gameLineA.innerHTML == "<div class=\"note\"></div>" || ui.gameLineZ.innerHTML == '<div class=\"note\"></div>' || ui.gameLineE.innerHTML == '<div class=\"note\"></div>' || ui.gameLineR.innerHTML == '<div class=\"note\"></div>') {
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
	}, speed);

	var compareArray = function compareArray(a1, a2) {
		for (var i = 0; i < a1.length; i++) {
			if (a1[i] !== a2[i]) {
				return false;
			}
		}
		return true;
	};

	var checkIfRightComb = function checkIfRightComb(a, z, e, r) {
		var rightComb = [];
		var triedComb = [a, z, e, r];

		for (var i = 0; i < triedComb.length; i++) {
			if (!triedComb[i]) {
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

	onkeydown = onkeyup = function onkeyup(e) {
		map[e.keyCode] = e.type === 'keydown';

		ui.gameLineA.style.background = map[65] ? "grey" : ""; // a
		ui.gameLineZ.style.background = map[90] ? "grey" : ""; // z
		ui.gameLineE.style.background = map[69] ? "grey" : ""; // e
		ui.gameLineR.style.background = map[82] ? "grey" : ""; // r

		if (map[32]) {
			// spacebar
			if (checkIfRightComb(map[65], map[90], map[69], map[82])) {
				console.log("success");
				ui.gameLineA.style.background = "green";
				ui.gameLineZ.style.background = "green";
				ui.gameLineE.style.background = "green";
				ui.gameLineR.style.background = "green";

				score += scoreByTurn * multiplier;
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
		if (map[32]) {
			// spacebar
			console.log("fail");
			ui.gameLineA.style.background = "red";
			ui.gameLineZ.style.background = "red";
			ui.gameLineE.style.background = "red";
			ui.gameLineR.style.background = "red";

			multiplierCounter = 0;
		}
	};
};
var level1 = [[0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0]];

var level2 = [[1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 1], [1, 1, 0, 0], [1, 1, 1, 1], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 1], [1, 1, 0, 0], [1, 1, 1, 1], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 1], [1, 1, 0, 0], [1, 1, 1, 1], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0]];

var level3 = [[1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 0], [0, 1, 1, 1], [1, 1, 1, 0], [0, 1, 1, 1], [1, 1, 1, 0], [0, 1, 1, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0]];

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
	var level1 = [[0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0], [1, 0, 0, 0], [0, 1, 1, 0]];

	var level2 = [[1, 1, 1, 1], [1, 1, 1, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 1], [1, 1, 0, 0], [1, 1, 1, 1], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 1], [1, 1, 0, 0], [1, 1, 1, 1], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 1], [1, 1, 0, 0], [1, 1, 1, 1], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0]];

	var level3 = [[1, 0, 0, 0], [1, 0, 0, 0], [1, 1, 1, 0], [0, 1, 1, 1], [1, 1, 1, 0], [0, 1, 1, 1], [1, 1, 1, 0], [0, 1, 1, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 1, 0], [1, 0, 1, 0], [0, 1, 0, 1], [0, 0, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0], [1, 0, 0, 1], [0, 1, 1, 0]];

	if (currLevel === 0) game(level1);else if (currLevel === 1) game(level2);else if (currLevel === 2) game(level3);
});

document.querySelectorAll('.goBackToMenu_Btn')[0].addEventListener('click', function () {
	location.reload();
});
document.querySelectorAll('.goBackToMenu_Btn')[1].addEventListener('click', function () {
	location.reload();
});
},{"flexboxgrid":4,"./styles/styles.scss":3}],7:[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50379' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
      // Clear the console after HMR
      console.clear();
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},[7,2], null)
//# sourceMappingURL=/src.259cf11f.map