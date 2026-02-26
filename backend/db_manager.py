import sqlite3
import logging

class DatabaseManager:
    def __init__(self, db_file):
        """
        Initialize the database connection.
        """
        self.connection = sqlite3.connect(db_file)
        self.cursor = self.connection.cursor()

        # Set up logging
        logging.basicConfig(filename='db_manager.log', level=logging.INFO)

    def insert_stock_data(self, stock_name, price, quantity):
        """
        Insert stock data into the database.
        """
        try:
            self.cursor.execute('''INSERT INTO stocks (name, price, quantity) VALUES (?, ?, ?)''', 
                                (stock_name, price, quantity))
            self.connection.commit()
            logging.info(f'Inserted stock data: {stock_name}, {price}, {quantity}')
        except Exception as e:
            logging.error(f'Error inserting stock data: {e}')

    def fetch_stock_data(self):
        """
        Fetch all stock data from the database.
        """
        try:
            self.cursor.execute('''SELECT * FROM stocks''')
            rows = self.cursor.fetchall()
            logging.info('Fetched stock data successfully.')
            return rows
        except Exception as e:
            logging.error(f'Error fetching stock data: {e}')

    def close(self):
        """
        Close the database connection.
        """
        self.connection.close()  
        logging.info('Database connection closed.')
