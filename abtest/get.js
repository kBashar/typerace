var Appbase = require('appbase-js');

var print = console.log
var ref = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: 'typerace',
  username: 'LPg0IVqja',
  password: 'b43f5ab2-c0c4-4ad5-80a1-b6d9fee9ee47'
});

obj = ref.get({
    type:"race",
    id:"race1",
})

obj.on("data", function(res){
    print(res);
})
obj.on("error", function(err) {
    print(err)
})