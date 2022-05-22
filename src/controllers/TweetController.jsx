import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000';
export default class TweetController {

  static getAll(isFull = true, isClean = false) {
    let parameters = ''
    if (!isFull) {parameters = '?full=false'}
    if (isClean) {parameters = '?clean=true'}

    return axios.get(`${baseUrl}/tweets${parameters}`);
  }

  static getSpecificTweet(tweetID, isFull = true, isClean = false) {
    let parameters = ''
    if (!isFull) {parameters = '?full=false'}
    if (isClean) {parameters = '?clean=true'}

    return axios.get(`${baseUrl}/tweets/${tweetID}${parameters}`);
  }

  static getSpecificTweetSteps(tweetID) {
    return axios.get(`${baseUrl}/tweets/${tweetID}/steps`);
  }
  
  static getVectors() {
    return axios.get(`${baseUrl}/vectors`)
  }
}
