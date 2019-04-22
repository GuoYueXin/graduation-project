import { getSession } from 'utils';

const EXCLUDE_PATH = [
  '/login',
  '/register',
  '/resetPwd',
  '/home',
];

if (EXCLUDE_PATH.indexOf(window.location.pathname) < 0 && !getSession('isLogin')) {
  window.location = '/login';
}
