var Appbase = require('appbase-js');

var print = console.log
var appbaseRef = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: 'typerace',
  username: 'LPg0IVqja',
  password: 'b43f5ab2-c0c4-4ad5-80a1-b6d9fee9ee47'
});

let raceObject = {
    race_id : "1x",
    participants: ["pid1","pid2"],
    pid1: {
        wpm: 23
    },
    pid2: {
        wpm: 21
    }
}

appbaseRef.index({
    type:"race",
    id:"race1",
    body:raceObject,

}).on("data", function(res){
    print(res);
}).on("error", function(err) {
    print(err)
})