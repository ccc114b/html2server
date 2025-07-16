import streamlit as st
import pandas as pd

data = {
    "城市": ["台北", "台中", "高雄"],
    "人口": [2700000, 2800000, 1500000]
}
df = pd.DataFrame(data)

# 動態篩選
city = st.selectbox("選擇一個城市", df["城市"])
population = df[df["城市"] == city]["人口"].iloc[0]
st.write(f"{city} 的人口是：{population}")
