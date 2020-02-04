/**
 * 二叉树排序
 */
class HeapSort {

    sortArrayByBinarySearchTree (arr) {
        if (!Array.isArray(arr) || arr.length < 1) {
            return []
        }
        this.buildHeap(arr, arr.length)
        for (let i = arr.length - 1; i >= 0; i--) {
            swap(arr, 0, i)
            this.adjustHeap(arr, 0, i)
        }
        return arr
    }

    buildHeap (arr, length) {
        for (let i = Math.floor(length / 2); i >= 0; i--) {
            this.adjustHeap(arr, i, length)
        }
    }

    adjustHeap (arr, pos, length) {
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
}
module.exports  = HeapSort