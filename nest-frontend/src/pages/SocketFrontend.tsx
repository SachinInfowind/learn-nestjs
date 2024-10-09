import React, { useEffect, useState } from "react";
import MessageInput from "../components/MessageInput";
import Messages from "../components/Messages";
import { Container, Typography } from "@mui/material";
import { ScreenWrapper } from "../assets/styles/styled";
import { Message } from "../interfaces/interface";
import { toast } from "react-toastify";


const SocketFrontend: React.FC = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [randomUsername] = useState(`User${Math.floor(Math.random() * 1000)}`);

  const send = (value: string) => {
    if (value && socket?.readyState === WebSocket.OPEN) {
      const message: Message = {
        sender: randomUsername,
        text: value,
      };
      socket.send(JSON.stringify(message)); // Send the message as JSON
    }
  };

  useEffect(() => {
    const webSocket = new WebSocket('ws://192.168.1.57:8080');
    
    webSocket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    webSocket.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]); // Append new message
    };

    webSocket.onerror = (error) => {
      console.log(error)
      toast.error("Error occured");
    };

    webSocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    setSocket(webSocket);

    return () => {
      webSocket.close(); // Clean up on component unmount
    };
  }, []);

  return (
    <Container
      sx={{
        maxWidth: {
          xs: "100%",
          lg: "600px",
          xl: "800px",
        },
      }}
    >
      <Typography variant="h5" textAlign={"center"}>
        ChatApp
      </Typography>
      <ScreenWrapper flexDirection="column">
        <Messages messages={messages} username={randomUsername} />
        <MessageInput send={send} />
      </ScreenWrapper>
    </Container>
  );
};

export default SocketFrontend;
