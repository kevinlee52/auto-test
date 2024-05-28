import axios from 'axios';
import qs from 'qs';
import { message } from 'antd';
import _ from '../assets/utils';

const http = axios.create({
    baseURL:'api',
    timeout:30000
});

http.defaults.transformRequest = data => {
    if(_.isPlainObject(data)) data = qs.stringify(data);
    return data;
};

http.interceptors.response.use(response => {
    return response.data
}, reason => {
    message.error('Network busy, try it later');
    return Promise.reject(reason)
});

export default http;