var net = require('net')

var client = new net.Socket()

client.connect(parseInt(process.argv[3]), process.argv[2], function() {
	console.log('> Connected');
	client.write('GET '+process.argv[4]+' HTTP/1.0\n\n');
})

client.on('data', function(data) {
	console.log('> Received:\n' + data);
	// client.destroy(); // kill client after server's response
})

client.on('close', function() {
	console.log('> Connection closed');
})