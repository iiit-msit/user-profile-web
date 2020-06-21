var AWS = require("aws-sdk");
let awsConfig = {
  region: "us-east-2",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
  accessKeyId: "AKIAJHN2RHNCDTX2FBRA",
  secretAccessKey: "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",
};
AWS.config.update(awsConfig);

var docClient = new AWS.DynamoDB.DocumentClient();
var params = {
  TableName: "users",
  Select: "ALL_ATTRIBUTES",
};

docClient.scan(params, function (err, data) {
  if (err) {
    console.error(
      "Unable to read item. Error JSON:",
      JSON.stringify(err, null, 2)
    );
  } else {
    console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
    //   return "hnonjgf";
  }
});
// module.exports = { browse };
// console.log(browse());
// browse();
