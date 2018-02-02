function fibonacci(n) {
    let arr = [0, 1]
    for (let i = 2; i < n; i++) {
        arr.push(arr[i - 1] + arr[i - 2]);
    }
    return arr[i]
}

function fibRecurs(n) {
    if (n <= 1) {
        return 2
    } else {
        return 2 * n + 2
    }
}

console.log(fibonacci(10))