簡單說：

> **`skill.md` 是 OpenCode / Claude Code 這類「AI coding agent」用來定義「AI 具備哪些技能、該怎麼做事」的 *技能說明檔（skills / tools / behavior spec）***。

它**不是程式碼，也不是一般 README**，而是**給 AI 看的行為與能力設定文件**。

下面我用你熟悉的脈絡來精準說明。

---

## 一句話定位

> **`claude.md`：你要 AI「成為誰」**
> **`skill.md`：你允許 AI「會做什麼、怎麼做」**

兩者是**互補而非重複**。

---

## 1️⃣ skill.md 在 AI agent 架構中的角色

在 OpenCode / Claude Code 這類 agent 系統中，AI 通常有三層設定：

```
【人格 / 角色】 → claude.md / system prompt
【能力 / 行為】 → skill.md
【即時任務】   → 使用者當下輸入
```

### `skill.md` 主要描述：

* AI 可以使用哪些「能力」
* 每個能力的使用時機
* 操作規範（安全 / 可預期）

---

## 2️⃣ skill.md 通常寫什麼？

常見內容包括：

### 🔹 可用技能（Skills）

```md
## Available Skills

- ReadFile(path)
- WriteFile(path, content)
- SearchCode(keyword)
- RunCommand(command)
```

### 🔹 每個技能的說明與限制

```md
### WriteFile
Purpose: Write or overwrite a file in the project.
Rules:
- Do not overwrite files unless explicitly requested.
- Show a diff before writing large changes.
```

### 🔹 操作風格

```md
- Prefer small, incremental changes.
- Ask before running destructive commands.
- Never modify generated files.
```

---

## 3️⃣ skill.md 跟 claude.md 的差別（重點）

| 檔案          | 關心的是        | 問題類型            |
| ----------- | ----------- | --------------- |
| `claude.md` | 你是誰？怎麼思考？   | *「你該用什麼態度與風格？」* |
| `skill.md`  | 你能做什麼？怎麼動手？ | *「你可以動哪些東西？」*   |

📌 **claude.md 是人格 / 價值觀**
📌 **skill.md 是操作權限 / 工具手冊**

---

## 4️⃣ 實際範例：一個「研究型專案」的 skill.md

這個範例我特別用「你會用的」風格來寫：

```md
# AI Skills Specification

## General Rules
- Always understand the request before acting.
- Never assume missing information.
- Prefer explanation before execution.

## File Operations
### ReadFile
- Allowed on all source files.
- Use to understand context before modification.

### WriteFile
- Only write files when explicitly asked.
- Prefer creating new files over modifying existing ones.
- Do not change core logic without explanation.

## Code Execution
### RunCommand
- Only run read-only commands (e.g. tests, lint).
- Never run destructive commands (rm, git reset).

## Coding Style
- Favor clarity over cleverness.
- Code must be suitable for teaching and publication.
```

---

## 5️⃣ skill.md 不是「你一定要有」

很多情況：

* ❌ 小型專案：不需要
* ❌ 單純問答：不需要
* ✅ **AI agent 會直接改你專案的檔案**：強烈建議
* ✅ **多人 + AI 協作**：非常有用

📌 它的本質是：

> **把「你平常會跟助教或研究生講的規則」寫成文件給 AI 看**

---

## 6️⃣ 跟你目前在做的事的對應

以你的情境來說：

* dtorch（自己刻 DL engine）
* C4 compiler 書
* Python × 數學教材

👉 我會建議：

* `claude.md`：數學嚴謹、教學導向
* `skill.md`：

  * 不亂跑 code
  * 不重寫核心
  * 不「自作聰明最佳化」

這會**大幅降低 AI 亂改你研究原型的機率**。

---

## 7️⃣ 一句總結

> **`skill.md` 是給 AI agent 的「操作說明書與權限表」，用來規範 AI 能做什麼、不能做什麼、該怎麼動手。**

如果你願意，我可以直接幫你做一套：

* `claude.md`
* `skill.md`
* `opencode.yaml`

**完全為「研究 / 教材 / 編譯器 / 數學建模」客製**。
