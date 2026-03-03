import requests
import sys

def ask_ollama(prompt, model='llama3.2:3b'):
    url = 'http://localhost:11434/api/generate'
    headers = {'Content-Type': 'application/json'}
    data = {
        'model': model,
        'prompt': prompt,
        'stream': False  # 設為 True 會逐步回應（類似聊天串流）
    }

    response = requests.post(url, headers=headers, json=data)
    if response.status_code == 200:
        result = response.json()
        return result['response']
    else:
        print("Error:", response.status_code, response.text)
        return None

# 範例使用
if __name__ == '__main__':
    reply = ask_ollama(sys.argv[1])
    print("Ollama 回應：\n", reply)
