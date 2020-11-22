/* main JS file */



class RadarVis {


  constructor(_parentElement, _data, _top, title) {
    this.parentElement = _parentElement;
    this.data = _data;
    this.top = _top
    this.displayData = [];
    this.title = title
    this.initVis();
  }

  initVis(){
    let vis = this;

    vis.w = $(vis.parentElement).width() -200;
    vis.h = $(vis.parentElement).width() -200;



      vis.wrangleData()
  }



wrangleData(){

    let vis = this;


  vis.displayData = vis.data

  if (vis.top){
    vis.displayData.sort((a,b) => {return b.quality - a.quality})
  } else {
    vis.displayData.sort((a,b) => {return a.quality - b.quality})
  }

  vis.topTenData = vis.displayData.slice(0, 10)
  vis.finalData = [[],[],[],[],[],[],[],[],[],[]];
  let i = 0;
vis.topTenData.forEach(wine => {
      if (document.getElementById("attribute1").checked == true){
       vis.finalData[i].push({axis: "Alcohol", value: (wine.alcohol + 5) })
      }
      if (document.getElementById("attribute2").checked == true) {
          vis.finalData[i].push({axis: "pH", value: (wine.pH + 5)})
      }
      if (document.getElementById("attribute3").checked == true) {
          vis.finalData[i].push({axis: "Density", value: (wine.density + 5)})
      }
      if (document.getElementById("attribute4").checked == true) {
          vis.finalData[i].push({axis: "Residual Sugar", value: wine["residual sugar"]})
      }
      if (document.getElementById("attribute5").checked == true) {
        vis.finalData[i].push({axis: "Volatile Acidity", value: wine["volatile acidity"]})
      }
      if (document.getElementById("attribute6").checked == true) {
        vis.finalData[i].push({axis: "Fixed Acidity", value: wine["fixed acidity"]})
      }
      if (document.getElementById("attribute7").checked == true) {
        vis.finalData[i].push({axis: "Citric Acid", value: wine["citric acid"]})
      }
      if (document.getElementById("attribute8").checked == true) {
        vis.finalData[i].push({axis: "Chlorides", value: wine.chlorides })
      }
      if (document.getElementById("attribute9").checked == true) {
        vis.finalData[i].push({axis: "Free Sulfur Dioxide", value: wine["free sulfur dioxide"]})
      }
      if (document.getElementById("attribute10").checked == true) {
        vis.finalData[i].push({axis: "Total Sulfur Dioxide", value: wine["total sulfur dioxide"]})
      }
      if (document.getElementById("attribute11").checked == true) {
        vis.finalData[i].push({axis: "Sulphates", value: wine["sulphates"]})
      }
  i++;

})
console.log(vis.finalData)
    vis.updateVis()
};




updateVis () {
  let vis = this;

  vis.color = "crimson"

  if (vis.data == whiteWine){
      vis.color = "darksalmon"
  }

  vis.mycfg = {
    w: vis.w,
    h: vis.h,
    maxValue: 10,
    levels: 10,
    ExtraWidthX: 300,
      title: vis.title,
      color: vis.color
  }

  console.log(vis.finalData)
//Call function to draw the Radar chart
//Will expect that data is in %'s
  RadarChart.draw(vis.parentElement, vis.finalData, vis.mycfg);


}
};
