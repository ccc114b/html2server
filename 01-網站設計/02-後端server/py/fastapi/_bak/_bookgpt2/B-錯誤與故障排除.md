### 附錄 B：常見錯誤與故障排查

本附錄收錄了開發和部署 FastAPI 應用時可能遇到的常見錯誤，並提供詳細的解決方法和建議，幫助讀者快速定位問題、恢復系統正常運行。

---

#### B.1 啟動問題

1. **錯誤：`ModuleNotFoundError: No module named 'fastapi'`**
   - **原因**：FastAPI 未正確安裝。
   - **解決方法**：
     1. 確認已激活虛擬環境：
        ```bash
        source venv/bin/activate
        ```
     2. 安裝 FastAPI：
        ```bash
        pip install fastapi
        ```

2. **錯誤：`AttributeError: module 'fastapi' has no attribute 'FastAPI'`**
   - **原因**：可能存在與 FastAPI 名稱衝突的模塊（如文件名為 `fastapi.py`）。
   - **解決方法**：
     1. 確保您的代碼文件不命名為 `fastapi.py`。
     2. 清理可能的 `.pyc` 文件：
        ```bash
        find . -name "*.pyc" -delete
        ```

---

#### B.2 路由錯誤

1. **錯誤：`404 Not Found`**
   - **原因**：請求的路徑未定義。
   - **解決方法**：
     1. 確認路由的定義正確。
     2. 確認應用啟動時的根路徑：
        ```python
        @app.get("/example")
        def example():
            return {"message": "success"}
        ```
        測試時訪問 `http://127.0.0.1:8000/example`。

2. **錯誤：`405 Method Not Allowed`**
   - **原因**：請求方法與路由定義的 HTTP 方法不匹配。
   - **解決方法**：
     - 確認您使用的 HTTP 方法正確，例如：
       ```python
       @app.post("/submit")
       def submit(data: dict):
           return {"status": "submitted"}
       ```

---

#### B.3 驗證錯誤

1. **錯誤：`422 Unprocessable Entity`**
   - **原因**：請求體與 Pydantic 模型定義不匹配。
   - **解決方法**：
     1. 檢查 Pydantic 模型是否正確：
        ```python
        from pydantic import BaseModel

        class Item(BaseModel):
            name: str
            price: float
        ```
     2. 確保請求的 JSON 格式與模型對應：
        ```bash
        curl -X POST "http://127.0.0.1:8000/items" -H "Content-Type: application/json" -d '{"name": "book", "price": 12.99}'
        ```

2. **錯誤：`TypeError: Object of type X is not JSON serializable`**
   - **原因**：返回值中包含無法直接序列化為 JSON 的對象（如日期、集合）。
   - **解決方法**：
     1. 使用標準庫 `json` 的擴展支持：
        ```python
        from fastapi.responses import JSONResponse
        from datetime import datetime

        @app.get("/time")
        def get_time():
            return JSONResponse(content={"time": datetime.now().isoformat()})
        ```
     2. 如果使用 Pydantic 模型，則使用其內建支持：
        ```python
        from pydantic import BaseModel
        from datetime import datetime

        class TimeResponse(BaseModel):
            time: datetime

        @app.get("/time", response_model=TimeResponse)
        def get_time():
            return {"time": datetime.now()}
        ```

---

#### B.4 性能與資源問題

1. **錯誤：`RuntimeError: This event loop is already running`**
   - **原因**：使用 `asyncio.run()` 或者重複調用事件循環。
   - **解決方法**：
     - 在協程內部調用時，直接 `await`：
       ```python
       import asyncio

       async def example():
           await asyncio.sleep(1)

       asyncio.run(example())  # 僅在最外層使用
       ```

2. **問題：高併發下性能下降**
   - **原因**：異步代碼執行效率低，或者阻塞操作（如數據庫查詢）。
   - **解決方法**：
     1. 確保所有 IO 操作（如 HTTP 請求、文件讀寫）均為異步：
        ```python
        import aiohttp

        async def fetch(url: str):
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as response:
                    return await response.text()
        ```
     2. 使用適當的數據庫連接池（如 `asyncpg` 或 `SQLAlchemy` 的異步支持）。

---

#### B.5 部署錯誤

1. **錯誤：`ConnectionRefusedError`**
   - **原因**：服務未正常啟動或端口配置錯誤。
   - **解決方法**：
     - 確保啟動 FastAPI 時設置了正確的主機與端口：
       ```bash
       uvicorn app.main:app --host 0.0.0.0 --port 8000
       ```

2. **錯誤：靜態文件無法加載**
   - **原因**：靜態文件目錄未正確設置。
   - **解決方法**：
     1. 在 FastAPI 中正確設置靜態文件路徑：
        ```python
        from fastapi.staticfiles import StaticFiles

        app.mount("/static", StaticFiles(directory="static"), name="static")
        ```

---

#### 小結

本附錄整理了從開發到部署中最常見的錯誤和解決方法，幫助讀者快速排查問題，提高開發效率和應用穩定性。通過結合實踐，能有效地應對大部分問題，確保應用的高效運行。