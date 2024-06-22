import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Wrapper = ({ sketch }) => {
  // Create a ref to store the DOM node for the p5.js sketch
  const sketchRef = useRef();

  // useEffect to initialize and cleanup the p5.js instance
  useEffect(() => {
    // Initialize p5.js instance and attach it to the sketchRef DOM node
    const p5Instance = new p5(sketch, sketchRef.current);

    // Cleanup the p5.js instance when the component unmounts
    return () => {
      p5Instance.remove();
    };
  }, [sketch]);

  // Render a div that will be used as the container for the p5.js canvas
  return <div ref={sketchRef} />;
};

export default P5Wrapper;