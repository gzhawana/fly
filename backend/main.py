from flask import Flask, jsonify, request
import time   
import threading

app = Flask(__name__)

# Example database operation
mock_db = []

@app.route('/data', methods=['GET'])
def fetch_data():
    # Simulate fetching data from a database
    return jsonify(mock_db), 200

@app.route('/alert', methods=['POST'])
def send_alert():
    alert_data = request.json
    # Handle alert data (e.g., store in database, trigger notifications)
    mock_db.append(alert_data)
    return jsonify({'status': 'success', 'alert': alert_data}), 201

# Background thread to simulate real-time data fetching
def fetch_real_time_data():
    while True:
        # Simulate data fetching
        time.sleep(5)  # Simulate delay
        mock_db.append({'timestamp': time.time(), 'data': 'Real-time data'})

# Start background thread
threading.Thread(target=fetch_real_time_data, daemon=True).start()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)