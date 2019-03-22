var scanTransactionUrl = 'https://pcjzmr67vc.execute-api.eu-west-2.amazonaws.com/Dev/getOutbound';


$(document).ready(function () {

    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

    var userPool;

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    userEmail = userPool.getCurrentUser();

    var splitArr = userEmail.storage.key(userEmail.username).split('.')

    splitArr.pop()
    // splitArr.splice(2,1)

    splitArr.push(userEmail.username, 'idToken')

    jwtTokenKey = splitArr.join('.')

    var jwtToken = localStorage.getItem(jwtTokenKey);

    console.log(jwtToken)

    axios({
        method: 'post',
        url: scanTransactionUrl,
        headers: {
            'Authorization': jwtToken
        },
        data: {
            jwt: JSON.stringify(jwtToken), //userEmail.username
        }
    }).then((result) => {

        console.log(result)

        var data = JSON.parse(result.data.body);

        console.log(data);

        // console.log(data[0].transactionState)

        var arrData = []
        for (let i in data) {
            let userInfo = []
            userInfo[0] = '<a href="./transactionDetails.html?transaction_id=' + data[i].transactionId + '">' +
                data[i].transactionId + '</a>';
            userInfo[1] = data[i].sender;
            userInfo[2] = data[i].reciever;
            userInfo[3] = data[i].status;
            // userInfo[4] = data[i].state;
            userInfo[4] = data[i].updateTime;
            userInfo[5] = data[i].createTime;


            arrData.push(userInfo)
        }

        console.log(arrData)


        for (var i = 0; i < arrData.length; i++) {

            var x = document.getElementById('tb').insertRow();
            for (var j = 0; j < arrData[i].length; j++) {

                var cell = x.insertCell();
                cell.innerHTML = arrData[i][j];
            }
        }

    })

})