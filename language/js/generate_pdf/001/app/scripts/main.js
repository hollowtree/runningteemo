var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
var data = '<svg xmlns="http://www.w3.org/2000/svg">' +
    '<foreignObject width="400px" height="400px">' +
    '<div xmlns="http://www.w3.org/1999/xhtml">' +
    'Hello World788888888888888888888 8888888888 88888888888!' +
    '</div>' +
    '</foreignObject>' +
    '</svg>';

var DOMURL = window.URL || window.webkitURL || window
var img = new Image()
var svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' })
var url = DOMURL.createObjectURL(svg)
img.onload = function () {
    ctx.drawImage(img, 0, 0);
    DOMURL.revokeObjectURL(url)
}
img.src = url