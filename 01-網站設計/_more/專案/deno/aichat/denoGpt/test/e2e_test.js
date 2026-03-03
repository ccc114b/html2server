import { ok } from 'https://deno.land/x/tdd/mod.ts'
import puppeteer from "https://deno.land/x/puppeteer/mod.ts";
var browser, page

const opts = {
    headless: false,
    slowMo: 100,
    timeout: 1000000
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

Deno.test('Puppteer', async function () {
    browser = await puppeteer.launch(opts);
    page = await browser.newPage();

    var html;

    await page.goto('http://127.0.0.1:8002/public/#login', { waitUntil: 'domcontentloaded' })
    await sleep(500);
    html = await page.content()
    // console.log('html=', html)

    // await page.focus('#user')
    // await page.keyboard.type('guest')
    // await page.focus('#')
    // await page.keyboard.type('aaa')
    await page.click('#loginSubmit')
    await sleep(500)

    await page.focus('#question')
    await page.keyboard.type('puppeteer 是甚麼?')
    await page.click('#chatSubmit')
    await sleep(500)
    html = await page.content()
    ok(html.indexOf('puppeteer') >= 0)
    console.log('chat test success!')
    await page.close()
    console.log('page closed')
    await sleep(500)    
    await browser.close()    
    console.log('browser closed')
    await sleep(500)
})
/*
  let idx = html.indexOf('<p>You have <strong>0</strong> posts!</p>')
  console.log('idx=', idx)
  ok(idx >= 0)

  // console.log('test create post...')
  await page.click('#createPost')
  sleep(500);
  html = await page.content()
  ok(html.indexOf('<h1>New Post</h1>') >= 0)

  // console.log('test add post...')
  await page.focus('#title')
  await page.keyboard.type('aaa')
  await page.focus('#body')
  await page.keyboard.type('aaa')
  await page.click('#savePost')

  // console.log('we should have 1 post now...')
  sleep(500);
  html = await page.content()
  ok(html.indexOf('<p>You have <strong>1</strong> posts!</p>') >= 0)

  await page.click('#show0')
  sleep(500);
  html = await page.content()
  ok(html.indexOf('<h1>aaa</h1>') >= 0)
*/
