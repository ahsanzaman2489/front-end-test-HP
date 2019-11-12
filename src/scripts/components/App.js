import React, {Fragment, useEffect, useState} from 'react';
import Defaults from './defaults';
import styles from './app.module.scss';
import {makeRequest} from '../service/';
import SelectBox from './select'
import {HotelDataContext} from '../context'


const App = () => {
  const {sorting, count, reviews, pagination, itemToAdd} = Defaults;
  const [hotels, setHotelsData] = useState(null);
  const [hotelsToRender, setHotelsToRender] = useState([]);
  const [previousIndex, setPreviousIndex] = useState(0);

  useEffect(() => {
    requestData('http://fake-hotel-api.herokuapp.com/api/hotels');
  }, []);

  useEffect(() => {
    if (hotels) {
      const newData = extractData(previousIndex, pagination ? count : hotels.length);
      setData(newData);
    }
  }, [hotels]);

  const setData = (data) => {
    setHotelsToRender([...hotelsToRender, ...data]);
    setPreviousIndex(previousIndex + data.length);
    console.log(previousIndex, data.length)
  };
  const extractData = (previousIndex, index) => {
    return hotels.slice(previousIndex, index);
  };

  const onLoadHandler = (e) => {
    e.preventDefault();
    const newData = extractData(previousIndex, itemToAdd + previousIndex);
    setData(newData);
  };

  const requestData = async (link = 'http://fake-hotel-api.herokuapp.com/api/hotels') => {
    const response = await makeRequest(link);
    setHotelsData(response.data);
  };
  return (
    <HotelDataContext.Provider value={hotelsToRender}>
      <div className={styles.wrapper}>
        <div className={'row-flex'}>
          <div className={'col-2'}>
            <SelectBox/>
          </div>
          <div className={'col-2 text-right'}>
            <SelectBox/>
          </div>
          {hotelsToRender && <div>{hotelsToRender.map((hotel, index) => (<div key={index}>{hotel.city}</div>))}</div>}
          {hotels && !(hotelsToRender.length >= hotels.length) &&
          <a id="load-more" onClick={onLoadHandler}>load more</a>}
        </div>
      </div>
    </HotelDataContext.Provider>
  )
};


export default App;
