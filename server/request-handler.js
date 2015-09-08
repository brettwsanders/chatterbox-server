/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
// require("./message-data.js");
var url = require("url");
// var messages = new Messages();

var results = [];
var nextAvailableID = 0;
var router = {
  "/classes/chatterbox": true,
  "/classes/messages": true,
  "/classes/room1": true,
  "/users": true,
  "/send": true
};

// var router = ['/classes/chatterbox', '/classes']

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  console.log("Serving request type " + request.method + " for url " + request.url);
  console.log("requesting URL:", request.url);
  var url_parts = url.parse(request.url);
  var pathname = url_parts.pathname;
  console.log(pathname);
  
  // debugger;
  // console.dir(request);
  // The outgoing status.
  var statusCode = 404;

  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;


  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  headers['Content-Type'] = "application/json";
  // headers['Content-Type'] = "text/html";

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  

// var messages = [
//   {
//     "createdAt":"2015-09-07T22:18:30.745Z",
//     "objectId":"a4IgVFOR43",
//     "roomname":"lobby",
//     "updatedAt":"2015-09-07T22:18:30.745Z",
//     "username":"Brett"
//   },
//   {
//     "createdAt":"2015-09-07T22:07:51.021Z",
//     "objectId":"2pamrneV9F",
//     "roomname":"all",
//     "text":"this is working",
//     "updatedAt":"2015-09-07T22:07:51.021Z",
//     "username":"taylor"
//   }];


  // var res = JSON.stringify({'results': results});

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  // response.write({'something':'something'});
  // response.end();

  if (router[pathname]) {
    if (request.method === 'GET') {
      statusCode = 200;
      response.writeHead(statusCode, headers);
      response.end(JSON.stringify({'results': results}));
    }
    else if (request.method === 'POST') {
      statusCode = 201;
      response.writeHead(statusCode, headers);
      request.on('data', function(data){
        var msg = JSON.parse(data.toString());
        msg.objectId = nextAvailableID;
        nextAvailableID++;
        console.log(msg);
        results.push(msg);
      });
      console.log(results);
    // debugger;
      // var m = new Message();
      
      response.end("<b>message received!</b>");
    }
    else if (request.method === 'OPTIONS') {
      // console.dir(request);
      statusCode = 200;
      response.writeHead(statusCode, headers);
      // request.on('data', function(data){
      //   // console.log(data.toString());
      // });
      // // debugger;
      // var m = new Message();
      // messages.addMessage
      response.end("<b>oppptions?</b>");
    }
  }
  else {
    response.writeHead(404, headers);
    response.end();
  }

};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;


