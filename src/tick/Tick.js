function Random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function Check(GameMap, now) {
    if (GameMap.grids[now].type !== "M" && GameMap.grids[now].type !== "MF") return 1;
    return 0;
}

function Tick(GameStat) {
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
        if (!Check(GameMap, w * GameMap.height + h)) continue;
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
        if (Check(GameMap, w * GameMap.height + h) && w >= 0 && w < GameMap.width && h >= 0 && h < GameMap.height) 
            ok = 0;
        if (!ok) {
            moveAction.x = stw, moveAction.y = sth;
            moveAction.amount = 1;
            moveAction.movement = movement;
            break;
        }
    }
    return moveAction;
}
