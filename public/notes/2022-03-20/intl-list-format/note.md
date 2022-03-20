# Concatenate a list of strings

❌ Still using [].join(', ') for your strings?

✅ Use Intl.ListFormat instead 👇

```js
const Simpsons ["Homer", "Marge", "Lisa", "Bart", "Maggie"];

/* ❌ Don't */
Simpsons.slice(0, -1).join(', ').concat(', and ', Simpsons.slice(-1))
// 'Homer, Marge, Lisa, Bart, and Maggie'


/* ✅ Do */
new Intl.ListFormat('en').format(Simpsons);
// 'Homer, Marge, Lisa, Bart, and Maggie'
new Intl.ListFormat('fr').format(Simpsons);
// 'Homer, Marge, Lisa, Bart et Maggie'
new Intl.ListFormat('de').format(Simpsons);
// 'Homer, Marge, Lisa, Bart und Maggie'
```

Checkout: [ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)

Reference: [https://twitter.com/ericclemmons/status/1488558951008509963](https://twitter.com/ericclemmons/status/1488558951008509963)
