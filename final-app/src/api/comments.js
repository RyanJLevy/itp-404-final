const baseUrl = process.env.REACT_APP_API_BASE_URL;

export function postComment(commentData) {
  return fetch(`${baseUrl}/comments`, {
    method: "POST",
    body: JSON.stringify(commentData),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => response.json());
}

export function deleteComment(commentData) {
  return fetch(`${baseUrl}/comments/${commentData.id}`, {
    method: "DELETE",
  });
}
