from flask import Flask, request, jsonify
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    question = data.get("question", "").strip()
    lower_q = question.lower()
    time.sleep(1)

    if lower_q == "hello":
        return jsonify({
            "answer": "hi how can i help u ?",
            "sources": []
        })

    if lower_q in ("thank u", "thank you", "thanks", "thx"):
        return jsonify({
            "answer": "You're welcome! Have a great day!",
            "sources": []
        })

    response = {
        "answer": (
            "Sure, here are some example news results for you. "
            "If you need anything more specific, just ask me a follow-up question"
        ),
        "sources": [
            {
                "title": "Largest observed flare from a black hole unleashes the light of 10 trillion suns",
                "url": "https://edition.cnn.com/2025/11/06/science/largest-black-hole-flare"
            },
            {
                "title": "The asteroid that will spare Earth might hit the moon instead. What happens if it does?",
                "url": "https://edition.cnn.com/2025/07/25/science/asteroid-2024-yr4-potential-lunar-impact"
            }
        ]
    }
    return jsonify(response)

if __name__ == "__main__":
    app.run(port=5000, debug=True)
