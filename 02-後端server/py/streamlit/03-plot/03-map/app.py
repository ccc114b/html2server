import streamlit as st
import pandas as pd

data = pd.DataFrame({
    "lat": [25.033, 24.150, 22.627],
    "lon": [121.565, 120.673, 120.301]
})
st.map(data)
