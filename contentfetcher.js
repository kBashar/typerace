/**
 * Just to avoid a network call storing all the news source info. Of course it's not the best option.
 */

var sources = [{ "id": "arstechnica", "name": "Ars Technica", "sortBysAvailable": ["latest"] }, { "id": "bbcnews", "name": "BBC News", "sortBysAvailable": ["top", "popular"] }, { "id": "bbcsport", "name": "BBC Sport", "sortBysAvailable": ["top"] }, { "id": "bloomberg", "name": "Bloomberg", "sortBysAvailable": ["top"] }, { "id": "cnbc", "name": "CNBC", "sortBysAvailable": ["top", "popular"] }, { "id": "cnn", "name": "CNN", "sortBysAvailable": ["top"] }, { "id": "engadget", "name": "Engadget", "sortBysAvailable": ["top", "latest", "popular"] }, { "id": "entertainmentweekly", "name": "Entertainment Weekly", "sortBysAvailable": ["top", "popular"] }, { "id": "espn", "name": "ESPN", "sortBysAvailable": ["top"] }, { "id": "googlenews", "name": "Google News", "sortBysAvailable": ["top"] }, { "id": "hackernews", "name": "Hacker News", "sortBysAvailable": ["top", "latest", "popular"] }, { "id": "independent", "name": "Independent", "sortBysAvailable": ["top", "popular"] }, { "id": "mashable", "name": "Mashable", "sortBysAvailable": ["latest", "popular"] }, { "id": "recode", "name": "Recode", "sortBysAvailable": ["top", "popular"] }, { "id": "reuters", "name": "Reuters", "sortBysAvailable": ["top", "latest", "popular"] }, { "id": "techcrunch", "name": "TechCrunch", "sortBysAvailable": ["top", "latest", "popular"] }, { "id": "theguardianuk", "name": "The Guardian (UK)", "sortBysAvailable": ["top", "popular"] }, { "id": "thehuffingtonpost", "name": "The Huffington Post", "sortBysAvailable": ["top", "popular"] }, { "id": "thenewyorktimes", "name": "The New York Times", "sortBysAvailable": ["popular"] }, { "id": "thenextweb", "name": "The Next Web", "sortBysAvailable": ["latest", "popular"] }, { "id": "thewallstreetjournal", "name": "The Wall Street Journal", "sortBysAvailable": ["top", "popular"] }, { "id": "thewashingtonpost", "name": "The Washington Post", "sortBysAvailable": ["top", "popular"] }, { "id": "wiredde", "name": "Wired.de", "sortBysAvailable": ["top", "latest"] }]

var minimumRequiredCharLength = 750;


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  xhr.open(method, url, false);
  return xhr;
}

const baseURL = 'https://newsapi.org/v1/articles';
const apiKey = '4664a557ae4e44cc9fa9244b3b2da685';

const createURL = function (sourceid, sortBy) {
  let url = baseURL + "?source=" + sourceid + "&sortBy=" + sortBy + "&apiKey=" + apiKey;
  return url;
}

exports.createContent = function (callback) {
  var sourceIndex = getRandomIndex(0, sources.length - 1)
  var source = sources[sourceIndex];

  var sortByIndex = getRandomIndex(0, source.sortBysAvailable.length - 1);
  var sortBy = source.sortBysAvailable[sortByIndex];

  var url = createURL(source.id, sortBy);
  console.log(url);
  return fetchHeadlines(url, callback);
}

const fetchHeadlines = function (url, callback) {
  const xhr = createCORSRequest("GET", url);
  xhr.onload = onHeadlinesLoad;
  xhr.onerror = onHeadlinesLoadError;
  xhr.callback = callback;
  xhr.send();
}

const onHeadlinesLoad = function () {
  if (this.status === 200) {
    var response = JSON.parse(this.responseText);
    var content = joinArticles(response.articles);
    console.log(content);
    this.callback(content);
  }
}

const onHeadlinesLoadError = function () {
  console.log(this.response);
}

const joinArticles = function (articles) {
  var str = "";
  for (var index in articles) {
    var articleDescription = articles[index].description;
    str += articleDescription + '\n';
  }
  return str.trim();
}

function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}