import React, { useRef, useEffect, useContext } from 'react';
import p5 from 'p5';
import {Circlefall} from './../p5/Circlefall'
import {Gridshot} from './../p5/Gridshot'
import {Context} from '../context/GamemodeContext'

const P5Wrapper = () => {
  // Use context to get current gamemode
  const { gamemodeType, gamemodeDataFilePath} = useContext(Context);

  // Create a ref to store the DOM node for the p5.js sketch
  const sketchRef = useRef();

  // useEffect to initialize and cleanup the p5.js instance
  useEffect(() => {
    // Initialize p5.js instance and attach it to the sketchRef DOM node
    let sketch;
    switch (gamemodeType){
      case "Circlefall":
        sketch = Circlefall;
        break;
      case "Gridshot":
        sketch = Gridshot;
        break
      default:
        sketch = Circlefall;
    }
    const p5Instance = new p5((p) => sketch(p, gamemodeDataFilePath), sketchRef.current);

    // Cleanup the p5.js instance when the component unmounts
    return () => {
      p5Instance.remove();
    };
  }, [gamemodeType, gamemodeDataFilePath]);

  // Render a div that will be used as the container for the p5.js canvas
  return <div ref={sketchRef} />;
};

export default P5Wrapper;