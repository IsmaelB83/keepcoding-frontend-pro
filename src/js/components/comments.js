/**
 * Imports
 */
import imgAvatar from '@images/avatar.png';

/**
 * Template que genera el contenido del componente
 */
const htmlTemplate = comments => {
  console.log(imgAvatar);
  return `${comments
    .map(comment => {
      return `<div class="comment">
                  <img src="${imgAvatar}" class="img-fluid rounded-circle comment-avatar" alt="user Pic">
                  <div class="comment-body">
                      <p class='comment-date'>${comment.dateComment}</p>
                      <p class='comment-text'>${comment.comment}</p>
                  </div>
              </div>`;
    })
    .join('')}`;
};

/**
 * Metodo que renderiza el componente en el parent indicado
 * @param {HTMLElement} parent Parent sobre el que añadir el componente
 */
const render = (parent, comments) => {
  parent.innerHTML = htmlTemplate(comments);
};

/**
 * Exports
 */
export default render;
