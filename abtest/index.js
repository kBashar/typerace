var Appbase = require('appbase-js');

var print = console.log
var ref = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: 'typerace',
  username: 'LPg0IVqja',
  password: 'b43f5ab2-c0c4-4ad5-80a1-b6d9fee9ee47'
});

var jsonBody = {
    race_state: "running",
 "participants": [
  "pid1",
  "pid2"
 ],
}

obj = ref.index({
    type: "race",
    body: jsonBody
});

obj.on("data", function(res) {
    print("On succes response: \n");
    print(res);
});

obj.on("error", function(res) {
    print("On error response: " + res);
});

//obj.stop();

