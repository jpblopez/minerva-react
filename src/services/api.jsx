import axios from 'axios';

const baseUrl = "http://127.0.0.1:5000/tweets"

class FlaskApi {
    static getDbData() {
        return axios.get(baseUrl)
    }
}

export default FlaskApi;