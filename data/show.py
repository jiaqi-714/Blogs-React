import sqlite3

def print_all_blogs():
    # Connect to the SQLite database
    conn = sqlite3.connect('blog.db')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Execute a SELECT query to fetch all blogs from the table
    cursor.execute("SELECT * FROM blogs")

    # Fetch all rows returned by the query
    rows = cursor.fetchall()

    # Print the blogs
    for row in rows:
        blog_id, author, blog, title = row
        print(f"Blog ID: {blog_id}")
        print(f"Author: {author}")
        print(f"Title: {title}")
        print(f"Content: {blog}")
        print("-------------------------")

    # Close the connection
    conn.close()

print_all_blogs()