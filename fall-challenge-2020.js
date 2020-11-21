/**
 * Auto-generated code below aims at helping you parse
 * the standard input according to the problem statement.
 **/
function canBeDone(inv, cast) {
  for (let i=0; i<inv.length; i++) {
      if ((inv[i]+cast[i])<0) {
          return false
      }
  }  
  return true
}

const globalSteps = []
const globalCasts = [
  { actionId: 78,
    actionType: 'CAST',
    price: 0,
    delta: [ 2, 0, 0, 0 ] 
  },
  {
    actionId: 79,
    actionType: 'CAST',
    price: 0,
    delta: [ -1, 1, 0, 0 ]
  },
  {
    actionId: 80,
    actionType: 'CAST',
    price: 0,
    delta: [ 0, -1, 1, 0 ]
  },
  {
    actionId: 81,
    actionType: 'CAST',
    price: 0,
    delta: [ 0, 0, -1, 1 ]
  }
]

var sum = (r, a) => r.map((b, i) => a[i] + b);

function buildNode(spell, item) {
  const newHistory = [...item.history]
  newHistory.push(spell.actionId)

  const newSpells = spell.actionId === 'REST' ?
    globalCasts :
    item.casts.filter(c => c.actionId !== spell.actionId)
  const newInv = sum(item.inv, spell.delta)
  return {
    inv: newInv,
    brews: item.brews,
    casts: newSpells,
    history: newHistory 
  }
}

function findWhatCanBeBuild(item) {
  for (let i=0; i<item.brews.length; i++) {
    if(canBeDone(item.inv, item.brews[i].delta)) {
      if (globalSteps[i].length && globalSteps[i].length > item.history.length) {
        globalSteps[i] = {length: item.history.length, history: item.history}
      }
    } 
  }
}

function shouldEndRecursion() {
  return globalSteps.every(s => s.length && s.length<1000)
}

function calculateSteps(item) {
  findWhatCanBeBuild(item)
  if (item.history.length > 14) return

  const possibleSpells = item.casts.filter(c => canBeDone(item.inv, c.delta))
  if (item.casts.length < globalCasts.length) {
    possibleSpells.push({
      actionId: "REST",
      actionType: 'REST',
      price: 0,
      delta: [0,0,0,0]
    })
  }

  possibleSpells.forEach(spell => {
    calculateSteps(buildNode(spell, item))
  });
}

function findNextStep(inv, brews, casts, oppCasts, score) {
  let firstItem = {
      inv,
      brews,
      casts,
      history: []
  }

  calculateSteps(firstItem)

  return globalSteps.sort((a,b) => {
    if(a.length < b.length) return -1
    if(a.length > b.length) return 1
    return 0
  })
}

const globalInv = [ 3, 0, 0, 0 ]

const globalBrews = [{"actionId":54,"actionType":"BREW","price":12,"delta":[0,-2,0,-2]},
  {"actionId":73,"actionType":"BREW","price":12,"delta":[-1,-1,-1,-1]},
  {"actionId":66,"actionType":"BREW","price":9,"delta":[-2,-1,0,-1]},
  {"actionId":45,"actionType":"BREW","price":8,"delta":[-2,0,-2,0]},
  {"actionId":99,"actionType":"BREW","price":8,"delta":[-2,-1,0,0]},
  {"actionId":98,"actionType":"BREW","price":8,"delta":[-2,0,0,0]},
  {"actionId":59,"actionType":"BREW","price":14,"delta":[-2,0,0,-3]}]

globalBrews.forEach(b => {globalSteps.push({length:1000, history:[]})})

const result = findNextStep(globalInv, globalBrews, globalCasts)

console.log(result)