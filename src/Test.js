const  BinaryTree = require('./BinaryTree/BinaryTree')
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
let test = [9, 0, 4, 3, 2, 5, 4, 3, 1, -1, -10, 9]
// 构建一个二叉树
let binaryTree = new BinaryTree(arr)
// 查看二叉树遍历情况
console.log(binaryTree.postOrderTraverse(binaryTree.tree))
console.log(binaryTree.preOrderTraverse(binaryTree.tree))
console.log(binaryTree.inOrderTraverse(binaryTree.tree))
console.log(binaryTree.levelTraverse(binaryTree.tree))
