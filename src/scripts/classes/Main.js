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

  constructor(options) {
    console.log(options)
  }

}


export default Main;
