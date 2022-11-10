# 协议

用于与数据中心交换信息。

## 连接

模拟器与服务器建立 WebSocket 连接。

## 消息

### 消息基本格式

```ts
interface Message<T> {
  event: string;
  data: T;
}
```

### 认证消息(S2D)

```ts
interface AuthData {
  slots: number;
  token: string;
}

interface AuthMessage {
  event: "auth";
  data: AuthData;
}
```

### 游戏开始(D2S)

```ts
interface GameStartData {
  id: string;
  setting: GameSetting;
}

interface GameStartMessage {
  event: "gameStart";
  data: GameStartData;
}
```

### 游戏更新(S2D)

```ts
interface GameUpdateData {
  id: string;
  tick: GameTick;
}

interface GameUpdateMessage {
  event: "gameUpdate";
  data: GameUpdateData;
}
```

### 游戏结束(S2D)

```ts
interface GameEndData {
  id: string;
  result: GameResult;
}

interface GameEndMessage {
  event: "gameEnd";
  data: GameEndData;
```
