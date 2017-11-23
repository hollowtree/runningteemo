import * as d3 from 'd3';

var data = [2, 3, 6, 8, 9, 23, 67]

d3.select('.chart1')
    .selectAll('div')
    .data(data)
    .enter().append('div')
    .style('width', function (d) { return d * 10 + 'px' })
    .text(function (d) { return d })
