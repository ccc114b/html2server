### 附錄 A：FastAPI 配置文件與環境設置

本附錄提供了在開發和部署 FastAPI 應用時的常見配置文件範例與環境設置指南，幫助讀者快速上手，並構建穩定、高效的應用程序。

---

#### A.1 配置文件設計原則

1. **分離配置與代碼**：
   - 將敏感信息（如 API 密鑰、數據庫憑據）與代碼分離。
   - 使用環境變數或配置文件來管理配置。

2. **環境區分**：
   - 為開發、測試、和生產環境設置不同的配置文件。

3. **工具支持**：
   - 使用 Python 的 `pydantic` 模型進行配置驗證。
   - 利用 `python-dotenv` 加載 `.env` 文件中的環境變數。

---

#### A.2 環境變數與 `.env` 文件範例

**.env 文件範例**：
```env
# 資料庫配置
DATABASE_URL=postgresql://user:password@localhost/db_name

# FastAPI 應用配置
APP_ENV=development
DEBUG=True
SECRET_KEY=your_secret_key
ALLOWED_HOSTS=127.0.0.1,localhost
```

**讀取環境變數的配置代碼**：
```python
import os
from pydantic import BaseSettings

class AppConfig(BaseSettings):
    database_url: str
    app_env: str = "development"
    debug: bool = True
    secret_key: str
    allowed_hosts: list[str] = ["127.0.0.1"]

    class Config:
        env_file = ".env"

config = AppConfig()
print(config.database_url)
```

---

#### A.3 FastAPI 應用的分層結構

1. **推薦目錄結構**：
```
my_fastapi_project/
├── app/
│   ├── main.py           # FastAPI 應用入口
│   ├── routers/          # 路由模塊
│   │   ├── users.py
│   │   └── items.py
│   ├── models/           # 數據庫模型
│   │   └── user.py
│   ├── schemas/          # Pydantic 模型
│   │   └── user.py
│   ├── services/         # 業務邏輯
│   │   └── user_service.py
│   ├── core/             # 核心配置和工具
│   │   ├── config.py
│   │   └── security.py
│   ├── tests/            # 測試代碼
│   └── __init__.py
├── .env                  # 環境變數文件
├── requirements.txt      # 依賴文件
└── README.md             # 項目說明
```

2. **優勢**：
   - 模塊化設計，便於維護與擴展。
   - 不同功能區分明確，支持團隊合作。

---

#### A.4 Docker 化與容器配置

1. **Dockerfile 範例**：
```dockerfile
# 使用輕量級 Python 基礎映像
FROM python:3.10-slim

# 設置工作目錄
WORKDIR /app

# 安裝依賴
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 複製代碼
COPY . .

# 啟動應用
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

2. **docker-compose.yml 範例**：
```yaml
version: "3.9"
services:
  web:
    build: .
    ports:
      - "8000:8000"
    volumes:
      - .:/app
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - APP_ENV=production
      - SECRET_KEY=${SECRET_KEY}
```

3. **啟動容器**：
   ```bash
   docker-compose up --build
   ```

---

#### A.5 配置環境虛擬化與依賴管理

1. **使用虛擬環境**：
   ```bash
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. **依賴管理工具**：
   - 使用 `pip-tools` 或 `poetry` 管理依賴，確保環境一致性。
   - 例：
     ```bash
     pip install pip-tools
     pip-compile
     pip-sync
     ```

---

#### 小結

本附錄介紹了 FastAPI 應用中環境變數、配置文件、項目結構、容器化設置等關鍵內容，為應用的高效開發與部署提供了全面的基礎指導。通過合理的配置與環境管理，能有效提升項目可維護性和穩定性。