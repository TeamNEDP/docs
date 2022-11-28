// 20221118151607
// http://101.43.76.104:8000/api/games/ofirterb/details

var dx = [0, 0, 1, -1];
var dy = [1, -1, 0, 0];
var move = ["D", "U", "R", "L"];
var GameMap;
let width;
let height;
var enemyH = -1, enemyW = -1;
var toW, toH;
var moveAction = {
    x: 0, y: 0, movement: "U", amount: 1
};

const inf = 1e9

let dist = [];

function calDist() {
    for (let i=0; i<width*height; ++i) {
        let cur = [];
        for (let j=0; j<width*height; ++j) {
            cur.push(inf);
        }
        dist.push(cur);
    }

    // add edges

    for (let i=0; i<width; ++i) {
        for (let j=0; j<height; ++j) {
            for (let k=0; k<4; ++k) {
                let x = i+dx[k];
                let y = j+dy[k];
                if (!Check(x, y)) continue;
                dist[i*height+j][x*height+y] = 1;
            }

            dist[i*height+j][i * height + j] = 0;
        }
    }

    for (let k=0; k<width*height; ++k) {
        for (let i=0; i<width*height; ++i) {
            for (let j=0; j<width*height; ++j) {
                dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
            }
        }
    }
}

function Random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function Check(x, y) {

    if (!(0 <= x && x < width && 0 <= y && y < height)) return false;

    return GameMap.grids[x * height + y].type !== "M" && GameMap.grids[x * height + y].type !== "MF";
}

function solveGreedy(w, h) {
    for (var i = 0; i < 4; i++) {
        var x = w + dx[i];
        var y = h + dy[i];
        if (!Check(x, y)) continue;
        if (dist[w * height + h][toW * height + toH] > dist[x * height + y][toW * height + toH]) {
            moveAction.x = w;
            moveAction.y = h;
            moveAction.movement = move[i];
            moveAction.amount = GameMap.grids[w * GameMap.height + h].soldiers - 1;
            return;
        }
    }
}

function Tick(user, GameStat) {

    GameMap = GameStat.map;

    height = GameMap.height; width = GameMap.width;

    calDist();


    var enemy = user === "R" ? "B" : "R";


    for (var i = 0; i < GameMap.height * GameMap.width; i++) {
        if (GameMap.grids[i].type === enemy) {
            enemyW = Math.floor(i / GameMap.height)
            enemyH = i % GameMap.height;
            break;
        }
    }


    toW = toH = -1;
    if (enemyW !== -1) {
        toW = enemyW;
        toH = enemyH;
    } else {
        if (toW === -1) for (var i = 0; i < GameMap.height * GameMap.width; i++) {
            if (GameMap.grids[i].type === "L" + enemy || GameMap.grids[i].type === "C" + enemy) {
                toW = Math.floor(i / GameMap.height)
                toH = i % GameMap.height;
                break;
            }
        }

        if (toW === -1) for (var i = 0; i < GameMap.height * GameMap.width; i++) {
            if (GameMap.grids[i].type === "C") {
                toW = Math.floor(i / GameMap.height)
                toH = i % GameMap.height;
                break;
            }
        }

        if (toW === -1) for (var i = 0; i < GameMap.height * GameMap.width; i++) {
            if (GameMap.grids[i].type === "V") {
                toW = Math.floor(i / GameMap.height)
                toH = i % GameMap.height;
                break;
            }
        }
    }

    var w = -1, h = -1;
    for (var i = 0; i < GameMap.height * GameMap.width; i++) {
        if (GameMap.grids[i].type === user || GameMap.grids[i].type === "L" + user || GameMap.grids[i].type === "C" + user) {
            if (w === -1) {
                w = Math.floor(i / GameMap.height)
                h = i % GameMap.height;
            } else if (GameMap.grids[i].soldiers > GameMap.grids[w * GameMap.height + h].soldiers) {
                w = Math.floor(i / GameMap.height)
                h = i % GameMap.height;
            }
        }
    }

    // console.log("w: " + w + " h: " + h);

    solveGreedy(w, h);

    return moveAction;
}


// var stat = {
//     "map": {
//         "width": 5,
//         "height": 5,
//         "grids": [{"type": "R", "soldiers": 6}, {"type": "C", "soldiers": 0}, {
//             "type": "F",
//             "soldiers": 27
//         }, {"type": "F", "soldiers": 0}, {"type": "F", "soldiers": 0}, {"type": "V", "soldiers": 16}, {
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
//
//
// console.log(Tick("R", stat));