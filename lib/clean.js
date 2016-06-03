var fs = require('fs');
var stream = require('stream');
var _ = require('lodash');
var JSONStream = require('JSONStream');

module.exports = function () {
  const keys = ['name', 'description', 'html_url', 'updated_at', 'language'];
  const rawRepoData = fs.createReadStream("data/rawRepoData.json");
  const cleanRepoData = fs.createWriteStream('data/cleanRepoData.json');

  var clean = () => {
    var result = [];
    rawRepoData.pipe(JSONStream.parse('*').on('data', (data) => {
      var item = {};
      _.map(keys, (key) => {
        if (key == "name") {
          item[key] = data[key].toLowerCase();
        } else if (key == "updated_at") {
          var d = new Date(data[key]);
          item[key] = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        } else {
          item[key] = data[key];
        }

      });
      return result.push(item);
    }).on('end', () => {
      var a = new stream.PassThrough();
      a.write(JSON.stringify(result));
      a.end();
      a.pipe(cleanRepoData);
    }));
  };
  return {
    clean
  }
}().clean();