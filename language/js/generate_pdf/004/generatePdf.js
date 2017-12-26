var hummus = require('hummus');

var path = require('path')

var now = new Date(),
    nowString = now.toLocaleDateString() + '_' + now.toLocaleTimeString().replace(/:/g, '-');

function gp(params) {
    let q=params.query,
    pdfName = params.pdfName

    var title = q.title || '--',
        subtitle= q.subtitle || '';
    // var pdfName = subtitle + title+ '.pdf';
    var filepathToRead = path.join(__dirname, 'middleware', params.dateStr, pdfName);
    var pdfReader = hummus.createReader(filepathToRead);
    var pdfPageCount = pdfReader.getPagesCount();

    var pdfWriter = hummus.createWriterToModify(filepathToRead, {
        modifiedFilePath: __dirname + '/output/'+params.dateStr+'/' + pdfName
    });

    function editPage(pageNum) {
        // console.log(inStream.notEnded(), inStream)
        console.log('page ' + pageNum + ': ', new Date(), '\n')
        var pageModifier = new hummus.PDFPageModifier(pdfWriter, pageNum, true);
        var ctx = pageModifier.startContext().getContext();
        var pathFillOptions = { color: 0x113262, colorspace: 'rgb', type: 'fill' };
        var pathStrokeOptions = { color: '#113262', width: 1 };
        ctx.drawPath(35, 45, 560, 45, pathFillOptions)
        ctx.writeText(
            '请务必阅读页面底部的风险提示',
            35, 35,
            {
                font: pdfWriter.getFontForFile(__dirname + '/fonts/arial.ttf'),
                size: 8,
                // colorspace: 'gray',
                color: 0x113262
            }
        );
        ctx.writeText(
            (pageNum + 1),
            550, 35,
            {
                font: pdfWriter.getFontForFile(__dirname + '/fonts/arial.ttf'),
                size: 8,
                // colorspace: 'gray',
                color: 0x113262
            }
        );

        ctx.drawPath(35, 780, 560, 780, pathFillOptions)
        ctx.writeText(
            subtitle,
            35, 805,
            {
                font: pdfWriter.getFontForFile(__dirname + '/fonts/arial.ttf'),
                size: 12,
                // colorspace: 'gray',
                color: 0x6384B3
            }
        );
        ctx.writeText(
            title,
            35, 786,
            {
                font: pdfWriter.getFontForFile(__dirname + '/fonts/arial.ttf'),
                size: 16,
                // colorspace: 'gray',
                color: 0x113262
            }
        );
        if (!pageNum) {
            var now = new Date(),
                year =now.getFullYear(),
                month = now.getMonth()+1,
                date = now.getDate(),
                day = now.getDay(),
                weekArr= ['日','一', '二', '三', '四', '五', '六'],
                dateStr = year +'年'+month+'月'+date+'日星期'+ weekArr[day];
            ctx.writeText(
                dateStr,
                250, 790,
                {
                    font: pdfWriter.getFontForFile(__dirname + '/fonts/arial.ttf'),
                    size: 8,
                    // colorspace: 'gray',
                    color: 0x113262
                }
            );
        }
        ctx.drawImage(450, 775, './images/logo.png', {
            transformation: { width: 120, height: 50 }
        })

        pageModifier.endContext().writePage();
        if (++pageNum < pdfPageCount) {
            editPage(pageNum);
        }
    }
    editPage(0);
    pdfWriter.end();
    console.log('handle end: ', new Date())
    return true;
}
exports.gp = gp