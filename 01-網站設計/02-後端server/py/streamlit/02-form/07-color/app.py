import streamlit as st

st.title("動態顏色調整工具")

color = st.color_picker("選擇一個顏色：", "#00f900")
st.write(f"你選擇的顏色是：{color}")

st.markdown(
    f"""
    <div style="width: 100px; height: 100px; background-color: {color};"></div>
    """,
    unsafe_allow_html=True,
)
