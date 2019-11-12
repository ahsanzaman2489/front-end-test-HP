import React, {useEffect, useState, lazy, Suspense} from 'react';
import Defaults from './defaults';
import styles from './app.module.scss';
import {makeRequest} from '../service/';
import SelectBox from './Select';
import {HotelDataContext} from '../context';

const HotelList = React.lazy(() => import('./HotelListComponent'));


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
      setDataToRender(newData);
    }
  }, [hotels]);

  const setDataToRender = (data) => {
    setHotelsToRender([...hotelsToRender, ...data]);
    setPreviousIndex(previousIndex + data.length);
  };
  const extractData = (previousIndex, index) => {
    return hotels.slice(previousIndex, index);
  };

  const onLoadHandler = (e) => {
    e.preventDefault();
    const newData = extractData(previousIndex, itemToAdd + previousIndex);
    setDataToRender(newData);
  };

  const requestData = async (link = 'http://fake-hotel-api.herokuapp.com/api/hotels') => {
    const response = await makeRequest(link);
    setHotelsData(response.data);
  };
  return (
    <HotelDataContext.Provider value={hotelsToRender}>
      <div className={styles.wrapper}>
        <div className={'row-flex'}>
          <div className={'col-1-5'}>
            <div className={'row-flex'}>
              <div className={'col-1'}>
                {sorting.stars && <SelectBox/>}
              </div>
              <div className={'col-1'}>
                {sorting.price && <SelectBox/>}
              </div>
            </div>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <div className={'col-4-5'}>
              {hotelsToRender && <HotelList/>}
              {hotels && !(hotelsToRender.length >= hotels.length) &&
              <a id="load-more" onClick={onLoadHandler}>load more</a>}
            </div>
          </Suspense>

        </div>
      </div>
    </HotelDataContext.Provider>
  )
};


export default App;
