/**
 * @param {httpInterception}
 * @returns
 */
function httpInterception(id) {
  return window.location.href.slice(window.location.href.indexOf(`${id}`));
}

export default httpInterception;
