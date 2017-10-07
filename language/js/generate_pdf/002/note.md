

## html2canvas
性能不是足够好，而且不能渲染隐藏的元素
```js
document.querySelector('#ui').addEventListener('click', function () {
    html2canvas(document.querySelector('#thehtml'), {
        allowTaint: true,
        taintTest: false,
        onrendered: function (canvas) {
            document.body.appendChild(canvas);
        }
    });
})
```


```
664 - 180

21/2.54000508*72 = 595
A4 210x297 
1英寸 = 25.4毫米
1英寸 = 96px

A4像素尺寸 794x1077

```