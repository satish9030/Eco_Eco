from flask import Flask, jsonify
from flask_cors import CORS
from factories_data import factories
from emissions_logic import calculate_allowed_limit, get_aqi_from_api
from auth_routes import auth
from emission_routes import emission_api

app = Flask(__name__)
CORS(app)

# REGISTER BLUEPRINTS
app.register_blueprint(auth)
app.register_blueprint(emission_api)

@app.route("/")
def home():
    return jsonify({"status": "backend running"})


# ================= MONTHLY REPORT (GOV) =================
@app.route("/monthly-report", methods=["GET"])
def monthly_report():
    city = "Delhi"
    aqi = get_aqi_from_api(city)

    report = {}

    for fid, data in factories.items():
        base_limit = data["base_limit"]

        final_allowed_limit = calculate_allowed_limit(base_limit, aqi)
        data["allowed_limit"] = final_allowed_limit

        latest_month = list(data["emissions"].keys())[-1]
        latest_emission = data["emissions"][latest_month]

        report[fid] = {
            "name": data["name"],
            "month": latest_month,
            "emission": latest_emission,
            "allowed_limit": final_allowed_limit,
            "status": "EXCEEDED" if latest_emission > final_allowed_limit else "OK"
        }

    return jsonify({
        "city": city,
        "aqi": aqi,
        "factories": report
    })


# ================= PUBLIC REPORT (PEOPLE DASHBOARD) =================
@app.route("/public-report/<city>", methods=["GET"])
def public_report(city):
    city = city.capitalize()
    aqi = get_aqi_from_api(city)

    result = []

    for data in factories.values():
        if data.get("city") != city:
            continue

        base_limit = data["base_limit"]
        allowed_limit = calculate_allowed_limit(base_limit, aqi)

        latest_month = list(data["emissions"].keys())[-1]
        emission = data["emissions"][latest_month]

        result.append({
            "name": data["name"],
            "emission": emission,
            "allowed_limit": allowed_limit,
            "status": "High" if emission > allowed_limit else "Moderate"
        })

    return jsonify({
        "city": city,
        "aqi": aqi,
        "factories": result
    })


# ================= FACTORY DASHBOARD (NEW – REQUIRED) =================
@app.route("/factory/dashboard/<factory_id>", methods=["GET"])
def factory_dashboard(factory_id):
    if factory_id not in factories:
        return jsonify({"error": "Factory not found"}), 404

    factory = factories[factory_id]

    latest_month = list(factory["emissions"].keys())[-1]
    latest_emission = factory["emissions"][latest_month]

    allowed = factory["allowed_limit"] or factory["base_limit"]
    status = "SAFE" if latest_emission <= allowed else "EXCEEDED"

    return jsonify({
        "factory_id": factory_id,
        "name": factory["name"],
        "city": factory["city"],
        "latest_month": latest_month,
        "latest_emission": latest_emission,
        "allowed_limit": allowed,
        "status": status,
        "emissions": factory["emissions"]
    })


# ================= FACTORY HISTORY =================
@app.route("/factory-history/<factory_id>", methods=["GET"])
def factory_history(factory_id):
    if factory_id not in factories:
        return jsonify([])

    factory = factories[factory_id]
    history = []

    allowed = factory["allowed_limit"] or factory["base_limit"]

    for month, emission in factory["emissions"].items():
        history.append({
            "month": month,
            "emission": emission,
            "allowed_limit": allowed,
            "status": "EXCEEDED" if emission > allowed else "SAFE"
        })

    return jsonify(history)


# ================= FACTORY FINE =================
@app.route("/factory-fine/<factory_id>", methods=["GET"])
def factory_fine(factory_id):
    if factory_id not in factories:
        return jsonify({"fine": 0})

    factory = factories[factory_id]
    allowed = factory["allowed_limit"] or factory["base_limit"]
    latest_emission = list(factory["emissions"].values())[-1]

    fine = 500 if latest_emission > allowed else 0
    return jsonify({"fine": fine})


if __name__ == "__main__":
    app.run(debug=True)
