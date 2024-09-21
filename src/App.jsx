import { useState } from 'react'
import Herosection from './Components/Herosection'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Herosection/>
    </>
  )
}

export default App
