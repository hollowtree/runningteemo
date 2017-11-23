import * as d3 from 'd3'

    ; (function () {
        var data = [2, 3, 6, 8, 9, 23, 67]
        var x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, 800])

        d3.select("body")
            .append('div')
            .attr('class', 'chart chart1')
            .selectAll('div')
            .data(data)
            .enter().append('div')
            .style('width', '12px')
            .transition()
            .duration(1000)
            // .delay(function (d, i) { console.log(d, i); return i * 100 })
            // --- .style('width', function (d) { return d * 10 + 'px' })
            .style('width', function (d) { return x(d) + 'px' })
            .text(function (d) { return d })
    })()
