// initialize global viz variables
let myWordCloud;
let myPieChart;
let myBarChart;

// Convert string to numerical when necessary
var rowConverter = function(d) {
    return {
        variety: d.variety,
        country: d.country,
        points: parseFloat(d.points),
        price: parseFloat(d.price),
        province: d.province,
        region: d["region_1"],
        title: d.title,
        winery: d.winery,
        count: parseFloat(d.n),
        word: d.word,
        year: parseFloat(d.year),
        value: d.points/d.price
    };
}
var rowConverter2 = function(d) {
    return {
        variety: d.variety,
        location: d.location,
        percent: parseFloat(d.percent)
    };
}

var rowConverter3 = function(d) {
    return {
        country: d.country,
        total: parseFloat(d.n)
    };
}
// load data using promises
let promises = [
    d3.csv("data/winemag_count.csv", rowConverter),
    d3.csv("data/winemag_variety.csv", rowConverter2),
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json"),
    d3.csv("data/winemag_country.csv", rowConverter3)
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

    // init piechart
    myPieChart = new PieChart('pieDiv', dataArray[0], dataArray[1], dataArray[2], dataArray[3]);

    // init piechart
    myBarChart = new BarChart('barDiv', dataArray[0]);

}

// Update Map according to selection
let selectedCategory = $('#categorySelector').val();

function categoryChange() {
    selectedCategory = $('#categorySelector').val();
    myWordCloud.wrangleData(); // maybe you need to change this slightly depending on the name of your MapVis instance
    myPieChart.wrangleData()
    myBarChart.wrangleData();
}

function category() {
    selectedCategory = $('#categorySelector').val();
    myBarChart.wrangleData(); // maybe you need to change this slightly depending on the name of your MapVis instance
}