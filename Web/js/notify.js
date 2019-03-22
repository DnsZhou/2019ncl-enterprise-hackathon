$(document).ready(function () {
    verifyUserLogin();
    var body = {
        jwt: jwtToken
    };

    apigClient.transactionGetunreadinboundPost({}, body, {}).then(function (messageList) {
        messageList.data.forEach(trans => {
            addNotify(trans.sender, trans.transactionId)
        });
    })

})


function addNotify(sender, transactionId) {
    $.notify({
        // options
        icon: 'glyphicon glyphicon-warning-sign',
        message: '✉ You have new pending exchange from <b>' + sender + '</b>',
        url: './transactionDetails.html?transaction_id=' + transactionId,
        target: '_self'
    }, {
            // settings
            element: 'body',
            type: "info",
            allow_dismiss: true,
            newest_on_top: true,
            placement: {
                from: "top",
                align: "right"
            },
            offset: 60,
            delay: 5000,
            timer: 1000,
            url_target: '_blank',
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
        });

}