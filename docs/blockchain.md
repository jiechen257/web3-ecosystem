> 实现一个简化版本的区块链

## 功能

- 区块的生成、查询和添加
  - 区块结构体的定义
  - 添加区块的校验
  - 区块链的替换
- 链中矿工的添加和查询
- 交易信息在链中广播

## 实现

核心思想：Block 类实现区块节点的数据结构 + http 服务建立矿工和区块的联系 + websocket 实现事件广播

### 区块结构

```js
// Block 类
class Block {
	constructor(index, previousHash, timestamp, data, hash) {
		this.index = index;
		this.previousHash = previousHash.toString(); // 用以校验区块的合法性
		this.timestamp = timestamp;
		this.data = data;
		this.hash = hash.toString(); // // 用以保留当前区块的唯一标识
	}
}

// 生成下一个区块
var generateNextBlock = (blockData) => {
	var previousBlock = getLatestBlock();
	var nextIndex = previousBlock.index + 1;
	var nextTimestamp = new Date().getTime() / 1000;
	var nextHash = calculateHash(
		nextIndex,
		previousBlock.hash,
		nextTimestamp,
		blockData
	);
	return new Block(
		nextIndex,
		previousBlock.hash,
		nextTimestamp,
		blockData,
		nextHash
	);
};

// 校验区块的合法性
var isValidNewBlock = (newBlock, previousBlock) => {
	if (previousBlock.index + 1 !== newBlock.index) {
		console.log("invalid index");
		return false;
	} else if (previousBlock.hash !== newBlock.previousHash) {
		console.log("invalid previoushash");
		return false;
	} else if (calculateHashForBlock(newBlock) !== newBlock.hash) {
		console.log(
			typeof newBlock.hash + " " + typeof calculateHashForBlock(newBlock)
		);
		console.log(
			"invalid hash: " + calculateHashForBlock(newBlock) + " " + newBlock.hash
		);
		return false;
	}
	return true;
};

```

### http 方法

```js
// 查询所有区块
app.get("/blocks", (req, res) => res.send(JSON.stringify(blockchain)));

// 添加区块
app.post("/mineBlock", (req, res) => {
	var newBlock = generateNextBlock(req.body.data);
	addBlock(newBlock);
	broadcast(responseLatestMsg()); // 事件广播
	console.log("block added: " + JSON.stringify(newBlock));
	res.send();
});

// 查询所有矿工
app.get("/peers", (req, res) => {
	res.send(
		sockets.map((s) => s._socket.remoteAddress + ":" + s._socket.remotePort)
	);
});

// 添加矿工
app.post("/addPeer", (req, res) => {
	connectToPeers([req.body.peer]);
	res.send();
});
```

### websocket 方法

```js
var sockets = [];

// 广播事件
var broadcast = (message) =>
	sockets.forEach((socket) => write(socket, message));
```
