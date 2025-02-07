import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Switch,
  FormControlLabel,
  Grid,
  Avatar,
  Tooltip,
  CircularProgress,
  Badge
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from "@mui/system";
import { FiSend, FiSearch , FiMessageSquare } from "react-icons/fi";
import { BsEmojiSmile } from "react-icons/bs";
import Picker from "emoji-picker-react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import useStyles from "./style";
import { showSnackbar } from "../../Redux/SnackBar/actions";
import { showLoader, hideLoader } from "../../Redux/Loader/actions";
import logoutApi from "../../Services/Logout";
import { CUSTOM_CONSTANTS } from '../../Constants'
import io from "socket.io-client";
import moment from "moment";

const StyledPaper = styled(Paper)(({ theme, mode }) => ({
  height: "90vh",
  display: "flex",
  flexDirection: "column",
  backgroundColor: mode === "#ffffff",
  padding:8,
  boxShadow: '1px 3px 10px 13px rgb(121 145 183)',
}));

const MessageContainer = styled(Box)(({ isOwnMessage, theme, mode }) => ({
  display: "flex",
  justifyContent: isOwnMessage ? "flex-end" : "flex-start",
  marginBottom: "1rem",
  "& .message": {
    maxWidth: "70%",
    padding: "0.8rem",
    borderRadius: "1rem",
    backgroundColor: isOwnMessage
      ? mode === "dark"
        ? "#0d47a1"
        : "#1976d2"
      : mode === "dark"
      ? "#424242"
      : "#f5f5f5",
    color: isOwnMessage ? "#ffffff" : mode === "dark" ? "#ffffff" : "#000000"
  }
}));



const ChatApp = () => {
  const classes = useStyles();
   const navigate = useNavigate();
    const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
const userName = useSelector(state => state.AuthReducer.username || "");
const userId = useSelector(state => state.AuthReducer.userid || "");
const token = useSelector(state => state.AuthReducer.token || "");

const socket = io(CUSTOM_CONSTANTS.API_BASE_URL, {
  query: {
    authtoken: `Bearer ${token}`, // Replace with actual token
  },
 transports: ["polling", "websocket"],
});

useEffect(() => {
  // Join room when component mounts
  socket.emit("joinRoom", userId);
}, []);

useEffect(() => {
    scrollToBottom();
    setUsername(userName);
}, [messages]);

useEffect(() => {

socket.on("connect", () => {
  console.log("Connected to WebSocket Server, ID:", socket.id);
});

console.log(socket.listeners("receiveMessage"));

socket.on("receiveMessage", (data) => {
  console.log("Received message:", data);
  setMessages(data); // Ensure previous state is used
});

return () => {
  socket.off("receiveMessage");
};
}, [userId,messages]);


  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        text: message,
        sender: username,
        timestamp: moment().format('hh:mm A'),
        senderid: userId
      };
      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };



const handleLogout = () => {
      dispatch(showLoader("Loading please wait..."));
      const onSuccess = (res) => {
        dispatch(hideLoader());
        console.log("fetched data--->",res?.data?.data);
        dispatch(
          showSnackbar({
            message: res?.data?.message || "Logged out successfully",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            variant: "success",
          })
        );
        localStorage.clear();
        navigate(0);
      };
      const onFailure = (err) => {
        dispatch(
          showSnackbar({
            message: err?.response?.data?.message || "Failed to fetch data",
            autoHideDuration: 3000,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            variant: "error",
          })
        );
        dispatch(hideLoader());
        //console.log("Login Api", err);
      };
      logoutApi.logoutbyid(userId).then(onSuccess, onFailure);
};

const filteredMessages = messages.filter(msg =>
  msg.text && msg.text.toLowerCase().includes(searchQuery.toLowerCase())
);

const onEmojiClick = (event) => {
    setMessage(prevMessage => prevMessage + event.emoji);
    setShowEmojiPicker(false);
};

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }} className={classes.chatRoom} >
      <StyledPaper elevation={3}>
        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item>
              <Typography className={classes.Chatfont} variant="h6"><FiMessageSquare />  Chat Room</Typography>
            </Grid>
            <Grid item>
            <Typography variant="h6" className={classes.Chatfont} >Hello {username} !!</Typography>
            </Grid>
            <Grid item>
            <Button
                    type={"button"}
                    fullWidth
                    size="small"
                    variant="contained"
                    onClick={() => {
                      handleLogout();
                    }}
                    className={classes.Chatfont}
                  >
                    <LogoutIcon sx={{ fontSize: 20 }} /> Logout
                  </Button>
            </Grid>
          </Grid>
          <TextField
            fullWidth
            size="small"
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <FiSearch />
            }}
            sx={{ mt: 1 }}
          />
        </Box>

        <List sx={{ flexGrow: 1, overflow: "auto", p: 2 }} className={classes.chatList} >
          {(searchQuery ? filteredMessages : messages).map((msg, index) => (
    <Box key={index} sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
    <Paper
      sx={{
        p: 1,
        borderRadius: "10px",
        backgroundColor: msg.senderid === userId ? "#1976d2" : "#f5f5f5",
        color: msg.senderid === userId ? "white" : "black",
        alignSelf: msg.senderid === userId ? "flex-end" : "flex-start",
      }}
    >
      {msg.text}
    </Paper>
    <Typography
      variant="caption"
      color="textSecondary"
      sx={{ alignSelf: msg.senderid === userId ? "flex-end" : "flex-start" }}
    >
      {msg.sender} - {msg.timestamp}
    </Typography>
  </Box>
         ))}
          <div ref={messagesEndRef} />
        </List>

        <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                      <BsEmojiSmile />
                    </IconButton>
                  )
                }}
              />
            {showEmojiPicker && (
                <Box sx={{ bottom: "100%", right: 0 }}>
                  <Picker  
      pickerStyle={{ width: "70%" }} 
       onEmojiClick={onEmojiClick} 
       reactionsDefaultOpen={true} />
                </Box>
              )}
            </Grid>
            <Grid item>
            <Button variant="contained" endIcon={<FiSend />} onClick={handleSendMessage} disabled={!message.trim()}>
                Send
              </Button>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default ChatApp;