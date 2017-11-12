// 爬虫
const puppeteer = require('puppeteer')
const fs = require('fs')

const data = require('./zt.json')
puppeteer.launch({
    executablePath: 'C:/Users/tree/AppData/Local/Google/Chrome SxS/Application/chrome.exe'
}).then(async browser => {
    // const browser = await puppeteer.launch();
    const page = await browser.newPage()
    page.setViewport({
        width: 1366,
        height: 768

    })
    // await page.goto('https://www.zhihu.com/', { waitUntil: 'load' })
    // await page.screenshot({ path: 'example.png' });

    // page.on('console', msg => {
    //     for (let i = 0; i < msg.args.length; ++i)
    //         console.log(`${i}: ${msg.args[i]}`);
    // });

    for (var i = 564; i < 1000; i++) {
        try {
            await page.goto(data[i].link, { waitUntil: 'load' });
            // const bodyHandle = await page.$('#content');
            // const html = await page.evaluate(body => body.innerHTML, bodyHandle);
            const html = await page.$eval('#contents', e => e.innerHTML)
            // const title = await page.$eval('#BookCon h1', e => e.innerText)

            let filePath = 'zt/data-' + (i + 1) + '.json';
            await fs.writeFileSync(filePath, JSON.stringify({
                title: data[i].title,
                index: i - 4,
                content: html.replace(/\s/g, '<br>')
            }), (err) => {
                if (err) throw err;
            });
            console.log(i + 1, data[i].title, filePath, 'append success');
            await sleep(10000)
        } catch (error) {
            console.log(error)
        }

    }

    await browser.close();

})


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}
