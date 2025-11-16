import { useState, useRef, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {CssBaseline,Box,Container,Typography,TextField,Button,CircularProgress,Link} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    background: {
      default: "#0f172a",
    },
  },
});

function App() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

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
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: trimmed }),
      });

      const data = await response.json();

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
          content: "Something went wrong when calling the API. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className="app-root">
        <Container maxWidth="md">
          <Box className="chat-wrapper">
            <Box sx={{ mb: 2 }}>
              <Typography variant="h5" className="chat-header-title">
                Conversational News Bot
              </Typography>
            </Box>

            <Box className="messages">
              {messages.map((msg, index) => {
                const isUser = msg.role === "user";
                return (
                  <Box
                    key={index}
                    className={`message-row ${isUser ? "user" : "assistant"}`}
                  >
                    <Box
                      className={`message-bubble ${
                        isUser ? "user" : "assistant"
                      }`}
                    >
                      <Typography
                        variant="caption"
                        className={`message-label ${
                          isUser ? "user" : "assistant"
                        }`}
                      >
                        {isUser ? "YOU" : "ASSISTANT"}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                      >
                        {msg.content}
                      </Typography>

                      {!isUser && msg.sources && msg.sources.length > 0 && (
                        <Box sx={{ mt: 1.2 }}>
                          <Typography
                            variant="caption"
                            className="sources-label"
                          >
                            Sources:
                          </Typography>
                          {msg.sources.map((source, i) => (
                            <Typography
                              key={i}
                              variant="caption"
                              sx={{ display: "block" }}
                            >
                              •{" "}
                              <Link
                                href={source.url}
                                target="_blank"
                                rel="noreferrer"
                                underline="hover"
                                sx={{ color: "#93c5fd" }}
                              >
                                {source.title}
                              </Link>
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Box>
                );
              })}

              {isLoading && (
                <Box className="message-row assistant">
                  <Box className="message-bubble assistant">
                    <Typography
                      variant="caption"
                      className="message-label assistant"
                    >
                      ASSISTANT
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontSize: 14,
                      }}
                    >
                      <CircularProgress size={16} />
                      <span>AI is thinking...</span>
                    </Box>
                  </Box>
                </Box>
              )}

              <div ref={messagesEndRef} />
            </Box>

            <Box className="input-row">
              <TextField
                fullWidth
                placeholder="Type your question..."
                variant="outlined"
                size="small"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    handleSend();
                  }
                }}
                className="input-field"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSend}
                endIcon={<SendIcon />}
                disabled={isLoading}
              >
                Send
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
