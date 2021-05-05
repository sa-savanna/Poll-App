import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://poll-b8faa-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default instance;