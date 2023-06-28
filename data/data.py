import sqlite3
from faker import Faker
# Connect to the SQLite database
conn = sqlite3.connect('blog.db')

# delete all table we created
tables = list(conn.execute("select name from sqlite_master where type is 'table'"))
conn.executescript(';'.join(["drop table if exists %s" %i for i in tables]))
# Create a cursor object to execute SQL commands
cursor = conn.cursor()

# Define the CREATE TABLE statement
create_table_query = '''
    CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY,
        author TEXT,
        blog TEXT,
        title TEXT
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
        
        cursor.execute("INSERT INTO blogs (author, blog, title) VALUES (?, ?, ?)", (author, blog, title))

    # Commit the changes and close the connection
    conn.commit()
    conn.close()

random_create()