import React from "react";
import Message from "./Message";
import Typing from "./Typing";

const ChatWindow = (props) => {
  const date = new Date();
  const time = date
    .getHours()
    .toString()
    .concat(":")
    .concat(date.getMinutes().toString().padStart(2, "0"));

  const messageWindow = props.chat.map((m) => (
    <Message
      key={m.id}
      id={m.id}
      originalUser={props.user}
      isMyMessage={props.user.name === m.userName}
      chatUser={m.userName}
      timeSent={time}
      message={m.message}
      isDeleted={m.isDeleted}
      isAdmin={props.isAdmin}
      onDeleteClick={props.deleteMessage}
    />
  ));

  return (
    <>
    {props.usersTyping.length === 0 ? (
        <></>
      ) : (
        <Typing usersTyping={props.usersTyping} />
      )}
      {props.chat.length === 0 ? <></> :(<div>{messageWindow}</div>) }
    </>
  );
};

export default ChatWindow;
