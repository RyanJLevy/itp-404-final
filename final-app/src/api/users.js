const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function fetchUserByUsernameAndPassword(username, password) {
  const user = await fetch(`${baseUrl}/users`)
    .then((response) => response.json())
    .then((data) =>
      data.filter(
        (user) => user.username === username && user.password === password
      )
    );
  return user;
}

export async function createUser(userData) {
  return fetch(`${baseUrl}/users`, {
    method: "POST",
    body: JSON.stringify({ ...userData, saved: [] }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export async function fetchUserByUsername(username) {
  const user = await fetch(`${baseUrl}/users`)
    .then((response) => response.json())
    .then((data) => data.filter((user) => user.username === username));
  return user;
}

export async function fetchUserById(userId) {
  return fetch(`${baseUrl}/users/${userId}`).then((response) =>
    response.json()
  );
}
