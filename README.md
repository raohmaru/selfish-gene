# The Selfish Gene
A JavaScript game based on Richard Dawkins' book The Selfish Gene.

It doesn't use a framework nor a game engine, just [vanilla JavaScript](http://vanilla-js.com/) and
[HTML5 Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

## Getting Started
Open src/index.html in your favourite browser, or navigate to https://raohmaru.github.io/selfish-gene/src/index.html.

## Know issues
There is no limit in the number of genes on the screen. If the browser's performance slows down (it
happens with thousands of genes), close the tab or pause JavaScript execution.

## Browser Support
The Selfish Gene supports IE 10+, Edge, Firefox 15+, Chrome 20+, Safari 8+.
In order to support older browsers, you need polyfills for the following JavaScript features:

- [Performance.now()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)
- [window.requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

### License
Released under the MIT license.
