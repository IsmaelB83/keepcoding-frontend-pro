/**
 * Template to render the list in the cart section
 */
const htmlTemplate = beers => {
  return `<ul class='grid_vertical'>
            ${beers
              .map(beer => {
                return `<li class='beer-item mb-3'>
                          <div class='beer_cart'>
                              <div class='beer_cart-left'>
                                  <a href='/detail/${beer.beerId}'>
                                      <img src='${beer.image}' class='beer-img' alt='beer'>
                                  </a>
                              </div>
                              <div class='beer_cart-right'>
                                  <h5 class='beer-title'><a href='/detail/${beer.beerId}'>${beer.name}</a></h5>
                                  <p class='beer-text'>${beer.description.substring(0, 150) + '...'}</p>
                                  <p class='beer-price'><span class='beer-currency'>$</span>${beer.price}</p>
                              </div>
                          </div>
                        </li>`;
              })
              .join('')}
          </ul>`;
};

/**
 * Method to render this component in the specified parent
 * @param {HTMLElement} parent Parent wich will contain the rendered component
 * @param {Array} beers Beers in the user cart
 */
const render = (parent, beers) => {
  parent.innerHTML = htmlTemplate(beers);
};

/**
 * Exports
 */
export default render;
