import React from "react";

const typing = (props) => {
  var typingAlert = "";
  var typingAlertArray = [];

  if (props.usersTyping.length > 0) {
    typingAlert = props.usersTyping.join(", ");
    if (props.usersTyping.length === 1) {
      typingAlert = typingAlert.concat(" esta ");
    } else {
      typingAlert = typingAlert.concat(" estan ");
    }
    typingAlert = typingAlert.concat("escribiendo ...");
    for (var i = 0; i < typingAlert.length; i++) {
      const obj = {
        index: i,
        char: typingAlert.charAt(i),
      };
      typingAlertArray.push(obj);
    }
  }
  return typingAlertArray.length === 0 ? (
    <></>
  ) : (
    <div className="typing-block">
      <div className="wavy">
        {typingAlertArray.map((m) => {
          return (
            <span key={m.index} style={{ "--i": m.index }}>
              {m.char}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default typing;
