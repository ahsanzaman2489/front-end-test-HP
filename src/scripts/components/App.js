import React, {useEffect, useState, lazy, Suspense, Fragment} from 'react';
import Defaults from './defaults';
import './app.module.scss';
import {makeRequest} from '../service/';
import {HotelDataContext} from '../context';
import loadingSrc from './double-ring.gif';
import * as QueryString from 'query-string';

const SelectBox = React.lazy(() => import('./Select'));
const InputField = React.lazy(() => import('./Input'));
const HotelList = React.lazy(() => import('./HotelListComponent'));


const App = () => {
  const {sorting, count, reviews, pagination, itemToAdd} = Defaults;
  const [loading, setLoading] = useState(false);
  const [hotels, setHotelsData] = useState(null);
  const [hotelsToRender, setHotelsToRender] = useState([]);
  const [previousIndex, setPreviousIndex] = useState(0);
  const [input, setInputHandler] = useState({
    min_stars: '1',
    max_price: ''
  });

  const apiLink = 'http://fake-hotel-api.herokuapp.com/api/hotels';

  const starsData = [1, 2, 3, 4, 5];

  useEffect(() => {
    requestData('http://fake-hotel-api.herokuapp.com/api/hotels');
  }, []);

  useEffect(() => {
    console.log(hotels)
    if (hotels && !hotels.error) {
      const newData = extractData(previousIndex, pagination ? count : hotels.length);
      setDataToRender(newData);
    }
  }, [hotels]);

  const setDataToRender = (data, type) => {
    console.log(type)
    type === 'load' ? setHotelsToRender([...hotelsToRender, ...data]) : setHotelsToRender([...data]);
    setPreviousIndex(previousIndex + data.length);
  };
  const extractData = (previousIndex, index) => {
    return hotels.slice(previousIndex, index);
  };

  const onLoadHandler = (e) => {
    e.preventDefault();
    const newData = extractData(previousIndex, itemToAdd + previousIndex);
    setDataToRender(newData, 'load');
  };

  const requestData = async (link = apiLink) => {
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

  const onChangeHandler = (e) => {
    e.preventDefault();
    setInputHandler({...input, [e.currentTarget.name]: e.currentTarget.value})
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let newLink = apiLink + '?' + QueryString.stringify(input);
    setPreviousIndex(0);
    requestData(newLink);
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

  const Button = ({children, ...props}) => {
    return <button {...props}>{children}</button>;
  };

  return (
    <HotelDataContext.Provider value={hotelsToRender}>
      <div className={'wrapper'}>
        {!loading ? <Fragment>
          {(hotelsToRender.length > 0 && hotels != null) ? <div className={'row-flex'}>
            <div className={'col-1-5'}>
              <form onSubmit={onSubmitHandler}>
                <div className={'row-flex'}>
                  <div className={'col-1'}>
                    <Suspense fallback={<FallBack/>}>
                      {sorting.stars &&
                      <SelectBox onChange={onChangeHandler} options={starsData} name="min_stars"
                                 value={input.min_stars}/>}
                    </Suspense>
                  </div>
                  <div className={'col-1'}>
                    <Suspense fallback={<FallBack/>}>
                      {sorting.price &&
                      <InputField onChange={onChangeHandler} name="max_price" value={input.max_price}/>}
                    </Suspense>
                    <Button type='submit'>
                      submit
                    </Button>
                  </div>
                </div>
              </form>
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
