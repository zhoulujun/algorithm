const {swap} = require('../utils')
const HeapSort = require('./HeapSort')
const Node = require('./Node')
/**
 * 二叉树
 */
class BinaryTree extends HeapSort {
    constructor (arr) {
        super()
        // 默认 层序遍历构建二叉树
        this.Tree = this.buildTreeByLevelOrder(arr)
    }

    /**
     * 创建结点列表
     * @return {[]|*[]}
     */
    createNodeList (arr) {
        if (!Array.isArray(arr) || arr.length < 1) {
            return []
        }
        // 用一个集合来存放每一个结点node
        let nodesList = []
        for (let i = 0; i < arr.length; i++) {
            let node = new Node(arr[i], null, null, null)
            nodesList.push(node)
        }
        return nodesList
    }

    /**
     * @name 层序遍历
     * @description
     * left = index * 2 + 1，例如：根节点的下标为0，则左节点的值为下标array[0＊2+1]=1
     * right = index * 2 + 2，例如：根节点的下标为0，则右节点的值为下标array[0＊2+2]=2
     * 序数 >= floor(N/2)都是叶子节点，例如：floor(9/2) = 4，则从下标4开始的值都为叶子节点
     * index>0，index的结点的父节点为Math.ceil((index/2)-1，
     * @param arr {number}
     * @return {null|[]}
     */
    buildTreeByLevelOrder (arr) {
        let nodesList = this.createNodeList(arr)
        let length = nodesList.length
        if (length === 0) {
            return null
        }
        // 确定每个结点的左右结点
        for (let i = 0; i < length / 2 - 1; i++) {
            if (2 * i + 1 < length) {
                nodesList[i].leftChild = nodesList[2 * i + 1]
                nodesList[i].parentNode = nodesList[Math.floor((i - 1) / 2)]
            }
            if (2 * i + 2 < length) {
                nodesList[i].rightChild = nodesList[2 * i + 2]
                nodesList[i].parentNode = nodesList[Math.floor((i - 1) / 2)]
            }
        }
        // 判断最后一个根结点：因为最后一个根结点可能没有右结点，所以单独拿出来处理
        let lastIndex = Math.round(length / 2) - 1
        // 左结点
        nodesList[lastIndex].leftChild = nodesList[lastIndex * 2 + 1]
        // 右结点，如果数组的长度为奇数才有右结点
        if (length % 2 === 1) {
            nodesList[lastIndex].rightChild = nodesList[lastIndex * 2 + 2]
        }
        this.tree = nodesList[0]
        return nodesList

    }

    maxHeapify (arr, i, length) {
        let max = i
        if (i >= length) {
            return
        }
        // 当前序号的左节点
        const l = i * 2 + 1
        // 当前需要的右节点
        const r = i * 2 + 2

        // 求当前节点与其左右节点三者中的最大值
        if (l < length && arr[l] > arr[max]) {
            max = l
        }
        if (r < length && arr[r] > arr[max]) {
            max = r
        }

        // 最终max节点是其本身,则已经满足最大堆性质，停止操作
        if (max === i) {
            return
        }

        // 父节点与最大值节点做交换
        swap(arr, i, max)
        // 递归向下继续执行
        this.maxHeapify(arr, max, length)
    }

    minHeapify (arr, i, length) {
        let min = i
        if (i >= length) {
            return
        }
        // 当前序号的左节点
        const l = i * 2 + 1
        // 当前需要的右节点
        const r = i * 2 + 2

        // 求当前节点与其左右节点三者中的最大值
        if (l < length && arr[l] < arr[min]) {
            min = l
        }
        if (r < length && arr[r] < arr[min]) {
            min = r
        }

        // 最终max节点是其本身,则已经满足最大堆性质，停止操作
        if (min === i) {
            return
        }

        // 父节点与最大值节点做交换
        swap(arr, i, min)
        // 递归向下继续执行
        this.maxHeapify(arr, min, length)
    }

    /**
     * @description 根据数组，创建搜索二叉树
     * @param arr {Number}
     */
    buildBinarySearchTree (arr) {
        this.sortArrayByBinarySearchTree(arr)
        return this.buildTreeByLevelOrder(arr)
    }

