import streamlit as st
import pandas as pd

data = pd.DataFrame({"A": [1, 2, 3], "B": [4, 5, 6]})
edited_data = st.data_editor(data)
st.write("你編輯後的數據：")
st.write(edited_data)
