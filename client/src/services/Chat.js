export async function addChatMessage(chatMessage) {
  try {
    await fetch("https://localhost:5001/chat/message", {
      method: "POST",
      body: JSON.stringify(chatMessage),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log("fetch mes post fallo");
    console.error(err);
  }
}

export function deleteChatMessage(id) {
  fetch("https://localhost:5001/chat/".concat(id), {
    method: "DELETE",
  })
    .then((res) => console.log("fetch delete exitoso"))
    .catch(function (err) {
      console.log("fetch mes delete fallo");
      console.error(err);
    });
}

export function updateChatUser(id,typing) {
  try {
    fetch("https://localhost:5001/chat/UserTyping?id=".concat(id).concat("&typing=").concat(typing), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err);
  }
}

export async function sendNotification(notification) {
  try {
    await fetch("https://localhost:5001/chat/notification", {
      method: "POST",
      body: JSON.stringify(notification),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log("fetch not post fallo");
    console.error(err);
  }
}
