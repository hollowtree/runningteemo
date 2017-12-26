const fs = require('fs')
const path = require('path');
const puppeteer = require('puppeteer');
const { URL } = require('url')

const extname = path.extname;

const gp = require('../generatePdf')

function getDateString() {
    let now = new Date(),
        year = now.getFullYear(),
        month = now.getMonth() + 1,
        today = now.getDate()
    return year + '_' + (month < 10 ? '0' + month : month) + '_' + (today < 10 ? '0' + today : today)
}

exports.generatePdfFromUrl = () => {
    return async (ctx, next) => {
        let pdfName = '';
        if (!ctx.query.title || !ctx.query.url) {
            ctx.body = {
                code: 400,
                message: "错误的请求参数【必填参数不完整，必填参数：title、url】"
            }
            return;
        } else if (!/http[s]*:\/\//.test(ctx.query.url)) {
            ctx.body = {
                code: 400,
                message: "错误的请求参数【必填参数url中需包含http://或https://】"
            }
            return;
        } else {
            pdfName = (ctx.query.subtitle || '') + ctx.query.title + '.pdf'
        }
        const dateStr = getDateString()
        let pdfPath = path.join(__dirname, '..', 'output', dateStr, pdfName),
            isPdfExists = await fs.existsSync(pdfPath)
        console.log(39,isPdfExists)
        
        if (isPdfExists) {
            // --- 如果 pdf 存在，则直接返回
            ctx.type = extname(pdfPath);
            ctx.body = fs.createReadStream(pdfPath);
            return
        }

        let middlewareDir = path.join(__dirname, '..', 'middleware', dateStr),
            outputDir = path.join(__dirname, '..', 'output', dateStr),
            isMiddlewareDirExists = await fs.existsSync(middlewareDir),
            isOuputDirExists = await fs.existsSync(outputDir)

        if (!isMiddlewareDirExists) {
            await fs.mkdirSync(middlewareDir)
        }
        if (!isOuputDirExists) {
            await fs.mkdirSync(outputDir)
        }

        await print({
            query: ctx.query,
            pdfName,
            dateStr
        })
        isPdfExists = await fs.existsSync(pdfPath)
        if (isPdfExists) {
            ctx.type = extname(pdfPath);
            ctx.body = fs.createReadStream(pdfPath);
        }
    };
};

var print = async (params) => {
    let q = params.query,
        pdfName = params.pdfName
    var cookies = q.cookies;
    var url = new URL(q.url)

    let middlewarePdfPath = path.join(__dirname, '..', 'middleware', params.dateStr, pdfName);

    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();

    if (q.cookies) {
        var cookies = JSON.parse(q.cookies)
        for (let key in cookies) {
            await page.setCookie({
                name: key,
                value: cookies[key],
                url: url.href,
                domain: url.hostname,
                path: '/',
                expires: 4094467200
            })
        }
    }

    await page.goto(url.href, { waitUntil: 'networkidle' });
    await page.evaluate(_ => {
        window.scrollBy(0, window.innerHeight);
    });
    await sleep(1000)
    page.on('console',msg=>{console.log(msg.text)
    })
    await page.pdf({
        path: middlewarePdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: 90, bottom: 70 }
    });
    await browser.close();
    await gp.gp(params)
    return true;
}


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }