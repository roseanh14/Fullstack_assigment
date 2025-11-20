
import { useCallback } from "react";

export function useChatApi() {
  const getAnswer = useCallback(async (question) => {
    const trimmed = (question || "").trim();
    if (!trimmed) {
      return { answer: "", sources: [] };
    }

    const response = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: trimmed }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json(); 
    return data;
  }, []);

  return { getAnswer };
}
