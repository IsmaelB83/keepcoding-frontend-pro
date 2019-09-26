/**
 * Imports
 */
import imgLoading from '@assets/images/loading.gif';

/**
 * Template que genera el contenido del componente
 */
const htmlTemplate = () => {
  return `<div class='loader-api'>
            <img src='${imgLoading}' alt=''>
            <p id='loader-text'>fetching data from API...</p>
        </div>`;
};

/**
 * Metodo que renderiza el componente en el parent indicado
 * @param {HTMLElement} parent Parent sobre el que añadir el componente
 */
const render = parent => {
  parent.innerHTML = htmlTemplate();
};

export default render;
