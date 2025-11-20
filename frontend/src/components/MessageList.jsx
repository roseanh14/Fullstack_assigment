
import { Box, Typography, CircularProgress } from "@mui/material";
import MessageBubble from "./MessageBubble";

function MessageList({ messages, isLoading, messagesEndRef }) {
  return (
    <Box className="messages">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}

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
  );
}

export default MessageList;
