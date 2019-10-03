/**
 * Tras el click hace toggle sobre la clase indicada
 * @param {Node} element Elmemento del DOM
 * @param {String} cssClass CSS Class to perform the toggle
 */
const toggleClass = element => cssClass => {
  element.classList.toggle(cssClass);
};

/**
 * Removes the specified class to the specified element
 * @param {Node} element Elmemento del DOM
 * @param {String} cssClass CSS Class to perform the toggle
 */
const removeClass = element => cssClass => {
  element.classList.remove(cssClass);
};

/**
 * Adds the specified class to the specified element
 * @param {Node} element Elmemento del DOM
 * @param {String} cssClass CSS class to add
 */
const addClass = element => cssClass => {
  element.classList += ` ${cssClass}`;
};

// Toogle loader
const loader = document.querySelector('#loader');
const toggleLoader = toggleClass(loader);

export { toggleLoader, toggleClass, removeClass, addClass };
