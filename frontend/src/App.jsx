import { useState } from 'react'
import './App.css'

import P5Wrapper from './components/P5Wrapper'


function App() {
  const [gamemodeType, setGamemodeType] = useState("Circlefall");
  const [gamemodeDataFilePath, setGamemodeDataFilePath] = useState("Circlefall.json")


  const switchGamemodes = () => {
    switch (gamemodeType) {
      case "Circlefall":
        setGamemodeType("Gridshot");
        setGamemodeDataFilePath("Gridshot.json")
        break;
      case "Gridshot":
        setGamemodeType("Circlefall");
        setGamemodeDataFilePath("Circlefall.json")
        break
      default:
        setGamemodeType("Circlefall");
        setGamemodeDataFilePath("Circlefall.json")
        break;
    }

  }
  return (
    <>
      <button onClick={switchGamemodes}>Switch Gamemodes</button>
      <br></br>
      <br></br>
      <P5Wrapper gamemodeType={gamemodeType} gamemodeDataFilePath={gamemodeDataFilePath}/>
    </>
  )
}

export default App