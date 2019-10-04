/**
 * Imports
 */
import socialImg from '@images/estanciaazul.ico';

/**
 * Template que genera el contenido del componente
 */
const htmlTemplate = () => {
  return `<div class='footer-content'>
                <p>Una creación de <a class='link' href='https://www.laestanciaazul.com/'> Ismael Bernal</a></p>
                <p>Alumnno del bootcamp <a class='link' href='https://keepcoding.io/es/keepcoding-web-development-master-bootcamp/'> Fullstack Web Development VII Edición</a> de KeepCoding</p>
        </div>
        <div class='social'>
            <a class='social-icon social-icon--img' href='https://laestanciaazul.com'>
                <img src='${socialImg}' alt=''>
            </a>   
            <a class='social-icon' href='https://github.com/IsmaelB83'>
                <i class='fab fa-github social-icon--github'></i>
            </a>
            <a class='social-icon' href='https://www.linkedin.com/in/ismael-bernal-10497a51/'>
                <i class='fab fa-twitter social-icon--twitter'></i>
            </a>
            <a class='social-icon' href='https://twitter.com/Ismab83'>
                <i class='fab fa-linkedin social-icon--linkedin'></i>
            </a>
        </div>`;
};

/**
 * Metodo que renderiza el componente en el parent indicado
 * @param {HTMLElement} parent Parent sobre el que añadir el componente
 */
const render = parent => {
  // Añado el componente
  parent.innerHTML = htmlTemplate();
};

/**
 * Exports
 */
export default render;
