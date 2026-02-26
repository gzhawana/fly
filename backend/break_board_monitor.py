class BreakBoardMonitor:
    def __init__(self):
        self.previous_limit_up = []
        self.current_limit_up = []

    def update_current_limit_up(self, current_list):
        self.previous_limit_up = self.current_limit_up.copy()
        self.current_limit_up = current_list

    def detect_breakers(self):
        detected_breakers = []
        for stock in self.current_limit_up:
            if stock not in self.previous_limit_up:
                detected_breakers.append(stock)
        return detected_breakers

# Example usage
if __name__ == '__main__':
    monitor = BreakBoardMonitor()
    monitor.update_current_limit_up(['AAPL', 'GOOGL', 'AMZN'])
    monitor.update_current_limit_up(['AAPL', 'MSFT'])  # New update
    print(monitor.detect_breakers())  # Should print ['MSFT']