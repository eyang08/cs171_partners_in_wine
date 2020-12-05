/* * * * * * * * * * * * * *
*         MapVis         *
* * * * * * * * * * * * * */


class PieChart {

    // constructor method to initialize Timeline object
    constructor(parentElement, wordData, varietyData, geoData, countryData) {
        this.parentElement = parentElement;
        this.wordData = wordData;
        this.varietyData = varietyData;
        this.geoData = geoData;
        this.countryData = countryData;
        this.displayData = [];
        this.circleColors = ['#b2182b','#d6604d','#f4a582','#fddbc7'];

        // call initVis method
        this.initVis()
    }

    initVis(){
        let vis = this;

        // margin conventions
        vis.margin = {top: 50, right: 50, bottom: 10, left: 50};
        vis.width = $("#" + vis.parentElement).width() - vis.margin.left - vis.margin.right;
        vis.height = $("#" + vis.parentElement).height() - vis.margin.top - vis.margin.bottom;

        // init drawing area
        vis.svg = d3.select("#" + vis.parentElement).append("svg")
            .attr("width", vis.width + vis.margin.left + vis.margin.right)
            .attr("height", vis.height + vis.margin.top + vis.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + vis.margin.left + "," + vis.margin.top + ")");

        // add title
        vis.svg.append('g')
            .attr('class', 'title bar-title')
            .append('text')
            .text("Where it's Made")
            .attr('transform', `translate(${vis.width / 2}, -20)`)
            .attr('text-anchor', 'middle');

        // create a projection
        vis.projection = d3.geoOrthographic() // d3.geoStereographic()
            .scale(100)
            .translate([vis.width / 2, vis.height / 2])

        // define a geo generator w/ predefined projection
        vis.path = d3.geoPath()
            .projection(vis.projection);

        // sphere
        vis.svg.append("path")
            .datum({type: "Sphere"})
            .attr("class", "graticule")
            .attr('fill', '#ADDEFF')
            .attr("stroke","rgba(129,129,129,0.35)")
            .attr("d", vis.path);

        // convert topojson into geojson
        vis.world = topojson.feature(vis.geoData, vis.geoData.objects.countries).features

        // draw countries
        vis.countries = vis.svg.selectAll(".country")
            .data(vis.world)
            .enter().append("path")
            .attr('class', 'pie-country')
            .attr("d", vis.path)

        // append tooltip
        vis.tooltip = d3.select("body").append('div')
            .attr('class', "tooltip")
            .attr('id', 'mapTooltip')

        // Draggable feature
        let m0,
            o0;

        vis.svg.call(
            d3.drag()
                .on("start", function (event) {

                    let lastRotationParams = vis.projection.rotate();
                    m0 = [event.x, event.y];
                    o0 = [-lastRotationParams[0], -lastRotationParams[1]];
                })
                .on("drag", function (event) {
                    if (m0) {
                        let m1 = [event.x, event.y],
                            o1 = [o0[0] + (m0[0] - m1[0]) / 4, o0[1] + (m1[1] - m0[1]) / 4];
                        vis.projection.rotate([-o1[0], -o1[1]]);
                    }

                    // Update the map
                    vis.path = d3.geoPath().projection(vis.projection);
                    d3.selectAll(".pie-country").attr("d", vis.path)
                    d3.selectAll(".graticule").attr("d", vis.path)
                })
        )
        // call next method in pipeline
        this.wrangleData();
    }

    // wrangleData method
    wrangleData(){
        let vis = this
        console.log("updating table")
        vis.displayData = vis.varietyData.filter(function (d) {return d.variety == selectedVariety})

        let tempData = vis.wordData.filter(function (d) {return d.variety == selectedVariety})
        console.log(tempData)

        let priceSum = 0;
        let ratingSum = 0;
        let sum = 0;

        tempData.forEach( entry => {
            priceSum += +entry['price'];
            ratingSum += +entry['points'];
            sum ++;
        });

        document.getElementById("price").innerHTML = priceSum/sum;
        document.getElementById("rating").innerHTML = ratingSum/sum;

        let tempCountryData = vis.countryData.filter(function (d) {return d.variety == selectedVariety})
        console.log(tempCountryData)
        vis.mapData = []
        tempCountryData.forEach(row => {
            vis.mapData[row.country] =
                {
                    country: row.country,
                    percent: row.percent
                }
        })
        console.log(vis.mapData)
        console.log(vis.geoData)

        vis.updateVis()


    }

    // updateVis method
    updateVis() {
        let vis = this;
        var percentFormatter = d3.format(".0%")
        console.log(vis.displayData[0])
        console.log(percentFormatter(vis.displayData[0].percent))
        //add title
        vis.svg.selectAll(".percent").remove()

        vis.svg.append('g')
            .append('text')
            .attr("class", "percent")
            .text(percentFormatter(vis.displayData[0].percent) + " of all " + selectedVariety + " wines are grown in " + vis.displayData[0].location)
            .attr('transform', `translate(${vis.width / 2}, 20)`)
            .attr('text-anchor', 'middle');

        vis.color = d3.scaleLinear().range(["#fff", "#690013"])
            .domain([0,1]);

        // vis.countries
        //     .style("fill", function (d) {
        //         let value = d.properties.name;
        //         if (vis.mapData.country == value) {
        //             return vis.color(vis.mapData[value].percent);
        //         }
        //     })
    }
}