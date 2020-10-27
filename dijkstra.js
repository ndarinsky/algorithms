const numberOfCities = 8

// Number which will be treated as infinitely large for this conditions.
const maxLength = 1000 

// Describes road between 2 cities and length of this road
const roads = [
    [0,1,9],
    [1,2,4],
    [1,4,10],
    [2,3,21],
    [3,7,4],
    [4,5,5],
    [4,6,3],
    [5,3,5],
    [6,3,12]
]

const nodes = []
for (let i=0; i<numberOfCities; i++) {
    nodes.push({
        length: i ? maxLength : 0,
        children: []
    })
}

roads.forEach(road => {
    const key = road[0]
    const node = nodes[key]
    node.children.push({key: road[1], length: road[2]})
})


let current = 0
const queue = []
queue.push(0)

const compare = (a,b) => {
    if (a.length < b.length) {
        return -1
    }
    if (a.length > b.length) {
        return 1
    }
    return 0
}

while(queue.length) {
    current = queue.shift()
    const node = nodes[current]

    node.children.sort(compare)
    node.children.forEach(child => {
        const {key, length} = child
        if (nodes[key].length > length) {
            nodes[key].length = length + nodes[current].length
            nodes[key].parent = current
            queue.push(key)
        }
    })
}

console.log(nodes)