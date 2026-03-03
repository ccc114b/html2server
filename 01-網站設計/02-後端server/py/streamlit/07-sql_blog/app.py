# https://chatgpt.com/c/67511b41-f790-8012-b078-29244530b5d9
import streamlit as st
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime

# 設定資料庫
DATABASE_URL = "sqlite:///blog.db"
Base = declarative_base()
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)
session = Session()

# 定義資料表結構
class Article(Base):
    __tablename__ = "articles"
    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)

# 初始化資料庫
def init_db():
    Base.metadata.create_all(engine)

# 新增文章
def add_article(title, content):
    article = Article(title=title, content=content)
    session.add(article)
    session.commit()

# 載入所有文章
def load_articles():
    return session.query(Article).order_by(Article.timestamp.desc()).all()

# 刪除文章
def delete_article(article_id):
    article = session.query(Article).filter(Article.id == article_id).first()
    if article:
        session.delete(article)
        session.commit()

# 主程式
def main():
    st.title("簡易部落格系統（SQLAlchemy 版）")

    # 初始化資料庫
    init_db()

    menu = ["瀏覽文章", "新增文章"]
    choice = st.sidebar.selectbox("選單", menu)

    # 瀏覽文章
    if choice == "瀏覽文章":
        st.subheader("文章清單")
        articles = load_articles()
        if articles:
            for article in articles:
                with st.expander(f"{article.title} - {article.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"):
                    st.write(article.content)
                    if st.button("刪除", key=f"delete_{article.id}"):
                        delete_article(article.id)
                        st.success("文章已刪除！")
                        st.experimental_rerun()  # 重新載入頁面
        else:
            st.write("目前沒有文章，請新增文章！")

    # 新增文章
    elif choice == "新增文章":
        st.subheader("新增文章")
        title = st.text_input("文章標題")
        content = st.text_area("文章內容")
        if st.button("儲存"):
            if title and content:
                add_article(title, content)
                st.success("文章已成功儲存！")
                st.experimental_rerun()  # 重新載入頁面
            else:
                st.error("請填寫完整標題和內容！")

if __name__ == "__main__":
    main()
