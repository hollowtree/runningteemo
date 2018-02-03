function gcd(a, b) {
    let big = Math.max(a, b),
        small = Math.min(a, b)
    let temp = big % small;

    if (temp) {
        return gcd(small, temp)
    } else {
        return small
    }
}

console.log(gcd(68, 100))
