

```
root@localhost:~/html2denojs/專案/chatgpt/02-fetchGpt# deno run -A fetchGpt.js
A new release of Deno is available: 1.28.1 → 1.33.1 Run `deno upgrade` to install it.
{
  "id": "chatcmpl-7CQXcPG9j8GahuHhb8dHuMEv2Bwur",
  "object": "chat.completion",
  "created": 1683196316,
  "model": "gpt-3.5-turbo-0301",
  "usage": {
    "prompt_tokens": 17,
    "completion_tokens": 161,
    "total_tokens": 178
  },
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "GPT（Generative Pre-trained Transformer）是一種自然語言處理技術，是由OpenAI開發的
一種基於Transformer架構的神經網絡模型。它能夠通過大量的文本訓練，學習自然語言的語法、語義和上下文，並
能夠生成高質量的自然語言文本。GPT已經被廣泛應用於文本生成、語言理解、對話系統等領域。"
      },
      "finish_reason": "stop",
      "index": 0
    }
  ]
}
```