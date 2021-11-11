import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
});

class FlaskApi {
  static getDbData() {
    return api.get('/tweets');
  }

  static getData() {
    return api.get('/data');
  }

  static getTokens() {
    return api.get('/tokens');
  }
}

export default FlaskApi;
