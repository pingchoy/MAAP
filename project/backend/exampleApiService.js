const API_BASE_URL = 'http://localhost:5000';

/**
 * Returns the response of the request in json form or throws an error.
 * 
 * Sample usage in an async function in a file that has imported makeAPIRequest
 * from here:
 * 
 * try {
 *   await makeAPIRequest('auth/login', 'POST', { email, passsword });
 * } catch (err) {
 *   console.log(err.message);
 * }
 */
async function makeAPIRequest(endpoint, givenMethod, givenBody = {}) {
  const reqOptions = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'application/json',
    },
    method: givenMethod,
  };

  // getToken() is some function that retrieves the token of the current user,
  // probably from local storage. It's ok if getToken() returns a non-token
  // value as that'll be caught by the backend and cause an appropriate
  // error to be thrown. It's also ok if this authorization header is provided
  // when it isn't necessary - it'll just be ignored.

  if (givenMethod !== 'GET' && givenBody !== {}) {
    reqOptions.body = JSON.stringify(givenBody);
  }

  const res = await fetch(`${API_BASE_URL}/${endpoint}`, reqOptions);
  const body = await res.json();

  if (res.status >= 200 && res.status < 400) {
    return body;
  }

  throw new Error(body.error);
}

export default makeAPIRequest;
