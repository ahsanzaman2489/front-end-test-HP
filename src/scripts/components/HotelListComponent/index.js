import React from 'react';
import {HotelDataContext} from '../../context';

const HotelList = () => {
  return (
    <HotelDataContext.Consumer>
      {hotels => <div className={'row-flex'}>{hotels.map((hotel, index) => (
        <div className={'col-1'} key={index}>{hotel.city}</div>))}</div>}
    </HotelDataContext.Consumer>
  )
};

export default HotelList;
