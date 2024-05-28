const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app){
    app.use(
        createProxyMiddleware('/api', {
            target:'http://127.0.0.1:9000',
            changeOrigin:true,
            ws:true,
            pathRewrite:{'^/api':''}
        })
    );

    app.use(
        createProxyMiddleware('/jian', {
            // target:'https://news-at.zhihu.com/api/4/news/latest',
            target:'https://www.jianshu.com/asimov',
            changeOrigin:true,
            ws:true,
            pathRewrite:{'^/jian':''}
        })
    );

    app.use(
        createProxyMiddleware('/zhi', {
            target:'https://news-at.zhihu.com/api/4',
            changeOrigin:true,
            ws:true,
            pathRewrite:{'^/zhi':''}
        })
    );
}