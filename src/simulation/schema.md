# 信息交换格式

## 地图

```ts
// 分别代表：红方皇冠、蓝方皇冠、城堡、山地、空地、领地
type GridType = 'R' | 'B' | 'C' | 'M' | 'V' | 'LR' | 'LB' | 'F' | 'MF';

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
	id: string;
	// null 表示随机生成地图
	map: GameMap | null;
	users: GameUser[];
}
```

## 游戏过程

```ts
interface MoveAction {
	x: number;
	y: number;
	amount: number;
	movement: 'U' | 'D' | 'L' | 'R';
}

type GameAction = MoveAction | null;

interface GridChange {
	x: number;
	y: number;
	grid: MapGrid;
}

interface GameTick {
	operator: 'R' | 'B';
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
	winner: 'R' | 'B';
	rStat: UserGameStat;
	bStat: UserGameStat;
}
```
