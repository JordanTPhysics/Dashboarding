import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv
import logging

logging.basicConfig(level=logging.DEBUG)
load_dotenv('C:\Users\Thijssenj\Documents\Wichtige\Personal\Dashboarding\.env')

def check_mysql_connection(user, password, host, database):
    try:
        connection = mysql.connector.connect(
            user=user,
            password=password,
            host=host,
            database=database
        )

        if connection.is_connected():
            logging.debug("Connection to MySQL database was successful")
        else:
            logging.debug("Connection to MySQL database failed")

    except Error as e:
        logging.debug(f"Error: {e}")

    finally:
        if connection.is_connected():
            connection.close()
            logging.debug("MySQL connection is closed")

if __name__ == '__main__':
    db_config = {
        'host': os.getenv('MYSQL_HOST'),
        'user': os.getenv('MYSQL_USER'),
        'password': os.getenv('MYSQL_PASSWORD'),
        'database': os.getenv('MYSQL_DATABASE')
    }
    logging.debug(f"DB config: {db_config}")

    check_mysql_connection(**db_config)
