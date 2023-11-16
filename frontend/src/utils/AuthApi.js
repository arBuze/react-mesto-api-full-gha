class AuthApi {
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

  register(email, password) {
    return fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
      .then((response) => {
        return this._getResponseData(response);
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
      .then((response) => {
        return this._getResponseData(response);
      })
      .then((data) => {
        if (data){
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
      .catch(err => console.log(err))
  }

  signOut(token) {
    return fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: {
        "Authorization" : `Bearer ${token}`,
        ...this._headers
      },
    })
      .then(res => {
        return this._getResponseData(res);
      });
  }

  checkToken(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Authorization" : `Bearer ${token}`,
        ...this._headers
      }
    })
    .then((response) => {
      return this._getResponseData(response);
    })
    .then(data => data)
    .catch(err => console.log(err));
  }
}

export const auth = new AuthApi({
  baseUrl: 'https://api.asid.mesto.nomoredomainsmonster.ru',
  headers: {
    'Content-Type': 'application/json'
  }
});
