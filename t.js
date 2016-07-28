/**
 * Just to avoid a network call storing all the news source info. Of course it's not the best option.
 */

var sources = [{ "id": "arstechnica", "name": "Ars Technica", "sortBysAvailable": ["latest"] }, { "id": "bbcnews", "name": "BBC News", "sortBysAvailable": ["top", "popular"] }, { "id": "bbcsport", "name": "BBC Sport", "sortBysAvailable": ["top"] }, { "id": "bloomberg", "name": "Bloomberg", "sortBysAvailable": ["top"] }, { "id": "buzzfeed", "name": "Buzzfeed", "sortBysAvailable": ["latest", "popular"] }, { "id": "cnbc", "name": "CNBC", "sortBysAvailable": ["top", "popular"] }, { "id": "cnn", "name": "CNN", "sortBysAvailable": ["top"] }, { "id": "engadget", "name": "Engadget", "sortBysAvailable": ["top", "latest", "popular"] }, { "id": "entertainmentweekly", "name": "Entertainment Weekly", "sortBysAvailable": ["top", "popular"] }, { "id": "espn", "name": "ESPN", "sortBysAvailable": ["top"] }, { "id": "googlenews", "name": "Google News", "sortBysAvailable": ["top"] }, { "id": "hackernews", "name": "Hacker News", "sortBysAvailable": ["top", "latest", "popular"] }, { "id": "independent", "name": "Independent", "sortBysAvailable": ["top", "popular"] }, { "id": "mashable", "name": "Mashable", "sortBysAvailable": ["latest", "popular"] }, { "id": "recode", "name": "Recode", "sortBysAvailable": ["top", "popular"] }, { "id": "redditrall", "name": "Reddit /r/all", "sortBysAvailable": ["top", "latest"] }, { "id": "reuters", "name": "Reuters", "sortBysAvailable": ["top", "latest", "popular"] }, { "id": "techcrunch", "name": "TechCrunch", "sortBysAvailable": ["top", "latest", "popular"] }, { "id": "theguardianuk", "name": "The Guardian (UK)", "sortBysAvailable": ["top", "popular"] }, { "id": "thehuffingtonpost", "name": "The Huffington Post", "sortBysAvailable": ["top", "popular"] }, { "id": "thenewyorktimes", "name": "The New York Times", "sortBysAvailable": ["popular"] }, { "id": "thenextweb", "name": "The Next Web", "sortBysAvailable": ["latest", "popular"] }, { "id": "theverge", "name": "The Verge", "sortBysAvailable": ["top", "latest"] }, { "id": "thewallstreetjournal", "name": "The Wall Street Journal", "sortBysAvailable": ["top", "popular"] }, { "id": "thewashingtonpost", "name": "The Washington Post", "sortBysAvailable": ["top", "popular"] }, { "id": "wiredde", "name": "Wired.de", "sortBysAvailable": ["top", "latest"] }]

var minimumRequiredCharLength = 750;


function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {
    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {
    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {
    // Otherwise, CORS is not supported by the browser.
    xhr = null;
  }
  return xhr;
}

const baseURL = 'https://newsapi.org/v1/articles';
const apiKey = '4664a557ae4e44cc9fa9244b3b2da685';

const createURL = function (sourceid, sortBy) {
  let url = baseURL + "?source=" + sourceid + "&sortBy=" + sortBy + "&apiKey=" + apiKey;
  return url;
}

const createContent = function () {
  var sourceIndex = getRandomIndex(0, sources.length - 1)
  var source = sources[sourceIndex];

  var sortByIndex = getRandomIndex(0, source.sortBysAvailable.length - 1);
  var sortBy = source.sortBysAvailable[sortByIndex];
  
  var url = createURL(source.id, sortBy);
  console.log(url);
  fetchHeadlines(url);
}

const fetchHeadlines = function (url) {
  const xhr = createCORSRequest("GET", url); 
  xhr.onload = onHeadlinesLoad;
  xhr.onerror = onHeadlinesLoadError;
  xhr.send();
}

const onHeadlinesLoad = function () {
  if (this.status === 200) {
    var response = JSON.parse(this.responseText);
    var articles = response.articles;
    console.log(joinArticles(articles));
  }
}

const onHeadlinesLoadError = function () {
  console.log(this.response);
}

const joinArticles = function(articles) {
  var str = "";
  for(var index in articles) {
    var articleDescription = articles[index].description;
    str += articleDescription + '\n';
  }
  return str.trim();
}

function getRandomIndex(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//createContent();

var contentFetcher = require('./contentfetcher.js');

contentFetcher.createContent(function(text) {
  console.log("at callback");
  debugger;
  console.log(text);
})