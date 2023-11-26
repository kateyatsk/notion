const BASE_URL = "http://localhost:5001";

export default class FetchURL {
  static createNote(title, content, id, currentDate) {
    return fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        userId: id,
        dateCreated: currentDate,
      }),
    });
  }

  static editNote(title, content, userId, noteId) {
    return fetch(`${BASE_URL}/notes/${noteId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        dateCreated: new Date(),
        userId: userId,
      }),
    });
  }

  static getNoteById(id) {
    return fetch(`${BASE_URL}/notes/${id}`).then((response) => response.json());
  }

  static getUserById(email, password) {
    return fetch(`${BASE_URL}/users?email=${email}&password=${password}`)
      .then((response) => response.json());
  }

  static getNotesByUserId(userId) {
    return fetch(`${BASE_URL}/notes?userId=${userId}`).then((response) => response.json());
  }

  static deleteNote(noteId) {
    return fetch(`${BASE_URL}/notes/${noteId}`, {
      method: 'DELETE',
    });
  }

  static getUsers(userData) {
    console.log(userData);
    return fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }).then((response) => response.json());
  }
}
