let i=1;
let timer = setInterval(function () {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    process.stdout.write(i + "%, Hello, World");
    i++; 
    if(i == 101){
        clearInterval(timer)
        process.stdout.write("\n");
        return
    }
}, 100)