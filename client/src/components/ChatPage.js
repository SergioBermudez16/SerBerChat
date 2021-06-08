import React from "react";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import Spinner from "./common/Spinner";
import { addChatMessage, deleteChatMessage } from "../services/Chat";

function ChatPage(props) {
  const auxUsersTyping = props.users.filter((u) => u.isTyping === true);
  const usersTyping = auxUsersTyping.map((u) => u.name);

  const deleteMessage = async (id) => {
    deleteChatMessage(id);
  };

  const sendMessage = async (message) => {
    const chatMessage = {
      id: "0",
      userName: props.user.name,
      message: message,
    };
    addChatMessage(chatMessage);
  };

  return Object.entries(props.user).length === 0 || props.users.length === 0 ? (
    <Spinner />
  ) : (
    <div className="chat-window-container">
      <div className="chat-messages">
        <ChatWindow
          chat={props.chat}
          isAdmin={props.isAdmin}
          user={props.user}
          usersTyping={usersTyping}
          deleteMessage={deleteMessage}
        />
      </div>
      <div className="chat-input">
        <ChatInput
          sendMessage={sendMessage}
          user={props.user}
          usersTyping={usersTyping}
        />
      </div>
    </div>
  );
}

export default ChatPage;
