/**
 * Imports
 */
import state from '../state/index.js';
import { render as renderForm, updateFilters } from '../components/searchForm.js';
import renderLoader from '../components/loader.js';
import renderFooter from '../components/footer.js';
import renderNavbar from '../components/navbar.js';
import renderLanding from '../components/landing.js';
import { removeClass } from '../components/ui.js';
import { render as renderBeerList, addListeners as addListenersBeers } from '../components/beerList.js';
import { render as renderPaginator, addListeners as addListenersPage } from '../components/paginator.js';

/**
 * Plantilla de la web principal
 */
const templateHTML = () => {
  return `<!-- Landing section -->
          <div id='landing'>
            <!-- Inject Landing JS here -->
          </div>

          <!-- Beers section -->
          <section id='products' class='container section'>
            <div class='row'>
                <div class='col-12'>
                    <h3 class='section-subTitle'>Home delivery</h3>
                    <h2 class='section-mainTitle'>Enjoy your beer</h2>
                    <p class='section-summary'>
                        We have a huge catalog of craft beers. Have a sit, make your order and enjoy your drink as soon as we deliver it to you in the comfort of your home
                    </p>
  
                    <!-- Search Form -->
                    <div id='form'>
                    </div>

                    <!-- Grid -->
                    <div id='grid'>
                      <!-- Inject beers JS here -->
                    </div>

                    <!-- Paginator -->
                    <div id='paginator' class='paginator'>
                    </div>
                  </div>
              </div>
          </section>`;
};

/**
 * Renderiza la web principal
 */
const render = () => {
  // DOM containers
  const header = document.querySelector('#header');
  const footer = document.querySelector('#footer');
  // Inyecto la estructura básica del home
  const app = document.querySelector('#app');
  app.innerHTML = templateHTML();
  const landing = document.querySelector('#landing');
  const form = document.querySelector('#form');
  const grid = document.querySelector('#grid');
  // Render
  renderNavbar(header);
  renderLanding(landing);
  renderForm(form);
  renderLoader(grid);
  renderFooter(footer);
  removeClass(footer)('d-none');
  // Listeners
  componentReady();
};

/**
 * Once rendered, this function adds the logic to the new component
 */
const componentReady = () => {
  // DOM objects
  const form = document.querySelector('#searchForm');
  const reload = document.querySelector('#reloadData');
  // Filtros de sesiones anteriores
  if (state.filters) {
    updateFilters(state.filters.name, state.filters.fromDate, state.filters.toDate);
  }
  // Listeners
  form.addEventListener('submit', searchEventHandler);
  reload.addEventListener('click', refreshEventHandler);
  // Carga de beers (la primera contra la api, el resto contra el state)
  if (!state.beers || state.beers.length === 0) {
    // Las beers se cargan cuando se resuelve la promesa
    state.loadBeers().then(beers => renderBeers(beers));
  } else {
    // Carga inmediata desde el state
    renderBeers(state.beers);
  }
};

/**
 * Recarga la sección de beers cuando es solicitado por el usuario y la API devuelve los datos.
 * Esta función se encarga de mostrar unicamente los max. resultados configurados en la aplicación
 * (ver state.js), y el resto serán paginados
 * @param {Array} beers Array con la información de las beers a mostrar
 */
const renderBeers = beers => {
  // Fetch DOM elements
  const grid = document.querySelector('#grid');
  const paginator = document.querySelector('#paginator');
  // Pagino las cervezas a mostrar, las renderizo y también el paginador
  const start = state.currentPage * state.beersPerPage;
  const end = start + state.beersPerPage;
  const paginatedBeers = beers.slice(start, end);
  renderBeerList(grid, paginatedBeers);
  renderPaginator(paginator, state.currentPage, beers.length, state.beersPerPage);
  // Listeners paginator
  addListenersPage(paginatorClick);
  addListenersBeers(addToCartEventHandler);
};

/**
 * Cuando se hace click en un elemento del paginador
 * @param {*} ev Evento generado en el click
 */
const paginatorClick = ev => {
  ev.preventDefault();
  const { page } = ev.currentTarget.dataset;
  state.currentPage = parseInt(page);
  renderBeers(state.beers);
};

/**
 * Event handler del submit de busqueda
 * @param {Event} ev Evento submit
 */
const searchEventHandler = ev => {
  ev.preventDefault();
  const name = document.querySelector('#inputSearch').value;
  const grid = document.querySelector('#grid');
  let fromDate = document.querySelector('#fromDate').value;
  let toDate = document.querySelector('#toDate').value;
  // Ajusto en caso de que el usuario sólo haya rellando una de las fechas
  if (fromDate === '' && toDate !== '') {
    fromDate = '01/01/1900';
  } else if (toDate === '' && fromDate !== '') {
    toDate = '01/01/9999';
  }
  // Call API to get beers with filter and then update state
  grid.innerHTML = '';
  renderLoader(grid);
  const promise = state.loadBeers(name, fromDate, toDate);
  promise.then(results => {
    renderBeers(results);
  });
};

/**
 * Event handler del submit de busqueda
 * @param {Event} ev Evento submit
 */
const refreshEventHandler = ev => {
  // Prevent default submit behaviour
  ev.preventDefault();
  // Definitions
  const grid = document.querySelector('#grid');
  document.querySelector('#inputSearch').value = '';
  document.querySelector('#fromDate').value = '';
  document.querySelector('#toDate').value = '';
  // Call API to get beers without filters
  grid.innerHTML = '';
  renderLoader(grid);
  state.loadBeers('').then(results => {
    renderBeers(results);
  });
};

/**
 * Handler like beer
 */
const addToCartEventHandler = ev => {
  ev.preventDefault();
  // Actualizo la lista de la compra del state
  state.addBeerToCart(ev.currentTarget.dataset['id']);
  // Update cart items in the navbar
  const numCart = document.querySelector('.cart-items');
  const aux = parseInt(numCart.innerHTML) + 1;
  numCart.innerHTML = `${aux}`;
};

export default render;
