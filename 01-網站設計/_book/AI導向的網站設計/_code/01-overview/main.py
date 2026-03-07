from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse, FileResponse

app = FastAPI()

# 定義資料結構：標題與內容
class Post(BaseModel):
    title: str
    content: str

# 模擬資料庫
db_posts = []

# API 1: 取得所有文章
@app.get("/api/posts")
def get_posts():
    return db_posts

# API 2: 新增一篇文章
@app.post("/api/posts")
def create_post(post: Post):
    db_posts.append(post)
    return {"status": "發布成功！"}

@app.get("/", response_class=HTMLResponse)
def read_index():
    return FileResponse("index.html")