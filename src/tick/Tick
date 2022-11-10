// interface GameStat {
//     map: GameMap;
//     enemy_soldiers: number;
//     enemy_lands: number;
//   }

function Random(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function Check(now) {
    if (GameMap.grip[now].type != "M" && GameMap.grip[now].type != "MF") return 1;
    return 0;
}

function Tick(GameStat) {
    var moveAction;
    var ok = 0;
    while (ok) {
        var rand = Random(0, 3);
        var movement = U;
        for (i = 0; i < rand; i ++ )
            movement ++;
        var w = Random(1, GameMap.width), h = Random(1, GameMap.height);
        if (movement == U) {
            w --;
        } else if (movement == L) {
            y --;
        } else if (movement == D) {
            w ++;
        } else {
            y ++;
        }
        if (Check((w - 1) * GameMap.width + h)) ok = 1;
        if (ok) {
            moveAction.x = w, moveAction.y = h;
            moveAction.amout = 1;
            moveAction.movement = movement;
            break;
        }
    }
    return moveAction;
}



Tick(GameStat);