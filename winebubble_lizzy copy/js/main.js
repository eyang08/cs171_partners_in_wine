/* * * * * * * * * * * * * *
*           MAIN           *
* * * * * * * * * * * * * */

// clusters of grapes into differently priced wine, circles are either variety or province
// size of circles = # of wines in category


// init global variables & switches
let myBubbleVis;


// load data using promises
let promises = [
    d3.csv("data/wine_magazine.csv")
];

Promise.all(promises)
    .then( function(data){initMainPage(data)})
    .catch( function (err){console.log(err)} );

// initMainPage
function initMainPage(dataArray) {

    // log data
    console.log('check out the data', dataArray[0]);

    dataArray[0].forEach(d=> {
        d.points = +d.points;
        d.price = +d.price;
    })


    // init matrix

    myBubbleVis = new BubbleVis('bubbleDiv', dataArray[0])


}