import React, { useState, useEffect } from "react";
import { updateChatUser } from "../services/Chat";

const ChatInput = (props) => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (message !== "") {
      if (!props.usersTyping.includes(props.user.name)) {
        updateChatUser(props.user.id,true);
      }
    } else {
      if (props.usersTyping.includes(props.user.name)) {
        updateChatUser(props.user.id,true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  const onSubmit = (e) => {
    e.preventDefault();
    const isMessageProvided = message && message !== "";
    if (isMessageProvided) {
      props.sendMessage(message);
      setMessage("");
    }
  };

  const onMessageUpdate = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="chat-input-form"
        placeholder="Escribe un mensaje aqui"
        type="text"
        required
        value={message}
        onChange={onMessageUpdate}
      />
    </form>
  );
};

export default ChatInput;
