/**
 * Template que genera el contenido del componente
 */
const htmlTemplate = ({ currentPage, totalBeers, beersPerPage }) => {
  // Tantas páginas como el total de cervezas del state / numero de cervezas por página
  let numPages = Math.floor(totalBeers / beersPerPage);
  if (numPages === 0) numPages = 1;
  let html = '';
  for (let i = 0; i < numPages; i++) {
    html += `<li class='page-item'>
                    <a class='page-link ${i === currentPage ? 'active' : ''} href='#' data-page='${i}'>${i + 1}</a>
                 </li>`;
  }
  // Retorno el paginador
  return `<ul class='pagination'>
                ${html}
            </ul>`;
};

/**
 * Metodo que renderiza el componente en el parent indicado
 * @param {HTMLElement} parent Parent sobre el que añadir el componente
 */
const render = (parent, currentPage, totalBeers, beersPerPage) => {
  parent.innerHTML = htmlTemplate({ currentPage, totalBeers, beersPerPage });
};

/**
 * Metodo que asocia los event listeners pasados como parametros a los objetos que generan los eventos
 * La idea de no tener los listeners definidos en el componente. Es hacer que este componente sea lo
 * más desacoplado posible de la lógica de negocio que gestiona el evento (definida en el container).
 * Trato de aplicar algo similar al patrón component/container de REACT.
 * @param {*} hideAlert Event listener que gestiona el click en las pages del paginator
 */
const addListeners = clickPage => {
  const links = document.querySelectorAll('.page-link:not(.active)');
  links.forEach(link => link.addEventListener('click', clickPage));
};

/**
 * Exports
 */
export { render, addListeners };
