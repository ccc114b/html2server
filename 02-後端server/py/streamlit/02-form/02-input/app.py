import streamlit as st

# 數字滑桿
number = st.slider("選擇一個數字", 0, 100, 50)
st.write(f"你選擇的數字是：{number}")

# 文本輸入框
name = st.text_input("輸入你的名字：")
if name:
    st.write(f"你好, {name}!")

# 按鈕互動
if st.button("點擊我！"):
    st.write("你按了按鈕！")
