let tree;
const RED = true;
const BLACK = false;
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.color = RED;
    }
}
class RBT {
    constructor() {
        this.root = null;
        this.size = 0;
    }
    isRed(node) {
        if (!node) return BLACK;
        return node.color;
    }
    // Left right red left black
    leftRotate(node) {
        let tmp = node.right;
        node.right = tmp.left;
        tmp.left = node;
        tmp.color = node.color;
        node.color = RED;
        return tmp;
    }
    // Right rotation left red left sub red
    rightRoate(node) {
        let tmp = node.left;
        node.left = tmp.right;
        tmp.right = node;
        tmp.color = node.color;
        node.color = RED;
        return tmp;
    }
    // Color reversal
    flipColors(node) {
        node.color = RED;
        node.left.color = BLACK;
        node.right.color = BLACK;
    }
    add(node) {
        this.root = this.addRecursive(this.root, node.value);
        this.root.color = BLACK; // Root node is always black
    }
    //Recursive helper for the add method
    addRecursive(node, value) {
        //CASE 1: Tree has no root node
        if (node == null) {
            this.size++;
            return node;
        }
        
        //Case when node to be inserted is smaller than the targeted node
        if (value < node.value) {
            //Case: If left node is not empty, then continue to traverse the tree
            if(node.left != null) {
                node.left = this.addRecursive(node.left, value);
            }
            //Case: If the left node is empty, then insert the new smaller node. 
            node.left = node;            
        } 

        //Case when node to be inserted is larger than the targeted node
        else if (value > node.value) {
            //Case: If right node is not empty, then continue to traverse the tree
            if(node.right != null) {
                node.right = this.addRecursive(node.right, value);
            }
            //Case: If the right node is empty, then insert the new larger node.
            node.right = node;
        }

        //Case when node is equal in value
         else {
            node.value = value;
        }
        
        return node;
    }

    enforceRBT() {
        //Case if this node is red 
        if(this.isRed() == RED){}
    }

    isEmpty() {
        return this.size == 0 ? true : false;
    }
    getSize() {
        return this.size;
    }
    contains(key) {
        let ans = '';
        !(function getNode(node, key) {
            if (!node || key == node.key) {
                ans = node;
                return node;
            } else if (key > node.key) {
                return getNode(node.right, key);
            } else {
                return getNode(node.right, key);
            }
        })(this.root, key);
        return !!ans;
    }
    // bst preamble traversal (recursive version)
    preOrder(node = this.root) {
        if (node == null) return;
        console.log(node.key);
        this.preOrder(node.left);
        this.preOrder(node.right);
    }
    preOrderNR() {
        if (this.root == null) return;
        let stack = [];
        stack.push(this.root);
        while (stack.length > 0) {
            let curNode = stack.pop();
            console.log(curNode.key);
            if (curNode.right != null) stack.push(curNode.right);
            if (curNode.left != null) curNode.push(curNode.left);
        }
    }
    // bst middle order traversal
    inOrder(node = this.root) {
        if (node == null) return;
        this.inOrder(node.left);
        console.log(node.key);
        this.inOrder(node.right);
    }
    // bst subsequent traversal
    postOrder(node = this.root) {
        if (node == null) return;
        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(node.key);
    }
    // The way of bsf + queue to realize hierarchical traversal
    generateDepthString1() {
        let queue = [];
        queue.unshift(this.root);
        while (queue.length > 0) {
            let tmpqueue = []; let ans = [];
            queue.forEach(item => {
                ans.push(item.key);
                item.left ? tmpqueue.push(item.left) : '';
                item.right ? tmpqueue.push(item.right) : '';
            });
            console.log(...ans);
            queue = tmpqueue;
        }
    }
    minmun(node = this.root) {
        if (node.left == null) return node;
        return this.minmun(node.left);
    }
    maximum(node = this.root) {
        if (node.right == null) return node;
        return this.maximum(node.right);
    }
}