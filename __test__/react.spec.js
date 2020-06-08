const supertest = require("supertest");
const app = require(process.cwd() + "/server");

describe("Testing the Fetch All customer API", () => {
  it("Testing the Fetch All Customer APi", async () => {
    const response = await supertest(app).get("/api/getdata");
    expect(response.status).toBe(200);
  });
});

describe("Testing the DELETE customer API", () => {
  it("Testing DELETE customer API with invalid customerid", async () => {
    const response = await supertest(app).delete("/api/Removedata/123");
    expect(response.text).toBe('{Error: "Invalid customer id passed"}');
    expect(response.status).toBe(404);
  });
});

describe("Testing the create customer API", () => {
  it("Testing the create customer API without customer id in the body", async () => {
    const response = await supertest(app).post("/api/savedata").send({
      customerid: "",
      name: "Roshan",
      age: 24,
      sex: "Male",
      address: "Dombivli(west),Thane 421202",
    });
    expect(response.status).toBe(200);
  });
});

describe("Testing the update customer API", () => {
  it("Testing the update customer API without customer id ", async () => {
    const response = await supertest(app).post("/api/Updatedata/1").send({
      customerid: "",
      name: "Roshan",
      age: 24,
      sex: "Male",
      address: "Dombivli(west),Thane 421202",
    });
    expect(response.status).toBe(404);
  });
});
