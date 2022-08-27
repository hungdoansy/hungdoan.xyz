# A trick to useEffect conditionally

**tl;dr**: place `useEffect` in a separate component where it's conditionally rendered

--

First, it's no doubt that we can't bypass the [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html) which includes `Don't call Hooks inside conditions`. But sometimes, I just want my `useEffect` to be run in a certain circumstance.

Say, I have a table representing my friends' basic personal information. Each row displays Avatar, Phone Number, Gender, you name it. Of course, each of my friend has an ID with which I use to make a request to get the data.

It would look like this:

```jsx
// FriendRow.jsx
const FriendRow = ({ id }) => {
    useEffect(() => {
        getFriendData(id)
    }, [id])

    return <div>{/* other components */}</div>
}
```

Yes, I know I can use a single request to get data of all friends. What I wanna point out here is that it's an example of `useEffect` being called for every components of the list (a list of `<FriendRow />`). Now, I want to fetch since when we became friends for FEMALE people only, and display it in a cell named `From`. Only FEMALE.

My first, native, brainless thought was:

```js
// FriendRow.jsx
const FriendRow = ({ id }) => {
    useEffect(() => {
        getFriendData(id)
    }, [id])

    if (friend.isFemale) {
        useEffect(() => {
            getFriendshipSinceWhen(id)
        }, [id])
    }

    return <div>{/* other components */}</div>
}
```

It failed immediately. Instead, what I did in this case is to move the second `useEffect` into `SinceWhenCell` component. Like this:

```js
// FriendRow.jsx
const FriendRow = ({ id }) => {
    useEffect(() => {
        getFriendData(id)
    }, [id])

    if (friend.isFemale) {
        useEffect(() => {
            getFriendshipSinceWhen(id)
        }, [id])
    }

    return (
        <div>
            {/* other components */}
            {friend.isFemale ? <SinceWhenCell id={id} /> : null}
        </div>
    )
}

// SinceWhenCell.jsx
const SinceWhenCell = ({ id }) => {
    useEffect(() => {
        getFriendshipSinceWhen(id)
    }, [id])

    return <div />
}
```

I already achieved my "conditional hook calling" request without compromising Rules of Hooks. Hooray!
