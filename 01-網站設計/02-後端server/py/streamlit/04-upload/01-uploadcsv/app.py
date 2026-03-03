import streamlit as st
import pandas as pd

uploaded_file = st.file_uploader("上傳一個 CSV 檔案", type=["csv"])
if uploaded_file is not None:
    df = pd.read_csv(uploaded_file)
    st.write("檔案內容如下：")
    st.dataframe(df)
