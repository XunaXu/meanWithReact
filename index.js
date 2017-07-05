const express = require('express');
const app = express();

app.get('/', function (req, res){
	res.send('Hello, World');
});

app.listen(7890, function(){
	console.log(' Example listening on port 7890');
});
