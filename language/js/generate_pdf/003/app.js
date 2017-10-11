const fs = require('fs')
const wkhtmltopdf = require('wkhtmltopdf')

// URL
wkhtmltopdf('https://www.baidu.com/', { pageSize: 'letter' })
    .pipe(fs.createWriteStream('out.pdf'));