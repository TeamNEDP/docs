# 脚本 API

为实现模拟器与脚本的交互，我们定义了以下数据格式

```ts
// 地图格类型
// 分别代表：红方王冠、蓝方王冠、中立城堡、红方城堡、蓝方城堡、山地、空地、红方领地、蓝方领地、战争迷雾中的空地、战争迷雾中的山地
type GridType = 'R' | 'B' | 'C' | 'CR' | 'CB' | 'M' | 'V' | 'LR' | 'LB' | 'F' | 'MF';

interface MapGrid {
  type: GridType;
  soldiers?: number;
}

// 地图
interface GameMap {
  // 宽度
  width: number;
  // 高度
  height: number;
  // 地图格下标 idx = x * height + y
  // (x, y 均从 0 开始)
  grids: MapGrid[];
}
```

模拟器将以 `Tick(User, GameStat)` 的形式调用用户的 `Tick` 函数，其返回类型应为 `MoveAction`。

其中对 `User`, `GameStat` 和 `MoveAction` 的定义如下：

```ts

// 表示玩家在当前对局中是哪个颜色
type User = "R" | "B";

// 游戏当前状态
interface GameStat {
  map: GameMap;
  enemy_soldiers: number;
  enemy_lands: number;
}

// 玩家走步
interface MoveAction {
  x: number;
  y: number;
  amount: number;
  // U 表示 y - 1 方向，D 表示 y + 1 方向
  // L 表示 x - 1 方向，R 表示 x + 1 方向
  movement: "U" | "D" | "L" | "R";
}
```

## 限制

**值得注意的是**，为了确保一局游戏的进行时间，我们对**每一刻**脚本运行时间进行了限制：不超过 $50ms$。

若你的脚本未能在规定时间内计算出走步**或是**提供的走步并不符合[游戏规则](../simulator/rules)，模拟器会认为你的脚本这一刻**没有操作**。