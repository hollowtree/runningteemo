// --- 解压
const zlib = require('zlib')

const gzip = zlib.createGunzip()
const fs = require('fs')
const inp = fs.createReadStream('./input.txt.gz')
const out = fs.createWriteStream('./input.txt')

inp.pipe(gzip).pipe(out)