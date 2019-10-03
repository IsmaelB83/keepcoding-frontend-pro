// Styles
import './css/styles.css';
/*
- En caso de pasar el ==> options: { modules: true; } al css-loader me hashea las clases de css.
- Entonces tengo que cargar el css en un objeto. Por ejemplo lo llamo styles en el import.
- Luego tengo que hacer referencia a ellas a través del objetvo styles.[nombre_clase]
import styles from './css/styles.css';
<div class="${styles.example}">
</div>;
*/
// Imports
import { toggleLoader } from './js/components/ui.js';
import renderDetail from './js/containers/detail.js';
import renderLogin from './js/containers/login.js';
import renderHome from './js/containers/home.js';
import renderCart from './js/containers/cart.js';
import state from './js/state/index.js';

// Intento login via local storage
login();
async function login() {
  try {
    // Muestro el panel de carga de la autenticación
    toggleLoader('d-none');
    // Obtengo el string del local storage
    const lsString = localStorage.getItem('BeerflixIBA');
    if (lsString) {
      // Si existe lo convierto a JSON
      const lsJSON = JSON.parse(lsString);
      if (lsJSON) {
        // Intento autenticar con el email del local storage
        const auth = await state.login(lsJSON.user.email);
        if (auth) {
          // Si es corecto navego al index
          // eslint-disable-next-line no-undef
          page.redirect('/');
        } else {
          localStorage.clear();
        }
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    // Quito el panel de carga de la autenticación
    toggleLoader('d-none');
  }
}

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
