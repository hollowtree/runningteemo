
var svg = document.querySelector('svg') /*svg object*/
// --- 线集
var S = new Array() /*splines*/
// --- 点集
var V = new Array() /*vertices*/
var C 	/*current object*/
var x0, y0	/*svg offset*/

/*saves elements as global variables*/
function init() {
    /*create splines*/
    S[0] = createPath("blue");
    S[1] = createPath("red");
    S[2] = createPath("green");
    S[3] = createPath("brown");

    /*create control points*/
    V[0] = createKnot(100, 50);
    V[1] = createKnot(250, 150);
    V[2] = createKnot(400, 50);
    V[3] = createKnot(550, 150);
    V[4] = createKnot(700, 50);

    updateSplines();
}
/*creates and adds an SVG circle to represent knots*/
function createKnot(x, y) {
    var C = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    C.setAttributeNS(null, "r", 10)
    C.setAttributeNS(null, "cx", x)
    C.setAttributeNS(null, "cy", y)
    C.setAttributeNS(null, "fill", "gold")
    C.setAttributeNS(null, "stroke", "black")
    C.setAttributeNS(null, "stroke-width", "1")
    C.setAttributeNS(null, "onmousedown", "startMove(evt)")
    svg.appendChild(C)
    return C
}

/*creates and adds an SVG path without defining the nodes*/
function createPath(color, width) {
    width = (typeof width == 'undefined' ? "4" : width);
    var P = document.createElementNS("http://www.w3.org/2000/svg", "path")
    P.setAttributeNS(null, "fill", "none")
    P.setAttributeNS(null, "stroke", color)
    P.setAttributeNS(null, "stroke-width", width)
    svg.appendChild(P)
    return P
}

/*from http://www.w3.org/Graphics/SVG/IG/resources/svgprimer.html*/
function startMove(evt) {
	/*SVG positions are relative to the element but mouse 
	  positions are relative to the window, get offset*/
    x0 = getOffset(svg).left;
    y0 = getOffset(svg).top;

    C = evt.target
    svg.setAttribute("onmousemove", "move(evt)")
    svg.setAttribute("onmouseup", "drop()")
}

/*called on mouse move, updates dragged circle and recomputes splines*/
function move(evt) {
    x = evt.clientX - x0;
    y = evt.clientY - y0;

    /*move the current handle*/
    C.setAttributeNS(null, "cx", x)
    C.setAttributeNS(null, "cy", y)
    updateSplines();
}

/*called on mouse up event*/
function drop() {
    svg = document.getElementsByTagName('svg')[0];
    svg.setAttributeNS(null, "onmousemove", null)
}

/*computes spline control points*/
function updateSplines() {
    /*grab (x,y) coordinates of the control points*/
    x = new Array();
    y = new Array();
    for (i = 0; i < 5; i++) {
        /*use parseInt to convert string to int*/
        x[i] = parseInt(V[i].getAttributeNS(null, "cx"))
        y[i] = parseInt(V[i].getAttributeNS(null, "cy"))
    }
    console.log('x: ', x, ' y: ', y)
    

    /*computes control points p1 and p2 for x and y direction*/
    px = computeControlPoints(x);
    py = computeControlPoints(y);
    console.log('px:(p1 p2) ', px.p1, px.p2, '\npy:(p1 p2) ', py.p1, py.p2)
    
    /*updates path settings, the browser will draw the new spline*/
    for (i = 0; i < 4; i++)
        S[i].setAttributeNS(null, "d",
            path(x[i], y[i], px.p1[i], py.p1[i], px.p2[i], py.p2[i], x[i + 1], y[i + 1]));
}

/*creates formated path string for SVG cubic path element*/
function path(x1, y1, px1, py1, px2, py2, x2, y2) {
    return "M " + x1 + " " + y1 + " C " + px1 + " " + py1 + " " + px2 + " " + py2 + " " + x2 + " " + y2;
}

/*computes control points given knots K, this is the brain of the operation*/
function computeControlPoints(K) {
    console.log('\n', K)
    
    p1 = []
    p2 = []
    n = K.length - 1;

    /*rhs vector*/
    a = []
    b = []
    c = []
    r = []

    /*left most segment*/
    a[0] = 0;
    b[0] = 2;
    c[0] = 1;
    r[0] = K[0] + 2 * K[1];

    /*internal segments*/
    for (i = 1; i < n - 1; i++) {
        a[i] = 1;
        b[i] = 4;
        c[i] = 1;
        r[i] = 4 * K[i] + 2 * K[i + 1];
    }

    /*right segment*/
    a[n - 1] = 2;
    b[n - 1] = 7;
    c[n - 1] = 0;
    r[n - 1] = 8 * K[n - 1] + K[n];

    console.log('a: ', a)
    console.log('b: ', b)
    console.log('c: ', c)
    console.log('r: ', r)
    
    /*solves Ax=b with the Thomas algorithm (from Wikipedia)*/
    for (i = 1; i < n; i++) {
        m = a[i] / b[i - 1];
        b[i] = b[i] - m * c[i - 1];
        r[i] = r[i] - m * r[i - 1];
    }

    p1[n - 1] = r[n - 1] / b[n - 1];
    for (i = n - 2; i >= 0; --i)
        p1[i] = (r[i] - c[i] * p1[i + 1]) / b[i];

    /*we have p1, now compute p2*/
    for (i = 0; i < n - 1; i++)
        p2[i] = 2 * K[i + 1] - p1[i + 1];

    p2[n - 1] = 0.5 * (K[n] + p1[n - 1]);
    console.log('p1: ', p1)
    console.log('p2: ', p2)
    console.log('\n')
    
    return { p1: p1, p2: p2 };
}

/*code from http://stackoverflow.com/questions/442404/dynamically-retrieve-html-element-x-y-position-with-javascript*/
function getOffset(el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
}