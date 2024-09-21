import { useState } from 'react'
import Herosection from './Components/Herosection'
import './App.css'
import Menu from './Components/Menu'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Herosection/>
     <Menu/>
    </>
  )
}

export default App
