import sqlite3

def create_table():
    conn = sqlite3.connect('messages.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            message TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

def insert_messages():
    conn = sqlite3.connect('messages.db')
    cursor = conn.cursor()

    # 插入测试留言
    messages_to_insert = [
        ('User1', '这是第一条留言。'),
        ('User2', '这是第二条留言。'),
        ('User3', '这是第三条留言。'),
    ]

    cursor.executemany('INSERT INTO messages (username, message) VALUES (?, ?)', messages_to_insert)

    conn.commit()
    conn.close()

if __name__ == '__main__':
    create_table()
    insert_messages()
    print("Database and table created successfully.")
