import {Circle} from './p5components/Circle.js'

export const Circlefall = (p, { gamemodeDataFilePath }) => {
    // Sketch variables
    let circles;

    // Gamemode Data Variables
    let circleRadius;
    let ySpeed;
    let circlesPerSecond;
    
    //-------------Preload------------//
    let gamemodeData;
    p.preload = () => {
        if (gamemodeDataFilePath){
            gamemodeData = p.loadJSON("./gamemodeData/" + gamemodeDataFilePath);
        } // Maybe raise error if this messes up or something
    }

    //--------------Setup-------------//
    p.setup = () => {
        p.createCanvas(800, 600);
        circles = [];

        circleRadius = gamemodeData["circleRadius"];
        ySpeed = gamemodeData["ySpeed"];
        circlesPerSecond = gamemodeData["circlesPerSecond"]
    }

    //--------------Draw--------------//
    p.draw = () => {
        p.background(200);
        
        // Every 16 frames, spawn a new circle
        if (p.frameCount % (60/circlesPerSecond) === 0){
            // Input variables to circle class
            let x = p.random(circleRadius+10, p.width-circleRadius-10);
            let y = -circleRadius;
            let xSpeed = 0;
            let color = p.color(p.random(255), p.random(255), p.random(255));
            
            circles.push(new Circle(p, x, y, xSpeed, ySpeed, circleRadius, color));
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