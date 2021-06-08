export async function addUser(user) {
  const response = await fetch("https://localhost:5001/user/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await response.json();
}

export async function deleteUser(id) {
  try {
    await fetch("https://localhost:5001/user/".concat(id), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("usuario removido");
  } catch (err) {
    console.error(err);
  }
}
