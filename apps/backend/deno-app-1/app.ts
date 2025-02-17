import { Hono } from "hono";
import { cors } from "hono/cors";
import _ from "lodash";
import { userSchema } from "@repo/zod-schemas/index.js";
import { z } from "zod";

const app = new Hono();

app.use("*", cors());

app.get("/", (c) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8];
  const chunkedData = _.chunk(data, 2);
  const APP_NAME = Deno.env.get("APP_NAME") || "Default App";
  const OWNER_NAME = Deno.env.get("OWNER_NAME") || "Default Owner";

  return c.json({
    message: `App Name: ${APP_NAME} - Owner Name: ${OWNER_NAME} - Dummy text`,
    chunkedData,
  });
});

app.post("/submit", async (c) => {
  try {
    const body = await c.req.json();

    userSchema.parse(body);

    return c.json({ message: "Validation successful", data: body });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: error.errors }, 400);
    }

    return c.json({ error: "Internal Server Error" }, 500);
  }
});

export { app };
