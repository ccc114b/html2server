from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)

# 配置数据库
DATABASE = 'messages.db'

# 创建表格
def create_table():
    conn = sqlite3.connect(DATABASE)
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

# 插入一条留言
def insert_message(username, message):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO messages (username, message) VALUES (?, ?)', (username, message))
    conn.commit()
    conn.close()

# 获取所有留言
def get_messages():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM messages ORDER BY id DESC')
    messages = cursor.fetchall()
    conn.close()
    return messages

# 删除留言
def delete_message(message_id):
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('DELETE FROM messages WHERE id = ?', (message_id,))
    conn.commit()
    conn.close()

# 主页路由
@app.route('/')
def index():
    messages = get_messages()
    return render_template('index.html', messages=messages)

# 添加留言路由
@app.route('/add_message', methods=['POST'])
def add_message():
    username = request.form['username']
    message = request.form['message']
    
    insert_message(username, message)
    return redirect(url_for('index'))

# 删除留言路由
@app.route('/delete_message/<int:message_id>')
def delete_message_route(message_id):
    delete_message(message_id)
    return redirect(url_for('index'))

if __name__ == '__main__':
    create_table()
    app.run(debug=True)
