import {Circle} from './p5components/Circle.js'

export const Circlefall = (p) => {
    // Initialize variables
    let circles;
    let totalFrameRate;

    //--------------Setup-------------//
    p.setup = () => {
        p.createCanvas(800, 600);
        circles = [];
        totalFrameRate = 0;
    }

    //--------------Draw--------------//
    p.draw = () => {
        p.background(200);
        totalFrameRate += p.frameRate()
        
        // Every 16 frames, spawn a new circle
        if (p.frameCount % 20 === 0){
            // Input variables to circle class
            let radius = 30;
            let x = p.random(p.width);
            let y = -radius;
            let xSpeed = 0;
            let ySpeed = p.random(1,2);
            let color = p.color(p.random(255), p.random(255), p.random(255));
            
            circles.push(new Circle(p, x, y, xSpeed, ySpeed, radius, color));
            console.log(p.mouseX, p.mouseY)
        }

        for(let i = 0; i < circles.length; i++){
            circles[i].draw();

            if (circles[i].y > p.height + circles[i].radius){
                circles.splice(i, 1);
                i--;
                // TODO: misses functionality
            }
        }
    }

    p.mousePressed = () => {
        for(let i = circles.length-1; i >= 0; i--){
            if (circles[i].isMouseHovering(p.mouseX, p.mouseY)){
                circles.splice(i,1);
                break;
            }
        }
        // If here, must be a miss
        // TODO: missclick functionality
    }
}

export default Circlefall;