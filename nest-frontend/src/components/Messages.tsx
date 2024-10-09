import { ChatMessage, MessagesList } from "../assets/styles/styled";
import { Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { MessagesProps } from "../interfaces/interface";


const Messages: React.FC<MessagesProps> = ({ messages, username }) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [messages]);
  return (
    <>
      {" "}
      <MessagesList rowGap={'10px'}>
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            style={{ marginLeft: username == message.sender ? "auto" : "" }}
          >
            <div className={`chat-message-wrapper ${username==message.sender ? "incoming"  : 'outgoing'}`} >
              <Typography variant="caption" component={'span'}>{message.sender}</Typography>
              <div className="chat-message-bubble">
                <span className="chat-message-body">{message.text}</span>
              </div>
            </div>
          </ChatMessage>
        ))}
         <div ref={messagesEndRef} />
      </MessagesList>
    </>
  );
};
export default Messages;
