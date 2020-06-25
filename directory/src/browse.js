const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 3001;
const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.get("/", function (req, res) {
  res.send("hello from server");
});

var AWS = require("aws-sdk");
let awsConfig = {
  region: "us-east-2",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
  accessKeyId: "AKIAJHN2RHNCDTX2FBRA",
  secretAccessKey: "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",
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

// module.exports = { browse };
// console.log(browse());
// browse();
app.get("/getadd", function (req, res) {
  // console.log(req.body.usr.Email)
  //   var input = JSON.parse(req.body.Items);
  var params = {
    TableName: "profiles",
    Select: "ALL_ATTRIBUTES",
  };
  docClient.scan(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      var input = data;
      // console.log(input);
      res.send(data);
      //  console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
      //   return "hnonjgf";
    }
  });
});

app.get('/update',function(req,res) {
  console.log(req.body);
  res.status(200).send({'message':'Data recived'})
})

app.post('/add',function(req,res){
  console.log(req)
  var input = req.body.userr;
  // console.log(input)
  var params = {
      TableName: "profiles",
      Item:  input
  };
  docClient.put(params, function (err, data) {

      if (err) {
          console.log("profiles::save::error - " + JSON.stringify(err, null, 2));                      
      } else {
          console.log("profiles::save::success" );                      
      }
  });
})


app.listen(PORT, function () {
  console.log("server runing on localhost:" + PORT);
});


app.use("/getadd", router);
module.exports = router;
