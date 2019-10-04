/**
 * Imports
 */
import { toggleClass } from './toggles';
import imgAvatar from '@images/avatar.png';
import imgLoading from '@images/loading.gif';

/**
 * Template to render the beer detail
 * @param {Object} beer Beer to render
 */
const htmlTemplate = beer => {
  // Boxes of ingredients
  let boxhtml = '';
  for (let prop in beer.ingredients) {
    boxhtml += `<div class="detail-box"><h6>${prop}</h6><ul>`;
    if (typeof beer.ingredients[prop] === 'object') {
      boxhtml += beer.ingredients[prop].map(i => `<li>${i.name}</li> `).join('');
    } else if (typeof beer.ingredients[prop] === 'string') {
      boxhtml += `<li>${beer.ingredients[prop]}</li>`;
    }
    boxhtml += '</ul></div>';
  }
  // Detail html
  const html = `<!-- Header section-->
                <h3 class='section-subTitle detail-subTitle'>
                    By ${beer.contributedBy} on ${beer.firstBrewed}
                </h3>
                <h2 class='section-mainTitle'>
                    ${beer.name}
                    <small>
                        <i class="far fa-thumbs-up"></i>
                        <span class='numLikes'>${beer.likes}</span> 
                        <span> likes</span>
                    </small>
                </h2>
                
                <!-- Header section-->
                <article class='detail'>
                    <div class='detail-header row'>
                        <div class='detail-img col-12 col-sm-4 col-md-3'>
                            <img src='${beer.image}' alt='beer'>
                        </div>
                        <div class='detail-info col-12 col-sm-8 col-md-9'>
                            <p class='detail-price'><span class='currency'>$</span>${beer.price}</p>
                            <p class='detail-description'>${beer.description}</p>
                            <div class='detail-order'>
                                <input class='detail-quantity' type='number' maxlength="2" value="1" readonly>
                                <button id='btnAddCart' class='detail-button mr-2' data-id='${beer.beerId}'>
                                    <i class="fas fa-cart-plus"></i> Add to cart
                                </button>
                                <button id='btnLike' class='detail-button' data-id='${beer.beerId}'>
                                    <i class="far fa-thumbs-up"></i> Like
                                    <img src='${imgLoading}' alt=''>
                                </button>
                            </div>
                        </div>           
                    </div>
                    <div class='detail-footer row'>
                        <div class='detail-section col-12'>
                            <h4 class='detail-section--title'>Brewers Tip</h4>
                            <p class='detail-section--content'>${beer.brewersTips}</p>        
                        </div>
                        <div class='detail-section col-12'>
                            <h4 class='detail-section--title'>Ingredients</h4>
                            <div class='detail-boxes'>
                                ${boxhtml} 
                            </div>
                        </div>
                        <div id='comments' class='detail-section col-12 mt-4'>
                            <h4 class='detail-section--title section-commments'>Comments 
                                <small>
                                    <i class="far fa-comments"></i> 
                                    <span>${beer.comment ? beer.comment.length : 0}</span>
                                </small>
                            </h4>
                            <form id="formComment" class="form-comment" data-id='${beer.beerId}'>
                                <textarea id="comment" type="text" placeholder="Comment" required></textarea>
                                <button type="submit" class='detail-button'>
                                    Post Comment
                                    <img src='${imgLoading}' alt=''>
                                </button>
                            </form>
                            <div class='comment-box'>
                            </div>
                        </div>
                    </div>
                </article>
            `;
  return html;
};

/**
 * Method to render this component in the specified parent
 * @param {HTMLElement} parent Parent wich will contain the rendered component
 * @param {Array} beers Beer to render
 */
const render = (parent, beer) => {
  parent.innerHTML = htmlTemplate(beer);
};

/**
 * Metodo que asocia los event listeners pasados como parametros a los objetos que generan los eventos
 * La idea de no tener los listeners definidos en el componente. Es hacer que este componente sea lo
 * más desacoplado posible de la lógica de negocio que gestiona el evento (definida en el container).
 * Trato de aplicar algo similar al patrón component/container de REACT.
 * @param {*} likeBeer Event listener qeu gestiona un like a una beer
 * @param {*} addToCart Event listener que gestiona añadir una beer a la cesta de la compra
 * @param {*} commentBeer Event listener que gestiona añadir un comentario a la beer
 */
const addListeners = (likeBeer, addToCart, commentBeer) => {
  const formComment = document.querySelector('#formComment');
  const buttonAddCart = document.querySelector('#btnAddCart');
  const buttonLike = document.querySelector('#btnLike');
  formComment.addEventListener('submit', commentBeer);
  buttonAddCart.addEventListener('click', addToCart);
  buttonLike.addEventListener('click', likeBeer);
};

/**
 * Incrementa en uno el contador de likes
 * @param {boolean} progress True = en proceso de like, False = like confirmado por la API
 */
const updateLikes = progress => {
  const numLikes = document.querySelector('.section-mainTitle .numLikes');
  const panelLikes = document.querySelector('.section-mainTitle small');
  const buttonLike = document.querySelector('#btnLike');
  // Activa/Desactiva el spinner del botón (mejorar la UX)
  toggleClass(buttonLike)('detail-button--active');
  if (!progress) {
    // Efecto en verde del contador de likes para mejorar la UX
    toggleClass(panelLikes)('active');
    // Incremento el contador de likes actual
    const newLikes = 1 + parseInt(numLikes.innerHTML);
    numLikes.innerHTML = `${newLikes}`;
    // Dejo el boton en verde para mejorar la UX
    toggleClass(buttonLike)('detail-button--done');
    // Efecto de resaltado finaliza en 500ms para dejarlo como estaba
    setTimeout(() => toggleClass(panelLikes)('active'), 500);
  }
};

/**
 * Añade un comentario
 * @param {boolean} progress True = en proceso de comentario, False = comentario confirmado por la API
 */
const updateComments = (progress, comment = '') => {
  const numComments = document.querySelector('#comments .detail-section--title span');
  const panelComments = document.querySelector('#comments .detail-section--title small');
  const buttonComment = document.querySelector('#formComment .detail-button');
  // Activa/Desactiva el spinner del botón (mejorar la UX)
  toggleClass(buttonComment)('detail-button--active');
  if (!progress) {
    // Efecto en verde del contador de likes para mejorar la UX
    toggleClass(panelComments)('active');
    // Incremento el contador de likes actual
    const newComments = 1 + parseInt(numComments.innerHTML);
    numComments.innerHTML = `${newComments}`;
    const now = new Date();
    const boxComments = document.querySelector('.comment-box');
    boxComments.innerHTML += `
                <div class="comment">
                  <img src='${imgAvatar}' class="img-fluid rounded-circle comment-avatar" alt="user Pic">
                  <div class="comment-body">
                    <p class='comment-date'>${now.toISOString()}</p>
                    <p class='comment-text'>${comment}</p>
                  </div>
                </div>`;
    // Dejo el boton en verde para mejorar la UX
    toggleClass(buttonComment)('detail-button--done');
    // Efecto de resaltado finaliza en 500ms para dejarlo como estaba
    setTimeout(() => toggleClass(panelComments)('active'), 500);
  }
};

/**
 * Exports
 */
export { render, addListeners, updateLikes, updateComments };
