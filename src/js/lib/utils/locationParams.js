import qs from 'querystring';

const locationParams = qs.parse(
  (window.location.search || '').replace(/^\?/, '')
);
export default locationParams;
