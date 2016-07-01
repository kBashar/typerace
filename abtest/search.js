var Appbase = require('appbase-js');

var print = console.log
var ref = new Appbase({
  url: 'https://scalr.api.appbase.io',
  appname: 'typerace',
  username: 'LPg0IVqja',
  password: 'b43f5ab2-c0c4-4ad5-80a1-b6d9fee9ee47'
});

obj = ref.search({
    type:"race",
    body:{
        query: {
            term : {"race_state" : "waiting"}
        }
    }
})

obj.on("data", function(res){
    if (res.hits.total) {
        race_obj = res.hits.hits[0]._source;
        race_id = res.hits.hits[0]._id;
        print("race_obj: " + race_obj);
        print(race_id, race_obj);
    }
    else {
        print("not available");
    }
})
obj.on("error", function(err) {
    print(err)
})

