var fs = require('fs');
var stream = require('stream');
var _ = require('lodash');
var JSONStream = require('JSONStream');

module.exports = function () {
  var orders = ['name', 'language', 'updated_at', 'description'];
  const cleanRepoData = 'data/cleanRepoData.json';

  const header = [
    "| Name | Description | Updated at | Language |",
    "| ---- | ----------- | ---------- | -------- |"
  ];

  var getMd = (data) => {
    return _.map(data, (r) => "| ["+r.name+"]("+r.html_url+") | "+(r.description || "n/a") +" | "+r.updated_at+" | "+(r.language || "n/a")+" |")
  };

  var generate = () => {
    var data = fs.readFileSync(cleanRepoData);
    var repos = JSON.parse(data.toString());
    _.map(orders, (order) => {
      var repo_ordered = _.sortBy(repos, order);
      var md = getMd(repo_ordered);
      var filename = "md/"+order+".md";
      fs.writeFileSync(filename, header.concat(md).join("\n"))
    })
  };
  return {
    generate
  }
}().generate();