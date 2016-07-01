var print = console.log
var Appbase = require('appbase-js');

var userID = getUserID();
var raceStartsAt;
var race_id;
var race_obj;

var ref = new Appbase({
    url: 'https://scalr.api.appbase.io',
    appname: 'typerace',
    username: 'LPg0IVqja',
    password: 'b43f5ab2-c0c4-4ad5-80a1-b6d9fee9ee47'
});

checkWaitingRaceExists();

function onWaitingRaceAvailable(res) {
    if (res.hits.total) {
        race_obj = res.hits.hits[0]._source;
        race_id = res.hits.hits[0]._id;
        print(race_id);
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
    obj.on("error", onWaitingRaceNotAvailable)
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
        print("new race created: " + JSON.stringify(res));
        race_id = res._id;
        getRaceObj(race_id, listenForUpdate)
    });

    obj.on("error", function (res) {
        print("On error response: " + res);
        return false;
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
        print("While fetching data error occured: " + err);
    });
};

function updateRaceStatusToRunning(race_id, raceObj) {
    // Add this user as new race participants.
    raceObj.participants.push(userID);
    print(raceObj.participants);
    /**
     * Race will start in next 10 seconds;
     */

    let raceStartsAt = Date.now()+(12*1000);

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
        //to avoid another call to appbase, here a clone of 
        //the object is made.

        raceObj.participants = raceObj.participants;
        raceObj.race_starts_At = raceStartsAt;
        raceObj.race_state = "running";
        listenForUpdate(race_id, raceObj);
        startRaceIn(raceStartsAt);
    });
    obj.on("error", function (err) {
        print(err)
    });
};

function getUserID() {
    return ("pid_" + Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
};

function onRaceStatusUpdate(raceObj) {
    print("On race status update: " + raceObj.race_state);
    // There is another participants in race and race is about to start.
    if (!raceObj.race_state.localeCompare("running")) {
        var raceStartsAt = raceObj.race_starts_At;
        startRaceIn(raceStartsAt);
    }
};

function startRaceIn(raceStartsAt) {
    var timeDifference = Math.ceil((raceStartsAt - Date.now())/1000);
    print("Race will start in : " + timeDifference + "seconds");
    var countdowntimer = new CountDownTimer(timeDifference, 1000);
    countdowntimer.onTick(function(obj) {
        print("Race starts in: " + obj.seconds);
        if (obj.minutes === 0 && obj.seconds === 0) {
            //userInput.disabled = false;
            //userInput.focus();
            startRace();
        }
    });
    countdowntimer.start();
}

function startRace() {
    var countdowntimer = new CountDownTimer(5, 1000);
    countdowntimer.onTick(function(obj) {
        updateWPM(race_id, randomWPMGenarator(), Date.now())
        print("Race time left : " + obj.seconds + "seconds");
        if (obj.minutes === 0 && obj.seconds === 0) {
            //userInput.disabled = false;
            //userInput.focus();
            print("race finished");
        }
    });
    countdowntimer.start();
};

function onScoreUpdate(raceObj) {
    print("Score changed");
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
    print("We are at listenForUpdate func");
    previous_obj = race_obj;
    stream_obj = ref.getStream({
        type: "race",
        id: race_id,
    });
    stream_obj.on("data", function (res) {
        present_obj = res._source;
        let diff = compareObject(previous_obj, present_obj);
        previous_obj = present_obj;
        print("difference: " + JSON.stringify(diff));
        for (property in diff) {
            if (property.startsWith("race_state")) {
                onRaceStatusUpdate(previous_obj);
            }
            else if (property.startsWith("PID")) {
                onScoreUpdate(diff[property]);
            }
        }
    });
    stream_obj.on("error", function (err) {
        print(err);
    });
};

function randomWPMGenarator() {
    return Math.ceil((Math.random()*(80-50)+50));
}

function updateWPM(race_id, wpm, time) {

    var updatedRaceObj = {
        type: "race",
        id: race_id,
        body: {
            doc: {
                
            }
        }
    }
    updatedRaceObj.body.doc[userID] ={
                    wpm : wpm,
                    last_updated_at: time
                }
   var obj = ref.update(updatedRaceObj);
   obj.on('data', function(res) {
       print(userID + " updated wpm is "+ wpm + " at " + (new Date(time)).getTime());
   });
   obj.on('error', function(err) {
       print(err);
   });
}

/**
 * CountDownTimer
 */
function CountDownTimer(duration, granularity) {
  this.duration = duration;
  this.granularity = granularity || 1000;
  this.tickFtns = [];
  this.running = false;
  this.startTime;
}

CountDownTimer.prototype.start = function() {
  if (this.running) {
    return;
  }
  this.running = true;
  this.startTime = Date.now(); 
  var start = this.startTime,
      that = this,
      diff, obj, timePassed;

  (function timer() {
    if(!that.running) {
      return;
    }
    diff = that.duration - (((Date.now() - start) / 1000) | 0);
    timePassed = (((Date.now() - start) / 1000) | 0);

    if (diff > 0) {
      setTimeout(timer, that.granularity);
    } else {
      diff = 0;
      that.running = false;
    }

    obj = CountDownTimer.parse(diff);
    obj.timePassed = timePassed;
    that.tickFtns.forEach(function(ftn) {
      ftn.call(this,obj);
    }, that);
  }());
};

CountDownTimer.prototype.onTick = function(ftn) {
  if (typeof ftn === 'function') {
    this.tickFtns.push(ftn);
  }
  return this;
};

CountDownTimer.prototype.expired = function() {
  return !this.running;
};

CountDownTimer.prototype.stop = function() {
  this.running = false;
}

CountDownTimer.prototype.timePassed = function() {
  return (((Date.now() - this.startTime) / 1000) | 0)
}

CountDownTimer.parse = function(seconds) {
  return {
    'minutes': (seconds / 60) | 0,
    'seconds': (seconds % 60) | 0
  };
};