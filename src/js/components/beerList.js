/**
 * Template que genera el component de listado de cervezas
 */
const htmlTemplate = beers => {
  return `<ul class='beer-grid'>
            ${beers
              .map(beer => {
                return `<li class='beer-item'>
                              <div class='beer'>
                                  <div class='beer-top'>
                                      <a href='/detail/${beer.beerId}'>
                                          <img src='${beer.image}' class='beer-img' alt='beer'>
                                          <p class='beer-price'><span class='beer-currency'>$</span>${beer.price}</p>
                                      </a>
                                  </div>
                                  <div class='beer-body'>
                                      <h5 class='beer-title'><a href='/detail/${beer.beerId}'>${beer.name}</a></h5>
                                      <div class='beer-middle'>
                                          <p class='beer-date'>${beer.firstBrewed}</p>
                                          <a href='#' class='beer-btn js--btnAddCart' data-id='${beer.beerId}'>
                                            <i class="fas fa-cart-plus"></i> add to cart
                                          </a>
                                      </div>
                                      <p class='beer-text'>${beer.description.substring(0, 150) + '...'}</p>
                                      <div class='beer-social'>
                                        <p class='beer-likes'>
                                          <i class="far fa-thumbs-up"></i> ${beer.likes !== '' ? beer.likes : 0}
                                          <small class='ml-1'>likes</small>
                                        </p>
                                        <p class='beer-comments'>
                                          <i class="far fa-comments"></i> ${beer.comment ? beer.comment.length : 0} 
                                          <small class='ml-1'>comments</small>
                                        </p>
                                      </div>
                                  </div>
                              </div>
                          </li>`;
              })
              .join('')}
          </ul>`;
};

/**
 * Metodo que renderiza el componente en el parent indicado
 * @param {HTMLElement} parent Parent sobre el que añadir el componente
 * @param {Array} beers Listado de cervezas a renderizar
 */
const render = (parent, beers) => {
  parent.innerHTML = htmlTemplate(beers);
};

/**
 * Metodo que asocia los event listeners pasados como parametros a los objetos que generan los eventos
 * La idea de no tener los listeners definidos en el componente. Es hacer que este componente sea lo
 * más desacoplado posible de la lógica de negocio que gestiona el evento (definida en el container).
 * Trato de aplicar algo similar al patrón component/container de REACT.
 * @param {*} addToCart Event listener que gestiona añadir una beer a la cesta de la compra
 */
const addListeners = addToCart => {
  const buttonsAddCart = document.querySelectorAll('.js--btnAddCart');
  buttonsAddCart.forEach(b => b.addEventListener('click', addToCart));
};

/**
 * Exports
 */
export { render, addListeners };
