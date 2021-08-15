export const BASE_SERVER_URL = process.env.REACT_APP_BASE_SERVER_URL;

export const SERVER_ERR = {
  ERR_CONN: 'Check your connection!',
  ERR_UNKNOWN: 'Unknown error occured!',
  ERR_LOGIN: 'You are not logged in!',
  ERR_LOGIN_TOKEN: 'Invalid login token!',
  ERR_LOGIN_INVALID: 'Invalid login!',
  ERR_USERNAME_INVALID: 'Enter a valid Username!',
  ERR_PASSWORD_INVALID: 'Enter a valid Password!',
  ERR_USERNAME_TAKEN: 'Username already taken!',
  ERR_USERNAME_NOT_FOUND: 'Username does not exist!',
  ERR_CREDS_UNMATCHED: 'Username and Password does not match!',
  ERR_TASK_INVALID_BODY: 'Invalid body of Task!',
  ERR_TASK_NOT_FOUND: 'Task does not exist!',
};
