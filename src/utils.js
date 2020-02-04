/**
 * 交互数组下标
 * @param arr {[]}
 * @param a {Number}
 * @param b {Number}
 */

function swap (arr, a, b) {
    let temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
}
module.exports={swap}

