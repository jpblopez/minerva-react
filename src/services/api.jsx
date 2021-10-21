import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000/tweets';
const sentimentUrl = 'http://127.0.0.1:5000/sentiment';

class FlaskApi {
  static getDbData() {
    return axios.get(baseUrl);
  }

  static getSentiment() {
    return axios.get(sentimentUrl);
  }
}

export default FlaskApi;
