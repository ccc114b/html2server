import { superoak } from "https://deno.land/x/superoak/mod.ts"

// Send simple GET request
Deno.test("it should support the Oak framework", async () => {
    const request = await superoak(app);
    await request.get("/").expect("Hello World!");
  });
  
  // Custom requests can be built with the superagent API
  // https://visionmedia.github.io/superagent/#post--put-requests.
  Deno.test("it should allow post requests", async () => {
    const request = await superoak(app);
    await request.post("/user")
      .set("Content-Type", "application/json")
      .send('{"name":"superoak"}')
      .expect(200);
});