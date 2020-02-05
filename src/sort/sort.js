function quickSort (arr) {
    if (!Array.isArray(arr) || arr.length < 2) {
        return arr
    }
    let middlePos = Math.floor(arr.length / 2)
    let middle = arr.splice(middlePos, 1)[0]
    let leftArr = []
    let rightArr = []
    while (arr.length) {
        if (arr[0] < middle) {
            leftArr.push(arr.shift())
        } else {
            rightArr.push(arr.shift())
        }
    }
    return quickSort(leftArr).concat([middle], quickSort(rightArr))
}

function mergeSort (arr) {
    debugger
    if (!Array.isArray(arr) || arr.length < 2) {
        return arr
    }
    let middlePos = Math.floor(arr.length / 2)
    let leftArr = arr.slice(0, middlePos)
    let rightArr = arr.slice(middlePos)
    return merge(mergeSort(leftArr), mergeSort(rightArr))
}

function merge (leftArr, rightArr) {
    let temp = []
    while (leftArr.length && rightArr.length) {
        if (leftArr[0] < rightArr[0]) {
            temp.push(leftArr.shift())
        } else {
            temp.push(rightArr.shift())
        }
    }
    return temp.concat(leftArr, rightArr)
}

function bubbleSort (arr) {
    if (!Array.isArray(arr) || arr.length < 2) {
        return arr
    }
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i; j++) {
            if (arr[j + 1] < arr[j]) {
                swap(arr, j + 1, j)
            }
        }
    }
    return arr
}

function selectSort (arr) {
    if (!Array.isArray(arr) || arr.length < 2) {
        return arr
    }
    let minIndex = 0
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j
            }
        }
        let temp = arr[minIndex]
        arr[minIndex] = arr[i]
        arr[i] = temp
    }
    return arr
}

function swap (arr, a, b) {
    let temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp

}

function heapSort (arr) {
    if (!Array.isArray(arr) || arr.length < 2) {
        return arr
    }
    buildHeap(arr, arr.length)
    for (let i = arr.length - 1; i >= 0; i--) {
        swap(arr, 0, i)
        adjustHeap(arr, 0, i)
    }
    return arr

}

function buildHeap (arr, length) {
    for (let i = Math.floor(length / 2); i >= 0; i--) {
        adjustHeap(arr, i, length)
    }
}

function adjustHeap (arr, pos, length) {
    let child = pos * 2 + 1
    while (child < length) {
        if (child + 1 < length && arr[child] < arr[child + 1]) {
            child++
        }
        if (arr[child] > arr[pos]) {
            swap(arr, child, pos)
            pos = child
            child = pos * 2 + 1
        } else {
            break
        }
    }
}

function insertSort (arr) {
    if (!Array.isArray(arr) || arr.length < 2) {
        return arr
    }
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; j >= 0; j--) {
            if (arr[j + 1] < arr[j]) {
                let swap = arr[j + 1]
                arr[j + 1] = arr[j]
                arr[j] = swap
            }
        }
    }
    return arr
}

/**
 * 计数排序算法
 * @param arr {Array} 待排序数组
 * @return {Array} 排序完的数组
 */
function countSort (arr) {
    let hashMap = {}
    if (!Array.isArray(arr)) {
        return arr
    }
    let length = arr.length
    if (length < 2) {
        return arr
    }
    let min = arr[0]
    let max = arr[0]
    for (let i = 0; i < length; i++) {
        let num = arr[i]
        if (hashMap[num] === undefined) {
            hashMap[num] = 1
        } else {
            hashMap[num]++
        }
        if (i === 0) {
            continue
        }
        if (num > max) {
            max = num
        }
        if (num < min) {
            min = num
        }
    }
    let reArr = []
    for (let hashIndex = min; hashIndex < max + 1; hashIndex++) {
        let repeatTimes = hashMap[hashIndex]
        if (repeatTimes !== undefined) {
            reArr = reArr.concat(new Array(repeatTimes).fill(hashIndex))
        }
    }
    return reArr

}
function bucketSort (arr, splitCount) {
    // 不是数组，直接返回
    if (!Array.isArray(arr)) {
        return arr
    }
    let length = arr.length
    // 获取数组的长度，长度少于1，直接返回
    if (length < 2) {
        return arr
    }
    // 确定桶的个数和区间。区间跨度 = （最大值-最小值）/ （桶的数量 - 1）
    let min = arr[0]
    let max = arr[0]
    // 默认桶的个数为3
    splitCount = splitCount || 3
    for (let i = 0; i < length; i++) {

        if (i === 0) {
            continue
        }
        if (arr[i] < min) {
            min = arr[i]
        }
        if (arr[i] > max) {
            max = arr[i]
        }
    }
    //分成splitCount个桶，桶所占用的范围
    let space = max - min
    if (space === 0) {
        return arr
    }
    let step = space / (splitCount - 1)
    const buckets = Array.from({length: splitCount}, () => [])
    // 把原始数列的元素放入对应的桶中
    for (let i = 0; i < length; i++) {
        // 桶的数值减去最小数 min 获取的是桶占用的范围，再除以一个桶的范围，就是获取对应的桶编号
        let index = Math.floor((arr[i] - min) / step)
        buckets[index].push(arr[i])
        // 空桶插入，直接返回
        if (buckets.length === 1) {
            continue
        }
        // 对数组进行插入排序
        let arrTemp = buckets[index]
        for (let j = arrTemp.length - 1; j > 0; j--) {
            if (arrTemp[j] < arrTemp[j - 1]) {
                let swap = arrTemp[j - 1]
                arrTemp[j - 1] = arrTemp[j]
                arrTemp[j] = swap
            }
        }
    }
    // 合并不为空的桶
    return [].concat(...buckets)
}

function shellSort (arr) {
    if (!Array.isArray(arr)) {
        return arr
    }
    let length = arr.length
    if (length < 2) {
        return arr
    }
    for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        for (let i = gap; i < arr.length; i++) {
            let temp = arr[i]
            for (var j = i; j >= gap && arr[j - gap] > temp; j -= gap) {
                arr[j] = arr[j - gap]
            }
            arr[j] = temp
        }
    }
    return arr
}

function shellSort2 (arr) {
    if (!Array.isArray(arr)) {
        return arr
    }
    let length = arr.length
    if (length < 2) {
        return arr
    }
    let gap = Math.floor(length / 2)
    while (gap > 0) {
        for (let i = gap; i < length; i++) {
            let temp = arr[i]
            var j = i
            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap]
                j -= gap
            }
            arr[j] = temp
        }
        gap = Math.floor(gap / 2)
    }
    return arr
}
let testArr = [10, 7, 1, 0, 100, 4, 5, 2, -10]
console.log(quickSort(testArr))
module.exports={quickSort,insertSort,heapSort,countSort,bucketSort,mergeSort,bubbleSort,selectSort,shellSort}

