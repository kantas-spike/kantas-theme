import * as React from 'react'
import { createRoot } from 'react-dom/client';

function MyButton() {
    return (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4">
        I'm a button
        </button>
    );
}

export default function MyApp() {
    return (
        <div className="bg-stone-200 rounded-md m-4 p-2 text-center font-bold">
        <h1>Welcome to my app!!!</h1>
        <MyButton />
        </div>
    );
}

const container = document.getElementById('app')
const root = createRoot(container)
root.render(<MyApp />)
