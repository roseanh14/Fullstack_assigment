
import { Box, Typography, Link } from "@mui/material";

function MessageBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <Box className={`message-row ${isUser ? "user" : "assistant"}`}>
      <Box className={`message-bubble ${isUser ? "user" : "assistant"}`}>
        <Typography
          variant="caption"
          className={`message-label ${isUser ? "user" : "assistant"}`}
        >
          {isUser ? "YOU" : "ASSISTANT"}
        </Typography>

        <Typography
          variant="body2"
          sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
        >
          {message.content}
        </Typography>

        {!isUser &&
          message.sources &&
          message.sources.length > 0 && (
            <Box sx={{ mt: 1.2 }}>
              <Typography variant="caption" className="sources-label">
                Sources:
              </Typography>
              {message.sources.map((source, i) => (
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
}

export default MessageBubble;
