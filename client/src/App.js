import logo from './logo.svg'
import './App.css'
import React, { useState, useEffect } from 'react'

function App() {
    const [state, setState] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch('/api/hello').then((res) => res.json())
            setState(result)
        }
        fetchData()
    }, [])

    return (
        <div className="App">
            <p>{state}</p>
        </div>
    )
}

export default App
