function fibonacci(n) {
    if (n <= 1) {
        return n
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2)
    }
}

function fibRecurs(n) {
    if (n <= 1) {
        return 2
    } else {
        return fibRecurs(n - 1) + fibRecurs(n - 2) + 3
    }
}

console.log(fibonacci(10))