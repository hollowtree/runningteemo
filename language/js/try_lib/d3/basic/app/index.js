import * as d3 from 'd3';
var svg = d3.select("#svg"),
    w = parseInt(svg.style("width")),
    h = parseInt(svg.style("height"));

var xscale = d3.scaleLinear()
    .domain([0, 10])
    .range([100, w - 100])
svg.append("g").attr("class", "axis")
    .attr("transform", "translate(0," + (h - 100) + ")")
    .call(d3.axisBottom(xscale))

