import axios from 'axios';

export default class TweetController {
  static getAll() {
    return axios.get('http://127.0.0.1:5000/tweets');
  }

  static getSpecificTweet(tweetID) {
    return axios.get(`http://127.0.0.1:5000/tweets/${tweetID}`);
  }
}
