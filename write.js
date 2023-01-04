var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIARD6ATKRQDOIDNRP4", 
    "secretAccessKey": "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"
};
AWS.config.update(awsConfig);


// Create the DynamoDB service object
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
    TableName: "StudyBuddy",
    Item: {
        "email_id": {S: "autoemailsender111@gmail.com"},
        "listOfTasks": {L: [{S: "hi there"}]}
    },
    
};

// Call DynamoDB to add the item to the table
ddb.putItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});
// snippet-end:[dynamodb.JavaScript.item.putItem]