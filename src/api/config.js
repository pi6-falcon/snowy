import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'http://falcon-env.eba-cmdxqxgx.us-east-2.elasticbeanstalk.com/api/',
});

export { instance, Axios };
