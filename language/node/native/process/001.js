process.env.name = "tom"
var m002 = require('./002')

process.on('exit', (code) => {
    console.log(`About to exit with code: ${code}`);
});


const startUsage = process.cpuUsage();
// { user: 38579, system: 6986 }

// spin the CPU for 500 milliseconds
const now = Date.now();
while (Date.now() - now < 500);

console.log(process.cpuUsage(startUsage));

console.log(`Current directory: ${process.cwd()}`);

console.log(`This platform is ${process.platform}`);