import streamlit as st

st.title("即時 Markdown 編輯器")
markdown_text = st.text_area("輸入 Markdown 內容：", "## 標題\n這是段落文字。\n- 項目 1\n- 項目 2")
st.markdown(markdown_text)
