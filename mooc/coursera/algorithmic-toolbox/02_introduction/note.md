## Fibonacci
[0, 1, 1, 2, 3, 5, 8, ..., F(n-2), F(n-1), F(n-2) + F(n-1)]

方法一：按照 Fibonacci 数列的定义写出来递归函数
```js
function fibonacci(n) {
    if (n <= 1) {
        return n
    } else {
        return fibonacci(n - 1) + fibonacci(n - 2)
    }
}
```
此函数计算出 `fibonacci(n)` 所需要的运算次数：
```js
function fibRecurs(n) {
    if (n <= 1) {
        return 2
    } else {
        return fibRecurs(n - 1) + fibRecurs(n - 2) + 3
    }
}
```
是极其繁琐的，`fibRecurs(10) = 442`

方法二：创建一个数组存储 Fibonacci 数列
```js
function fibonacci(n) {
    let arr = [0, 1]
    for (var i = 2; i <= n; i++) {
        arr.push(arr[i - 1] + arr[i - 2]);
    }
    return arr[n]
}
```
此函数计算出 `fibonacci(n)` 所需要的运算次数：
```js
function fibRecurs(n) {
    if (n <= 1) {
        return 2
    } else {
        return 2 * n + 2
    }
}
```
`fibRecurs(10) = 22`，比方法一快多了。

