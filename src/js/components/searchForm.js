/**
 * Template que genera el contenido del componente
 */
const htmlTemplate = () => {
  return `<p class='section-summary section-summary--small'>
                You can search beers by name and/or the interval of brewed dates (if you fill just from or to, the app will do the rest for you)
            </p>
            <form id='searchForm' class='form-search'>
                <div class='row'>    
                    <div class='col'>
                    <label for="inputSearch">Name</label>
                    <input type='text' id='inputSearch' class='form-control input--brown' placeholder='filter by name'>
                    </div>
                </div>
                <div class='row'>
                    <div class='col'>
                    <label for="fromDate">Brewed from</label>
                    <input type='date' id='fromDate' class='form-control input--brown'>
                    </div>
                    <div class='col'>
                    <label for="toDate">To</label>
                    <input type='date' id='toDate' class='form-control input--brown'>
                    </div>
                </div>
                <div class='row'>
                    <div class='col'>
                        <button type='submit' class='button-brown button-brown--fill btn-block'>
                            <i class='fas fa-search'></i> search
                        </button>
                    </div>
                    <div class='col'>
                        <button id='reloadData' class='button-brown button-brown--fill btn-block'>
                            <i class="fas fa-sync"></i> refresh all
                        </button>
                    </div>
                </div>
            </form>`;
};

/**
 * Metodo que renderiza el componente en el parent indicado
 * @param {HTMLElement} parent Parent sobre el que añadir el componente
 */
const render = parent => {
  parent.innerHTML = htmlTemplate({ numItems: 10 });
};

/**
 * Actualiza los filtros según vengan por parametros
 * @param {String} newName Filtro por nombre
 * @param {String} newFromDate Filtro desde fecha
 * @param {String} newToDate Filtro hasta fecha
 */
const updateFilters = (newName, newFromDate, newToDate) => {
  const name = document.querySelector('#inputSearch');
  const fromDate = document.querySelector('#fromDate');
  const toDate = document.querySelector('#toDate');
  name.value = newName || '';
  if (newFromDate) {
    const d = new Date(newFromDate);
    const auxString = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
    fromDate.value = auxString; //yyyy-MM-dd
  }
  if (newToDate) {
    const d = new Date(newToDate);
    const auxString = `${d.getFullYear()}-${('0' + (d.getMonth() + 1)).slice(-2)}-${('0' + d.getDate()).slice(-2)}`;
    toDate.value = auxString; //yyyy-MM-dd
  }
};

/**
 * Exports
 */
export { render, updateFilters };
