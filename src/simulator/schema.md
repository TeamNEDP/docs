# 信息交换格式

## 地图

```ts
// 分别代表：红方王冠、蓝方王冠、中立城堡、红方城堡、蓝方城堡、山地、空地、红方领地、蓝方领地、战争迷雾中的空地、战争迷雾中的山地
type GridType = 'R' | 'B' | 'C' | 'CR' | 'CB' | 'M' | 'V' | 'LR' | 'LB' | 'F' | 'MF';

interface MapGrid {
  type: GridType;
  soldiers?: number;
}

interface GameMap {
  // 长度宽度
  width: number;
  height: number;
  // idx = w * height + h
  // (w, h 从 0 开始)
  grids: MapGrid[];
}
```

## 玩家

```ts
interface UserScript {
  type: "javascript" | "noop";
  content?: string;
}

interface GameUser {
  id: string;
  script: UserScript;
}
```

## 游戏设置

```ts
interface GameSetting {
  map: GameMap;
  users: { r: GameUser; b: GameUser };
}
```

## 游戏过程

```ts
interface MoveAction {
  x: number;
  y: number;
  amount: number;
  movement: "U" | "D" | "L" | "R";
}

type GameAction = MoveAction | null;

interface GridChange {
  x: number;
  y: number;
  grid: MapGrid;
}

interface GameTick {
  operator: "R" | "B";
  changes: GridChange[];
  action: GameAction;
  action_valid: boolean;
}
```

## 游戏结果

```ts
interface UserGameStat {
  rounds: number;
  moves: number;
  soldiers_total: number;
  soldiers_killed: number;
  grids_taken: number;
}

interface GameResult {
  winner: "R" | "B" | "D";
  r_stat: UserGameStat;
  b_stat: UserGameStat;
}
```

## UML

![Class](uml.svg)