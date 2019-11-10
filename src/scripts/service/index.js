import axios from 'axios';

export const makeRequest = (link) => {
  return axios.get(link)
};
