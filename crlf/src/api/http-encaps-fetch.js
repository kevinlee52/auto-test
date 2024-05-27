import {isPlainObject, cloneDeep} from 'lodash';
import qs from 'qs';
import {message} from 'antd';

const BASE_URL = '/api';

const http = function http(config){
    if (!isPlainObject(config)) config = {};
    config = Object.assign({
        url:'',
        method: 'GET',
        credentials: 'include',
        headers: null,
        body: null,
        params: null,
        responseType: 'json',
        signal: null,
    }, config)
    if(!config.url) throw new TypeError('url is required');
    if (!isPlainObject(config.headers)) config.headers = {};
    if (config.params !== null && !isPlainObject(config.params)) config.params = null;
    
    let {url, method, credentials, headers, body, params, responseType, signal} = config; 

    url = BASE_URL + url;

    if(params) {
        url += `${url.includes('?') ? '&' : '?'}${qs.stringify(params)}`;
    }

    if (isPlainObject(body)){
        body.qs.stringify(body);
        headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    let token = localStorage.getItem('tk');
    if (token) headers['authorization'] = token;

    method = method.toUpperCase();
    config = {
        method,
        credentials,
        headers,
        caches:'no-cache',
        signal
    }

    if(/^(POST|PUT|PATCH)$/i.test(method) && body) config.body = body;

    return fetch(url, config)
    .then(response=>{
        let {status, statusText} = response;
        if(/^(2|3)\d{2}$/.test(status)) {
            // if not response.json(), based on responseType to get response.text() or response.arrayBuffer() or response.blob()
            return response.json();
        }
        return Promise.reject({
            code: -100,
            status,
            statusText
        })
    })
    .catch(reason => {
        if (reason && typeof reason === 'object'){
            let {code, status} = reason;
            if (code===-100) {
                switch (+status){
                    case 400:
                        message.error('400')
                        break;
                }

            }else if (code === 20){
                message.error('20 request stop by user')
            }
        }
        message.error('unknown network issue, try later')
        return Promise.reject(reason)
    })
};

["GET", "HEAD", "OPTIONS", "DELETE"].forEach(item=>{
    http[item.toLowerCase()] = function(url, config){
        if (!isPlainObject(config)) config = {};
        config['url'] = url;
        config['method'] = item;
        return http(config);
    }
});

["POST", "PUT", "PATCH"].forEach(item=>{
    http[item.toLowerCase()] = function(url, body, config){
        if (!isPlainObject(config)) config = {};
        config['url'] = url;
        config['method'] = item;
        config['body'] = body;
        return http(config);
    }
})


// http.get('/api/url', {
//     params: {}
// })

// http({
//     url:'/api/xxx',
//     method: 'GET',
//     params:{}
// })

export default http;