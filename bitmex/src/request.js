import axios from 'axios';
import crypto from 'crypto';
import { API_URL, API_SECRET, API_KEY } from './constants';

export default (method, url, body) => {
  const postBody = method === 'POST' ? JSON.stringify(body) : '';

  const expires = Math.round(new Date().getTime() / 1000) + 60;
  const signature = crypto
    .createHmac('sha256', API_SECRET)
    .update(`${method}${API_URL}${url}${expires}${postBody}`)
    .digest('hex');
  const headers = {
    'content-type': 'application/json',
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'api-expires': expires,
    'api-key': API_KEY,
    'api-signature': signature,
  };

  const requestOptions = {
    headers,
    json: true,
    method,
  };

  return axios(`${API_URL}${url}`, postBody ? {
    ...requestOptions,
    data: JSON.parse(postBody),
  } : requestOptions);
};
