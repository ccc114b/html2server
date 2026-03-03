const main = document.querySelector('main')

async function chat() {
    let qNode = document.querySelector('#question')
    let responseNode = document.querySelector('#response')
    responseNode.innerText = '詢問 ChatGPT 中，請稍等幾秒鐘 ...'
    let r = await window.fetch(`/chat/${qNode.value}`, {
        method: 'GET',   
        headers: {
            'Content-Type': 'application/json'
        }
      })
    let response = await r.json()
    responseNode.innerText = response.answer
}
