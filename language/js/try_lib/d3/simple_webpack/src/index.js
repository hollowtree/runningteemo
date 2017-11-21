import * as d3 from 'd3';
window.d3 = d3;

const square = d3.selectAll("rect");
square.transition().delay(300).style("fill", "orange");