var AWS = require("aws-sdk");
let awsConfig = {
    "region": "us-east-1",
    "endpoint": "http://dynamodb.us-east-1.amazonaws.com",
    "accessKeyId": "AKIARD6ATKRQDOIDNRP4", 
    "secretAccessKey": "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"
};
AWS.config.update(awsConfig);

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

function createParams(email){
    const params = {
        TableName: "StudyBuddy",
        Key: {
            "email_id": {S: email}
        },
    };
    return params;
}


var email;

function getProperty(property){
    params = createParams("testing123@gmail.com");
    return item = ddb.getItem(params).promise();
}



getProperty(1).then(
    function(data) {
        console.log('Success', data.Item.listOfTasks);
        const unmarshalled = AWS.DynamoDB.Converter.unmarshall(data.Item);
        const listOfLists = unmarshalled.listOfTasks
        console.log(listOfLists[0]);
        /*
        for (const element in array){
            console.log(element);
        }
        */
    }).catch(function(err) {
        console.log(err);
    }
);
console.log(email);
var unmarshalled = AWS.DynamoDB.Converter.unmarshall({
    string: {S: 'foo'},
    list: {L: [{S: 'fizz'}, {S: 'buzz'}, {S: 'pop'}]},
    map: {
      M: {
        nestedMap: {
          M: {
            key: {S: 'value'}
          }
        }
      }
    },
    number: {N: '123'},
    nullValue: {NULL: true},
    boolValue: {BOOL: true}
  });
  console.log(unmarshalled);
/** 
let fetchOneByKey = function () {
    var params = {
        TableName: "users",
        Key: {
            "email_id": "autoemailsender111@gmail.com"
        }
    };
    docClient.get(params, function (err, data) {
        if (err) {
            console.log("users::fetchOneByKey::error - " + JSON.stringify(err, null, 2));
        }
        else {
            console.log("users::fetchOneByKey::success - " + JSON.stringify(data, null, 2));
        }
    })
}


fetchOneByKey();
*/
        