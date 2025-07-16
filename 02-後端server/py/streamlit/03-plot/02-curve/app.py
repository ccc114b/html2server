import streamlit as st
import matplotlib.pyplot as plt
import numpy as np

# 使用 Matplotlib 繪製折線圖
x = np.linspace(0, 10, 100)
y = np.sin(x)

fig, ax = plt.subplots()
ax.plot(x, y, label="sin(x)")
ax.legend()
st.pyplot(fig)
