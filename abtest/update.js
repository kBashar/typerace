var Appbase = require('appbase-js');

var print = console.log
var ref = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: 'typerace',
  username: 'LPg0IVqja',
  password: 'b43f5ab2-c0c4-4ad5-80a1-b6d9fee9ee47'
});

var reqObj = {
    type: "race",
    id: "AVWmUU55LozDpnHtfV6y",
    body:{
        doc:{
            race_state: "running",
        }
    }
}

obj = ref.update(reqObj);

obj.on("data", function(res) {
    print("On succes response: " + res);
});


obj.on("error", function(res) {
    print("On error response: " + res);
});

