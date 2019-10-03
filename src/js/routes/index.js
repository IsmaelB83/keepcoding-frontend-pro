/**
 * Imports
 */
import page from 'page';
import state from '../state/index';
import renderCart from '../containers/cart';
import renderHome from '../containers/home';
import renderLogin from '../containers/login';
import renderDetail from '../containers/detail';

/**
 * Ruta principal
 */
// eslint-disable-next-line no-undef
page('/login', async () => {
  try {
    renderLogin();
  } catch (error) {
    // Log
    const aux = `ERROR page('/login') ==> ${error.toString()}`;
    console.log(aux);
    alert(aux);
  }
});

/**
 * Ruta con las cervezas
 */
// eslint-disable-next-line no-undef
page('/', () => {
  try {
    // Si está autenticado renderizo el home, si no redirijo a login
    if (state.isAuthenticated()) {
      renderHome();
    } else {
      // eslint-disable-next-line no-undef
      page.redirect('/login');
    }
  } catch (error) {
    // Log
    const aux = `ERROR page('/') ==> ${error.toString()}`;
    console.log(aux);
    alert(aux);
  }
});

/**
 * Ruta con el detalle
 */
// eslint-disable-next-line no-undef
page('/detail/:id', ctx => {
  try {
    // Si está autenticado renderizo el home, si no redirijo a login
    if (state.isAuthenticated()) {
      const {
        params: { id }
      } = ctx;
      renderDetail(id);
    } else {
      // eslint-disable-next-line no-undef
      page.redirect('/login');
    }
  } catch (error) {
    // Log
    const aux = `ERROR page('/detail') ==> ${error.toString()}`;
    console.log(aux);
    alert(aux);
  }
});

/**
 * Ruta con el carrito de la compra
 */
// eslint-disable-next-line no-undef
page('/cart', () => {
  try {
    // Si está autenticado renderizo el home, si no redirijo a login
    if (state.isAuthenticated()) {
      renderCart();
    } else {
      // eslint-disable-next-line no-undef
      page.redirect('/login');
    }
  } catch (error) {
    // Log
    const aux = `ERROR page('/login') ==> ${error.toString()}`;
    console.log(aux);
    alert(aux);
  }
});

// eslint-disable-next-line no-undef
page();
