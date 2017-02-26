var request = require("request")
var cheerio = require("cheerio")

request('https://news.ycombinator.com', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    var $ = cheerio.load(body);
    $('a.storylink').each(function(idx,val) {
        console.log($(val).text(), $(val).attr('href'))
    })
  }
});