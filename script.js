const netWorthElem = document.getElementById("net-worth-counter")
const incomeElem = document.getElementById("income-display")
const incomeSinceFirstEnterElem = document.getElementById(
  "income-since-first-enter-counter"
)
const incomeSinceEnterElem = document.getElementById(
  "income-since-enter-counter"
)

const incomePerSecond = 5961
const startNetWorth = 311000000000 // 19.11.21 00:00

const startCountingTime = new Date("11/19/2021 00:00:00").getTime()
const actualTime = new Date().getTime()

const secondsSinceStart = (actualTime - startCountingTime) / 1000
const incomeSinceStart = incomePerSecond * secondsSinceStart

const incomePerTimeUnits = [
  ["second", incomePerSecond],
  ["minute", incomePerSecond * 60],
  ["hour", incomePerSecond * 3600],
  ["day", incomePerSecond * 86400],
  ["month", incomePerSecond * 2592000],
  ["year", incomePerSecond * 31536000]
]

let netWorth = Math.round(startNetWorth + incomeSinceStart)
let incomeSinceEnter = 0
let incomeSinceFirstEnter = Math.round(setIncomeSinceFirstEnter(actualTime))

function start() {
  setInterval(() => {
    updateNetWorth()
    updateIncomeSinceFirstEnter()
    updateIncomeSinceEnter()
  }, 1000)

  setInterval(() => {
    updateIncomeDisplay()
  }, 2000)

  updateNetWorth()
  updateIncomeSinceEnter()
  updateIncomeSinceFirstEnter()
  updateIncomeDisplay()
}

function updateNetWorth(interval) {
  netWorthElem.innerHTML = `${netWorth.toLocaleString()} <strong>$</strong>`
  netWorth += incomePerSecond
}

function updateIncomeSinceEnter(interval) {
  incomeSinceEnterElem.innerHTML = `${incomeSinceEnter.toLocaleString()} <strong>$</strong>`
  incomeSinceEnter += incomePerSecond
}

function updateIncomeSinceFirstEnter() {
  incomeSinceFirstEnterElem.innerHTML = `${shortNotation(
    incomeSinceFirstEnter
  )} <strong>$</strong>`
  incomeSinceFirstEnter += incomePerSecond
}

function updateIncomeDisplay() {
  const currentTimeUnit = incomeElem.dataset.currentTimeUnit

  const incomeData = incomePerTimeUnits[currentTimeUnit]
  const timeUnit = incomeData[0]
  const amount = incomeData[1]

  incomeElem.innerHTML = `${shortNotation(
    amount
  )} <strong>$</strong> / ${timeUnit}`

  if (currentTimeUnit < incomePerTimeUnits.length - 1)
    incomeElem.dataset.currentTimeUnit++
  else incomeElem.dataset.currentTimeUnit = 0
}

function setIncomeSinceFirstEnter(time) {
  if (!localStorage.getItem("first_enter")) {
    localStorage.setItem("first_enter", time.toString())
    return 0
  }
  const firstEnterTime = parseInt(localStorage.getItem("first_enter"))
  const secondsSinceFirstEnter = (actualTime - firstEnterTime) / 1000
  return secondsSinceFirstEnter * incomePerSecond
}

function shortNotation(number) {
  if (number <= 1000) return number.toString()

  const roundingFactor = Math.pow(10, number.toString().length - 4)
  const roundedNumber = roundingFactor * Math.round(number / roundingFactor)

  let divider = 3 * Math.floor((number.toString().length - 1) / 3)
  if (divider > 12) divider = 12

  const dividedNumber = roundedNumber / Math.pow(10, divider)

  const abbreviatedNumbersForms = ["k", "M", "B", "T"]
  const abbrNumForm = abbreviatedNumbersForms[divider / 3 - 1]

  return `${dividedNumber} ${abbrNumForm}`
}