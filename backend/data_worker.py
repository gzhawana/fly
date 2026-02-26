import akshare as ak
import pandas as pd

class StockDataWorker:
    def __init__(self, stock_symbol):
        self.stock_symbol = stock_symbol
        self.data = None

    def fetch_data(self):
        """Fetch real-time stock data from Akshare API."""
        self.data = ak.stock_zh_a_daily(symbol=self.stock_symbol)
        return self.data

    def process_data(self):
        """Process the fetched data for database storage."""
        if self.data is not None:
            # Example processing: convert to DataFrame and handle NaNs since Akshare returns raw data.
            df = pd.DataFrame(self.data)
            df.dropna(inplace=True)
            return df
        else:
            raise ValueError("No data fetched. Please call fetch_data() first.")