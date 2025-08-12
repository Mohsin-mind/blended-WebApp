import CONST from './constant';

const MILLISECONDS_PER_DAY =
  CONST.MAGIC_NUMBERS.HOURS_PER_DAY *
  CONST.MAGIC_NUMBERS.MINUTES_PER_HOUR *
  CONST.MAGIC_NUMBERS.SECONDS_PER_MINUTE *
  CONST.MAGIC_NUMBERS.MILLISECONDS_PER_SECOND;

export function setCookie(name, value, days = 7) {
  const expires = new Date(
    Date.now() + days * MILLISECONDS_PER_DAY
  ).toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

export function getCookie(name) {
  const cookies = document.cookie.split('; ');
  for (const cookie of cookies) {
    const [key, val] = cookie.split('=');
    if (decodeURIComponent(key) === name) {
      return decodeURIComponent(val);
    }
  }
  return null;
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
}

export function replacePlaceholder(string, prefix, toReplace) {
  return string.replace(prefix, toReplace);
}

export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ');
};
