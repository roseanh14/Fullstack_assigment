
import { Box, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

function ChatInput({ question, setQuestion, onSend, isLoading }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSend();
    }
  };

  return (
    <Box className="input-row">
      <TextField
        fullWidth
        placeholder="Type your question..."
        variant="outlined"
        size="small"
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        onKeyDown={handleKeyDown}
        className="input-field"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onSend}
        endIcon={<SendIcon />}
        disabled={isLoading}
      >
        Send
      </Button>
    </Box>
  );
}

export default ChatInput;
