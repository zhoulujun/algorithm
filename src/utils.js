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

/**
 * 二分查找数组中，第一出线目标数据的前后位置， 如果没有返回[-1,-1]
 * @param arr {Array}
 * @param target {Number}
 * @return {number[]}
 */
function searchRange (arr, target) {
    // 声明搜索用的左右指针，初始左指针下标0，右指针下标数组末位nums.length-1；
    let l = 0, r = arr.length - 1
    // 获取数组中间下标pivot = (l + r) / 2；
    let pivot = Math.floor((l + r) / 2)
    // 声明创建结果数组，初始化赋值-1；
    let res = [-1, -1]
    // 循环二分查找，直到左指针大于右指针查找结束
    while (l <= r) {
        // 若中间位置数字小于目标数字，说明目标数字在pivot右边，将左指针l右移赋值为pivot+1；
        if (arr[pivot] < target) {
            l = pivot + 1
            // 若中间位置数字大于目标数字，说明目标数字在pivot左边，将右指针r左移赋值为pivot-1；
        } else if (arr[pivot] > target) {
            r = pivot - 1
            // 若中间位置数字等于目标数字：
        } else {
            // 将pivot作为第一次出现位置存入数组；
            res[0] = pivot
            // 右指针r左移赋值为pivot-1，继续查找相等的数字直到找到第一次出现的位置；
            r = pivot - 1
        }
        // 更新pivot；
        pivot = (l + r) / 2
    }
    // 从第一次出现的位置开始，循环往右查找最后一次出现的位置：
    // 声明pr指针初始赋值为第一次出现位置下标；
    let pr = res[0]
    // 当二分查找已找到目标数字时
    if (pr !== -1) {
        // 循环直到数组越界或者数组当前元素不等于目标元素时结束：
        while (pr <= arr.length - 1 && target === arr[pr]) {
            // 更新最后一次出现位置下标；
            pr += 1
            // 更新最后一次出现位置下标；
            res[1] = pr
        }
    }
    return res
}
console.log(searchRange([-1,5,5,6,8,9,13,22],-2))
module.exports = {swap,searchRange}

