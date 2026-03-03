import streamlit as st
import time
import numpy as np

st.title("動態數據展示：跑步模擬")

progress = st.empty()
chart = st.line_chart(np.random.randn(10))

for i in range(50):
    data = np.random.randn(10)
    chart.add_rows(data)
    progress.text(f"第 {i + 1} 步")
    time.sleep(0.1)
