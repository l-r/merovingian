var request = require('request');
var fs = require('fs');
var _ = require('lodash');
var stream = require('stream');

module.exports = function () {
  var page = 0;
  const rawDataFilename = "data/rawRepoData.json";
  const perPage = 100;
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36'
  };
  var repos = [];
  var getUrl = () => {
    var url = "https://api.github.com/orgs/mapbox/repos?per_page=" + perPage + "&page=" + page + "&type=public";
    return new Promise((resolve, reject) => {
      request({
        headers: headers,
        url: url,
        method: 'GET'
      }, (error, response, body) => {
        if (error) {
          reject(error)
        }
        resolve({body: body, response: response})
      })
    });
  };
  var downloadData = () => {
    // recursively download repo data until there is nothing left
    getUrl(page)
      .then((data) => {
        if(data.response.statusCode != '200'){
          throw new Error("Bad error code, stop now.")
        }
        var repo_data = JSON.parse(data.body);
        if (_.isEmpty(repo_data) || _.isUndefined(repo_data)) {
          console.log("Empty response, stop here.");
          fs.writeFileSync(rawDataFilename, JSON.stringify(repos));
        } else {
          console.log("Found ", repo_data.length, " items");
          repos = repos.concat(repo_data);
          console.log("Total items:", repos.length);
          page ++;
          return downloadData();
        }
      })
      .catch((e) => {
        console.log("There was an error:", e)
      })
  };
  return {downloadData}
}().downloadData();