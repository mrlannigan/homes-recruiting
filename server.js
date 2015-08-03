var Hapi = require('hapi'), 
	port = process.argv[2] || 3000, 
	http = require('http'), 
	rp = require('request-promise');
	
var server = new Hapi.Server();
server.connection({ port: port });

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
		reply.file('index.html');
    }
});

server.route({
    method: 'GET',
    path: '/{file}',
    handler: function (request, reply) {
		reply.file(encodeURIComponent(request.params.file));
    }
});

server.route({
    method: 'GET',
    path: '/q/{query}',
    handler: function (request, reply) {
		//perform giphy query
        console.log('User query was :', request.params.query);
		
		//https://www.npmjs.com/package/request-promise
		var giphyAPIKey = "dc6zaTOxFJmzC", 
			r = "";
			url = "http://api.giphy.com/v1/gifs/search" 
				+ "?q=" + encodeURIComponent(request.params.query) 
				+ "&api_key=" + giphyAPIKey, 
			options = { uri : url, method : 'GET'};
		
		rp(options)
			.then(function(body) {
				var giphy = JSON.parse(body), 
					r = {images: []};
				
				console.log("Response received from Giphy");
				
				//giphy returns a lot, we only need 2 images (main / thumb)
				for (var i=0; i<giphy.data.length; i++) {
					r.images.push({
						main:	giphy.data[i].images.downsized_large.url, 
						thumb:	giphy.data[i].images.fixed_height_small_still.url
					});
				}
				
				if (i === 0) r.error = "No images were found matching your search.";
				
				console.log("Giphy returned " + (i--) + " results");
				
				reply(JSON.stringify(r));
			})
			.catch(function(error){
				console.error;
				
				reply(JSON.stringify({error: error}));
			});
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});