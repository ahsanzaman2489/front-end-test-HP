import React, {useEffect, useState, lazy, Suspense, Fragment} from 'react';
import Defaults from './defaults';
import './app.module.scss';
import {makeRequest} from '../service/';
import {HotelDataContext} from '../context';
import loadingSrc from './double-ring.gif';

const SelectBox = React.lazy(() => import('./Select'));
const HotelList = React.lazy(() => import('./HotelListComponent'));


const App = () => {
  const {sorting, count, reviews, pagination, itemToAdd} = Defaults;
  const [loading, setLoading] = useState(false);
  const [hotels, setHotelsData] = useState(null);
  const [hotelsToRender, setHotelsToRender] = useState([]);
  const [previousIndex, setPreviousIndex] = useState(0);

  useEffect(() => {
    requestData('http://fake-hotel-api.herokuapp.com/api/hotels');
  }, []);

  useEffect(() => {
    if (hotels && !hotels.error) {
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
    setLoading(true);
    try {
      const response = await makeRequest(link);
      setHotelsData(response.data);
      setLoading(false);
    }
    catch (err) {
      setLoading(false);
      if (err) setHotelsData([]);
    }

  };

  const Loading = ({src}) => {
    return <img src={src} alt=""/>;
  };
  const FallBack = () => {
    return <div>...loading</div>;
  };

  const Error = ({message}) => {
    return <div>{message}</div>;
  };

  return (
    <HotelDataContext.Provider value={hotelsToRender}>
      <div className={'wrapper'}>
        {!loading ? <Fragment>
          {(hotelsToRender.length > 0 && hotels != null) ? <div className={'row-flex'}>
            <div className={'col-1-5'}>
              <div className={'row-flex'}>
                <div className={'col-1'}>
                  <Suspense fallback={<FallBack/>}>
                    {sorting.stars && <SelectBox/>}
                  </Suspense>
                </div>
                <div className={'col-1'}>
                  <Suspense fallback={<FallBack/>}>
                    {sorting.price && <SelectBox/>}
                  </Suspense>
                </div>
              </div>
            </div>
            <Suspense fallback={<FallBack/>}>
              <div className={'col-4-5'}>
                <HotelList/>
                {hotels && !(hotelsToRender.length >= hotels.length) &&
                <a id="load-more" onClick={onLoadHandler}>load more</a>}
              </div>
            </Suspense>
          </div> : <Error message={'An error occured please try again!'}/>}
        </Fragment> : <Loading src={loadingSrc}/>}
      </div>
    </HotelDataContext.Provider>
  )
};


export default App;
