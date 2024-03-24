const { initHttpServer, initP2PServer } = require("./blockchain");
const request = require("supertest");
const app = require("./blockchain");

describe("Blockchain Tests", () => {
	beforeEach(() => {
		// initHttpServer();
		// initP2PServer();
	});

	test("Test getGenesisBlock function", async () => {
		const response = await request(app).get("/blocks");
        const body = JSON.parse(response.body);
		expect(response.statusCode).toBe(200);
	});

	// test("Test generateNextBlock function", () => {
	// 	const previousBlock = getGenesisBlock();
	// 	const newBlock = generateNextBlock("test data");
	// 	expect(newBlock.index).toBe(previousBlock.index + 1);
	// 	expect(newBlock.data).toBe("test data");
	// });

	// test("Test isValidNewBlock function", () => {
	// 	const previousBlock = getGenesisBlock();
	// 	const newBlock = generateNextBlock("test data");
	// 	expect(isValidNewBlock(newBlock, previousBlock)).toBe(true);
	// });

	// test("Test isValidChain function with valid chain", () => {
	// 	const newBlock = generateNextBlock("test data");
	// 	blockchain.push(newBlock);
	// 	expect(isValidChain(blockchain)).toBe(true);
	// });

	// test("Test isValidChain function with invalid chain", () => {
	// 	const newBlock = generateNextBlock("test data");
	// 	blockchain.push(newBlock);
	// 	// Modify a block to make the chain invalid
	// 	blockchain[1].data = "modified data";
	// 	expect(isValidChain(blockchain)).toBe(false);
	// });

	// test("Test isValidChain function with empty chain", () => {
	// 	expect(isValidChain([])).toBe(false);
	// });

	// test("Test generateNextBlock function with empty data", () => {
	// 	const previousBlock = getGenesisBlock();
	// 	const newBlock = generateNextBlock("");
	// 	expect(newBlock.index).toBe(previousBlock.index + 1);
	// 	expect(newBlock.data).toBe("");
	// });
});
