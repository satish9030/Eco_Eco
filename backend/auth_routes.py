from flask import Blueprint, request, jsonify
from factories_data import factories
from Login_credentials import users

auth = Blueprint("auth", __name__)

# ================= FACTORY LOGIN (NEW SOURCE) =================
@auth.route("/factory/login", methods=["POST"])
def factory_login():
    data = request.get_json()

    factory_id = data.get("factory_id")
    password = data.get("password")

    if factory_id not in factories:
        return jsonify({"status": "failed", "message": "Invalid Factory ID"}), 401

    factory = factories[factory_id]

    if factory["login"]["password"] != password:
        return jsonify({"status": "failed", "message": "Invalid Password"}), 401

    return jsonify({
        "status": "success",
        "factory_id": factory_id,
        "name": factory["name"],
        "city": factory["city"]
    }), 200


# ================= GOV + PUBLIC LOGIN (UNCHANGED) =================
@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    role = data.get("role")
    username = data.get("username")
    password = data.get("password")

    if (
        role in users and
        username in users[role] and
        users[role][username] == password
    ):
        return jsonify({"status": "success"}), 200

    return jsonify({"status": "failed"}), 401


# ================= PUBLIC REGISTER (UNCHANGED) =================
@auth.route("/public-register", methods=["POST"])
def public_register():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if email in users["public"]:
        return jsonify({"status": "exists"}), 409

    users["public"][email] = password
    return jsonify({"status": "registered"}), 200
