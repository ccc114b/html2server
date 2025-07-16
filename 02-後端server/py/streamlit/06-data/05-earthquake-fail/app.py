import streamlit as st
import requests
import pandas as pd

st.title("即時地震資訊")

# 從 USGS API 獲取地震數據
url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"
response = requests.get(url).json()

# 整理地震數據
earthquakes = [
    {"地點": eq["properties"]["place"], 
     "震級": eq["properties"]["mag"], 
     "緯度": eq["geometry"]["coordinates"][1], 
     "經度": eq["geometry"]["coordinates"][0]}
    for eq in response["features"]
]

df = pd.DataFrame(earthquakes)
st.map(df)

st.write("地震資料表：")
st.dataframe(df)
