

class MapVis {

    constructor(parentElement, geoData, wineData) {
        this.parentElement = parentElement;
        this.geoData = geoData;
        this.wineData = wineData;

        this.initVis()
    }

    initVis() {
        let vis = this;

        vis.margin = {top: 20, right: 20, bottom: 20, left: 20};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width)
            .attr("height", vis.height)
            .attr('transform', `translate (${vis.margin.left}, ${vis.margin.top})`);

        // add title
        vis.title = vis.svg.append('g')
            .attr('class', 'title map-title')
            .append('text')
            .text('World Map')
            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle');

        // create projection
        vis.projection =  d3.geoNaturalEarth1()
            .translate([vis.width / 2, vis.height / 2 + 50])
            .scale(200)

        // geo generator
        vis.path = d3.geoPath()
            .projection(vis.projection);

        // convert topojson into geojson
        vis.world = topojson.feature(vis.geoData, vis.geoData.objects.countries).features

        console.log(vis.geoData)

        // draw countries
        vis.countries = vis.svg.selectAll(".country")
            .data(vis.world)
            .enter().append("path")
            .attr('class', 'country')
            .attr("d", vis.path)
            .style("stroke", "black")
            .style("fill", "grey")
            .style("stroke-width", "1")




        vis.wrangleData()
    }

    wrangleData() {
        let vis = this;

        vis.updateVis()
    }

    updateVis() {
        let vis = this;



    }


}