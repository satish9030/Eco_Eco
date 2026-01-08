# backend/auth_routes.py

from flask import Blueprint, request, jsonify
from Login_credentials import users   # CHANGED IMPORT

auth = Blueprint("auth", __name__)

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
