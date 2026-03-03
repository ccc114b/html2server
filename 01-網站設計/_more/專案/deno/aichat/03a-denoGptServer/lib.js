let who = "groq"
var chatUrl, model, key
if (who == 'openai') {
    chatUrl = "https://api.openai.com/v1/chat/completions"
    model = "gpt-3.5-turbo"
    key = Deno.env.get('OPENAI_API_KEY')    
} else if (who == 'groq') {
    chatUrl = "https://api.groq.com/openai/v1/chat/completions"
    model = "llama3-8b-8192"
    key = Deno.env.get('GROQ_API_KEY')
} else {
    throw Error(`who=${who} : error!`)
}

export async function chat(question) {
    let r = await fetch(chatUrl, { 
        body: JSON.stringify({
            "model": model,
            "messages": [{"role": "user", "content": question}],
            "temperature": 0.7
        }),
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
        }
    })
    let json = await r.json()
    console.log('json=', json)
    return {answer:json.choices[0].message.content}
}
