'use client';

import React, { useEffect, useState } from 'react';

export default function Counter({ users }) {
    const [count, setCount] = useState(0);
    console.log(
        `It will print on server ie vscode and client ie web-browser if we hit refresh in the browser.
        This is because every component (server or client) is rendered for the first time on server for html generation causing you to see logs in vs code.
        Then after the react js bundle is downloaded on the client browser, this component is executed again on client causing you to see logs again in browser console.
        This is also the reason that the prop 'user' recived from the page.js is displayed in SSR html generation.`
    );
    console.log(users);

    useEffect(() => {
        console.log(
            'It will print only on the client ie web-browser as hooks run on client only (strictly) .'
        );
    }, []);

    return (
        <>
            <div>Count is {count}</div>
            <p>There are {users.length} users</p>
            <button onClick={() => setCount((c) => c + 1)}>+</button>
            <button onClick={() => setCount((c) => c - 1)}>-</button>
        </>
    );
}
