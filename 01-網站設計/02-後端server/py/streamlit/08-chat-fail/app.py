import streamlit as st
import asyncio
import websockets
import threading

# WebSocket 伺服器地址
WEBSOCKET_URL = "ws://localhost:8000/ws"

# 初始化 st.session_state 的屬性
if "messages" not in st.session_state:
    st.session_state.messages = []  # 用來儲存聊天室訊息
if "websocket_thread" not in st.session_state:
    st.session_state.websocket_thread = None  # 確保只有一個 WebSocket 執行緒

# 用來顯示訊息的區塊
message_box = st.empty()

# 接收 WebSocket 訊息的函數
async def listen_to_server():
    async with websockets.connect(WEBSOCKET_URL) as websocket:
        while True:
            try:
                # 接收新訊息並更新畫面
                new_message = await websocket.recv()
                st.session_state.messages.append(new_message)
                with message_box.container():
                    for msg in st.session_state.messages:
                        st.text(msg)
            except websockets.ConnectionClosed:
                break

# 啟動接收訊息的執行緒
def start_listening():
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(listen_to_server())

# 確保 WebSocket 接收執行緒運行
if st.session_state.websocket_thread is None:
    websocket_thread = threading.Thread(target=start_listening, daemon=True)
    websocket_thread.start()
    st.session_state.websocket_thread = websocket_thread

# 主介面
st.title("多人聊天室")
st.sidebar.title("聊天室功能")

# 使用者名稱與訊息輸入框
user_name = st.sidebar.text_input("輸入暱稱", "匿名")
message = st.sidebar.text_input("輸入訊息")

# 發送訊息按鈕
if st.sidebar.button("發送"):
    async def send_message():
        async with websockets.connect(WEBSOCKET_URL) as websocket:
            await websocket.send(f"{user_name}: {message}")
    asyncio.run(send_message())

# 顯示聊天室內容
with message_box.container():
    for msg in st.session_state.messages:
        st.text(msg)
