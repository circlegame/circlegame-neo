import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import P5Wrapper from './components/P5Wrapper'
import {exampleSketch} from './p5/exampleSketch'
import {Circlefall} from './p5/Circlefall'
import {Gridshot} from './p5/Gridshot'

function App() {
  const [sketch, setSketch] = useState([Circlefall, "Circlefall"]);


  const switchGamemodes = () => {
    switch (sketch[1]) {
      case "Circlefall":
        setSketch([Gridshot, "Gridshot"]);
        break;
      case "Gridshot":
        setSketch([Circlefall, "Circlefall"]);
        break
      default:
        setSketch([Circlefall, "Circlefall"]);
        break;
    }

  }
  return (
    <>
      <button onClick={switchGamemodes}>Switch Gamemodes</button>
      <br></br>
      <br></br>
      <P5Wrapper sketch={sketch[0]} />
    </>
  )
}

export default App