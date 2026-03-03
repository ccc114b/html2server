
async function chatGroq(question) {
  let r = await fetch("https://api.groq.com/openai/v1/chat/completions", { 
      body: JSON.stringify({
          "model": "llama3-8b-8192",
          "messages": [{"role": "user", "content": question}],
          "temperature": 0.7
      }),
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('GROQ_API_KEY')}`,
      }
  })
  let json = await r.json()
  console.log('json=', json)
  return {answer:json.choices[0].message.content}
}

async function chatGpt(question) {
  let r = await fetch("https://api.openai.com/v1/chat/completions", { 
      body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": question}],
          "temperature": 0.7
      }),
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      }
  })
  let json = await r.json()
  console.log('json=', json)
  return {answer:json.choices[0].message.content}
}

let talkto  = 'groq'
export async function chat(question) {
  let r = null
  if (talkto == 'fake') {
    await sleep(3000)
    r = { answer: `
# 問題：${question}

## ChatGPT 回答

GPT是Generative Pre-trained Transformer的縮寫，是一種基於Transformer架構的自然語言生成模型。GPT系列模型由OpenAI研發，以大規模無監督學習的方式預先訓練，然後可以用於許多自然語言處理任務，例如語言生成、語言理解、文本分類、機器翻譯等。

GPT-3是目前最大型的GPT模型，使用了1750億個參數，可以生成非常自然流暢的語言，甚至可以進行翻譯、文章寫作、對話生成等多種任務。GPT模型的強大之處在於其能夠自動提取大量的文本資訊，從而能夠生成具有高度相關性和語法正確的語言，並在許多自然語言處理任務上取得非常出色的表現。
    `}
  } else if (talkto == 'chatgpt') {
    r = await chatGpt(question)
  } else if (talkto == 'groq') {
    r = await chatGroq(question)
  }
  return r
}

export function sleep(ms) {
    return new Promise(function(resolve) { 
      setTimeout(resolve, ms)
    });
}
