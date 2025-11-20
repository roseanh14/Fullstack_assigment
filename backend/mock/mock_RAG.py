
from .AI_mock_data import (
    GREETING_TRIGGER,
    GREETING_ANSWER,
    THANKS_TRIGGERS,
    THANKS_ANSWER,
    DEFAULT_ANSWER,
    MOCK_SOURCES,
)


def get_mock_response(question: str):
    lower_q = (question or "").strip().lower()

    
    if lower_q == GREETING_TRIGGER:
        return GREETING_ANSWER, []

    if lower_q in THANKS_TRIGGERS:
        return THANKS_ANSWER, []

    
    return DEFAULT_ANSWER, MOCK_SOURCES
