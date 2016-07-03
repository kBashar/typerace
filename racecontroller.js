
var Appbase = require('appbase-js');

var userID = getUserID();
var raceStartsAt;
var race_id;
var race_obj;
var onRaceStatusUpdate;
var onScoreUpdate;
var participants = {};

var ref = new Appbase({
    url: 'https://scalr.api.appbase.io',
    appname: 'typerace',
    username: 'LPg0IVqja',
    password: 'b43f5ab2-c0c4-4ad5-80a1-b6d9fee9ee47'
});


exports.startRace = function (statusUpdatehandler, scoreUpdateHandler) {
    onRaceStatusUpdate = statusUpdatehandler;
    onScoreUpdate = scoreUpdateHandler;

    checkWaitingRaceExists();
}

function onWaitingRaceAvailable(res) {
    console.log("@ onWaitingRaceAvailable ");
    if (res.hits.total) {
        console.log("@ onWaitingRaceAvailable: " + res.hits.total + " race is available.");
        race_obj = res.hits.hits[0]._source;
        race_id = res.hits.hits[0]._id;
        console.log("@ onWaitingRaceAvailable: " + "ID of the race is " + race_id);
        updateRaceStatusToRunning(race_id, race_obj);
    }
    else {
        onWaitingRaceNotAvailable();
    }
};

function onWaitingRaceNotAvailable(res) {
    createNewRace();
};

function checkWaitingRaceExists() {
    console.log("@ checkWaitingRaceExists called");
    var obj = ref.search({
        type: "race",
        body: {
            query: {
                term: {
                    "race_state": "waiting"
                }
            }
        }
    });

    obj.on("data", onWaitingRaceAvailable)
    obj.on("error", function (err) {
        console.log("@ checkWaitingRaceExists: " + "Error while checking Waiting race"
            + " existence, error message: " + err)
    });
};

function createNewRace() {
    var jsonBody = {
        race_state: "waiting",
        participants: [
            userID
        ]
    }

    var obj = ref.index({
        type: "race",
        body: jsonBody
    });

    obj.on("data", function (res) {
        race_id = res._id;
        console.log("@ createNewRace: " + "New race creation is successful, race ID is " + race_id);
        console.log("@ createNewRace: " + "To retrive race object for race ID " + race_id
            + " getRaceObj is called.");
        getRaceObj(race_id, listenForUpdate)
    });

    obj.on("error", function (res) {
        console.log("@ createNewRace: " + "Error happend while creating new Race, error message: " + err);
    });
};

function getRaceObj(race_id, callback) {
    var obj = ref.get({
        "type": "race",
        "id": race_id
    });
    obj.on("data", function (res) {
        race_obj = res._source;
        callback(race_id, race_obj);
    });
    obj.on("error", function (err) {
        console.log("@ getRaceObj: " + "Retriving race object for race ID "
            + race_id + " is unsuccessful, error messeage: " + err);
    });
};

function updateRaceStatusToRunning(race_id, raceObj) {
    console.log("@ updateRaceStatusToRunning: " + " To listen for later updates listenForUpdate is called.");
    listenForUpdate(race_id, raceObj);
    // Add this user as new race participants.
    raceObj.participants.push(userID);
    console.log("@ updateRaceStatusToRunning: " + " user IDs of the participants " + raceObj.participants);
    /**
     * Race will start in next 10 seconds;
     */

    let raceStartsAt = Date.now() + (7 * 1000);

    var updatedRaceObj = {
        type: "race",
        id: race_id,
        body: {
            doc: {
                race_state: "running",
                participants: raceObj.participants,
                race_starts_At: raceStartsAt
            }
        }
    }

    var obj = ref.update(updatedRaceObj);
    obj.on("data", function (res) {
        console.log("@ updateRaceStatusToRunning: " + " Data updating succesful.");
    });
    obj.on("error", function (err) {
        console.log("@ updateRaceStatusToRunning: " + "Error at updating, error message: " + err);
    });
};

function getUserID() {
    return ("pid_" + Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
};

function compareObject(previous, present) {
    var diff = {};
    for (var property in present) {
        if (!previous.hasOwnProperty(property) || present[property] !== previous[property]) {
            diff[property] = present[property];
        }
    }
    return diff;
};

function listenForUpdate(race_id, race_obj) {
    console.log("@ listenForUpdate : Listening for the race ID " + race_id);
    var previous_obj = race_obj;
    var stream_obj = ref.getStream({
        type: "race",
        id: race_id,
    });
    stream_obj.on("data", function (res) {
        let present_obj = res._source;
        console.log("@ listenForUpdate success");
        let diff = compareObject(previous_obj, present_obj);
        console.log("@ listenForUpdate success : changed properties: ");
        console.log(diff);
        for (let property in diff) {
            if (property.startsWith("race_state")) {
                mapParticipants(present_obj.participants)
                onRaceStatusUpdate(diff);
            }
            else if (property.startsWith("PID")) {
                onScoreUpdate(createScoreObj(diff));
            }
        }
        previous_obj = present_obj;
    });
    stream_obj.on("error", function (err) {
        console.log("@ listenForUpdate: " + "Error at listening for updates, error message: " + err);
    });
};

function createScoreObj(obj) {
    let scoreObj = {};
    for (let prop in obj) {
        if (prop.startsWith("PID") && prop.localeCompare(userID)) {
            console.log(participants[prop]);
            scoreObj[participants[prop]] = obj[prop];
        }
    }
    return scoreObj;
}

function mapParticipants(pidArray) {
    let counter = 1;
    for (let i =0; i<pidArray.length; i++ ) {
        let pid = pidArray[i];
        console.log(pid);
        if (!pid.localeCompare(userID)) {
            participants[pid] = 'self';
        }
        else {
            participants[pid] = 'oponent' + counter;
            console.log("participants " + participants[pid]);
            counter++;
        }
    }
}

exports.updateWPM = function (wpm, time) {

    var updatedRaceObj = {
        type: "race",
        id: race_id,
        body: {
            doc: {

            }
        }
    }
    updatedRaceObj.body.doc[userID] = {
        wpm: wpm,
        last_updated_at: time
    }
    var obj = ref.update(updatedRaceObj);
    obj.on('data', function (res) {
        console.log(userID + " updated wpm is " + wpm + " at " + (new Date(time)).getTime());
    });
    obj.on('error', function (err) {
        console.log("@ updateWPM: " + "Error at updateWPM, error message: " + err);
    });
}