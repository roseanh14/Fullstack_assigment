
from flask import Blueprint, request, jsonify
from components.chat import handle_chat

api_bp = Blueprint("api", __name__)


@api_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json() or {}
    question = (data.get("question") or "").strip()

    response = handle_chat(question)

    return jsonify(response)
