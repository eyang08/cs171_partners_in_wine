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

    /*let colorscale = d3.scale.category10();

//Legend titlesl
    let LegendOptions = ['Quality: 3','Quality: 4','Quality: 5', 'Quality: 6', 'Quality: 7', 'Quality: 8'];


      let svg = d3.select('#body')
          .selectAll('svg')
          .append('svg')
          .attr("width", vis.w+300)
          .attr("height", vis.h)

//Create the title for the legend
      let text = svg.append("text")
          .attr("class", "title")
          .attr('transform', 'translate(90,0)')
          .attr("x", w - 70)
          .attr("y", 10)
          .attr("font-size", "12px")
          .attr("fill", "#404040")
          .text("What % of owners use a specific service in a week");

      //Initiate Legend
      let legend = svg.append("g")
          .attr("class", "legend")
          .attr("height", 100)
          .attr("width", 200)
          .attr('transform', 'translate(90,20)')
      ;
//Create colour squares
      legend.selectAll('rect')
          .data(LegendOptions)
          .enter()
          .append("rect")
          .attr("x", w - 65)
          .attr("y", function(d, i){ return i * 20;})
          .attr("width", 10)
          .attr("height", 10)
          .style("fill", function(d, i){ return colorscale(i);})
      ;
//Create text next to squares
      legend.selectAll('text')
          .data(LegendOptions)
          .enter()
          .append("text")
          .attr("x", w - 52)
          .attr("y", function(d, i){ return i * 20 + 9;})
          .attr("font-size", "11px")
          .attr("fill", "#737373")
          .text(function(d) { return d; })
      ;*/



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

  vis.wines3 = vis.data.filter((wine => wine.quality == 3));
  vis.wines4 = vis.data.filter((wine => wine.quality == 4));
  vis.wines5 = vis.data.filter((wine => wine.quality == 5));
  vis.wines6 = vis.data.filter((wine => wine.quality == 6));
  vis.wines7 = vis.data.filter((wine => wine.quality == 7));
  vis.wines8 = vis.data.filter((wine => wine.quality == 8));

  vis.wines = [vis.wines3, vis.wines4, vis.wines5, vis.wines6, vis.wines7, vis.wines8];

  vis.qualityData =[];

  vis.wines.forEach(winedata=> {
        function avg(data, attr){
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
                    sum = +(sum) + +((data[i][attr]));
                }
            let average = sum/data.length
            return average
        }


      vis.qualityData.push({
          Quality: avg(winedata, "quality"),
          alcohol: avg(winedata, "alcohol"),
          pH: avg(winedata, "pH"),
          density: avg(winedata, "density"),
          resSugar: avg(winedata, "residual sugar"),
          volAcid: avg(winedata, "volatile acidity"),
          fixAcid: avg(winedata, "fixed acidity"),
          citAcid: avg(winedata, "citric acid"),
          chlorides: avg(winedata, "chlorides"),
          totSulfur: avg(winedata, "total sulfur dioxide"),
          freeSulfur: avg(winedata, "free sulfur dioxide"),
          sulphates: avg(winedata, "sulphates")
      })
  })

    console.log(vis.qualityData)

    vis.finalData = [[],[],[],[],[],[]];

    let i = 0;
    vis.qualityData.forEach(wine => {
        if (document.getElementById("attribute1").checked == true){
            vis.finalData[i].push({axis: "Alcohol", value: (wine.alcohol) })
        }
        if (document.getElementById("attribute2").checked == true) {
            vis.finalData[i].push({axis: "pH", value: (wine.pH)})
        }
        if (document.getElementById("attribute3").checked == true) {
            vis.finalData[i].push({axis: "Density", value: (wine.density)})
        }
        if (document.getElementById("attribute4").checked == true) {
            vis.finalData[i].push({axis: "Residual Sugar", value: wine.resSugar})
        }
        if (document.getElementById("attribute5").checked == true) {
            vis.finalData[i].push({axis: "Volatile Acidity", value: wine.volAcid})
        }
        if (document.getElementById("attribute6").checked == true) {
            vis.finalData[i].push({axis: "Fixed Acidity", value: wine.fixAcid})
        }
        if (document.getElementById("attribute7").checked == true) {
            vis.finalData[i].push({axis: "Citric Acid", value: wine.citAcid})
        }
        if (document.getElementById("attribute8").checked == true) {
            vis.finalData[i].push({axis: "Chlorides", value: wine.chlorides })
        }
        if (document.getElementById("attribute9").checked == true) {
            vis.finalData[i].push({axis: "Free Sulfur Dioxide", value: wine.freeSulfur})
        }
        if (document.getElementById("attribute10").checked == true) {
            vis.finalData[i].push({axis: "Total Sulfur Dioxide", value: wine.totSulfur})
        }
        if (document.getElementById("attribute11").checked == true) {
            vis.finalData[i].push({axis: "Sulphates", value: wine.sulphates})
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


  console.log(vis.w)
  vis.mycfg = {
    w: vis.w,
    h: vis.h,
    maxValue: 6,
    levels: 6,
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
