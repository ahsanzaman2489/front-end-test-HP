class Defaults {
  #options;
  #data;
  previousIndex = 0;

  defaultOptions() {
    return { //Defaults
      sorting: {
        stars: false,
        price: true,
      },
      count: 5,
      reviews: false,
      pagination: false,
      itemToAdd: 5,
      element: 'hotel-booking-wrapper',
      renderElement: 'results'
    }
  }

  getData(index, previousIndex = 0) {
    if (index) {
      return this.#data.slice(previousIndex, index);
    }
    return this.#data
  }

  setData(data) {
    this.hotelsLength = data.length;
    this.#data = data;
  }

  getOptions() {
    return this.#options;
  }

  setOption(options) {
    this.#options = options;
  }


}


export default Defaults;
