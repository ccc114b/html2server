import streamlit as st
import qrcode
from PIL import Image

st.title("QR Code 生成器")

text = st.text_input("輸入要生成 QR Code 的文字：", "https://www.streamlit.io")
if st.button("生成 QR Code"):
    qr = qrcode.make(text)
    st.image(qr)
