from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
import data

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

@app.route('/rc', methods=['POST'])
def random_create_blog():
    data.random_create()
    return jsonify({'message': 'Random BLOG created successfully'}), 201

@app.route('/rd', methods=['POST'])
def random_delete_blog():
    data.delete_random_blog_entry()
    return jsonify({'message': 'Random BLOG Deleted successfully'}), 201

@app.route('/page', methods=['GET'])
def get_data():
    page = request.args.get('page', default=1, type=int)
    per_page = request.args.get('perPage', default=10, type=int)

    conn = get_db_connection()
    cursor = conn.cursor()

    # Retrieve the total count of blogs
    cursor.execute("SELECT COUNT(*) FROM blogs")
    total_count = cursor.fetchone()[0]

    # Calculate the total number of pages
    total_pages = (total_count // per_page) + (1 if total_count % per_page > 0 else 0)

    # Calculate the offset for the current page
    offset = (page - 1) * per_page

    # Retrieve the blogs for the current page
    query = f"SELECT * FROM blogs LIMIT {per_page} OFFSET {offset}"
    cursor.execute(query)
    blogs = cursor.fetchall()

    close_db_connection(conn)

    # Create a dictionary containing the blogs and total pages
    response = {
        'blogs': [dict(blog) for blog in blogs],
        'total_pages': total_pages
    }

    return jsonify(response)



# @app.route('/blogs', methods=['GET'])
# def get_all_blogs():
#     conn = get_db_connection()
#     cursor = conn.cursor()
#     cursor.execute('SELECT * FROM blogs')
#     blogs = cursor.fetchall()
#     close_db_connection(conn)
#     return jsonify([dict(blog) for blog in blogs]), 200


if __name__ == '__main__':
    app.run(debug=True)
