import p5 from 'p5';

export const exampleSketch = (p) => {
  let x = 100;
  let y = 100;
  let xspeed = 2;
  let yspeed = 2;

  p.setup = () => {
    p.createCanvas(800, 600);
  };

  p.draw = () => {
    p.background(200);
    p.fill(255, 0, 0);
    p.ellipse(x, y, 50, 50);

    x += xspeed;
    y += yspeed;

    if (x > p.width || x < 0) {
      xspeed *= -1;
    }
    if (y > p.height || y < 0) {
      yspeed *= -1;
    }
  };
};

export default exampleSketch;