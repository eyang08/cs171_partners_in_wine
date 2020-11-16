

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

        console.log('vis.world', vis.world)

        // draw countries
        vis.countries = vis.svg.selectAll(".country")
            .data(vis.world)
            .enter().append("path")
            .attr('class', 'country')
            .attr("d", vis.path)
            .style("stroke", "black")
            .style("fill", "grey")
            .style("stroke-width", "1")

        // color scale
        vis.colorScale = d3.scaleLinear()
            .range(["#FFEFEA", "#7f0000"]);


        vis.wrangleData()
    }

    wrangleData() {
        let vis = this;

        // filter by time range

        // get whether import/export
        // get metric selector

        // group rows by either import or export country

        // let tradeDataByCountry = Array.from(d3.group(vis.wineData, d =>d['export_country']), ([key, value]) => ({key, value}))

        let trade_flow = 'import_country';
        let tradeDataByCountry = Array.from(d3.rollup(vis.wineData, v=> Object.fromEntries(["value_thousand_USD", "quantity_metric_tons"].map(col => [col, d3.sum(v, d => +d[col])])), d =>d[trade_flow]), ([key, value]) => ({key, value}))

        console.log('tradedatabycountry', tradeDataByCountry)


        vis.countryInfo = []

        // check if geoData countries are in tradecountries, then get info from helpers

        vis.world.forEach(country => {
            let mapName = country.properties.name

            let tradeRow = tradeDataByCountry.find(x=>x.key === mapName)
            if (typeof tradeRow == 'undefined') {

                let tradeName = nameConverter.getTradeName(mapName)

                if (tradeName !== false) {

                    let mapTradeRow = tradeDataByCountry.find(x=>x.key === tradeName)
                    vis.countryInfo.push(
                        {
                            country: mapName,
                            valueTrade: mapTradeRow.value['value_thousand_USD'],
                            quantityTrade: mapTradeRow.value['quantity_metric_tons']
                        }
                    )
                }

            } else {
                vis.countryInfo.push(
                    {
                        country: mapName,
                        valueTrade: tradeRow.value['value_thousand_USD'],
                        quantityTrade: tradeRow.value['quantity_metric_tons']
                    }
                )
            }

        })

        // tradeDataByCountry.forEach(country => {
        //
        //     // country name
        //     //let countryName =  country.key
        //
        //     let countryName = nameConverter.getMapName(country.key)
        //
        //     vis.countryInfo.push(
        //         {
        //             country: countryName,
        //             valueTrade: country.value['value_thousand_USD'],
        //             quantityTrade: country.value['quantity_metric_tons']
        //         }
        //     )
        //
        // })

        vis.countryInfo.sort((a,b) => (a.country > b.country) ? 1 : -1)

        console.log('final data structure for myMapVis', vis.countryInfo)



        vis.updateVis()
    }

    updateVis() {
        let vis = this;

        // get object from countryInfo
        let getObject = function(d) {
            let n = vis.countryInfo.find(x=> x.country === d.properties.name)
            if (typeof n !== 'undefined') {
                return n;
            } else {
              //  console.log(d.properties.name)
                return false;
            }
        }

        vis.colorScale.domain([0, d3.max(vis.countryInfo, d=>d['valueTrade'])])

        vis.countries
            .style("fill", function(d) {
                if (getObject(d) !== false) {
                    return vis.colorScale(getObject(d)['valueTrade'])
                }
                else {
                    return "white"
                }
            })



    }


}