import React, { useEffect, useState } from "react";

const ChatUsers = (props) => {
  const [userFriends, setUsersFriends] = useState([]);

  useEffect(() => {
    setUsersFriends(
      props.users.filter(function (value) {
        return value.name !== props.user.name;
      })
    );
  }, [props.user.name, props.users]);

  return (
    <>
      <div className="current-user">
        <p style={{ color: "indigo", fontWeight: "bold" }}>
          Bienvenido {props.user.name}
          <br />
        </p>
        <p>
          Que bueno tenerte en <b>Serber Chat</b>. Aqui podras ver los temas de
          mayor interes en la comunidad y dialogar con tus amigos en la caja de
          chat
        </p>
        <div className="current-user-info">
          {props.isAdmin ? (
            <h5>Estas son las notificaciones que has enviado:</h5>
          ) : (
            <h5>Estas son las notificaciones enviadas por el administrador:</h5>
          )}
          <br />
          {props.notifications.map((m) => (
            <li style={{ color: "red", fontWeight: "bold" }} key={m.id}>
              {m.totalString}
              <br />
            </li>
          ))}
        </div>
      </div>

      <div className="user-friends">
        <h4>Amigos en el chat:</h4>
        {userFriends.map((m) => (
          <li style={{ color: "indigo", fontWeight: "bold" }} key={m.id}>
            {m.name}
          </li>
        ))}
      </div>
    </>
  );
};

export default ChatUsers;
