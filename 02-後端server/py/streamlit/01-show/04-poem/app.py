import streamlit as st
import random

st.title("隨機詩句生成器")

lines = st.text_area("輸入詩句（每行一個片段）：", "天上的雲\n地上的花\n風中的夢\n心中的家")
if st.button("生成詩句"):
    fragments = lines.split("\n")
    random.shuffle(fragments)
    poem = "\n".join(fragments)
    st.text_area("隨機詩句如下：", poem, height=200)
