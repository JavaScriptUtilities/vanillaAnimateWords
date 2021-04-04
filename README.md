# Vanilla Animate Words

A Script To Beautifully Animate Words, helped by CSS

![Alt text](images/example.gif?raw=true "Example")


## How to install

First, load `js/vanilla-animate-words.js` and `css/vanilla-animate-words.css` in your webpage.

Then, when DOM is ready, start the plugin :

```js
document.querySelectorAll("[data-vawjs-anim]").forEach(function($item) {
    new vanillaAnimateWords($item);
});
```
