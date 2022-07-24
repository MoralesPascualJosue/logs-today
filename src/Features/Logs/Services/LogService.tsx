import Log from "../Interfaces/Log";

const ENDPOINT = import.meta.env.VITE_ENDPOINT;

export default {
  getLogsChannel: async function (channelName: String, jwt: String, token: String) {
    return fetch(`${ENDPOINT}/logs`, {
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
        const logs = res;

        return {channelName: channelName || "Inicio", logs: logs};
      });
  },

  push: async function (log: Log, jwt: String, token: String) {
    return fetch(`${ENDPOINT}/logs`, {
      method: "POST",
      // credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${jwt}`,
        AuthorizationToken: `${token}`,
      },
      body: JSON.stringify(log),
    })
      .then((res) => {
        if (!res.ok)
          switch (res.status) {
            case 401:
              throw {message: "Credentials are invalid !!", status: 401};
              break;
            case 500:
              // throw new Error("Server not responding !");
              throw {message: "Server not responding !!", status: 500};
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
};
