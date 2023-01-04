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
    params = createParams("healtoneforever@gmail.com");
    return item = ddb.getItem(params).promise();
}



getProperty(1).then(
    function(data) {
        console.log('Success', data.Item.email_id);
        var email = data.Item.email_id;
        console.log(email);
        saveAndRender();

    }).catch(function(err) {
        console.log(err);
    }
);
console.log(email);

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
        