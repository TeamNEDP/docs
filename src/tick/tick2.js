function Random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function Check(width, height, x, y) {
    if (x < 0 || x >= width || y < 0 || y >= height) return 0;
    return 1;
}

function Tick(color, GameStat) {
    var moveAction = {
		x: 0,
		y: 0,
		movement: "U",
		amount: 1
	};
	var GameMap = GameStat.map;
    var ok = 1;
    while (ok) {
        var w = Random(0, GameMap.width - 1), h = Random(0, GameMap.height - 1);
        var stw = w;
        var sth = h;
        var now = w * GameMap.height + h;
        if (GameMap.grids[now].type === "MF" || GameMap.grids[now].type === "M")
            continue;
		if (GameMap.grids[now].type !== color && GameMap.grids[now].type !== "L" + color && GameMap.grids[now].type !== "C" + color)
			continue;
        if (GameMap.grids[now].soldiers == 0) continue;
        var movement = "U";
        var enemy = "R";
        if (color === "R") enemy = "B";
        var dx = [1, -1, 0, 0];
        var dy = [0, 0, 1, -1];
        var move = ["D", "U", "R", "L"];
        var i = 0;
        for (i; i < 4; i ++ ) {
            var x = w + dx[i];
            var y = h + dy[i];
            if (Check(GameMap.width, GameMap.height, x, y)) {
                ok = 0;
                moveAction.movement = move[i];
                break;
            }
        }
        if (!ok) {
            moveAction.x = stw, moveAction.y = sth;
            moveAction.amount = Random(1, GameMap.grids[stw * GameMap.height + sth].soldiers);
            break;
        }
    }
    return moveAction;
}
