var dx = [0, 0, 1, -1];
var dy = [1, -1, 0, 0];
var move = ["D", "U", "R", "L"];
var GameMap;
var enemyH = -1, enemyW = -1;
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

function solveRandom(w, h) {
    for (var i = 0; i < 4; i++) {
        var x = w + dx[i];
        var y = h + dy[i];
        if (Check(GameMap.width, GameMap.height, x, y)) {
            moveAction.x = w;
            moveAction.y = h;
            moveAction.movement = move[i];
            moveAction.amount = Random(1, GameMap.grids[w * GameMap.height + h].soldiers);
            return true;
        }
    }
    return false;
}

function dis(x, y) {
    return Math.abs(x - enemyW) + Math.abs(y - enemyH);
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
            moveAction.amount = Random(1, GameMap.grids[w * GameMap.height + h].soldiers);
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

    for (var i = 0; i < GameMap.height * GameMap.width; i++) {
        if (GameMap.grids[i].type === enemy) {
            enemyW = i / GameMap.height;
            enemyH = i % GameMap.height;
            break;
        }
    }

    if(enemyW === -1)
    {
        for (var i = 0; i < GameMap.height * GameMap.width; i++) {
            if (GameMap.grids[i].type === "L" + enemy ) {
                enemyW = i / GameMap.height;
                enemyH = i % GameMap.height;
                break;
            }
        }
    }
    
    if(enemyW === -1)
    {
        for (var i = 0; i < GameMap.height * GameMap.width; i++) {
            if (GameMap.grids[i].type === "C" + enemy ) {
                enemyW = i / GameMap.height;
                enemyH = i % GameMap.height;
                break;
            }
        }
    }

    if(enemyW === -1)
    {
        for (var i = 0; i < GameMap.height * GameMap.width; i++) {
            if (GameMap.grids[i].type === "V") {
                enemyW = i / GameMap.height;
                enemyH = i % GameMap.height;
                break;
            }
        }
    }

    if(enemyW === -1)
    {
        for (var i = 0; i < GameMap.height * GameMap.width; i++) {
            if (GameMap.grids[i].type === "C") {
                enemyW = i / GameMap.height;
                enemyH = i % GameMap.height;
                break;
            }
        }
    }

    while (233) {
        var w = Random(0, GameMap.width - 1), h = Random(0, GameMap.height - 1);
        var now = w * GameMap.height + h;
        if (GameMap.grids[now].type === "MF" || GameMap.grids[now].type === "M")
            continue;
        if (GameMap.grids[now].type !== user && GameMap.grids[now].type !== "L" + user && GameMap.grids[now].type !== "C" + user)
            continue;
        if (GameMap.grids[now].soldiers === 0)
            continue;

        if (enemyW === -1) {
            if (solveRandom(w, h)) break;
        } else {
            if (solveGreedy(w, h)) break;
        }

    }

    return moveAction;
}
