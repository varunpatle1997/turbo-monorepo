import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { app } from "../app.ts";

Deno.env.set("APP_NAME", "Test App");
Deno.env.set("OWNER_NAME", "Test Owner");

describe("Hono App Endpoints", () => {
  it("GET / should return 'Hello'", async () => {
    const response = await app.fetch(
      new Request("http://localhost/", { method: "GET" }),
    );
    const text = await response.text();

    expect(response.status).toBe(200);
    expect(text).toBe(
      '{"message":"App Name: Test App - Owner Name: Test Owner - Dummy text","chunkedData":[[1,2],[3,4],[5,6],[7,8]]}',
    );
  });

  it("should return validation errors for invalid POST /submit", async () => {
    const invalidData = { name: "JD", email: "invalid-email" };

    const response = await app.fetch(
      new Request("http://localhost/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(invalidData),
      }),
    );

    const json = await response.json();
    expect(response.status).toBe(400);
    expect(json).toHaveProperty("error");
  });
});
