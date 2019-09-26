/**
 * Default API URL
 */
const API_URL = 'https://web-bootcamp-exercise-beer-api-nijliozdcg.now.sh/api/v1/';

/**
 * Executes a fetch with api key header
 * @param {String} url API url to fetch from
 * @param {String} method Either GET or POST
 * @param {Object} body Objet to include in the body headers (if any)
 * @param {apiKey} apiKey JSON web token to authenticate for backend authencation
 */
const secureFetch = async (url, method, body, apiKey) => {
  // Fetch options
  const options = {};
  options.method = method;
  if (body) options.body = JSON.stringify(body);
  options.headers = { 'Content-type': 'application/json' };
  // API Key when necessary
  if (apiKey) {
    options.headers['X-API-KEY'] = apiKey;
  }
  // Execute fetch
  return await fetch(url, options);
};

/**
 * API Object to consume resources in the backend
 * @param {URL} url Backend API url
 */
const api = (url = API_URL) => {
  /**
   * JSON web tokent to authenticate in the backend
   */
  let API_KEY = '';
  /**
   * Basic routes in the API
   */
  const LOGIN_URL = `${url}user/login`;
  const BEERS_URL = `${url}beers`;

  /**
   * Object with all the methods to interact with the API
   */
  return {
    /**
     * Check our credentials and return the API-KEY
     * @param {String} email Registered email in the API
     */
    login: async email => {
      try {
        // Login
        const response = await secureFetch(LOGIN_URL, 'POST', { email });
        // If not ok exception
        if (!response.ok) {
          return false;
        }
        // If ok
        const result = await response.json();
        API_KEY = result.user.apiKey;
        return result;
      } catch (error) {
        console.error(error.message);
        return null;
      }
    },
    /**
     * Get Beers list
     * @param {String} filter Filter by name in the API
     */
    getBeers: async filter => {
      try {
        // API resource
        const requestUrl = filter ? `${BEERS_URL}?search=${filter}` : BEERS_URL;
        const response = await secureFetch(requestUrl, 'GET', null, API_KEY);
        // Exception
        if (!response.ok) {
          throw new Error('Error fetching beers');
        }
        // Ok
        return await response.json();
      } catch (error) {
        console.error(error.message);
        throw error;
      }
    },
    /**
     * GET beer detail identified by specified ID
     * @param {String} id Beer identification number
     */
    getBeer: async id => {
      try {
        // API resource
        const response = await secureFetch(`${BEERS_URL}/${id}`, 'GET', null, API_KEY);
        // Exception
        if (!response.ok) {
          throw new Error('Error fetching beer');
        }
        // Ok
        return await response.json();
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    /**
     * POST a like to the id beer
     * @param {String} id Beer identification number
     */
    postLike: async id => {
      try {
        // Fetch
        const response = await secureFetch(`${BEERS_URL}/${id}/like`, 'POST', null, API_KEY);
        // Exception
        if (!response.ok) {
          throw new Error('Error al grabar el like');
        }
        // Ok
        return await response.json();
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    /**
     * POST a comment to the id beer
     * @param {String} id Beer identification number
     * @param {String} comment Comment to post
     */
    postComment: async (id, comment) => {
      try {
        // Fetch
        const response = await secureFetch(`${BEERS_URL}/${id}/comment`, 'POST', { comment }, API_KEY);
        // Exception
        if (!response.ok) {
          throw new Error('Error al grabar el comentario');
        }
        // Ok
        return await response.json();
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  };
};

export default api;
