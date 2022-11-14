function Random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function Tick(color, GameStat) {
    var moveAction = {
		x: 0,
		y: 0,
		movement: "U",
		amount: 1
	};
    var ok = 1;
	var GameMap = GameStat.map;
    while (ok) {
        var rand = Random(0, 3);
        var movement = "U";
        if (rand === 0) movement = "U";
        else if (rand === 1) movement = "D";
        else if (rand === 2) movement = "L";
        else movement = "R";
        var w = Random(0, GameMap.width - 1), h = Random(0, GameMap.height - 1);
        var stw = w;
        var sth = h;
        var now = w * GameMap.height + h;
        if (GameMap.grids[now].type === "MF" || GameMap.grids[now].type === "M")
            continue;
		
		if (GameMap.grids[now].type !== color && GameMap.grids[now].type !== "L" + color && GameMap.grids[now].type !== "C" + color)
			continue;
        if (GameMap.grids[w * GameMap.height + h].soldiers == 0) continue;
        if (movement === "U") {
            w --;
        } else if (movement === "L") {
            h --;
        } else if (movement === "D") {
            w ++;
        } else {
            h ++;
        }
        now = w * GameMap.height + h;
        if (w >= 0 && w < GameMap.width && h >= 0 && h < GameMap.height && GameMap.grids[now].type !== "MF" && GameMap.grids[now].type !== "M") 
            ok = 0;
        if (!ok) {
            moveAction.x = stw, moveAction.y = sth;
            moveAction.amount =  Random(1, GameMap.grids[stw * GameMap.height + sth].soldiers);
            moveAction.movement = movement;
            break;
        }
    }
    return moveAction;
}
