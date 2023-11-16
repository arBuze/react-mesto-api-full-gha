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
      credentials: 'include',
      headers: {
        "Authorization": token,
        ...this._headers
      }
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  getInitialCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      credentials: 'include',
      headers: {
        "Authorization": token,
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
      credentials: 'include',
      headers: {
        "Authorization": token,
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
      credentials: 'include',
      headers: {
        "Authorization": token,
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
      credentials: 'include',
      headers: {
        "Authorization": token,
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
      credentials: 'include',
      headers: {
        "Authorization": token,
        ...this._headers
      },
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  changeLikeCardStatus(cardId, isLiked,token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'DELETE' : 'PUT',
      credentials: 'include',
      headers: {
        "Authorization": token,
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
