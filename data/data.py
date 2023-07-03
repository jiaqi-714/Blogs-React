import sqlite3
from faker import Faker
import random
from datetime import datetime

# Connect to the SQLite database
conn = sqlite3.connect('blog.db')

# Delete all tables we created
tables = list(conn.execute("SELECT name FROM sqlite_master WHERE type is 'table'"))
conn.executescript(';'.join(["DROP TABLE IF EXISTS %s" % i for i in tables]))

# Create a cursor object to execute SQL commands
cursor = conn.cursor()

# Define the CREATE TABLE statement
create_table_query = '''
    CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY,
        author TEXT,
        blog TEXT,
        title TEXT,
        post_date TEXT
    )
'''

# Execute the CREATE TABLE statement
cursor.execute(create_table_query)

# Commit the changes and close the connection
conn.commit()
conn.close()


def random_create():
    fake = Faker()
    # Connect to the SQLite database
    conn = sqlite3.connect('blog.db')

    # Create a cursor object to execute SQL commands
    cursor = conn.cursor()

    # Generate and insert fake data into the blogs table
    for _ in range(2):
        author = fake.name()
        blog = fake.paragraph()
        title = fake.sentence()
        post_date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

        cursor.execute("INSERT INTO blogs (author, blog, title, post_date) VALUES (?, ?, ?, ?)",
                       (author, blog, title, post_date))

    # Commit the changes and close the connection
    conn.commit()
    conn.close()


def delete_random_blog_entry():
    # Connect to the database
    conn = sqlite3.connect('blog.db')
    cursor = conn.cursor()

    # Get the total number of rows in the table
    cursor.execute("SELECT COUNT(*) FROM blogs")
    total_rows = cursor.fetchone()[0]

    # Generate a random row index
    random_row_index = random.randint(0, total_rows)
    random_row_index = random_row_index - 1
    print("------------delete " + str(random_row_index))

    # Execute the DELETE statement for the randomly selected row
    delete_query = '''
        DELETE FROM blogs
        WHERE id = (
            SELECT id FROM blogs
            LIMIT 1 OFFSET ?
        )
    '''
    cursor.execute(delete_query, (random_row_index,))

    # Commit the changes and close the connection
    conn.commit()
    conn.close()



