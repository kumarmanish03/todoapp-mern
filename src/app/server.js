import { BASE_SERVER_URL, SERVER_ERR } from './consts';

const run = async (method, path, body) => {
  try {
    const url = BASE_SERVER_URL + path;
    const config = {
      method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
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

const server = {
  get: path => run('get', path),
  post: (path, body) => run('post', path, body),
  put: (path, body) => run('put', path, body),
  delete: path => run('delete', path),
};

export default server;
