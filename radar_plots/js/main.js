let topRed,
  bottomRed,
  topWhite,
  bottomWhite


let promises = [

  d3.csv("data/winequality-red.csv"),
  d3.csv("data/winequality-white.csv")

];

Promise.all(promises)
  .then( function(data){ createVis(data)})
  .catch( function (err){console.log(err)} );


function createVis(data){
  let redWine = data[0];
  let whiteWine = data[1];


  bottomRed = new RadarVis("bottom-red", redWine, false, "Bottom Red Wines")
  topRed = new RadarVis("top-red", redWine, true, "Top Red Wines")
  topWhite = new RadarVis("top-white", whiteWine, true, "Top White Wines")
  bottomWhite = new RadarVis("bottom-white", whiteWine, false, "Bottom White Wines")

};


