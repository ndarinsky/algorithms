// [node1, node2, length]
// node1 => node2
const input = [
    [1,2,4],
    [1,4,10],
    [2,3,21],
    [3,7,4],
    [4,5,5],
    [4,6,3],
    [5,3,5],
    [6,3,12]
]

const buildChild = (item) => {
    return { id: item[1], length: item[2] }
}

const buildNode = (item) => {
    return {
        id: item[0],
        children: [buildChild(item)]
    }
}

const buildGraf = (input) => {
    const nodes = new Map()
    
    input.forEach(element => {
        const key = element[0]
        if (nodes.has(key)) {
            nodes.get(key).children.push(buildChild(element))
        } else {
            nodes.set(key, buildNode(element))
        }
    });

    return nodes
}

const findShortestPath = (nodes, endNode) => {
    const queue = []
    const currentNode = nodes.get(1)
    currentNode.length = 0

    while (currentNode.id !== endNode) {
        currentNode.children.forEach(child => {
            
            queue.push(child)
        })
    }
    
}

const nodes = buildGraf(input)


console.log(nodes)