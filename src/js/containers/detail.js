/**
 * Imports
 */
import page from 'page';
import state from '../state/index';
import renderLoader from '../components/loader';
import renderFooter from '../components/footer';
import renderNavbar from '../components/navbar';
import {
  render as renderDetail,
  addListeners as addListenersDetail,
  updateLikes,
  updateComments
} from '../components/beerDetail';
import { removeClass } from '../components/toggles';
import renderComments from '../components/comments';

/**
 * Plantilla de la web de detalle
 */
const templateHTML = () => {
  return `<section id='product' class='container section section-detail'>
            <div class='row'>
              
              <div id='detailContent' class='col-12'>
                <!-- Inject JS here -->
              </div>
              
            </div>
          </section>`;
};

/**
 * Prepare page to render login
 */
const render = id => {
  // Pido el detalle a la API a través del state. A partir de la primera carga, las demás son bajo demanda del usuario
  state.loadBeer(id).then(beer => {
    // Las beers se renderizan cuando se resuelva la promesa
    if (beer) {
      // Renderizo el detail
      renderDetail(container, beer);
      if (beer.comment && beer.comment.length > 0) {
        const comments = document.querySelector('.comment-box');
        renderComments(comments, beer.comment);
      }
      addListenersDetail(likeBeerEventHandler, addToCartEventHandler, commentBeerEventHandler);
    } else {
      // eslint-disable-next-line no-undef
      page.redirect('/');
    }
  });
  // Renderizo al pantalla excepto el beer
  const header = document.querySelector('#header');
  const app = document.querySelector('#app');
  const footer = document.querySelector('#footer');
  renderNavbar(header);
  app.innerHTML = templateHTML();
  const container = document.querySelector('#detailContent');
  renderLoader(container);
  renderFooter(footer);
  removeClass(footer)('d-none');
};

/**
 * Handle like beer
 */
const likeBeerEventHandler = ev => {
  ev.preventDefault();
  // Se inicia el proceso de like, y se solicita a la API que lo registre
  updateLikes(true);
  state.postLike(state.currentBeer.beerId).then(results => {
    if (results.success) {
      // El like ha terminado
      updateLikes(false);
    }
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

/**
 * Handle comment on beer
 */
const commentBeerEventHandler = ev => {
  ev.preventDefault();
  const comment = document.querySelector('#comment');
  // Update UI para mejorar la UX
  updateComments(true);
  // Post del comment a la API
  state.postComment(state.currentBeer.beerId, comment.value).then(results => {
    if (results.success) {
      // Cuando se resuelve la promesa vuelvo a actualizar la UI para mejorar la UX
      updateComments(false, comment.value);
      comment.value = '';
    }
  });
};

export default render;
