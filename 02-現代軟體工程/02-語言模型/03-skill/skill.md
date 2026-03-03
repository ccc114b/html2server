# SKILL

* 簡介 -- [Agent Skills到底是什么，一个动画彻底搞懂！](https://www.youtube.com/watch?v=zhlp2y2XAq0)

* [Gemini 對話 -- AI: SKILL.md](https://gemini.google.com/app/a808f53a24428513)


* https://agentskills.io/

* https://github.com/agentskills/agentskills

* https://github.com/anthropics/skills

## ccc: agent skill 是什麼？

「**Agent Skill**」（代理技能）是 2024 年底至 2025 年初 AI 領域的一個重要新概念，最初由 **Anthropic** (Claude 的開發公司) 提出，並迅速被 OpenAI (ChatGPT) 和 Google 等主流廠商採納為開放標準。

簡單來說，如果把 AI 比喻成一個擁有極高智商但剛入職的「社會新鮮人」，那麼 **Agent Skill** 就是那本**「員工手冊」或「專業 SOP」**，教導 AI 具體該如何完成某項特定任務。

---

### 1. 核心定義

**Agent Skill** 是一個包含**指令 (Instructions)、腳本 (Scripts) 與資源 (Resources)** 的標準化資料夾。

* **不僅是提示詞 (Prompt)：** 過去我們透過長長的提示詞教 AI 怎麼做，但 Agent Skill 將這些流程「封裝」起來。
* **漸進式揭露 (Progressive Disclosure)：** AI 不會一次讀完所有說明（這會浪費 Token），而是根據當前任務需求，像翻書一樣只讀取該技能中相關的檔案。

### 2. Agent Skill 包含什麼？

一個典型的 Skill 資料夾通常包含以下內容：

* **SKILL.md**：核心設定檔，告訴 AI 這是什麼技能、什麼時候該用。
* **工作流程 (Workflows)**：詳細的操作步驟（例如：如何進行 Code Review）。
* **自動化腳本**：AI 可以直接執行的程式碼（如 Python 或 Bash），用來處理確定性的任務（例如：壓縮圖片、格式轉換）。
* **參考資源**：API 文件、公司內部的設計規範、模板等。

---

### 3. 為什麼需要 Agent Skill？

在沒有這個概念前，AI 雖然聰明，但常面臨以下問題：

* **記不住細節**：每次開新對話都要重新貼上一大堆規則。
* **不夠專業**：AI 知道怎麼寫程式，但不一定知道「你們公司」特定的部署流程。
* **浪費資源**：把所有規則塞進提示詞會消耗大量 Token，導致反應變慢且變貴。

---

### 4. 實際應用舉例

* **軟體開發**：建立一個「Jira 管理」技能。當你說「幫我開個票」，AI 會自動調用該技能裡的腳本，按照公司格式在 Jira 建立任務，完全不需要你介入。
* **企業行政**：建立一個「差旅報銷」技能。AI 會根據 Skill 裡的政策文件，自動檢查你的收據是否合規，並調用腳本填寫報表。
* **設計流程**：整合 Figma 或 Canva 的技能，讓 AI 依照特定的品牌顏色與字體規範生成初稿。

### 5. 與 MCP (Model Context Protocol) 的區別

這兩個概念常被一起提到，它們的關係如下：

* **MCP (工具)**：像是一條「電纜」，負責讓 AI **連接**到外部資料庫或軟體。
* **Agent Skill (知識)**：像是「說明書」，負責教 AI **如何使用**這些連接到的工具來達成目標。

---

**總結來說**：Agent Skill 讓 AI 從「只會聊天」進化到「擁有專業職能」。它讓開發者或企業可以把珍貴的專業知識模組化，讓 AI 真正成為能獨立作業的「Agent」（代理人）。

您是想了解如何為您的工作流程建立自訂的 Agent Skill，還是對某個特定平台的 Skill 功能感興趣呢？