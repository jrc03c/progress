const readline = require("readline")

function repeat(text, n) {
  let out = ""

  for (let i = 0; i < n; i++) {
    out += text
  }

  return out
}

class Progress extends Array {
  forEach(fn, otherThis) {
    const self = this

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

  map(fn, otherThis) {
    const self = this
    const out = []
    const boundFn = fn.bind(otherThis || self)

    self.forEach((v, i, arr) => {
      out.push(boundFn(v, i, arr))
    })

    return out
  }

  filter(fn, otherThis) {
    const self = this
    const out = []
    const boundFn = fn.bind(otherThis || self)

    self.forEach((v, i, arr) => {
      if (boundFn(v, i, arr)) {
        out.push(v)
      }
    })

    return out
  }

  reduce(fn, initialValue) {
    const self = this
    let out = initialValue || self[0]

    self.slice(initialValue ? 0 : 1).forEach((v, i, arr) => {
      out = fn(out, v)
    })

    return out
  }
}

function progress(arr) {
  return Progress.from(arr)
}

module.exports = progress
