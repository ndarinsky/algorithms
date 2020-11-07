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

let input = '2*(3+(1+1)*2)-4/(2+2)'


const processBrackets = (input) => {
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
    return { start, end, result: input.slice(start, end+1)}
}

console.log(processBrackets(input))