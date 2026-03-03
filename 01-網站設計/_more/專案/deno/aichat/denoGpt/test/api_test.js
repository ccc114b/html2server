import { server } from '../appServer.js'
import { superoak } from "https://deno.land/x/superoak@4.7.0/mod.ts"

const app = server.app
const argJson = ["Content-Type", "application/json"]
const OK = 200
const Fail = 400

async function post(path) {
  const request = await superoak(app)
  return request.post(path).set("Content-Type", "application/json")
}

Deno.test("not login : should fail", async () => {
  const request = await superoak(app)
  await request.get("/chatList").expect(404)
})

Deno.test("login", async () => {
  let request = await superoak(app)
  await request.post("/login")
  .set(...argJson)
  .send('{"user":"guest", "password":"xxx"}')
  .expect(Fail)

  request = await superoak(app)
  await request.post("/login")
  .set(...argJson)
  .send('{"user":"guest", "password":"denogpt123"}')
  .expect(OK)
})


Deno.test("signup", async () => {
  let request = await superoak(app)
  await request.post("/signup")
  .set(...argJson)
  .send('{"user":"guest", "password":"xxx", "email":""}')
  .expect(Fail)

  request = await superoak(app)
  await request.post("/signup")
  .set(...argJson)
  .send('{"user":"guest2", "password":"denogpt123", "email":""}')
  .expect(OK)
})

// superoak / superdeno 似乎只適合測試沒有 session 機制的作法。
// 有 session 的改用 puppeteer 去測試感覺比較適合。
