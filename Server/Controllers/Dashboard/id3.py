# backend/app.py
from flask import Flask, jsonify

app = Flask(__name__)

# Sample employee data (replace with your actual data retrieval mechanism)
employees_data = [
    {"firstName": "Alice", "level": ["M.S"], "majors": ["Data Science"], "duration": [400], "companyName": ["XYZ"]},
    {"firstName": "Bob", "level": ["B.S"], "majors": ["Computer Science"], "duration": [300], "companyName": ["ABC"]},
    # Add more employee data
]

@app.route('/get_sorted_employees', methods=['GET'])
def get_sorted_employees():
    weights = {
        "education": 0.4,
        "skills": 0.3,
        "experiences": 0.3,
    }

    sorted_employees = []

    for employee in employees_data:
        # Calculate scores for each employee (modify based on your actual data)
        education_score = 100 if "B.S" in employee["level"] and "Computer Science" in employee["majors"] else 0
        skills_score = 80  # Adjust based on actual skills assessment
        experiences_score = 90 if "ABC" in employee["companyName"] and employee["duration"][0] > 300 else 0

        # Calculate composite score
        composite_score = (
            weights["education"] * education_score +
            weights["skills"] * skills_score +
            weights["experiences"] * experiences_score
        )

        # Assign the composite score to the employee
        employee["compositeScore"] = composite_score

        sorted_employees.append(employee)

    # Sort employees based on composite score in descending order
    sorted_employees = sorted(sorted_employees, key=lambda x: x["compositeScore"], reverse=True)

    return jsonify(sorted_employees)

if __name__ == '__main__':
    app.run(debug=True)
