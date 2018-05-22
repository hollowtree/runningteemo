(function () {
    var canvas = document.getElementById('canvas')
    var context = canvas.getContext('2d');




    var x = [0, 100, 200, 300, 400, 500, 600, 700, 800]
    var y = [15, 15, 20, 40, 45, 50, 60, 90, 95]

    var y2 = []
    y.forEach(val => {
        y2.push(120 + (120 - val))
    })

    var px = computeControlPoints(x)
    var py = computeControlPoints(y)
    var py2 = computeControlPoints(y2)

    var gradient = context.createLinearGradient(0, 0, 800, 0);
    gradient.addColorStop(0, '#ffc4eb');
    gradient.addColorStop(1, '#fdedc3');
    context.fillStyle = gradient;
    context.beginPath();
    context.moveTo(x[0], y[0] - 15);
    for (let index = 0; index < 8; index++) {
        context.bezierCurveTo(px.p1[index], py.p1[index] - 15, px.p2[index], py.p2[index] - 15, x[index + 1], y[index + 1] - 15);
    }
    context.lineTo(x[x.length - 1], y2[y2.length - 1] + 15);
    for (let index = 7; index >= 0; index--) {
        context.bezierCurveTo(px.p2[index], py2.p2[index] + 15, px.p1[index], py2.p1[index] + 15, x[index], y2[index] + 15);
    }
    context.closePath();
    context.fill();

    gradient = context.createLinearGradient(0, 0, 800, 0);
    gradient.addColorStop(0, '#ff97dd');
    gradient.addColorStop(1, '#fcde83');
    context.fillStyle = gradient;
    context.beginPath();
    context.moveTo(x[0], y[0]);
    for (let index = 0; index < 8; index++) {
        context.bezierCurveTo(px.p1[index], py.p1[index], px.p2[index], py.p2[index], x[index + 1], y[index + 1]);
    }
    context.lineTo(x[x.length - 1], y2[y2.length - 1]);
    for (let index = 7; index >= 0; index--) {
        context.bezierCurveTo(px.p2[index], py2.p2[index], px.p1[index], py2.p1[index], x[index], y2[index]);
    }
    context.closePath();
    context.fill();

    var gradient = context.createLinearGradient(0, 0, 800, 0);
    gradient.addColorStop(0, '#f752c5');
    gradient.addColorStop(1, '#f7d249');
    context.fillStyle = gradient;
    context.beginPath();
    context.moveTo(x[0], y[0] + 15);
    for (let index = 0; index < 8; index++) {
        context.bezierCurveTo(px.p1[index], py.p1[index] + 15, px.p2[index], py.p2[index] + 15, x[index + 1], y[index + 1] + 15);
    }
    context.lineTo(x[x.length - 1], y2[y2.length - 1] - 15);
    for (let index = 7; index >= 0; index--) {
        context.bezierCurveTo(px.p2[index], py2.p2[index] - 15, px.p1[index], py2.p1[index] - 15, x[index], y2[index] - 15);
    }
    context.closePath();
    context.fill();

})()



/*computes control points given knots K, this is the brain of the operation*/
function computeControlPoints(K) {
    // console.log('\n', K)

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

    // console.log('a: ', a)
    // console.log('b: ', b)
    // console.log('c: ', c)
    // console.log('r: ', r)

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
    // console.log('p1: ', p1)
    // console.log('p2: ', p2)
    // console.log('\n')

    return { p1: p1, p2: p2 };
}