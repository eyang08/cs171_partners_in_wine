let topWine,
  bottomWine,
    redWine,
    whiteWine


let promises = [

  d3.csv("data/winequality-red.csv"),
  d3.csv("data/winequality-white.csv")

];

Promise.all(promises)
  .then( function(data){ createVis(data)})
  .catch( function (err){console.log(err)} );


function createVis(data){
  redWine = data[0];
  whiteWine = data[1];


  bottomWine= new RadarVis("#bottom-wine", redWine, false, "Bottom Wines")
  topWine = new RadarVis("#top-wine", redWine, true, "Top Wines")

};


function onSelectionChange(){

  let typeBox = document.getElementById("wine-type");
  let typeValue = typeBox.options[typeBox.selectedIndex].value;
  if (typeValue == "white")
  {
    bottomWine.data = whiteWine;
    topWine.data = whiteWine;
    bottomWine.wrangleData();
    topWine.wrangleData();
  }
  if (typeValue == "red")
  {
    bottomWine.data = redWine;
    topWine.data = redWine;
    bottomWine.wrangleData();
    topWine.wrangleData();
  }

}
