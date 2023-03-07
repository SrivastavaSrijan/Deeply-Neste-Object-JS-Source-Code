/**
 * Traverses the tree using depth-first search and calls a provided callback function on each node.
 * @param {Object} node - The current node being traversed.
 * @param {function} callback - A function to call on each node.
 * @param {number} [depth=0] - The depth of the current node (used internally for recursive calls).
 */
const traverseTree = (node, callback, depth = 0) => {
  // Call the callback function on the current node
  callback(node, depth);

  // Traverse the children of the current node
  if (node.children && node.children.length > 0) {
    for (let i = 0; i < node.children.length; i++) {
      traverseTree(node.children[i], callback, depth + 1);
    }
  }
};

/**
 * Find a node in the tree by its ID.
 * @param {Object} tree The tree to search.
 * @param {string} id The ID of the node to find.
 * @returns {Object|null} The node with the specified ID, or null if it is not found.
 */
const findNodeById = (id, tree) => {
  let result = null;

  // Define the callback function to pass to traverseTree
  const searchCallback = (node) => {
    if (node.id === id) {
      result = node;
    }
  };

  // Call traverseTree with the searchCallback function
  traverseTree(tree, searchCallback);

  return result;
};

/**
 * Get the maximum ID in the tree
 * @param {Object} treeData - The tree data to search
 * @returns {number} The maximum ID found in the tree
 */
const getMaxId = (treeData) => {
  let maxId = 0;

  traverseTree(treeData, (node) => {
    if (node.id && node.id > maxId) {
      maxId = node.id;
    }
  });

  return maxId;
};

/**
 * Adds a child node to a given parent node
 * @param {string} parentId - ID of the parent node
 * @param {Object} newChild - New child node to add
 * @param {Object} rootNode - Root node of the tree
 * @returns {Object} - Updated root node with the new child added
 */
const addNode = (parentId, newChild, rootNode) => {
  const parent = findNodeById(parentId, rootNode);
  if (!parent) {
    return rootNode;
  }
  const newId = Math.random().toString(16).slice(2);
  newChild.id = newId;
  parent.children.push(newChild);
  return rootNode;
};

/**
 * Deletes a child node from the tree
 * @param {string} nodeId - ID of the node to be deleted
 * @param {Object} rootNode - Root node of the tree
 */
const deleteNodeRecursively = (nodeId, rootNode) => {
  const deleteNodeHelper = (node) => {
    if (!node) return null;
    if (node.id === nodeId) return null;
    node.children = node.children.filter(
      (child) => deleteNodeHelper(child) !== null
    );
    return node;
  };
  deleteNodeHelper(rootNode);
  return rootNode;
};

/**
 * Deletes a child node from the tree
 * @param {string} nodeId - ID of the node to be deleted
 * @param {Object} rootNode - Root node of the tree
 */
const deleteNode = (nodeId, rootNode) => {
  let parent = null;
  let nodeIndex = -1;
  const searchCallback = (node) => {
    const index = node.children.findIndex((val) => val.id === nodeId);
    if (index > -1) {
      parent = node;
      nodeIndex = index;
    }
  };
  traverseTree(rootNode, searchCallback);
  if (parent && nodeIndex > -1) {
    parent.children.splice(nodeIndex, 1);
  }

  return JSON.parse(JSON.stringify(rootNode));
};

module.exports = { addNode, deleteNode, deleteNodeRecursively };
