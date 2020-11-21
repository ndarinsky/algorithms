/*
 * Task: 
 * Calculate expressions like 2*(3+(1+1)*2)-4/(2+2)
 * support only 0-9 and +-*\/
 * 
 * Agorithm: 
 * 1) Open brackets via resursion
 * 2) calculate  expression via reverse polish expression
 * Example a+b => ab+
 * ab+ can be easily prosessed via stack
*/

let input = '2*(3+(1+1)*2)-4/(2+2)+3*(1+1)/6'

const findFirstBrackets = (input) => {
    let openBracketFlag = false;
    let closeBracketFlag = false;
    let i = 0
    let start = -1
    let end = -1
    let bracketsCounter = 0
    while(!(openBracketFlag && closeBracketFlag) && i<input.length) {
        if (input[i] === '(') {
            openBracketFlag = true
            bracketsCounter++
            if  (bracketsCounter === 1) {
                start = i
            }
        }
        if (input[i] === ')') {
            bracketsCounter--
            if(bracketsCounter === 0) {
                closeBracketFlag = true
                end = i
            }
        }
        i++
    }

    if (start === -1) {
        return { start, end, result: input}
    }
    return { input, start, end, result: input.slice(start+1, end)}
}

const findAllBrackets = (input) => {
    const resultArray = []
    let result = findFirstBrackets(input)
    while (result.start > 0) {
        const before = result.input.slice(0, result.start)
        const after = result.input.slice(result.end+1)
        resultArray.push(before)
        resultArray.push(result.result)
        result = findFirstBrackets(after)
    }
    return resultArray
}

const convertInArray = (input) => {
    const result = []
    const tempResult = findAllBrackets(input)

    tempResult.forEach(element => {
        if (element[0] === '(') {
            //open brackets
        } else {
            result.concat(Array.from(element))
        }
    })
    return tempResult
}

/**
 * Use reverse polish record
 * Example: a+b => ab+
 * a+b*c
 */
const calculateSimpleExp = (input) => {
    for (int i = 0;)
}

const stack = []
stack.push(input)
while(stack.length > 0) {
    const element = stack.pop()
    const input = element.result || element
    const brackets = findFirstBrackets(input)
    if (brackets.start > 0) {
        stack.push(element)
        stack.push(brackets)
    } else {

    }
}

console.log(convertInArray(input))