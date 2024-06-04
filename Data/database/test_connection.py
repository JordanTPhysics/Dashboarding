import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

def check_mysql_connection(user, password, host, database):
    try:
        connection = mysql.connector.connect(
            user=user,
            password=password,
            host=host,
            database=database
        )

        if connection.is_connected():
            print("Connection to MySQL database was successful")
        else:
            print("Connection to MySQL database failed")

    except Error as e:
        print(f"Error: {e}")

    finally:
        if connection.is_connected():
            connection.close()
            print("MySQL connection is closed")

if __name__ == '__main__':
    user = os.getenv('MYSQL_USER')
    password = os.getenv('MYSQL_PASSWORD')
    host = os.getenv('MYSQL_HOST')
    database = os.getenv('MYSQL_DATABASE')

    check_mysql_connection(user, password, host, database)
