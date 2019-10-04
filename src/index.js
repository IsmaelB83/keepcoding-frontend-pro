// Styles
import './css/styles.scss';
//import page from 'page';
/*
- En caso de pasar el ==> options: { modules: true; } al css-loader me hashea las clases de css.
- Entonces tengo que cargar el css en un objeto. Por ejemplo lo llamo styles en el import.
- Luego tengo que hacer referencia a ellas a través del objetvo styles.[nombre_clase]
import styles from './css/styles.css';
<div class="${styles.example}">
</div>;
*/
// Imports
import { toggleLoader } from './js/components/toggles';
import state from './js/state/index';
import './js/routes';

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
          //page.redirect('/');
        } else {
          // Si no es correcto, borro el local storage y me mantengo en el login
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
