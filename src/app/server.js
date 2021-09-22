import { BASE_SERVER_URL, SERVER_ERR } from './consts';

const server = async ({ method, path, body, passToken }) => {
  try {
    const loginToken = localStorage.getItem('loginToken') || '';

    if (passToken && !loginToken) {
      return Promise.reject(SERVER_ERR.ERR_LOGIN);
    }

    const query = passToken ? `?loginToken=${loginToken}` : '';
    const url = BASE_SERVER_URL + path + query;
    const config = {
      method,
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    };

    const res = await fetch(url, config);
    const { ok, msg, data } = await res.json();

    return ok
      ? Promise.resolve(data)
      : Promise.reject(SERVER_ERR[msg] ?? SERVER_ERR.ERR_UNKNOWN);
  } catch {
    return Promise.reject(SERVER_ERR.ERR_CONN);
  }
};

export default server;
