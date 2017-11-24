import * as d3 from 'd3'

    ; (function () {
        // --- 参考：https://bost.ocks.org/mike/bar/ 
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

    ; (function () {
        var data = [2, 3, 6, 8, 9, 23, 67]
        var width = 800,
            barHeight = 20

        var x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, width])

        var chart = d3.select("body")
            .append('svg')
            .attr('class', 'chart')
            .attr('width', width)
            .attr('height', barHeight * data.length)

        var bar = chart.selectAll('g')
            .data(data)
            .enter().append('g')
            .attr('transform', function (d, i) { return 'translate(0,' + i * barHeight + ')' })

        bar.append('rect')
            .attr('width', x)
            .attr('height', barHeight - 1)

        bar.append('text')
            .attr('x', function (d) { return x(d) - 3 })
            .attr('y', barHeight / 2)
            .attr('dy', '.35em')
            .text(function (d) { return d })
    })()
