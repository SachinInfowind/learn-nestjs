import { useState } from "react";
import { InputBar, InputField, SendButton } from "../assets/styles/styled";
import SendIcon from "@mui/icons-material/Send";

interface MessageInputProps {
  send: (value: string) => void;
}
const MessageInput: React.FC<MessageInputProps> = ({ send }) => {
  const [value, setValue] = useState("");
  return (
    <>
      <InputBar flexDirection={"row"}>
        <InputField
          placeholder="type your message"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>   setValue(e.target.value)}
        />
        <SendButton
          variant="contained"
          onClick={() => {
            send(value);
            setValue("");
          }}
        >
          <SendIcon />
        </SendButton>
      </InputBar>
    </>
  );
};
export default MessageInput;
