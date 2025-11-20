
import { useState, useRef, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useChatApi } from "../hooks/chat.api";

function ChatApp() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const { getAnswer } = useChatApi();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setIsLoading(true);

    try {
      const data = await getAnswer(trimmed);

      const assistantMessage = {
        role: "assistant",
        content: data.answer,
        sources: data.sources || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong when calling the API. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="app-root">
      <Container maxWidth="md">
        <Box className="chat-wrapper">
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" className="chat-header-title">
              Conversational News Bot
            </Typography>
          </Box>

          <MessageList
            messages={messages}
            isLoading={isLoading}
            messagesEndRef={messagesEndRef}
          />

          <ChatInput
            question={question}
            setQuestion={setQuestion}
            onSend={handleSend}
            isLoading={isLoading}
          />
        </Box>
      </Container>
    </Box>
  );
}

export default ChatApp;
