
import time
from mock.mock_RAG import get_mock_response


def handle_chat(question: str) -> dict:
    clean_q = (question or "").strip()


    time.sleep(1)

    answer, sources = get_mock_response(clean_q)

    return {
        "answer": answer,
        "sources": sources,
    }
