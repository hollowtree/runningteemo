var request = new XMLHttpRequest();
request.open('GET', '/js/data.json', true);

request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
        // Success!
        var data = JSON.parse(this.response);
        handleData(data);

    } else {
        // We reached our target server, but it returned an error

    }
};
request.onerror = function () {
    // There was a connection error of some sort
};

request.send();


function handleData(data) {
    var ca = [],
        data1 = [],
        data2 = [],
        data3 = [],
        coordData = [];


    for (var i = 0; i < data.length; i++) {
        var n = data[i];
        ca.push(n.date.slice(0, 10));
        data1.push([n.open_price, n.close_price, n.low_price, n.high_price]);
        data2.push(n.open_price + 20)
        data3.push(n.total_score + 400 || '-');
        if (n.total_score) {
            coordData.push({
                coord: [n.date.slice(0, 10), n.total_score + 400]
            });
        }

    }
    console.log(ca, data1, data2, data3);

    drawChart({
        ca: ca,
        data1: data1,
        data2: data2,
        data3: data3,
        coordData: coordData
    })
}


var upColor = '#ec0000';
var upBorderColor = '#8A0000';
var downColor = '#00da3c';
var downBorderColor = '#008F28';




function drawChart(d) {
    var mychart = echarts.init(document.getElementById('kLine'));
    mychart.setOption({
        animation: false,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },

        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            // type: 'category',
            data: d.ca,
            // scale: true,
            // boundaryGap : false,
            // axisLine: {onZero: false},
            // splitLine: {show: false},
            // splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        },
        yAxis: [
            {
                name: '日K',
                scale: true,
                splitArea: {
                    show: true
                }
            },
            {
                name: 'KL',
                type: 'value',
                min: 0
            }
        ],

        series: [
            {
                name: '日K',
                type: 'candlestick',
                data: d.data1,
                itemStyle: {
                    normal: {
                        color: upColor,
                        color0: downColor,
                        borderColor: upBorderColor,
                        borderColor0: downBorderColor
                    }
                },
                // markPoint: {
                //     label: {
                //         normal: {
                //             formatter: function (param) {
                //                 return param != null ? Math.round(param.value) : '';
                //             }
                //         }
                //     },
                //     data: [
                //         {
                //             name: 'XX标点',
                //             coord: ['2013/5/31', 2300],
                //             value: 2300,
                //             itemStyle: {
                //                 normal: {color: 'rgb(41,60,85)'}
                //             }
                //         },
                //         {
                //             name: 'highest value',
                //             type: 'max',
                //             valueDim: 'highest'
                //         },
                //         {
                //             name: 'lowest value',
                //             type: 'min',
                //             valueDim: 'lowest'
                //         },
                //         {
                //             name: 'average value on close',
                //             type: 'average',
                //             valueDim: 'close'
                //         }
                //     ],
                //     // tooltip: {
                //     //     formatter: function (param) {
                //     //         return param.name + '<br>' + (param.data.coord || '');
                //     //     }
                //     // }
                // },
                // markLine: {
                //     symbol: ['none', 'none'],
                //     data: [
                //         [
                //             {
                //                 name: 'from lowest to highest',
                //                 type: 'min',
                //                 valueDim: 'lowest',
                //                 symbol: 'circle',
                //                 symbolSize: 10,
                //                 label: {
                //                     normal: {show: false},
                //                     emphasis: {show: false}
                //                 }
                //             },
                //             {
                //                 type: 'max',
                //                 valueDim: 'highest',
                //                 symbol: 'circle',
                //                 symbolSize: 10,
                //                 label: {
                //                     normal: {show: false},
                //                     emphasis: {show: false}
                //                 }
                //             }
                //         ],
                //         {
                //             name: 'min line on close',
                //             type: 'min',
                //             valueDim: 'close'
                //         },
                //         {
                //             name: 'max line on close',
                //             type: 'max',
                //             valueDim: 'close'
                //         }
                //     ]
                // }
            },
            {
                name: 'KL',
                type: 'line',
                data: d.data3,
                // smooth: true,
                connectNulls: true,
                markPoint: {
                    symbol: 'circle',
                    symbolSize: 20,
                    label: {
                        normal: {
                            show: true,
                            position: [10, 10],
                            formatter: function (a) {
                                console.log(a)
                            }
                        }
                    },
                    data: d.coordData
                }
            }

        ]
    })
}


