import { fetchUserById } from "./users";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function fetchSavedByUserId(userId) {
  return fetch(`${baseUrl}/users/${userId}`)
    .then((response) => response.json())
    .then((data) => data.saved);
}

export async function fetchSavedTechniquesByUserId(userId) {
  if (userId === -1) {
    return null;
  }
  const savedList = await fetchUserById(userId).then((data) => data.saved);

  return fetch(`${baseUrl}/techniques`)
    .then((response) => response.json())
    .then((data) => data.filter((entry) => savedList.includes(entry.id)));
}

export async function updateUserSaved(userId, savedData) {
  return fetch(`${baseUrl}/users/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      saved: savedData,
    }),
  })
    .then((response) => response.json())
    .then((data) => data.saved);
}
