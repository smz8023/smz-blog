export function getSession(key) {
  return window.sessionStorage.getItem(key);
}
export function setSession(key, val) {
  return window.sessionStorage.setItem(key, val);
}
export function clearSession() {
  return window.sessionStorage.clear();
}
