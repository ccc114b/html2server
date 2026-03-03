import streamlit as st
import yfinance as yf

st.title("即時股票價格查詢")

ticker = st.text_input("輸入股票代碼（例如 AAPL, TSLA）：", "AAPL")
if ticker:
    stock = yf.Ticker(ticker)
    data = stock.history(period="1d")
    if not data.empty:
        price = data["Close"].iloc[0]
        st.write(f"{ticker} 的即時收盤價為：${price:.2f}")
    else:
        st.write("無法取得資料，請確認股票代碼是否正確。")
