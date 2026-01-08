from flask import Flask, jsonify
from flask_cors import CORS
from factories_data import factories
from emissions_logic import calculate_allowed_limit
from auth_routes import auth
import random

app = Flask(__name__)
CORS(app)  # FIX: allow frontend (React) to access backend
app.register_blueprint(auth)

@app.route("/")
def home():
    return jsonify({"status": "backend running"})

@app.route("/monthly-report", methods=["GET"])
def monthly_report():
    aqi = random.randint(50, 150)  # mock AQI for now

    report = {}
    for fid, data in factories.items():
        allowed = calculate_allowed_limit(
            data["allowed_limit"], aqi
        )
        report[fid] = {
            "name": data["name"],
            "emission": data["monthly_emission"],
            "allowed_limit": allowed
        }

    return jsonify(report)

if __name__ == "__main__":
    app.run(debug=True)
