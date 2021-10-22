import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
});
const sentimentUrl = 'http://127.0.0.1:5000/sentiment';

class FlaskApi {
  static getDbData() {
    return api.get('/tweets');
  }

  static getData() {
    return api.get('/data');
  }
  static getSentiment() {
    return axios.get(sentimentUrl);
  }
}

export default FlaskApi;
