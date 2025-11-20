import time

from mock.mock_RAG import get_mock_response


def handle_chat(data: dict) -> dict:
    question = (data.get("question") or "").strip()
    lower_q = question.lower()

    time.sleep(1)

    if lower_q == "hello":
        return {"answer": "hi how can i help u ?", "sources": []}

    if lower_q in ("thank u", "thank you", "thanks", "thx"):
        return {"answer": "You're welcome! Have a great day!", "sources": []}

    answer, sources = get_mock_response(question)
    return {
        "answer": answer,
        "sources": sources,
    }
