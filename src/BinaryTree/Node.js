/**
 * 二叉树-结点
 */
class Node {
    constructor (data = null, leftChild = null, rightChild = null, parentNode = null) {
        // 自己本身值
        this.data = data
        // 左结点
        this.leftChild = leftChild
        // 右结点
        this.rightChild = rightChild
        this.parentNode = parentNode
    }
}
module.exports = Node
