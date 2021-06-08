import React, { useState } from "react";
import Modal from "react-modal";
import { FaTrash, FaWindowClose, FaRegThumbsDown } from "react-icons/fa";
import { deleteChatMessage, sendNotification } from "../services/Chat";

function Message(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const banCases = [
    { id: 1, case: "USO DE SPAM" },
    { id: 2, case: "LENGUAJE INDEBIDO" },
    { id: 3, case: "SPOILER DE TEMAS RECIENTES" },
  ];

  let trashStyle = {
    background: "transparent",
    color: "white",
    fontSize: "2em",
  };

  const handleDeleteMessage = async (banId, messageId) => {
    const notification = {
      id: "0",
      userName: props.chatUser,
      case: banCases.find((c) => c.id === banId).case,
      time: props.timeSent,
    };
    setModalIsOpen(false);
    sendNotification(notification);
    deleteChatMessage(messageId);
  };

  return (
    <>
      <div>
        <Modal
          isOpen={modalIsOpen}
          ariaHideApp={false}
          shouldCloseOnOverlayClick={false}
          onRequestClose={() => setModalIsOpen(false)}
          style={{
            content: {
              top: "28%",
              right: "30%",
              bottom: "28%",
              left: "30%",
              textAlign: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              border: "10px solid rgb(124, 40, 106)",
            },
          }}
        >
          <div className="delete-modal">
            <h2>Reportar mensaje de {props.chatUser}</h2>
            <br />
            {banCases.map((m) => (
              <button
                key={m.id}
                onClick={() => handleDeleteMessage(m.id, props.id)}
              >
                <FaRegThumbsDown style={{ fontSize: "2rem" }} />
                {m.case}
              </button>
            ))}
            <div className="delete-modal-close-button">
              <button aria-hidden="true" onClick={() => setModalIsOpen(false)}>
                <FaWindowClose style={{ fontSize: "2rem" }} />
              </button>
            </div>
          </div>
        </Modal>
      </div>
      <div className="message-block">
        <div
          className="message"
          style={{
            backgroundColor: props.isMyMessage ? "indigo" : "rgb(41, 36, 32)",
            marginLeft: props.isMyMessage ? "33%" : "0",
            margin: props.isMyMessage ? "auto 0 auto auto" : "auto auto auto 0",
          }}
        >
          <strong>{props.chatUser}</strong> escribio:
          <div>{props.message}</div>
          <h5
            style={{
              textAlign: "right",
              marginTop: "10px",
            }}
          >
            enviado a las {props.timeSent}
          </h5>
          {props.isAdmin ? (
            <div className="delete-message">
              <button onClick={() => setModalIsOpen(true)}>
                <FaTrash style={trashStyle} />
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default Message;
