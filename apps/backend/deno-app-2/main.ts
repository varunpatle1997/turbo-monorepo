import { app } from "./app.ts";

const port = Number(Deno.env.get("PORT")) || 8080;

Deno.serve({ port }, app.fetch);
console.log(`Server running on port ${port}`);
