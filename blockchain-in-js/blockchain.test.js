const { app, blockchain } = require("./blockchain");
const supertest = require("supertest");

describe("Blockchain Tests", () => {

	test("Test getGenesisBlock function", async () => {
		var request = supertest(app);
		const response = await request.get("/blocks");
		expect(response.statusCode).toBe(200);
		expect(response.text).toBe(JSON.stringify(blockchain))
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
