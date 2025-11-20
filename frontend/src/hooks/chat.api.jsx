
import { useCallback } from "react";


const RAW_API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";
const API_URL = RAW_API_URL.endsWith("/") ? RAW_API_URL : RAW_API_URL + "/";

export function useChatApi() {
  const getAnswer = useCallback(async (question) => {
    const trimmed = (question || "").trim();
    if (!trimmed) {
      return { answer: "", sources: [] };
    }

    const response = await fetch(`${API_URL}chat`, {
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
