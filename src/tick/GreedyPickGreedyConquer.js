var dx = [0, 0, 1, -1];
var dy = [1, -1, 0, 0];
var move = ["D", "U", "R", "L"];
var GameMap;
var enemyH = -1, enemyW = -1;
var toW, toH;
var moveAction = {
	x: 0,
	y: 0,
	movement: "U",
	amount: 1
};

function Random(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

function Check(width, height, x, y) {
	return 0 <= x && x < width && 0 <= y && y < height;
}

function dis(x, y) {
	return Math.abs(x - toW) + Math.abs(y - toH);
}

function solveGreedy(w, h) {
	for (var i = 0; i < 4; i++) {
		var x = w + dx[i];
		var y = h + dy[i];
		if (!Check(GameMap.width, GameMap.height, x, y)) continue;
		if (dis(w, h) > dis(x, y)) {
			moveAction.x = w;
			moveAction.y = h;
			moveAction.movement = move[i];
			moveAction.amount = Random(1, GameMap.grids[w * GameMap.height + h].soldiers - 1);
			return true;
		}
	}
	return false;
}

function Tick(user, GameStat) {

	GameMap = GameStat.map;

	var enemy = user === "R" ? "B" : "R";


	for (var i = 0; i < GameMap.height * GameMap.width; i++) {
		if (GameMap.grids[i].type === enemy) {
			enemyW = i / GameMap.height;
			enemyH = i % GameMap.height;
			break;
		}
	}


	if (enemyW === -1) 
	{
		toW = toH = -1;
		if (toW === -1)
			for (var i = 0; i < GameMap.height * GameMap.width; i++) {
				if (GameMap.grids[i].type === "L" + enemy || GameMap.grids[i].type === "C" + enemy) {
					toW = i / GameMap.height;
					toH = i % GameMap.height;
					break;
				}
			}

		if (toW === -1)
			for (var i = 0; i < GameMap.height * GameMap.width; i++) {
				if (GameMap.grids[i].type === "C") {
					toW = i / GameMap.height;
					toH = i % GameMap.height;
					break;
				}
			}
		
		if (toW === -1)
			for (var i = 0; i < GameMap.height * GameMap.width; i++) {
				if (GameMap.grids[i].type === "V") {
					toW = i / GameMap.height;
					toH = i % GameMap.height;
					break;
				}
			}
	}

	var w = -1, h = -1;
	for (var i = 0; i < GameMap.height * GameMap.width; i++) {
		if (GameMap.grids[i].type === user || GameMap.grids[i].type === "L" + user || GameMap.grids[i].type === "C" + user) {
			if (w === -1) {
				w = i / GameMap.height;
				h = i % GameMap.height;
			}
			else if (GameMap.grids[i].soldiers > GameMap.grids[w * GameMap.height + h].soldiers) {
				w = i / GameMap.height;
				h = i % GameMap.height;
			}
		}
	}
	while (233) {
		var now = w * GameMap.height + h;
		if (GameMap.grids[now].type === "MF" || GameMap.grids[now].type === "M")
			continue;
		if (GameMap.grids[now].type !== user && GameMap.grids[now].type !== "L" + user && GameMap.grids[now].type !== "C" + user)
			continue;
		if (GameMap.grids[now].soldiers === 0)
			continue;
		
		// console.log("w: " + w + " h: " + h);

		if (solveGreedy(w, h)) break;
	}

	return moveAction;
}



// var stat = {
//     "map": {
//         "width": 5,
//         "height": 5,
//         "grids": [{"type": "R", "soldiers": 6}, {"type": "V", "soldiers": 0}, {
//             "type": "F",
//             "soldiers": 27
//         }, {"type": "F", "soldiers": 0}, {"type": "F", "soldiers": 0}, {"type": "C", "soldiers": 16}, {
//             "type": "C",
//             "soldiers": 19
//         }, {"type": "F", "soldiers": 0}, {"type": "F", "soldiers": 0}, {"type": "F", "soldiers": 0}, {
//             "type": "F",
//             "soldiers": 0
//         }, {"type": "F", "soldiers": 0}, {"type": "F", "soldiers": 0}, {"type": "F", "soldiers": 0}, {
//             "type": "F",
//             "soldiers": 0
//         }, {"type": "F", "soldiers": 0}, {"type": "F", "soldiers": 0}, {"type": "F", "soldiers": 0}, {
//             "type": "F",
//             "soldiers": 0
//         }, {"type": "F", "soldiers": 0}, {"type": "F", "soldiers": 0}, {"type": "F", "soldiers": 0}, {
//             "type": "F",
//             "soldiers": 0
//         }, {"type": "F", "soldiers": 19}, {"type": "MF", "soldiers": 0}]
//     }, "enemy_soldiers": 0, "enemy_lands": 0
// };


// console.log(Tick("R", stat));