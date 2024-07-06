import {Circle} from './p5components/Circle.js'
import { DataCollector } from './p5components/DataCollector.js';

export const Circlefall = (p, gamemodeDataFilePath) => {
    // Sketch variables
    let circles;
    let dataCollector;
    let gameState; // "pregame", "countdown", "ingame", or "endgame"
    let timer;
    let timerId;
    let totalCirclesSpawned;

    // Stats variables
    let hits;
    let misses;
    let totalClicks;

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
        dataCollector = new DataCollector();

        circleRadius = gamemodeData["circleRadius"];
        ySpeed = gamemodeData["ySpeed"];
        circlesPerSecond = gamemodeData["circlesPerSecond"]

        hits = 0;
        misses = 0;
        totalClicks = 0;

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
                p.fill(0);
                p.textSize(15);
                p.text("Hits: " + hits.toString(), 50, 25);
                p.text("totalClicks: " + totalClicks.toString(), 50, 50);
                p.text("Missed: " + misses.toString(), 50, 75);
                // Spawn new circles based on frames
                if (p.frameCount % (60/circlesPerSecond) === 0 && totalCirclesSpawned < 100){
                    // Input variables to circle class
                    let x = p.random(circleRadius+10, p.width-circleRadius-10);
                    let y = -circleRadius;
                    let xSpeed = 0;
                    let color = p.color(p.random(255), p.random(255), p.random(255));
                    let newCircle = new Circle(p, totalCirclesSpawned, x, y, xSpeed, ySpeed, circleRadius, color)
                    
                    circles.push(newCircle);
                    dataCollector.addCircle(newCircle, p.frameCount);
                    totalCirclesSpawned++;
                }

                for(let i = 0; i < circles.length; i++){
                    circles[i].draw();

                    if (circles[i].y > p.height + circles[i].radius){
                        circles.splice(i, 1);
                        i--;
                        misses++;
                    }
                }

                dataCollector.addFrameMousePosition(p.frameCount, p.mouseX, p.mouseY);

                if (totalCirclesSpawned >= 100 && circles.length === 0){
                    gameState = "endgame";
                    console.log(dataCollector.dataStore);
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
                let circleClickedId = null;
                for(let i = circles.length-1; i >= 0; i--){
                    if (circles[i].isMouseHovering(p.mouseX, p.mouseY)){
                        hits++;
                        circleClickedId = circles[i].id;
                        circles.splice(i,1);
                        break;
                    }
                }
                totalClicks++;
                dataCollector.addFrameMousePressed(p.frameCount, circleClickedId);
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