// 求 3, 9, 5, 9, 7, 1 所能组成的最大整数

var arr = [3, 9, 5, 9, 7, 1]
arr.sort((a, b) => { return b - a })
console.log(arr.join(''))
