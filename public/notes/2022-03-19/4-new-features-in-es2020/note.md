# Recap of 4 crucial (and cool) features in ES2022

## Method at() in arrays

You wanna get the last item of an array simply and tersely? `list[-1]`

```js
const arr = [1, 2, 3, 4]
arr[arr.length - 2] // 3
arr.slice(-2)[0] // 3

const str = "1234"
str[str.length - 2] // '3'
str.slice(-2)[0] // '3'
```

## Error cause

What error caused this error?

```js
try {
    doSomeComputationThatThrowAnError()
} catch (error) {
    throw new Error("I am the result of another error", { cause: error })
}
```

## Top-level await

Now it's able to use await outside of functions. What for? To dynamically import modules

```js
const serviceName = await fetch("https://example.com/what-service-should-i-use")
const service = await import(`/services/${serviceName}.js`)

// OR

const params = new URLSearchParams(location.search)
const theme = params.get("theme")
const stylingFunctions = await import(`/styling-functions-${theme}.js`)
```

## Private fields and methods

With prefix #, a field or a method will then be private. This looks kinda weird!

```js
class Human {
    #name = "John"

    setName(name) {
        this.#name = name
    }
}

const human = new Human()
human.#name = "Amy" // ERROR!
human.setName("Amy") // OK
```

```js
class Human {
    name = "John"

    constructor(name) {
        this.#setName("Amy") // OK
    }

    #setName(name) {
        this.name = name
    }
}

const human = new Human()
human.#setName("Amy") // ERROR!
```

Reference: [https://medium.com/@bsalwiczek/4-most-important-features-coming-in-es2022-that-you-should-know-about-f7e18c1bff9b](https://medium.com/@bsalwiczek/4-most-important-features-coming-in-es2022-that-you-should-know-about-f7e18c1bff9b)
