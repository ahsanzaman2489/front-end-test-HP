import {makeRequest} from '../service/';

class Main {
  static defaultOptions() {
    return { //Defaults
      sorting: {
        stars: false,
        price: true,
      },
      count: 5,
      reviews: false,
      pagination: 'pagination',
      element: '.hotel-booking-wrapper'
    }
  }

  async getData() {
    const response = await makeRequest('http://fake-hotel-api.herokuapp.com/api/hotels');
    console.log(response)
    return response;
  };

  constructor(options) {
    this.getData()
  }

}


export default Main;
