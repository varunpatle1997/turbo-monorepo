import { describe, it } from "jsr:@std/testing/bdd";
import { expect } from "jsr:@std/expect";
import { app } from "../app.ts";

Deno.env.set("DENO_APP", "Test App 2");
Deno.env.set("DENO_APP_OWNER", "Test Owner 2");

describe("Hono App Endpoints", () => {
  it("GET / should return correct JSON response", async () => {
    const request = new Request("http://localhost/", { method: "GET" });

    const response = await app.fetch(request);
    const json = await response.json();

    expect(response.status).toBe(200);

    expect(json).toHaveProperty("message");
    expect(json.message).toBe(
      "Deno App: Test App 2 - Deno Owner Name: Test Owner 2 - dummy text 2",
    );
  });
});
