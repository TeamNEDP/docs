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
interface GameStartMessage {
	event: "gameStart";
	data: GameSetting;
}
```

### 游戏更新(S2D)

```ts
interface GameUpdateMessage {
	event: "gameUpdate";
	data: GameTick;
}
```

### 游戏结束(S2D)

```ts
interface GameEndMessage {
	event: "gameEnd";
	data: GameResult;
}
```
