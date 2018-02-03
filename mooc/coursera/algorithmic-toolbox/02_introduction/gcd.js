function gcd(a, b) {
    let best = 0,
        small = Math.min(a, b);
    for (let i = 1; i <= small; i++) {
        if (!(a % i) && !(b % i)) {
            best = i
        }
    }
    return best
}