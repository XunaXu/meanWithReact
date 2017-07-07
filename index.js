const express = require('express');
const MongoClient= require('mongodb').MongoClient;
//const Mongo= require('mongo').MongoClient;

const app = express();

var url='mongodb://localhost:27017/test';

//sample database
// > db.tests.find({}).toArray()
// [
// 	{
// 		"_id" : ObjectId("595efe8c104e61ee901840ae"),
// 		"testItem" : "random",
// 		"testNum" : 10
// 	},
// 	{
// 		"_id" : 1,
// 		"testNum" : 11,
// 		"testName" : "Process"
// 	}
// ]



//testing setting up mongodb correctly
app.get('/mongodb', function (req, res) {
		//need a parser
		//{tests.testNum:10} maybe string,
		req={
			collectionName:'tests',
			queryField: 'testNum',
			queryValue: 10
		};

		//make the query works for mongodb. digest
		var query = '{\"'+req.queryField+'\":'+req.queryValue+'}';
		var queryObj= JSON.parse(query);

		//console.log('hello',req.queryField,+' '+ queryObj);

		MongoClient.connect(url, function(err, db){
				console.log("mongodb Connected successfully");
				db.collection(req.collectionName).find(queryObj).toArray(function(err, results){
					console.log('found');
					console.log(results);
					res.send(docs);
					db.close();  //give me something to indicate db closed.
				});
		});

})


//testing setting up express js correctly
app.get('/', function (req, res){
	res.send('Hello, Express js s working');
});

app.listen(7890, function(){
	console.log(' Example listening on port 7890');
});
