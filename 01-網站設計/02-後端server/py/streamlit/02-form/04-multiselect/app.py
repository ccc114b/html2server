import streamlit as st

options = st.multiselect(
    "選擇喜歡的水果：",
    ["蘋果", "香蕉", "橘子", "葡萄"]
)
st.write("你選擇的水果是：", options)
