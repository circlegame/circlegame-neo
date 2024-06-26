import React, { useRef, useEffect } from 'react';
import p5 from 'p5';
import {Circlefall} from './../p5/Circlefall'
import {Gridshot} from './../p5/Gridshot'

const P5Wrapper = ({ gamemodeType, ...props }) => {
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
    const p5Instance = new p5((p) => sketch(p, props), sketchRef.current);

    // Cleanup the p5.js instance when the component unmounts
    return () => {
      p5Instance.remove();
    };
  }, [gamemodeType, props]);

  // Render a div that will be used as the container for the p5.js canvas
  return <div ref={sketchRef} />;
};

export default P5Wrapper;