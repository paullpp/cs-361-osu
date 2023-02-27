var fs = require('fs');
var express = require('express');
var exphbs = require('express-handlebars');
var JSON = require('JSON');

var app = express();
var port = process.env.PORT || 3000;

app.engine('', exphbs.engine({ defaultLayout: null }));

app.use(express.json());

app.use(express.static('public'));

app.get('/', function (req, res, next) {
    res.status(200).sendFile(__dirname + '/public/index.html');
});

const URL = 'http://localhost:8000/api/v1';

const getMeetData = async () => {
    const meetData = fetch(URL + '/meetdata')
        .then((response) => {
            response.text();
        })
        .then((response) => {
            return body;
        });
};

const getLifters = async () => {
    const lifters = fetch(URL + '/lifters')
        .then((response) => {
            response.text();
        })
        .then((response) => {
            return body;
        });
};

const getTotals = async () => {
    const totals = fetch(URL + '/totals')
        .then((response) => {
            response.text();
        })
        .then((response) => {
            return body;
        });
};

const getWeightClasses = async () => {
    const weightClasses = fetch(URL + '/weightclasses')
        .then((response) => {
            response.text();
        })
        .then((response) => {
            return body;
        });
};

const getLifterStatistics = async (meetData) => {
    const lifterStatistics = meetData.map((meet) => {
        const bench1 = parseInt(meet.bench_1);
        const bench2 = parseInt(meet.bench_2);
        const bench3 = parseInt(meet.bench_3);
        const benchAvg = (bench1 + bench2 + bench3) / 3;

        const squat1 = parseInt(meet.squat_1);
        const squat2 = parseInt(meet.squat_2);
        const squat3 = parseInt(meet.squat_3);
        const squatAvg = (squat1 + squat2 + squat3) / 3;

        const deadlift1 = parseInt(meet.deadlift_1);
        const deadlift2 = parseInt(meet.deadlift_2);
        const deadlift3 = parseInt(meet.deadlift_3);
        const deadliftAvg = (deadlift1 + deadlift2 + deadlift3) / 3;

        const intermediateResult = {
            name: meet.name,
            weightClass: meet.weightclass,
            benchTotal: bench1 + bench2 + bench3,
            benchAvg: benchAvg,
            squatTotal: squat1 + squat2 + squat3,
            squatAvg: squatAvg,
            deadliftTotal: deadlift1 + deadlift2 + deadlift3,
            deadliftAvg: deadliftAvg,
            total: benchAvg + squatAvg + deadliftAvg,
        };

        return intermediateResult;
    });

    return lifterStatistics;
};

app.get('/meet/statistics', async function (req, res, next) {
    const meetData = await getMeetData();
    const result = {
        lifterStatistics: await getLifterStatistics(meetData),
    };

    res.status(200).send(result);
});

app.get('*', function (req, res, next) {
    res.status(404).send('Page not found');
});

app.listen(port, function () {
    console.log('Server is running on port ' + port);
});
