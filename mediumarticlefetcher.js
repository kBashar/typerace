var request = require('request');
var cheerio = require('cheerio');
var htmlToText = require('html-to-text');



exports.getArticle = function (index, callback) {
    request('https://medium.com/browse/top?format=json', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var data = JSON.parse(body.replace('])}while(1);</x>', ''));
            produceURL(data, index, callback)
        }
    })
}

function produceURL(data, index, callback) {
    var streamItems = data.payload.streamItems,
        postObj = data.payload.references.Post,
        userObj = data.payload.references.User

    var item = streamItems[index],
        post = postObj[item.bmPostPreview.postId],
        user = userObj[post.creatorId]
    var url = "https://medium.com/" + '@' + user.username + '/' + post.uniqueSlug

    console.log("index is : " + index)
    console.log(url);
    getArticle(url, callback);
}

function parseArticle(html) {
	var $ = cheerio.load(html);
	var articleMarkup = $('main.postArticle-content').html();
	var articleText = htmlToText.fromString(articleMarkup);
	return articleText;
}
function cleanText(text) {
    return text.replace(/-{3,}|\[(.*)\]/g,'').trim();
}
// Show Content to user 
function getArticle(url, callback) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var text = parseArticle(body);
            text = cleanText(text);
            text = text.substr(0, 1000);
            callback(text);
        }
    })
}