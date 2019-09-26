/**
 * Imports
 */
import imgLogo from '@assets/images/logo.png';

/**
 * Template to return HTML
 */
const htmlTemplate = () => {
  return `<div class='login-wrapper'>
                <div class='login-logo'>
                    <img src='${imgLogo}' alt='logo'>
                    <span>Beerflix</span>
                </div>
                <form class='login-form' method='post'>
                    <div class='alert alert-danger d-none' role='alert'>
                    </div>
                    <div class='form-group'>
                        <div class='input-group mb-3'>
                            <div class='input-group-prepend'>
                                <span class='input-group-text'><i class='far fa-envelope'></i></span>
                            </div>
                            <input type='email' class='form-control' placeholder='email...' autoComplete='email' required>
                        </div>
                    </div>
                    <button type='submit' class='btn btn-block btn-primary login-btn--main'>Login</button>
                </form>
            </div>`;
};

/**
 * Method to render login component inside the parent specified as a parameter
 * @param {HTMLElement} parent Parent of the login component
 */
const render = parent => {
  parent.innerHTML = htmlTemplate();
};

/**
 * Metodo que asocia los event listeners pasados como parametros a los objetos que generan los eventos
 * La idea de no tener los listeners definidos en el componente. Es hacer que este componente sea lo
 * más desacoplado posible de la lógica de negocio que gestiona el evento (definida en el container).
 * Trato de aplicar algo similar al patrón component/container de REACT.
 * @param {*} hideAlert Event listener que gestiona la escritura en el input de email
 * @param {*} submitLogin Event listener que gestiona el submit del formulario de login
 */
const addListeners = (hideAlert, submitLogin) => {
  const form = document.querySelector('.login-form');
  const email = document.querySelector("input[type='email']");
  email.addEventListener('keydown', hideAlert);
  form.addEventListener('submit', submitLogin);
};

/**
 * Exports
 */
export { render, addListeners };
