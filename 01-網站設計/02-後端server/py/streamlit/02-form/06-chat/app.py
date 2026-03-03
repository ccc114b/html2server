import streamlit as st

st.title("簡單聊天機器人")

user_input = st.text_input("請輸入您的訊息：")
if user_input:
    response = f"我聽到了：{user_input}！很高興和您聊天 😊"
    st.write(response)
