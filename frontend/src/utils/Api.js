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

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${token}`,
        ...this._headers
      }
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Authorization" : `Bearer ${token}`,
        ...this._headers
      }
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  saveUserInfo(name, about, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        "Authorization" : `Bearer ${token}`,
        ...this._headers
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  saveAvatar(avatar, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Authorization" : `Bearer ${token}`,
        ...this._headers
      },
      body: JSON.stringify({
        avatar
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  addNewCard(name, link, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        "Authorization" : `Bearer ${token}`,
        ...this._headers
      },
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`,
        ...this._headers
      },
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      headers: {
        "Authorization" : `Bearer ${token}`,
        ...this._headers
      },
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
