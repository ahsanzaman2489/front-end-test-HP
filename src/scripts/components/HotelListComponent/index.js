import React, {Fragment} from 'react';
import {HotelDataContext} from '../../context';
import './hotelList.module.scss';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";

const HotelList = () => {
  const options = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,

  };
  return (
    <HotelDataContext.Consumer>
      {hotels => (
        <div className={'singleHotel-wrapper'}>{hotels.map((hotel, index) => (
            <Fragment key={index}>
              <div className={'row-flex singleHotel'}>
                <div className={'col-2-5'}>
                  <Slider {...options}>
                    {hotel.images.map((src, index2) => (
                      <img src={src} alt="" key={index2}/>
                    ))}
                  </Slider>
                </div>
                <div className={'col-3-5 details'}>
                  <div className={'row-flex'}>
                    <div className={'col-2'}><h2>{hotel.name}</h2></div>
                    <div className={'col-2'}>stars</div>
                  </div>
                  <div className={'row-flex'}>
                    <div className={'col-1'}><p className={'city-country'}>{hotel.city} - {hotel.country}</p></div>
                  </div>

                  <div className={'row-flex'}>
                    <div className={'col-1'}><p className={'description'}>{hotel.description}</p></div>
                  </div>
                  <div className={'row-flex'}>
                    <div className={'col-2'}>reviews</div>
                    <div className={'col-2'}><p className={'price'}>{hotel.price}</p>
                      <p className={'start-end-date'}>{hotel.date_start} - {hotel.date_end}</p></div>

                  </div>

                </div>
              </div>
            </Fragment>
          )
        )}
        </div>
      )}
    </HotelDataContext.Consumer>
  )
};

export default HotelList;
