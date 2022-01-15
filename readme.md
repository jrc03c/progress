**progress** is a little package that draws a progress bar when iterating over an array in Node. It's kind of like [tqdm](https://tqdm.github.io/).

Install it:

```bash
npm install --save https://github.com/jrc03c/progress
```

Use it:

```js
const progress = require("progress")
const x = [5, 4, 3, 2, 1]

progress(x).forEach(value => {
  // do something with `value`;
  // while that's happening,
  // you should see a progress
  // bar at the bottom of the
  // terminal!
})
```
