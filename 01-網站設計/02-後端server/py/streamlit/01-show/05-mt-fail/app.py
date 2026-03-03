from googletrans import Translator
import streamlit as st

st.title("即時語言翻譯")

translator = Translator()
text = st.text_area("輸入要翻譯的文字：", "Hello, world!")
target_lang = st.selectbox("選擇目標語言：", ["zh-tw", "ja", "fr", "es", "de"])
if st.button("翻譯"):
    translation = translator.translate(text, dest=target_lang).text
    st.write("翻譯結果：")
    st.text(translation)
