# Nullish coalescing and ternary operators

We've all been using nullish coalescing operator (`a ?? b`) or ternary operators (`a ? b : c`) and we sure know how to use each of them. Today I encountered a situation where I needed to extend an existing ternary expression. For the sake of brevity, it was just `a ? b : c`. Then I had `x`; `x` has higher priority than any of `a`, `b` or `c`. So I just write `x ?? a ? b : c`. Simply enough, if `x` is nullish, evaluate `a ? b : c`. I was kinda surprised, it didn't work as I expected. I found out that `??` has higher precedence than `?&:`. So it must be `x ?? (a ? b : c)`. `x ?? a ? b : c` is a valid syntax so ESLint and Prettier ain't helpful here.

In summary, `??` is evaluated prior to `?&:`, so `x ?? a ? b : c` equals `(x ?? a) ? b : c`, not `x ?? (a ? b : c)`.

Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table
