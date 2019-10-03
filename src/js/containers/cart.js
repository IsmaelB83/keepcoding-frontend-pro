/**
 * Imports
 */
import state from '../state/index';
import renderFooter from '../components/footer';
import renderNavbar from '../components/navbar';
import renderCart from '../components/beerCart';
import { removeClass } from '../components/toggles';

/**
 * Plantilla de la web principal
 */
const templateHTML = () => {
  let total = 0;
  state.cart.forEach(beer => {
    total += beer.price;
  });
  return `<!-- Beers section -->
          <section id='cart' class='container section section-detail'>
            <div class='row'>
                <div class='col-12'>
                    <h3 class='section-subTitle'>Home delivery</h3>
                    <h2 class='section-mainTitle'>My shopping cart [${state.cart.length}]</h2>
                    
                    <div id='cart_grid'>
                      <!-- Inject beers JS here -->
                    </div>

                    <div class='section-totales'>
                      <h4>Total before taxes: <span class="currency">$</span>${total}</h4>
                      <h4>Total taxes (21%): <span class="currency">$</span>${total * 0.21}</h4>
                      <h4>Total after tax: <span class="currency">$</span>${total + total * 0.21}</h4>
                    </div>

                    <button id='btnCheckout' class='detail-button mt-3'>
                      <i class="fas fa-shopping-basket"></i> Checkout
                    </button>

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
  const app = document.querySelector('#app');
  // Inyecto la estructura básica del home
  app.innerHTML = templateHTML();
  // Render
  const cart = document.querySelector('#cart_grid');
  renderCart(cart, state.cart);
  renderNavbar(header);
  renderFooter(footer);
  removeClass(footer)('d-none');
};

/**
 * Exports
 */
export default render;
