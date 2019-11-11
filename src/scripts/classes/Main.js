import {makeRequest} from '../service/';

class Main {
  #options;
  #data;

  constructor(options) {
    this.mergeOptions(options);
  }

  defaultOptions() {
    return { //Defaults
      sorting: {
        stars: false,
        price: true,
      },
      count: 5,
      reviews: false,
      pagination: 'lazy',
      element: '.hotel-booking-wrapper'
    }
  }

  mergeOptions(options) {
    this.#options = Object.assign({}, this.defaultOptions(), options);
    this.getData();
  }

  async getData() {
    const response = await makeRequest('http://fake-hotel-api.herokuapp.com/api/hotels');
    this.#data = response.data;

    this.createLayout();
  };

  createLayout() {
    const {element} = this.#options;
    const $element = document.getElementById(element);
    $element.innerHTML = $element.innerHTML + `<h1>Ahsan</h1>`;
  }


  // renderData() {
  //   const {count} = this.#options;
  //   console.log(count)
  //   for (let index = 0; index < count; index = index + 1) {
  //     console.log('hellowolrd')
  //   }
  // }


}


export default Main;
