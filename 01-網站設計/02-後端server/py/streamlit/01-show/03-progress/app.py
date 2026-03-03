import streamlit as st
import time

st.write("進度條範例")
progress = st.progress(0)
for i in range(101):
    time.sleep(0.05)
    progress.progress(i)

st.write("完成！")
