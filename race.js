import Appbase from 'appbase-js';
import CountDownTimer from './countdowntimer';

export default class Race {
    constructor(onRaceRunning, onScoreUpdate) {
        var Appbase = require('appbase-js');

        this.userID = getUserID();
        this.raceStartsAt;
        this.race_id;
        this.race_obj;
        this.onRaceRunning = onRaceRunning;
        this.onScoreUpdate = onScoreUpdate;
        this.participantsList = {};

        var ref = new Appbase({
            url: 'https://scalr.api.appbase.io',
            appname: 'typerace',
            username: 'LPg0IVqja',
            password: 'b43f5ab2-c0c4-4ad5-80a1-b6d9fee9ee47'
        });
    }

    connectForRace() {
        checkWaitingRaceExists();
    }

    onWaitingRaceAvailable(res) {
        if (res.hits.total) {
            console.log("@ onWaitingRaceAvailable: " + res.hits.total + " race is available.");
            this.race_obj = res.hits.hits[0]._source;
            this.race_id = res.hits.hits[0]._id;
            console.log("@ onWaitingRaceAvailable: " + "ID of the race is " + this.race_id);
            updateRaceStatusToRunning(this.race_id, race_obj);
        }
        else {
            createNewRace();
        }
    };

    checkWaitingRaceExists() {
        obj = ref.search({
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

    createNewRace() {
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
            this.race_id = res._id;
            console.log("@ createNewRace: " + "New race creation is successful, race ID is " + this.race_id);
            console.log("@ createNewRace: " + "To retrive race object for race ID " + this.race_id
                + " getRaceObj is called.");
            getRaceObj(this.race_id, listenForUpdate)
        });

        obj.on("error", function (res) {
            console.log("@ createNewRace: " + "Error happend while creating new Race, error message: " + err);
        });
    };

    getRaceObj(race_id, callback) {
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

    populateParticipantsList(raceObj) {
        this.participants[this.userID] = 'self';
        var i = 1;
        for (var p in raceObj.participants) {
            if (p !== this.userID) {
                this.participants[p] = "oponent_" + i;
                i++;
            }
        }
    }

    updateRaceStatusToRunning(race_id, raceObj) {

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
            //to avoid another call to appbase, here a clone of 
            //the object is made.

            raceObj.participants = raceObj.participants;
            raceObj.race_starts_At = raceStartsAt;
            raceObj.race_state = "running";

            console.log("@ updateRaceStatusToRunning: " + " To listen for later updates listenForUpdate is called.");
            listenForUpdate(race_id, raceObj);

            console.log("@ updateRaceStatusToRunning: " + " To start race startRaceIn is called.");
            startRaceIn(raceStartsAt);
        });
        obj.on("error", function (err) {
            console.log("@ updateRaceStatusToRunning: " + "Error at updating, error message: " + err);
        });
    };

    getUserID() {
        return ("pid_" + Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
    };

    compareObject(previous, present) {
        var diff = {};
        for (var property in present) {
            if (!previous.hasOwnProperty(property) || present[property] !== previous[property]) {
                diff[property] = present[property];
            }
        }
        return diff;
    };

    listenForUpdate(race_id, race_obj) {
        console.log("@ listenForUpdate : We are at  function.");
        previous_obj = race_obj;
        stream_obj = ref.getStream({
            type: "race",
            id: race_id,
        });
        stream_obj.on("data", function (res) {
            present_obj = res._source;
            console.log("@ listenForUpdate success");
            let diff = compareObject(previous_obj, present_obj);
            console.log("@ listenForUpdate success : changed properties: " + diff);
            for (property in diff) {
                if (property.startsWith("race_state")) {
                    populateParticipantsList(present_obj);
                    this.onRaceRunning(present_obj);
                    //onRaceStatusUpdate(previous_obj);
                }
                else if (property.startsWith("PID")) {
                    this.onScoreUpdate(diff)
                }
            }
            previous_obj = present_obj;
        });
        stream_obj.on("error", function (err) {
            console.log("@ listenForUpdate: " + "Error at listening for updates, error message: " + err);
        });
    };

    updateWPM(race_id, wpm, time) {

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
    };

    randomWPMGenarator() {
        return Math.ceil((Math.random() * (80 - 50) + 50));
    };
}