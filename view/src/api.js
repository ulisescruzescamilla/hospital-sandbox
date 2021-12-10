import axios from 'axios';

export default axios.create({
    // TOO move base url to config file
  baseURL: `http://localhost/api/`
});