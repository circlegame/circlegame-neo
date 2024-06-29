import {Circle} from './p5components/Circle.js'

export const Circlefall = (p, { gamemodeDataFilePath }) => {
    // Sketch variables
    let circles;
    let gameState; // "pregame", "countdown", "ingame", or "endgame"
    let timer;
    let timerId;
    let totalCirclesSpawned;

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
        gameState = "pregame";
        totalCirclesSpawned = 0;

        circleRadius = gamemodeData["circleRadius"];
        ySpeed = gamemodeData["ySpeed"];
        circlesPerSecond = gamemodeData["circlesPerSecond"]

        p.textAlign(p.CENTER);
    }

    //--------------Draw--------------//
    p.draw = () => {
        p.background(200);


        switch (gameState){
            case "pregame":
                p.fill(0);
                p.textSize(50);
                p.text("Click anywhere to start", 400, 300)
                break;
//
//
//
            case "countdown":
                p.fill(0);
                p.text(timer, 400, 300);

                if (timer <= 0) {
                    gameState = "ingame";
                    clearInterval(timerId);
                }
                break;
//
//
//
            case "ingame":
                // Spawn new circles based on frames
                if (p.frameCount % (60/circlesPerSecond) === 0 && totalCirclesSpawned < 100){
                    // Input variables to circle class
                    let x = p.random(circleRadius+10, p.width-circleRadius-10);
                    let y = -circleRadius;
                    let xSpeed = 0;
                    let color = p.color(p.random(255), p.random(255), p.random(255));
                    
                    circles.push(new Circle(p, x, y, xSpeed, ySpeed, circleRadius, color));
                    totalCirclesSpawned++;
                }

                for(let i = 0; i < circles.length; i++){
                    circles[i].draw();

                    if (circles[i].y > p.height + circles[i].radius){
                        circles.splice(i, 1);
                        i--;
                        // TODO: misses functionality
                    }
                }

                if (totalCirclesSpawned >= 100 && circles.length === 0){
                    gameState = "endgame";
                }
                break;
//
//
//
            case "endgame":
                p.text("balls", 400,300)
                break;
        }

    }




    //-----------------mousePressed--------------//
    p.mousePressed = () => {
        switch (gameState){
            case "pregame":        
                if (p.mouseX > 0 && p.mouseX < 800 && p.mouseY > 0 && p.mouseY < 600){
                    timer = 3;
                    gameState = "countdown";
                    timerId = setInterval(handleTimer, 1000);
                }
                break;
//
//
//
            case "ingame":
                for(let i = circles.length-1; i >= 0; i--){
                    if (circles[i].isMouseHovering(p.mouseX, p.mouseY)){
                        circles.splice(i,1);
                        break;
                    }
                }
                // If here, must be a miss
                // TODO: missclick functionality
                break;
        }

    }

    function handleTimer(){
        if (timer > 0) {
            timer--;
        }
    }
}

export default Circlefall;