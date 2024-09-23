import { useState } from 'react'
import Herosection from './Components/Herosection'
import './App.css'
import Menu from './Components/Menu'
import Footer from './Components/Footer'
import About from './Components/About'
import Contact from './Components/Contact'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <Herosection/>
      <Menu/>
      <About/>
      <Contact/>
     <Footer/>
    </>
  )
}

export default App
