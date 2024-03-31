const app = require("./supertest-demo");
const supertest = require("supertest");
const request = supertest(app);

describe("Supertest Usage Demo", () => {
	test("gets the user", async () => {
		const response = await request.get("/user");
		expect(response.status).toBe(200);
		expect(response.body.name).toBe("Joey");
	});
});
