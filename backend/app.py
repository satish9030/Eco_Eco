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

        allowed_limit = calculate_allowed_limit(data["base_limit"], aqi)
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


# ================= FACTORY DASHBOARD (SINGLE SOURCE) =================
@app.route("/factory/dashboard/<factory_id>", methods=["GET"])
def factory_dashboard(factory_id):
    if factory_id not in factories:
        return jsonify({"error": "Factory not found"}), 404

    factory = factories[factory_id]
    city = factory["city"]

    aqi = get_aqi_from_api(city)
    allowed = calculate_allowed_limit(factory["base_limit"], aqi)

    emissions = factory["emissions"]
    months = list(emissions.keys())
    air_values = list(emissions.values())
    water_values = [round(v * 0.75) for v in air_values]

    latest_air = air_values[-1]
    latest_water = water_values[-1]

    status = "EXCEEDED" if latest_air > allowed else "SAFE"
    fine = 500 if status == "EXCEEDED" else 0
    compliance_pct = round((latest_air / allowed) * 100)

    return jsonify({
        "factory": {
            "id": factory_id,
            "name": factory["name"],
            "city": city
        },
        "today": {
            "air": latest_air,
            "air_limit": allowed,
            "water": latest_water,
            "water_limit": round(allowed * 0.75),
            "status": status,
            "fine": fine
        },
        "charts": {
            "months": months,
            "air": air_values,
            "water": water_values
        },
        "compliance": {
            "percentage": compliance_pct,
            "status": status
        },
        "recent": [
            {
                "month": m,
                "air": emissions[m],
                "fine": 500 if emissions[m] > allowed else 0
            }
            for m in months[-3:][::-1]
        ]
    })


# ================= FACTORY HISTORY =================
@app.route("/factory-history/<factory_id>", methods=["GET"])
def factory_history(factory_id):
    if factory_id not in factories:
        return jsonify([])

    factory = factories[factory_id]
    allowed = factory["allowed_limit"] or factory["base_limit"]

    return jsonify([
        {
            "month": m,
            "emission": e,
            "allowed_limit": allowed,
            "status": "EXCEEDED" if e > allowed else "SAFE"
        }
        for m, e in factory["emissions"].items()
    ])


# ================= FACTORY FINE =================
@app.route("/factory-fine/<factory_id>", methods=["GET"])
def factory_fine(factory_id):
    if factory_id not in factories:
        return jsonify({"fine": 0})

    factory = factories[factory_id]
    allowed = factory["allowed_limit"] or factory["base_limit"]
    latest_emission = list(factory["emissions"].values())[-1]

    return jsonify({
        "fine": 500 if latest_emission > allowed else 0
    })


if __name__ == "__main__":
    app.run(debug=True)
