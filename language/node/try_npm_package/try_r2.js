const r2 = require('r2')

;(async()=>{
    let html = await r2('http://localhost:3000/').text
    console.log(html)
})()




