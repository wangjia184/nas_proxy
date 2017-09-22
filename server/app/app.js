const http = require('http');
const express = require('express');
const proxy = require('http-proxy-middleware');
const port = 5000


var redirectionIP = '127.0.0.1';

const requestHandler = (request, response) => {

    if( request.headers['from'] &&
    	request.headers['from'] == 'jerry@nas.com' ){
        var ip = request.headers['x-forwarded-for'] || 
        request.connection.remoteAddress || 
        request.socket.remoteAddress ||
        request.connection.socket.remoteAddress;

        if (ip.substr(0, 7) == "::ffff:") {
            ip = ip.substr(7);
        }

        redirectionIP = ip;
        response.end(redirectionIP);

    } else {
    	var url = `http://${redirectionIP}:5000${request.url}`
        response.writeHead(302, {
            'Location': url
        });
        response.end(url)
    }
    
}

const server = http.createServer(requestHandler);

server.listen(port, (err) => {  
  if (err) {
    return console.log('Error occured', err);
  }

  console.log(`Server is listening on ${port}`)
})



const app = express();

const instance = proxy({
    target: `http://${redirectionIP}:18080`, 
    changeOrigin: false,
    onProxyReq : function (proxyReq, req, res) {
      if( req.method == "GET" ){
        
        var url = `http://${redirectionIP}:18080${req.originalUrl}`;
        res.writeHead(302, {
            'Location': url
        });
        res.end(url);

        proxyReq.writable = false;
        proxyReq.finished = true;
      }
    }
});
app.use('/', instance);
app.listen(18080);



