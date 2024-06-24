import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import P5Wrapper from './components/P5Wrapper'
import {exampleSketch} from './p5/exampleSketch'
import {Circlefall} from './p5/Circlefall'
import {Gridshot} from './p5/Gridshot'

function App() {
  return (
    <>
      <P5Wrapper sketch={Gridshot} />
    </>
  )
}

export default App
