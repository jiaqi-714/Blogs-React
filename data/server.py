from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)
DATABASE = 'blog.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def close_db_connection(conn):
    conn.close()


@app.route('/blogs', methods=['GET'])
def get_all_blogs():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM blogs')
    blogs = cursor.fetchall()
    close_db_connection(conn)
    return jsonify([dict(blog) for blog in blogs]), 200

@app.route('/blogs', methods=['POST'])
def create_blog():
    data = request.get_json()
    author = data.get('author')
    blog = data.get('blog')
    title = data.get('title')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('INSERT INTO blogs (author, blog, title) VALUES (?, ?, ?)', (author, blog, title))
    conn.commit()
    close_db_connection(conn)
    return jsonify({'message': 'Blog created successfully'}), 201

@app.route('/blogs/<int:id>', methods=['GET'])
def get_blog(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM blogs WHERE id = ?', (id,))
    blog = cursor.fetchone()
    close_db_connection(conn)
    
    if blog is None:
        return jsonify({'message': 'Blog not found'}), 404
    
    return jsonify(dict(blog)), 200

@app.route('/blogs/<int:id>', methods=['PUT'])
def update_blog(id):
    data = request.get_json()
    author = data.get('author')
    blog = data.get('blog')
    title = data.get('title')
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('UPDATE blogs SET author = ?, blog = ?, title = ? WHERE id = ?', (author, blog, title, id))
    conn.commit()
    close_db_connection(conn)
    return jsonify({'message': 'Blog updated successfully'}), 200

@app.route('/blogs/<int:id>', methods=['DELETE'])
def delete_blog(id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM blogs WHERE id = ?', (id,))
    conn.commit()
    close_db_connection(conn)
    return jsonify({'message': 'Blog deleted successfully'}), 200


if __name__ == '__main__':
    app.run(debug=True, port=8000)
