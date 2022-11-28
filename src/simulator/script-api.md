# 用户脚本接口

## 结构

### 游戏状态

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

interface GameStat {
  map: GameMap;
  enemy_soldiers: number;
  enemy_lands: number;
}
```

## 接口

### Tick

模拟器每 tick 会调用用户脚本中的 `Tick` 函数，参数为 `color` 字符串及 `GameStat` 对象，其中 `color` 字符串表示玩家颜色是 `R` 或者 `B`。

用户脚本应返回 `MoveAction` 对象。

例： `Tick(color, GameStat)`