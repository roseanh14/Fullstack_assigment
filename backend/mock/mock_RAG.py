from .AI_mock_data import MOCK_SOURCES


def get_mock_response(question: str):
    answer = (
        "Sure, here are some example news results for you. "
        "If you need anything more specific, just ask me a follow-up question"
    )

    return answer, MOCK_SOURCES
