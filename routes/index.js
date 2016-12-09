var express = require('express');
var router = express.Router();

/* GET home page. 

 localhost:3000/convert/csv/to/json
*/
router.get('/convert/csv/to/json',function(req,res,next) {

console.log("get request");
  var Converter = require("csvtojson").Converter;
  var converter = new Converter({constructResult:false}); //for big csv data 
  var response = [];
  var count = 0;
  

/*
converter.on("end_parsed", function (jsonArray) {

  


 console.log(jsonArray);

    res.send(jsonArray);
 
   //console.log(jsonArray); //here is your result jsonarray 
});




*/



// record_parsed will be emitted each csv row being processed 

  converter.on("record_parsed", function (jsonObj) {
  

  
  response.push(jsonObj);
  ++ count;


  if(count == 1000)
  {

    console.log(response);
   res.send(response);
    

  }
  
    //here is your result json object 
});
 
require("request").get(req.query.q).pipe(converter);




  /*

	console.log("inside page");

	console.log(req.query);


	var fs = require('fs'); 
	var parse = require('csv-parse');
  var response = [];
  var column = [];
  var row = [];
	var csvData=[];
  var count = 0;
  var b = {};


	fs.createReadStream('/var/www/node/instarem/views/CSV.csv')
    .pipe(parse({delimiter: ':'}))
    .on('data', function(csvrow) {
        

      console.log(count);

if(count == 8)
{
res.send(response);

  
}
      if(count == 0)
       { column =    String(csvrow).split(',');
          ++ count;
         // console.log("count is zero");
         // console.log(column[0]);
          // console.log(column[1]);

           //process.exit();

        }
           else {
        row =    String(csvrow).split(',');
        

        // console.log(row);


        for(i=0;i<column.length;++i)
        {
         
          b[column[i]] = row[i]; 
        }

      //  console.log(JSON.stringify(b));

       response.push(b);
       b= {};
++count;

      }

        //do something with csvrow
       // csvData.push(csvrow);        
    })
    .on('end',function() {console.log("here");
      //do something wiht csvData
      res.send(response);

      res.send(JSON.stringify(b));


    });












*/

});


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
