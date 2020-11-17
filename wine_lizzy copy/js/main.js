/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// need: tooltip, legend, selector for import/export, value/quantity, brushing for different years




// init global variables & switches
let myMapVis;



// load data using promises
let promises = [
   // d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"),
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json"),
    d3.csv("data/wine_trade_2018.csv")
];

Promise.all(promises)
    .then( function(data){ initMainPage(data) })
    .catch( function (err){console.log(err)} );

// initMainPage
function initMainPage(dataArray) {

    // log data
    console.log('check out the data', dataArray);

    // init map
    myMapVis = new MapVis('mapDiv', dataArray[0], dataArray[1], dataArray[2]);

}


// category select

// let trade_flow = 'export_country';
// let selectedCategory = 'valueTrade';

let trade_flow = $('#flowSelector').val();
let selectedCategory = $('#metricSelector').val();

function categoryChange() {
    trade_flow = $('#flowSelector').val();
    selectedCategory = $('#metricSelector').val();
    myMapVis.wrangleData();
}



