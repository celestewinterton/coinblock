
export async function easyFetch(url, options = {}) {
  // set options.method to 'GET' if there is no method
  options.method = options.method || 'GET';
  // set options.headers to an empty object if there is no headers
  options.headers = options.headers || {};

  // call the default window's fetch with the url and the options passed in
  const res = await window.fetch(url, options);

  return res;
}
