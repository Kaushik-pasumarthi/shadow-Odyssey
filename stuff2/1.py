from flask import Flask, jsonify

app = Flask(__name__)

# Sample crime data
crime_data = [
    {"id": 1, "type": "Assault", "location": {"lat": 51.5, "lng": -0.09}, "severity": 3},
    {"id": 2, "type": "Robbery", "location": {"lat": 51.49, "lng": -0.1}, "severity": 5},
]

@app.route('/api/crime_data', methods=['GET'])
def get_crime_data():
    return jsonify(crime_data)

if __name__ == '__main__':
    app.run(debug=True)



import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier

# Load your dataset
data = pd.read_csv('crime_data.csv')

# Features and target
X = data[['date', 'time', 'location', 'economic_condition']]
y = data['crime_type']

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3)

# Train the model
model = RandomForestClassifier()
model.fit(X_train, y_train)

# Predict and evaluate
predictions = model.predict(X_test)
accuracy = model.score(X_test, y_test)
print(f"Model Accuracy: {accuracy}")

# Example prediction
new_data = pd.DataFrame([{'date': '2024-08-26', 'time': '22:00', 'location': 'Downtown', 'economic_condition': 'low'}])
predicted_crime = model.predict(new_data)
print(f"Predicted Crime Type: {predicted_crime}")
