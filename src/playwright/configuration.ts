export interface Account {
  loggedInState: string;
  username: string;
  email: string;
  password: string;
}

export interface Accounts {
  admin: Account;
  author: Account;
}

interface Configuration extends Accounts {
  baseURL: string;
  admin: Account;
  author: Account;
}

export const LOGGED_IN_STATES_DIRECTORY = 'tmp/loggedInStates';

export const configuration: Configuration = {
  baseURL: 'http://wordpress.lndo.site',
  admin: {
    loggedInState: `${LOGGED_IN_STATES_DIRECTORY}/adminStorageState.json`,
    username: 'admin',
    email: 'admin@example.com',
    password: 'FT@U19peTb4#*BaELd',
  },
  author: {
    loggedInState: `${LOGGED_IN_STATES_DIRECTORY}/authorStorageState.json`,
    username: 'author',
    email: 'author@example.com',
    password: 'FT@U19peTb4#*BaELd',
  },
}
