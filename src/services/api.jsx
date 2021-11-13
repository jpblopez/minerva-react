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

  static getModel() {
    return api.get('/model');
  }
  
  static getModelTweets() {
    return api.get('/model/tweets')
  }
}

export default FlaskApi;
