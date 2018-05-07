let children = [],
    L = 50,
    result = [],
    lastArrayFirstMember = null
for (let i = 0; i < L; i++) {
    children.push((Math.random() * 14 + 6).toFixed(1))
}
children.sort((a, b) => a - b)
children.forEach((val, i) => {
    if (i == 0) {
        result.push([val])
        lastArrayFirstMember = val
    } else if (val - lastArrayFirstMember <= 1) {
        result[result.length - 1].push(val)
    } else {
        result.push([val])
        lastArrayFirstMember = val
    }
})
console.log(JSON.stringify(result), '\t')

