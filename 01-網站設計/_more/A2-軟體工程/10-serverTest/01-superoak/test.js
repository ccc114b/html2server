import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts";
import { app } from './app.js'

// Send simple GET request
Deno.test("it should support the Oak framework", async () => {
  const request = await superoak(app);
  await request.get("/").expect("Hello Deno!");
});

// Custom requests can be built with the superagent API
// https://visionmedia.github.io/superagent/#post--put-requests.
Deno.test("it should allow post requests", async () => {
  const request = await superoak(app);
  await request.post("/user")
    .set("Content-Type", "application/json")
    .send('{"name":"superoak"}')
    .expect(200)
    .expect("Post!")
});