import streamlit as st

age = st.slider("選擇你的年齡", 0, 100, 25)
st.write(f"你的年齡是: {age}")
