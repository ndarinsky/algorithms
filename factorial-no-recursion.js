const factorialRecursion = (n) => {
    if (n === 1) return 1
    return n*factorialRecursion(n-1)
}

console.log(`factorialRecursion = ${factorialRecursion(5)}`)

const factorialStack = (n) => {
    const stack = [n]
    let result = 1;
    while(stack.length > 0) {
        const element = stack.pop()
        result*= element
        if(element > 1) {
            stack.push(element-1)
        }
    }
    return result
}
console.log(`factorialStack = ${factorialStack(5)}`)
