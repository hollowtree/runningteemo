let arr = [1, 3, 8, 4, 129, 23, 34, 31, 21, 6, 9]

function sort(array) {

    let l = array.length
    if (l === 1) return array
    let split_index = Math.ceil(l / 2),
        a1 = array.slice(0, split_index),
        a2 = array.slice(split_index)

    a1 = sort(a1)
    a2 = sort(a2)
    return merge(a1, a2)
}

function merge(left, right) {
    var l1 = left.length,
        l2 = right.length,
        index1 = 0,
        index2 = 0,
        arr = []

    while (index1 < l1 && index2 < l2) {
        if (left[index1] < right[index2]) {
            arr.push(left[index1++])
        } else {
            arr.push(right[index2++])
        }
    }
    return arr.concat(left.slice(index1)).concat(right.slice(index2))
}

console.log(sort(arr))
