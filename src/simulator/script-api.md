# 用户脚本接口

## 结构

### 游戏状态

```ts
interface GameStat {
  map: GameMap;
  enemy_soldiers: number;
  enemy_lands: number;
}
```

## 接口

### Tick

模拟器每 tick 会调用用户脚本中的 `Tick` 函数，参数为 `GameStat` 对象，用户脚本应返回 `MoveAction` 对象。