    /**
     * @description 先序遍历构建二叉树
     * @param arr
     */
    buildBinaryTreeByPreOrder (arr) {
        let root = new Node(arr.shift())
        arr.forEach(data => {
            this.insertNumber(data, root)
        })
        this.tree = root
        return root
    }

    /**
     * @description 插入节点
     * @param data {Number} 节点值，暂时为数字
     * @param tree {Node} 插入的树
     */
    insertNumber (data, tree = this.tree) {
        let newNode = new Node(data)
        debugger
        if (!tree.data) {
            tree.data = data
        } else {
            this.insertNode(tree, newNode)
        }
    }

    /**
     * @description 插入节点
     * @param node {Node} 节点值，暂时为数字
     * @param newNode {Node} 插入的树
     */
    insertNode (node, newNode) {
        newNode.parentNode = node
        if (newNode.data < node.data) {
            if (node.leftChild === null) {
                node.leftChild = newNode
            } else {
                this.insertNode(node.leftChild, newNode)
            }
        } else {
            if (node.rightChild === null) {
                node.rightChild = newNode
            } else {
                this.insertNode(node.rightChild, newNode)
            }
        }
    }

    /**
     * @description 前序遍历 =>1.访问根节点； 2.访问左子树； 3.访问右子树
     * @param node {Node} 遍历的树
     */
    preOrderTraverse (node = this.tree) {
        // 数组存储数遍历值
        let backs = []

        // 递归，
        function tempFunction (node) {
            if (node.data !== null) {
                // 先取根结点
                backs.push(node.data)
                // 如果存在左结点，取左节点的值
                node.leftChild && tempFunction(node.leftChild)
                // 如果存在右结点，取右结点值
                node.rightChild && tempFunction(node.rightChild)
            }
        }

        tempFunction(node)
        return backs
    }

    /**
     * @description 后序遍历 =>左根右
     *  1.访问左子树。（先访问左子树中的左子树，再访问左子树中的右子树）
     *  2.访问右子树。（先访问右子树中的左子树，再访问右子树中的右子树）
     *  3.访问根
     * @param node {Node} 遍历的树
     */
    postOrderTraverse (node) {
        // 数组存储数遍历值
        let backs = []

        // 递归，
        function tempFunction (node) {
            if (node.data !== null) {
                // 如果存在左结点，取左节点的值
                node.leftChild && tempFunction(node.leftChild)
                // 如果存在右结点，取右结点值
                node.rightChild && tempFunction(node.rightChild)
                // 最后取根结点
                backs.push(node.data)
            }
        }

        tempFunction(node)
        return backs
    }

    /**
     * @description 中遍历 =>左右根
     * @param node {Node} 遍历的树
     */
    inOrderTraverse (node = this.tree) {
        // 数组存储数遍历值
        let backs = []

        // 递归，
        function tempFunction (node) {
            if (node.data !== null) {
                // 如果存在左结点，取左节点的值
                node.leftChild && tempFunction(node.leftChild)
                // 取根结点
                backs.push(node.data)
                // 如果存在右结点，取右结点值
                node.rightChild && tempFunction(node.rightChild)

            }
        }

        tempFunction(node)
        return backs
    }

    /**
     * @description 深度优先递归
     * @param tree {Node}
     * @return {Array}
     */
    levelTraverse (tree) {

        let buckets = [[tree]]
        let i = 0

        // 递归，
        function tempFunction (node, i) {
            i++
            let nodes = []
            if (node.leftChild) {
                nodes.push(node.leftChild)
            }
            if (node.rightChild) {
                nodes.push(node.rightChild)
            }
            if (nodes.length) {
                if (buckets[i] === undefined) {
                    buckets[i] = nodes
                } else {
                    buckets[i].push(...nodes)
                }
                nodes.forEach(item => {
                    tempFunction(item, i)
                })
            }

        }

        tempFunction(tree, 0)
        let backs = []
        buckets.forEach(bucket=>{
            backs.push(...bucket.map((node)=>node.data))
        })
        return  backs
    }
}
module.exports=BinaryTree