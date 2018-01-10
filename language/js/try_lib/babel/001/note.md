1. add babel-cli
```js
// package.json
"devDependencies": {
    "babel-cli": "^6.26.0"
}
// before
console.log("Hello, world!")
;[1, 2, 3, 4].find(function (val) {
    console.log(val)
    if(val == 3) return true
})
// after
console.log("Hello, world!");[1, 2, 3, 4].find(function (val) {
    console.log(val);
    if (val == 3) return true;
});
```
1. add babel-preset-env
```js
// .babelrc
{
    "presets": [
        "env"
    ]
}
// before
console.log("Hello, world!")
;[1, 2, 3, 4].find(function (val) {
    console.log(val)
    if(val == 3) return true
})
// after
"use strict";
console.log("Hello, world!");[1, 2, 3, 4].find(function (val) {
    console.log(val);
    if (val == 3) return true;
});
```
