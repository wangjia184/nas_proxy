const http = require('http');
const httpProxy = require('http-proxy');
const port = 5000


var redirectionIP = null;

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

        if( redirectionIP != ip ){
            console.log(`IP address changes from ${redirectionIP} to ${ip}`);
            redirectionIP = ip;
        }
        
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

/////////////////////////////////////////

const proxy = httpProxy.createProxyServer({});

http.createServer(function(req, res) {
    
    if( req.method == "GET" ){
        var url = `http://${redirectionIP}:18080${req.url || ''}`;
        res.writeHead(302, { 'Location': url });
        res.end(url);
        return;
    }
    
    if( redirectionIP != null && redirectionIP != '' ){
        proxy.web(req, res, { target: `http://${redirectionIP}:18080` });
    } else {
        res.end("No backend server found");
    }
}).listen(18080);






