from fastapi import FastAPI, HTTPException, Path, Query, Body, status
from pydantic import BaseModel, Field
from typing import List, Optional
import uvicorn
from datetime import date

app = FastAPI(
    title="書籍管理 API",
    description="一個簡單的書籍管理 REST API",
    version="1.0.0"
)

# 書籍模型
class BookBase(BaseModel):
    title: str = Field(..., description="書籍標題", example="Python 程式設計")
    author: str = Field(..., description="作者姓名", example="張小明")
    description: Optional[str] = Field(None, description="書籍簡介", example="這是一本關於 Python 的入門書籍")
    price: float = Field(..., description="價格", gt=0, example=350.0)
    publish_date: date = Field(..., description="出版日期", example="2023-01-15")
    category: str = Field(..., description="類別", example="程式設計")

class BookCreate(BookBase):
    pass

class Book(BookBase):
    id: int = Field(..., description="書籍 ID")

    class Config:
        schema_extra = {
            "example": {
                "id": 1,
                "title": "Python 程式設計",
                "author": "張小明",
                "description": "這是一本關於 Python 的入門書籍",
                "price": 350.0,
                "publish_date": "2023-01-15",
                "category": "程式設計"
            }
        }

# 模擬資料庫
books_db = [
    {
        "id": 1,
        "title": "Python 程式設計",
        "author": "張小明",
        "description": "這是一本關於 Python 的入門書籍",
        "price": 350.0,
        "publish_date": date(2023, 1, 15),
        "category": "程式設計"
    },
    {
        "id": 2,
        "title": "FastAPI 實戰",
        "author": "李大華",
        "description": "學習如何使用 FastAPI 建立高效能 API",
        "price": 420.0,
        "publish_date": date(2023, 3, 20),
        "category": "程式設計"
    },
    {
        "id": 3,
        "title": "資料科學入門",
        "author": "王美玲",
        "description": "資料分析與機器學習基礎",
        "price": 480.0,
        "publish_date": date(2022, 11, 5),
        "category": "資料科學"
    }
]

# 路由

@app.get("/", tags=["根路徑"])
async def root():
    """API 根路徑的歡迎訊息"""
    return {"message": "歡迎使用書籍管理 API"}

@app.get("/books", response_model=List[Book], tags=["書籍"])
async def get_books(
    skip: int = Query(0, description="跳過的記錄數", ge=0),
    limit: int = Query(10, description="返回的最大記錄數", ge=1, le=100),
    category: Optional[str] = Query(None, description="依類別過濾")
):
    """
    獲取書籍列表，可選擇按類別過濾
    """
    if category:
        filtered_books = [book for book in books_db if book["category"].lower() == category.lower()]
    else:
        filtered_books = books_db
    
    return filtered_books[skip: skip + limit]

@app.get("/books/{book_id}", response_model=Book, tags=["書籍"])
async def get_book(
    book_id: int = Path(..., description="要獲取的書籍 ID", ge=1)
):
    """
    通過 ID 獲取特定書籍
    """
    for book in books_db:
        if book["id"] == book_id:
            return book
    raise HTTPException(status_code=404, detail=f"找不到 ID 為 {book_id} 的書籍")

@app.post("/books", response_model=Book, status_code=status.HTTP_201_CREATED, tags=["書籍"])
async def create_book(
    book: BookCreate = Body(..., description="要創建的書籍資料")
):
    """
    創建新書籍
    """
    # 在實際應用中，應該檢查書籍是否已存在
    
    new_id = max(book["id"] for book in books_db) + 1
    new_book = book.dict()
    new_book["id"] = new_id
    books_db.append(new_book)
    return new_book

@app.put("/books/{book_id}", response_model=Book, tags=["書籍"])
async def update_book(
    book_id: int = Path(..., description="要更新的書籍 ID", ge=1),
    book: BookCreate = Body(..., description="更新的書籍資料")
):
    """
    更新現有書籍
    """
    for i, stored_book in enumerate(books_db):
        if stored_book["id"] == book_id:
            updated_book = book.dict()
            updated_book["id"] = book_id
            books_db[i] = updated_book
            return updated_book
    raise HTTPException(status_code=404, detail=f"找不到 ID 為 {book_id} 的書籍")

@app.delete("/books/{book_id}", status_code=status.HTTP_204_NO_CONTENT, tags=["書籍"])
async def delete_book(
    book_id: int = Path(..., description="要刪除的書籍 ID", ge=1)
):
    """
    刪除書籍
    """
    for i, book in enumerate(books_db):
        if book["id"] == book_id:
            del books_db[i]
            return
    raise HTTPException(status_code=404, detail=f"找不到 ID 為 {book_id} 的書籍")

@app.get("/books/search", response_model=List[Book], tags=["搜尋"])
async def search_books(
    keyword: str = Query(..., description="搜尋關鍵字", min_length=1),
    search_title: bool = Query(True, description="是否搜尋標題"),
    search_author: bool = Query(True, description="是否搜尋作者"),
    search_description: bool = Query(False, description="是否搜尋描述")
):
    """
    搜尋書籍
    """
    keyword = keyword.lower()
    results = []
    
    for book in books_db:
        if (search_title and keyword in book["title"].lower()) or \
           (search_author and keyword in book["author"].lower()) or \
           (search_description and book["description"] and keyword in book["description"].lower()):
            results.append(book)
    
    return results

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)