import { useState } from 'react'
import Herosection from './Components/Herosection'
import './App.css'
import Menu from './Components/Menu'
import Footer from './Components/Footer'
import About from './Components/About'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <Herosection/>
      <Menu/>
      <About/>
     <Footer/>
    </>
  )
}

export default App
