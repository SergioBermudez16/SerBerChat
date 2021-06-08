import React, { useState, useEffect, useRef } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Link } from "react-router-dom";
import ChatUsers from "./ChatUsers";
import Spinner from "./common/Spinner";
import ChatPage from "./ChatPage";
import { useAlert } from "react-alert";
import anime from "../asserts/anime.jpg";
import movies from "../asserts/movies.jpg";
import music from "../asserts/music.jpg";
import exit from "../asserts/exit.png";

function HomePage(props) {
  const [chat, setChat] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const latestChat = useRef(null);
  const latestUser = useRef(null);
  const latestUsers = useRef(null);
  const latestNotifications = useRef(null);
  latestChat.current = chat;
  latestNotifications.current = notifications;
  latestUser.current = user;
  latestUsers.current = users;
  const alert = useAlert();

  const connection = new HubConnectionBuilder()
    .withUrl(
      "https://localhost:5001/hubs/chat?userid="
        .concat(props.location.state.userId)
        .concat("&username=")
        .concat(props.location.state.userName)
    )
    .withAutomaticReconnect()
    .build();

  useEffect(() => {
    connection
      .start()
      .then((result) => {
        console.log("Conectado a ChatHub!");

        connection.on("GetUsers", (updatedUsers) => {
          var currentUser = updatedUsers.find(function (value) {
            return value.id === props.location.state.userId;
          });
          setUsers(updatedUsers);
          setUser(currentUser);
          setIsAdmin(props.location.state.userName === "Administrador");
          console.log("Connection getusers exitoso");
        });

        connection.on("UserTyping", (updatedUser, updatedUsers) => {
          if (updatedUsers !== latestUsers.current) {
            setUsers(updatedUsers);
          }
          if (
            updatedUser.id === latestUser.current.id &&
            updatedUser !== latestUser.current
          ) {
            setUser(updatedUser);
          }
          console.log("Connection userTyping exitoso");
        });

        connection.on("SendMessage", (message) => {
          if (message.isDeleted) {
            alert.error("¡Cuida tu vocabulario!");
          }
          const updatedChat = [...latestChat.current];
          updatedChat.push(message);
          setChat(updatedChat);
          console.log("Connection SendMessage exitoso");
        });

        connection.on("DeleteMessage", (id) => {
          const updatedChat = [...latestChat.current];
          const filteredChat = updatedChat.filter((c) => c.id !== id);
          setChat(filteredChat);
          console.log("Connection DeleteMessage exitoso");
        });

        connection.on("SendNotification", (notification) => {
          if (
            notification.userName === latestUser.current.name ||
            latestUser.current.name === "Administrador"
          ) {
            var noti = {};
            if (latestUser.current.name === "Administrador") {
              noti = {
                id: notification.id,
                totalString: "El mensaje enviado por "
                  .concat(notification.userName)
                  .concat(" a las ")
                  .concat(notification.time)
                  .concat(" lo eliminaste debido a: ")
                  .concat(notification.case),
              };
            } else {
              noti = {
                id: notification.id,
                totalString: "El mensaje que enviaste a las "
                  .concat(notification.time)
                  .concat(" fue eliminado debido a: ")
                  .concat(notification.case),
              };
            }
            alert.info("¡Tienes una nueva notificacion!");
            const updatedNotifications = [...latestNotifications.current];
            updatedNotifications.push(noti);
            setNotifications(updatedNotifications);
            console.log("Connection SendNotification exitoso");
          }
        });
      })
      .catch((e) => console.log("Connection failed: ", e));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteUser = async (id) => {
    connection.start().then(() => {
      connection.stop().then(() => {
        console.log("Desconectado");
      });
    });
  };

  return user === undefined || user.length === 0 ? (
    <Spinner />
  ) : (
    <div className="chat-feed">
      <div className="chat-header">
        <div className="chat-exit">
          <Link to="">
            <img
              width="80"
              height="80"
              src={exit}
              alt="exit"
              onClick={() => handleDeleteUser(user.id)}
            />
          </Link>
        </div>
        <div className="chat-title-container">
          <div className="chat-title">Serber Chat</div>
          <div className="chat-subtitle">¡Charlemos juntos!</div>
        </div>
      </div>
      <div className="chat-body">
        <div className="chat-users-container">
          <ChatUsers
            isAdmin={isAdmin}
            users={users}
            user={user}
            notifications={notifications}
          />
        </div>
        <ChatPage chat={chat} users={users} user={user} isAdmin={isAdmin} />
        <div className="chat-game-container">
          <h3>Temas de interes</h3>
          <img src={anime} alt="anime"></img>
          <img src={movies} alt="anime"></img>
          <img src={music} alt="anime"></img>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
