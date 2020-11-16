/* main JS file */



class RadarVis {


  constructor(_parentElement, _data, _top, title) {
    this.parentElement = _parentElement;
    this.data = _data;
    this.top = _top
    this.displayData = [];
    this.title = title
    this.wrangleData();
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
  vis.finalData = [];
  let i = 0;
vis.topTenData.forEach(wine => {
  vis.finalData[i] = [
    {x: "Alcohol", value: wine.alcohol},
    {x: "pH", value: wine.pH},
    {x: "Density", value: wine.density},
    {x: "Residual Sugar", value: wine["residual sugar"]},
    {x: "Volatile Acidity", value: wine["volatile acidity"]},
  ];
  i++;

})

    vis.updateVis()
};




updateVis () {
  let vis = this;


  // create radar chart
  vis.chart = anychart.radar();
  // set chart yScale settings
  vis.chart.yScale()
    .minimum(-3)
    .maximum(3)
    .ticks({'interval':1});

  // create first series
  vis.finalData.forEach(wine=>{
    vis.chart.line(wine)
  })

  // set chart title
  vis.chart.title(vis.title)

  // set container id for the chart
  vis.chart.container(vis.parentElement);
  // initiate chart drawing
  vis.chart.draw();

}
};
