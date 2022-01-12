const readline = require("readline")

function repeat(text, n) {
  let out = ""

  for (let i = 0; i < n; i++) {
    out += text
  }

  return out
}

class Progress extends Array {
  async forEach(fn, otherThis) {
    const self = this[0]

    for (let i = 0; i < self.length; i++) {
      const boundFn = fn.bind(otherThis || self)
      boundFn(self[i], i, self)

      const right = ` (${i + 1} / ${self.length})`
      const percent = (i + 1) / self.length
      const remainingColumns = process.stdout.columns - right.length
      const done = parseInt(percent * remainingColumns)
      const notDone = remainingColumns - done

      readline.clearLine(process.stdout, 0)
      readline.cursorTo(process.stdout, 0, null)
      process.stdout.write(repeat("█", done) + repeat("░", notDone) + right)
    }

    process.stdout.write("\n")
    return undefined
  }

  // map(fn, otherThis) {
  //   const self = this[0]
  //   return super.map(fn, otherThis)
  // }

  // filter(fn) {
  //   const self = this[0]
  //   return super.filter(fn)
  // }

  // reduce(fn, initialValue) {
  //   const self = this[0]
  //   return super.reduce(fn, initialValue)
  // }

  // every(fn, otherThis) {
  //   const self = this[0]
  //   return super.every(fn, otherThis)
  // }

  // some(fn, otherThis) {
  //   const self = this[0]
  //   return super.some(fn, otherThis)
  // }
}

function progress(arr) {
  return new Progress(arr)
}
