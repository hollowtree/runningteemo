import * as d3 from 'd3'

    ; (function () {
        var svg = d3.select('body')
            .append('svg')
            .attr('height', 200)
            .attr('width', 800)

        var circle1 = svg.append('g')
            .selectAll('circle')
            .data([{
                x: 20,
                y: 20,
                r: 15
            }])
            .enter()
            .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => d.r)
            .attr('fill', 'rgb(70, 130, 180)')

        var circle2 = svg.append('g')
            .selectAll('circle')
            .data([{
                x: 140,
                y: 20,
                r: 15
            }])
            .enter()
            .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => d.r)
            .attr('fill', 'rgb(70, 130, 180)')

        var zoom_handler = d3.zoom()
            .on('zoom', zoom_actions)

        function zoom_actions() {
            var transform = d3.zoomTransform(this)
            // same as  this.setAttribute("transform", "translate(" + transform.x + "," +
            //                             transform.y + ") scale(" + transform.k + ")");
            // this.setAttribute('tranform', transform)
            circle1.attr('transform', d3.event.transform)
        }
        zoom_handler(circle1)


        var drag_handler = d3.drag()
            .on('drag', function (d) {
                d3.select(this)
                    .attr('cx', d.x = d3.event.x)
                    .attr('cy', d.y = d3.event.y)
            })

        drag_handler(circle1)

    })()

    ; (function () {
        var width = 800,
            height = 500
        var svg = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)

        var circle_data = d3.range(50).map(function () {
            return {
                x: Math.round(Math.random() * width),
                y: Math.round(Math.random() * height),
                r: Math.round(Math.random() * 20 + 5)
            }
        })

        var circles = svg.append('g')
            .attr('class', 'circles')
            .selectAll('circle')
            .data(circle_data)
            .enter()
            .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', d => {
                return d.r
            })
            .attr('fill', 'rgb(70, 130, 180)')

        var zoom_handler = d3.zoom()
            .on('zoom', zoom_actions)

        function zoom_actions() {
            circles.attr('transform', d3.event.transform)
        }

        zoom_handler(svg)

        var drag_handler = d3.drag()
            .on('drag', function (d) {
                d3.select(this)
                    .attr('cx', d.x = d3.event.x)
                    .attr('cy', d.y = d3.event.y)
            })

        drag_handler(circles)
    })()
    ; (function () {
        var margin = { top: 20, right: 20, bottom: 30, left: 40 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;


        var data = [
            { letter: 'A', frequency: 0.08167 },
            { letter: 'B', frequency: 0.01492 },
            { letter: 'C', frequency: 0.02780 },
            { letter: 'D', frequency: 0.04253 },
            { letter: 'E', frequency: 0.12702 }
        ]

        var x = d3.scaleBand()
            // .domain()
            .range([0, width])

        var y = d3.scaleLinear()
            .range([height, 0])

        var xAxis = d3.axisBottom(x)

        var yAxis = d3.axisLeft(y)

        var svg = d3.select('body')
            .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')


        x.domain(data.map(function (d) {
            return d.letter
        }))

        y.domain([0, d3.max(data, function (d) {
            return d.frequency
        })])

        svg.append('g')
            .attr('class', 'x axis')
            .attr('transform', 'translate(0,' + height + ')')
            .call(xAxis)

        svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis)
        // .append('text')
        // .attr('transform', 'rotate(-90)')
        // .attr('y', 6)
        // .attr('dy', '.71em')
        // .style('text-anchor', 'end')
        // .text('Frequency')

        svg.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function (d) {
                return x(d.letter)
            })
            .attr('width', function (d) {
                return 20
            })
            .attr('y', function (d) {
                return y(d.frequency)
            })
            .attr('height', function (d) {
                return height - y(d.frequency)
            })
            .attr('transform', 'translate(' + (width / data.length / 2 - 10) + ',0)')

        // d3.select("input").property("checked", true).each(change);

        setTimeout(function () {
            var x0 = x.domain(data.sort(true ? function (a, b) { return b.frequency - a.frequency; } : function (a, b) { return d3.ascending(a.letter, b.letter); })
                .map(function (d) { return d.letter; }))
                .copy();

            svg.selectAll(".bar")
                .sort(function (a, b) { return x0(a.letter) - x0(b.letter); });

            var transition = svg.transition().duration(1000),
                delay = function (d, i) { return i * 100; };

            transition.selectAll(".bar")
                .delay(delay)
                .attr("x", function (d) { return x0(d.letter); });

            transition.select(".x.axis")
                .call(xAxis)
                .selectAll("g")
                .delay(delay);
        }, 1000);
    })()

    ; (function () {
        var data = [
            { x: 0, y: 40 },
            { x: 10, y: 80 },
            { x: 20, y: 50 },
            { x: 30, y: 70 }
        ]
        var width = 500,
            height = 500,
            margin = 25,
            axisLength = width - 2 * margin

        var xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, axisLength])

        var yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([axisLength, 0])

        var chart = d3.select('body')
            .append('svg')
            // .attr('viewBox','0,0,'+ width+','+height)
            .attr('width', width)
            .attr('height', height)
            .style('border', '1px solid #666')

        chart.append('g')
            .classed('x-axis', true)
            .attr('transform', function () {
                return 'translate(' + margin + ',' + (height - margin) + ')'
            })
            .call(d3.axisBottom(xScale))

        chart.selectAll('g.x-axis g.tick:nth-child(n+3)')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -(height - 2 * margin))
            .style('stroke-width', 1)
            .style('stroke', '#ccc')
            .style('stroke-dasharray', '1,5,1')

        chart.append('g')
            .classed('y-axis', true)
            .attr('transform', function () {
                return 'translate(' + margin + ',' + margin + ')'
            })
            .call(d3.axisLeft(yScale))

        chart.selectAll('g.y-axis g.tick:nth-child(n+3)')
            .append('line')
            .classed('grid-line', true)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (width - 2 * margin))
            .attr('y2', 0)
            .style('stroke-width', 1)
            .style('stroke', '#ccc')
            .style('stroke-dasharray', '1,5,1')

        var line = d3.line()
            .x(function (d) {
                return xScale(d.x)
            })
            .y(function (d) {
                return yScale(d.y)
            })

        chart.append('path')
            .attr('d', line(data))
            .attr('stroke', 'blue')
            .attr('fill', 'none')
            .attr('transform', function () {
                return 'translate(' + margin + ',' + margin + ')'
            })

        var arc1 = d3.arc()
            .innerRadius(xScale(10))
            .outerRadius(xScale(20))
            .startAngle(Math.PI / 2)
            .endAngle(Math.PI)

        chart.append('path')
            .attr('d', arc1())
            .attr('fill', 'rgba(70, 130, 180, .7)')
            .attr('transform', function () {
                return 'translate(' + margin + ',' + margin + ')'
            })


    })()


    ; (function () {

        var xScale = d3.scaleBand()
            .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
            .range([0, 600]);

        var xAxis = d3.axisBottom(xScale)
            // .ticks(10)
            .tickPadding(10)
        // .tickFormat(function (d) { return d })
        d3.select('body').append('svg').attr('width', 800).append('g').call(xAxis)
    })()

    ; (function () {
        var chartdata = [410, 370, 330, 300, 270, 240, 220, 200, 180, 165, 150, 135, 120,
            135, 150, 165, 180, 200, 220, 240, 270, 300, 330, 370, 410]
        var height = 200,
            width = 800,
            barWidth = width / chartdata.length - 2,
            barOffset = 2

        var xScale = d3.scaleOrdinal()
            .domain(d3.range(0, chartdata.length))
            .range([0, width])

        var yScale = d3.scaleLinear()
            .domain([0, d3.max(chartdata)])
            .range([0, height - 5])

        var colors = d3.scaleLinear()
            .domain([0, chartdata.length * .33, chartdata.length * .66, chartdata.length])
            .range(['#d6e9c6', '#bce8f1', '#faebcc', '#ebccd1'])

        var dynamicColor = ''

        var chart = d3.select('body')
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .style('background', '#bce8f1')

        function applyTransition(selection, ease, delay, height) {
            selection.transition()
                .ease(ease)
                .delay(delay)
                .duration(1000)
                .attr("height", height)
                .attr('y', 200 - height)
        }

        chart.selectAll('rect')
            .data(chartdata)
            .enter()
            .append('rect')
            .style('fill', function (d, i) {
                return colors(i)
            })
            .style('stroke', '#31708f')
            .style('stroke-width', '5')
            .attr('width', barWidth)
            .attr('height', 0)
            .attr('x', function (d, i) {
                return i * (barWidth + barOffset)
            })
            .attr('y', height)
            .on('mouseover', function () {
                // --- 保存颜色
                dynamicColor = this.style.fill
                d3.select(this)
                    .style('fill', '#3c763d')
            })
            .on('mouseout', function () {
                d3.select(this)
                    .style('fill', dynamicColor)
            })
            .each(function (d, i) {
                d3.select(this)
                    .call(applyTransition, d3.easeCubic, i * 50, yScale(d), i)
            })
    })()

    ; (function () {
        var data = []
        for (var i = 0; i < 15; i++) {
            data.push(10)
        }
        d3.select('body')
            .append('svg')
            .attr('width', 720)
            .attr('height', 120)
            .selectAll('circle')
            .data(data).enter()
            .append('circle')
            .attr('cy', 0)
            .transition()
            .duration(1000)
            .attr('cy', 80)
            .duration(1000)
            .attr('r', function (d) {
                return d
            })
            .duration(1000)
            .attr('cx', function (d, i) {
                return i * 40 + 20
            })
            .duration(1000)
            .style('fill', 'red')
            .transition()
            .attr('cx', function (d, i) {
                return (i + 1) * 40 + 20
            })
        // .remove()
    })()

    ; (function () {
        var data = []
        for (var i = 0; i < 40; i++) {
            // --- 一个小坑
            // --- toFixed 会将数字转换为字符串
            // --- d3.max 对字符串数组求最大值会出现异常
            // --- 前面应加加号，或用 Math.round
            // --- 另，求数组字符串的最大值的简便方法是 Math.max.apply(null, arr)
            data.push(+((Math.random() + 0.2) * 100).toFixed(0))
        }
        var margin = { top: 20, right: 30, bottom: 30, left: 40 },
            width = 800,
            height = 200

        // var x = d3.scaleLinear()
        //     .domain([0, data.length])
        //     // .rangeRoundBands([0, width], .1)
        //     .range([0, width])

        var x = d3.scaleLinear()
            .domain([0, data.length])
            .range([0, width])

        var y = d3.scaleLinear()
            .domain([0, 120])
            .range([height, 0])
        // .ticks(20)

        var chart = d3.select('body')
            .append('svg')
            .classed('chart', true)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)

        var content = chart.append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

        var barWidth = width / data.length;

        var bar = content.selectAll('g')
            .data(data)
            .enter().append('g')
            .attr('transform', function (d, i) { return 'translate(' + i * barWidth + ',0)' })

        bar.append('rect')
            .attr('y', function (d) { return y(d) })
            .attr('height', function (d) { return height - y(d) })
            .attr('width', barWidth - 1)
        bar.append('text')
            .attr('x', barWidth)
            .attr('y', function (d) { return y(d) + 3 })
            .attr('dy', '.75em')
            .text(function (d) { return d })

        chart.append('g').attr('class', 'axis')
            .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top + 5) + ')')
            .call(d3.axisBottom(x))

        chart.append('g').attr('class', 'axis')
            .attr('transform', 'translate(' + (margin.left - 5) + ', ' + margin.top + ')')
            .call(d3.axisLeft(y))
    })()
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


