class AuthApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
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
        return response.json();
      })
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        password,
        email
      })
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data){
          localStorage.setItem('userId', data._id);
          return data;
        }
      })
      .catch(err => console.log(err))
  }

  checkToken() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers
    })
    .then((response) => {
      return response.json();
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
