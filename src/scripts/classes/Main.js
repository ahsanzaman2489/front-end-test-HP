import Defaults from './defaults';
import {makeRequest} from '../service/';

class Main extends Defaults {


  constructor(options) {
    super();
    this.mergeOptions(options);
  }

  mergeOptions(options) {
    this.setOption(Object.assign({}, this.defaultOptions(), options));
    this.createLayout();
  }

  async requestData(link = 'http://fake-hotel-api.herokuapp.com/api/hotels') {
    const {count, pagination} = this.getOptions();
    const response = await makeRequest(link);
    this.setData(response.data);
    this.renderData(this.getData(pagination ? count : this.getData().length, this.previousIndex));
  };

  renderData(hotels) {
    console.log(hotels);
    const {renderElement} = this.getOptions();
    const $renderElement = document.getElementById(renderElement);

    this.previousIndex = this.previousIndex + hotels.length;

    for (let index = 0; index < hotels.length; index++) {
      let div = document.createElement("div");
      div.innerHTML = `<div>${hotels[index].city}</div>`;
      $renderElement.appendChild(div);
    }

    if (this.previousIndex >= this.hotelsLength) {
      let elem = document.getElementById('load-more');
      elem.parentNode.removeChild(elem);
    }
  }

  createLayout() {
    let layout;
    const {element, sorting, renderElement, itemToAdd, pagination} = this.getOptions();
    const $element = document.getElementById(element);
    layout = `${sorting.stars ? `<div class="filter stars-filter">
                      <select>
                        <option>stars</option>
                      </select>
                    </div>` : ''}
              ${sorting.price ? `
                 <div class="filter stars-filter">
                  <select>
                    <option>price</option>
                  </select>
                </div>` : ''}
                <div id="${renderElement}"></div> 
                ${pagination ? `<a id="load-more">load more</a>` : ''}
`;

    $element.innerHTML = $element.innerHTML + layout;
    if (pagination) {
      document.getElementById('load-more').addEventListener('click', e => {
        e.preventDefault();
        const hotels = this.getData(itemToAdd + this.previousIndex, this.previousIndex);
        this.renderData(hotels);
      });
    }
    this.requestData();
  }

}


export default Main;
