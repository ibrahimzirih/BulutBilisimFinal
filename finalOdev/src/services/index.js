import axios from 'axios';

const API_KEY = 'd4642ec6f35543bbab81f9ae218e3395';

let path ='http://newsapi.org/v2/top-headlines?country=us&apiKey=d4642ec6f35543bbab81f9ae218e3395';

export function getNews() {
    return new Promise((resolve, reject) => {
        axios.get(path)
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err);
            })
    });
}