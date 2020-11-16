// initialize global viz variables
let myWordCloud;

// Convert string to numerical when necessary
var rowConverter = function(d) {
    return {
        count: parseFloat(d.n),
        word: d.word,
    };
}
// load data using promises
let promises = [
    d3.csv("data/winemag_count.csv", rowConverter),
    d3.csv("data/winemag_words.csv")
];

Promise.all(promises)
    .then( function(data){ initMainPage(data) })
    .catch( function (err){console.log(err)} );

// initMainPage
function initMainPage(dataArray) {

    // log data
    console.log('check out the data', dataArray);
    // init word cloud
    myWordCloud = new WordCloud('wordcloudDiv', dataArray[0]);
}