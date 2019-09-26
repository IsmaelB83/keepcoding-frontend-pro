/**
 * Imports
 */
import Api from '../api/index.js';

/**
 * Definitions
 */
const { login, getBeers, getBeer, postComment, postLike } = Api();

/**
 * Class to handle the global state of the SPA (trying to get similar functionality than redux).
 * It also centralizes the access to the API
 */
class State {
  /**
   * Constructor
   */
  constructor() {
    this.email = null;
    this.apiKey = null;
    this.cart = null;
    this.beers = null;
    this.currentBeer = null;
    this.currentPage = 0;
    this.beersPerPage = 10;
    this.filters = null;
  }

  /**
   * Login user into the state
   */
  login = async email => {
    // API Login
    const result = await login(email);
    if (result && result.success) {
      // User logged in
      this.email = result.user.email;
      this.apiKey = result.user.apiKey;
      // TO-DO: el contenido del carrito también debería tener persistencia en el local storage
      this.cart = [];
      // Obtengo el string del local storage
      const lsString = localStorage.getItem('BeerflixIBA');
      if (lsString) {
        const lsJSON = JSON.parse(lsString);
        // Guardo en el state los filtros del local storage
        this.filters = lsJSON.filters;
      }
      // Si existe lo convierto a JSON
      return true;
    }
    return false;
  };

  /**
   * Logout user from state
   */
  logout = () => {
    // User not logged in
    (this.email = null), (this.apiKey = null);
    this.cart = null;
    //localStorage.clear();
  };

  /**
   * Get info from the current logged in user
   */
  isAuthenticated = () => {
    if (this.email && this.apiKey) {
      return true;
    }
    return false;
  };

  /**
   * Add beer to the shopping cart
   * @param {String} id Beer identification
   */
  addBeerToCart = id => {
    const element = this.beers.find(b => b.beerId === parseInt(id));
    if (element) {
      this.cart.push(element);
    }
  };

  /**
   * Load beers from backend
   */
  loadBeers = async (filter, from, to) => {
    // Fetch data filtering by name
    const results = await getBeers(filter);
    // Filter by date if available
    let fromDate = new Date(from);
    let toDate = new Date(to);
    // Chequeo si los filtros de fecha son validos
    if (fromDate instanceof Date && !isNaN(fromDate) && toDate instanceof Date && !isNaN(toDate)) {
      this.beers = results.beers.filter(beer => {
        const aux = beer.firstBrewed.split('/');
        const brewedDate = new Date(aux[1], '01', aux[0]);
        if (fromDate <= brewedDate && brewedDate <= toDate) {
          return true;
        }
        return false;
      });
    } else {
      this.beers = results.beers;
      fromDate = null;
      toDate = null;
    }
    // Guardo los filtros en local storage
    const auxLS = localStorage.getItem('BeerflixIBA');
    if (auxLS) {
      const auxJSON = JSON.parse(auxLS);
      this.filters = { name: filter, fromDate, toDate };
      auxJSON.filters = { name: filter, fromDate, toDate };
      localStorage.setItem('BeerflixIBA', JSON.stringify(auxJSON));
    }
    // Current page 0
    this.currentPage = 0;
    // Return beers
    return this.beers;
  };

  /**
   * Load beer detail
   */
  loadBeer = async id => {
    // Fetch data filtering by name
    const results = await getBeer(id);
    if (results.success) {
      this.currentBeer = results.beer;
    }
    return this.currentBeer;
  };

  /**
   * Post Like to beer
   */
  postLike = async id => {
    // Fetch data filtering by name
    const results = await postLike(id);
    return results;
  };

  /**
   * Post comment to beer
   */
  postComment = async (id, comment) => {
    // Fetch data filtering by name
    const results = await postComment(id, comment);
    return results;
  };
}

// Instancio la clase state y la retorno
const stateApp = new State();
// Debug
window.state = stateApp;

// Exports
export default stateApp;
