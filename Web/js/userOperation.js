var WildRydes = window.WildRydes || {};
var jwtToken = null;
var currentUser = null;
var apigClient = apigClientFactory.newClient({
    apiKey: 'usObnKVt3F8ULNETbOMp26YAgm3bYOqh1Ahi6cfa'
});

window.onload = function () {
    verifyUserLogin();
    getAllUsers();
}

$(document).ready(function () {

});

function logOut() {
    currentUser = null;
    localStorage.clear();
    alert("User logout, Redirect to login page")
    window.location.href = 'login.html';
}

function verifyUserLogin() {
    var signinUrl = './login.html';

    var poolData = {
        UserPoolId: _config.cognito.userPoolId,
        ClientId: _config.cognito.userPoolClientId
    };

    var userPool;

    if (!(_config.cognito.userPoolId &&
        _config.cognito.userPoolClientId &&
        _config.cognito.region)) {
        currentUser = null;
        $('#noCognitoMessage').show();
        return;
    }

    userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

    if (typeof AWSCognito !== 'undefined') {
        AWSCognito.config.region = _config.cognito.region;
    }

    WildRydes.signOut = function signOut() {
        currentUser = null;
        userPool.getCurrentUser().signOut();
    };

    WildRydes.authToken = new Promise(function fetchCurrentAuthToken(resolve, reject) {
        var cognitoUser = userPool.getCurrentUser();

        if (cognitoUser) {
            cognitoUser.getSession(function sessionCallback(err, session) {
                if (err || !session.isValid()) {
                    alert("Unauthorized user, Please Login!")
                    window.location.href = 'login.html';
                } else {
                    jwtToken = session.getIdToken().getJwtToken()
                    resolve(jwtToken);
                    currentUser = cognitoUser;
                    $("#userName").text(currentUser.username);
                }
            });
        } else {
            currentUser = null;
            alert("Unauthorized user, Please Login!")
            window.location.href = 'login.html';
        }
    });
}

function getAllUsers() {
    var body = {
        jwtToken: jwtToken
    };
    apigClient.userGetallusersPost({}, body, {})
        .then(function (result) {
            result.data.forEach((user) => {
                $("#selectEmail").append("<option value='" + user.email + "'>" + user.fullName + "(" + user.email + ")</option>")
            })
        }).catch(function (result) {
            // Add error callback code here.
        });
}

function refreshStartModal(){
    $("#recieverName").text($("#selectEmail").val());
    $("#docName").text($("#fileLocation").text());
}