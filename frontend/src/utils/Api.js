class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include'
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include'
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  saveUserInfo(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  saveAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  signOut() {
    return fetch(`${this._baseUrl}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this._headers,
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }
}

export const api = new Api({
  baseUrl: 'https://api.asid.mesto.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});
