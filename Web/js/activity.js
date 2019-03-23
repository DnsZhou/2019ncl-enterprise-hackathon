var apigClient = apigClientFactory.newClient({
});

$(document).ready(function () {
    getAllActivities();
})

function getAllActivities() {
    apigClient.activityGet({}, {}, {})
        .then(function (result) {
            result.data.forEach((activity) => {
                $("#slidesArea").append(generateActivitySlide(activity));
            })
            $("#slidesArea").children("div:first-child").addClass("active");
        }).catch(function (result) {
            // Add error callback code here.
        });
}

function generateActivitySlide(activity) {
    return '' +
        '<div class="carousel-item">' +
        '<img src="./img/activityPics/' + activity.activityId + '.jpg" class="d-block w-100" alt="...">' +
        '<div class="carousel-caption d-none d-md-block">' +
        '<h5>' + activity.activityName + '</h5>' +
        '<h6>' + activity.startTime + ' - ' + activity.activityLocation + '</h6>' +
        '<p>' + activity.description + '</p>' +
        '</div>' +
        '</div>'
}