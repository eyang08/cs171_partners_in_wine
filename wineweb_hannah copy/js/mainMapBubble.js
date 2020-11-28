/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// need: tooltip, legend, selector for import/export, value/quantity, brushing for different years




// init global variables & switches
let myMapVis,
    myBrushVis,
    myBubbleVis,
    redWineVis,
    whiteWineVis,
    redWineData,
    whiteWineData;



let selectedTimeRange = [];
let selectedCountry = '';



// load data using promises
let promises = [
   // d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"),
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-110m.json"),
    d3.csv("data/wine_trade_2018.csv"),
    d3.csv("data/wine_trade_full.csv"),
    d3.csv("data/wine_magazine.csv"),
    d3.csv("data/winequality-red.csv"),
    d3.csv("data/winequality-white.csv")
];

Promise.all(promises)
    .then( function(data){ initMainPage(data) })
    .catch( function (err){console.log(err)} );

// initMainPage
function initMainPage(dataArray) {

    let geoData = dataArray[0]
    let wineData = dataArray[1]
    let wineDataFull = dataArray[2]
    let bubbleData = dataArray[3]


    wineData.forEach(function(d) {
        d.year = +d.year
    })
    wineDataFull.forEach(function(d) {
        d.year = +d.year
    })

    bubbleData.forEach(d=> {
        d.points = +d.points;
        d.price = +d.price;
    })



    // log data
    console.log('check out the data', wineData);

    let MyEventHandler = {};

    // init map
    myMapVis = new MapVis('mapDiv', geoData, wineDataFull);

    // init brush
    myBrushVis = new BrushVis('brushDiv', geoData, wineDataFull, MyEventHandler);

    // when 'selectionChanged' is triggered, specified function is called
    $(MyEventHandler).bind("selectionChanged", function(event, rangeStart, rangeEnd) {
        myBrushVis.onSelectionChanged(rangeStart, rangeEnd)
    });


    // init matrix

    myBubbleVis = new BubbleVis('bubbleDiv', bubbleData)


    // Add HRadar visualization
    redWine = dataArray[4]
    whiteWine = dataArray[5]

    redWineVis = new RadarVis("#bottom-wine", redWine, false, "Red Wines")
    whiteWineVis = new RadarVis("#top-wine", whiteWine, true, "White Wines")

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
    myBrushVis.wrangleDataStatic();

}

function onSelectionChange(){

    redWineVis.wrangleData();
    whiteWineVis.wrangleData();

}

