var canvas = document.getElementById('canvas'),
    html_container = document.getElementById("thehtml"),
    html = html_container.innerHTML;

rasterizeHTML.drawHTML(html, canvas);

document.querySelector('#ui').addEventListener('click', function (e) {
    var doc = new jsPDF({
        unit: 'pt'
    }),
        imgData = canvas.toDataURL();
    console.log(89)

    doc.addImage(imgData, 'PNG', 42, 56, 511, 730)

    doc.save('a4.pdf')
})

