const ENDPOINT = import.meta.env.VITE_ENDPOINT;

export default {
  login: async function ({email, password}) {
    return fetch(`${ENDPOINT}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
    })
      .then((res) => {
        if (!res.ok)
          switch (res.status) {
            case 401:
              throw new Error("Credentials are invalid !!");
              break;
            case 500:
              throw new Error("Server not responding !");
              break;

            default:
              throw new Error("Response is NOT ok");
              break;
          }

        return res.json();
      })
      .then((res) => {
        const {user, access_token, refreshToken} = res;

        return {user, accessToken: access_token, refreshToken};
      });
  },

  register: async function ({email, password, name}) {
    return fetch(`${ENDPOINT}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password, name}),
    })
      .then((res) => {
        if (!res.ok)
          switch (res.status) {
            case 409:
              throw new Error("Credential is already in us !!");
              break;
            case 500:
              throw new Error("Server not responding !");
              break;

            default:
              throw new Error("Response is NOT ok");
              break;
          }

        return res.json();
      })
      .then((res) => {
        return res;
      });
  },

  logout: async function () {
    return fetch(`${ENDPOINT}/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({logOut: "logout"}),
    })
      .then((res) => {
        if (!res.ok)
          switch (res.status) {
            case 401:
              throw new Error("Credentials are invalid !!");
              break;
            case 500:
              throw new Error("Server not responding !");
              break;

            default:
              throw new Error("Response is NOT ok");
              break;
          }

        return res.text();
      })
      .then((res) => {
        return res;
      });
  },

  refresh: async function (jwt: String, token: String) {
    return fetch(`${ENDPOINT}/refresh-tokens`, {
      method: "GET",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${jwt}`,
        AuthorizationToken: `${token}`,
      },
    })
      .then((res) => {
        if (!res.ok)
          switch (res.status) {
            case 401:
              throw {message: "Credentials are invalid !!", status: 401};
              break;
            case 500:
              throw new Error("Server not responding !");
              break;

            default:
              throw new Error("Response is NOT ok");
              break;
          }

        return res.json();
      })
      .then((res) => {
        const {user, access_token, refreshToken} = res;

        return {user, accessToken: access_token, refreshToken};
      });
  },
};
