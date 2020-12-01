const API_BASE_URL = 'http://localhost:5000';

/**
 * Returns the response of the request in json form or throws an error.
 * 
 * Sample usage after importing makeAPIRequest from this file:
 * try {
 *   await makeAPIRequest('auth/login', 'POST', { email, passsword });
 * } catch (err) {
 *   console.log(err.message);
 * }
 */
async function makeAPIRequest(endpoint, method, body = {}) {
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${getToken()}`, // getToken() is some function that retrives the token of the current user, probably from local storage. It's ok if getToken() returns a non-token value as that will be caught by the backend and cause an appropriate error to be thrown from this function. It's also ok if this authorization header is provided when it isn't necessary - it'll just be ignored.
      'Content-Type': 'application/json',
    },
    method: method,
  };

  if (method !== 'GET' && body !== {}) {
    reqOptions.body = JSON.stringify(body);
  }

  const res = await fetch(`${API_BASE_URL}/${endpoint}`, reqOptions);
  const body = await res.json();

  if (res.status >= 200 && res.status < 400) {
    return body;
  }

  throw new Error(body.error);
}

export default makeAPIRequest;
