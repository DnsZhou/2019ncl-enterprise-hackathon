const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' });

exports.handler = (event, context, callback) => {
    console.log(event);

    let params = {
        TableName: "Activity",
        ProjectionExpression: "description, activityLocation, activityName, startTime"
    }

    docClient.scan(params, function (err, data) {
        if (err) {
            console.log("error: ", err)
            let response = {
                "statusCode": 500,
                "headers": {
                    "my_header": "my_value",
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
                },
                "body": JSON.stringify("Error while reading from DB"),
            };
            callback(null, response);
        } else {
            let response = {
                "statusCode": 200,
                "headers": {
                    "my_header": "my_value",
                    "Access-Control-Allow-Origin": "*", // Required for CORS support to work
                    "Access-Control-Allow-Credentials": true // Required for cookies, authorization headers with HTTPS
                },
                "body": JSON.stringify(data.Items)
            }
            callback(null, response);
        }
    });

};