// 生成文本文档
const fs = require('fs')
var flag = 0;

var txt = ''

!(async () => {
    for (var flag = 0; flag < 988; flag++) {
        try {
            const data = await fs.readFileSync('zt/data-' + (flag + 1) + '.json', 'utf-8')
            const hd = JSON.parse(data)
            const handleData = hd.content.replace(/[&nbsp;]+/g, '').replace(/[<br>]+/g, '<br>').replace(/<br>/g, '<br><br>').replace(/<br>/g, '\n')
            txt += '\n\n-----------------------' + (flag + 1) + '-----------------------\n\n'
                + hd.title + '\n\n'
                + handleData
        } catch (error) {
            console.log(error)
        }
    }
    await fs.appendFileSync('./zt.txt', txt)
})()