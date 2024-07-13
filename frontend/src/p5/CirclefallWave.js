import { Circle } from './p5components/Circle.js'
import { DataCollector } from './p5components/DataCollector.js';

export const CirclefallWave = (p, gamemodeDataFilePath, dispatch) => {
    // Sketch variables
    let circles;
    let dataCollector;
    let gameState; // "pregame", "countdown", "ingame", or "endgame"
    let timer;
    let timerId;
    let totalCirclesSpawned;
    let waveNumber;
    let waveCirclesSpawned;
    let maxWaveCircles;
    let maxWaves;
    let lives;

    // Stats variables
    let hits;
    let misses;
    let totalClicks;

    // Gamemode Data Variables
    let circleRadius;
    let minSpeedY;
    let maxSpeedY;
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

        gameState = "pregame";
        dispatch({
            type: 'SET_GAMESTATE',
            payload: gameState
        });

        circles = [];
        totalCirclesSpawned = 0;
        dataCollector = new DataCollector();
        waveNumber = 1;
        maxWaves = gamemodeData["numWaves"];
        lives = gamemodeData["numLives"];

        hits = 0;
        misses = 0;
        totalClicks = 0;

        p.textAlign(p.CENTER);
    }

    //--------------Draw--------------//
    p.draw = () => {
        p.background(43);


        switch (gameState){
            case "pregame":
                break;
//
//
//
            case "countdown":
                p.fill(255);
                p.textSize(50);
                p.text("Wave " + waveNumber, 400, 250);

                if (timer <= 0) {
                    let waveInfo = gamemodeData["waveInfo"][waveNumber.toString()]
                    waveCirclesSpawned = 0;
                    circleRadius = waveInfo["circleRadius"];
                    minSpeedY = waveInfo["minSpeedY"];
                    maxSpeedY = waveInfo["maxSpeedY"];
                    maxWaveCircles = waveInfo["totalCircles"];
                    circlesPerSecond = waveInfo["circlesPerSecond"];

                    gameState = "ingame";
                    dispatch({
                        type: 'SET_GAMESTATE',
                        payload: gameState
                    });

                    clearInterval(timerId);
                }
                break;
//
//
//
            case "ingame":
                // Spawn new circles based on frames
                if (p.frameCount % (p.int(60/circlesPerSecond)) === 0 && waveCirclesSpawned < maxWaveCircles){
                    // Input variables to circle class
                    let x = p.random(circleRadius+10, p.width-circleRadius-10);
                    let y = -circleRadius;
                    let xSpeed = 0;
                    let ySpeed = p.random(minSpeedY, maxSpeedY);
                    let color = p.color(220);
                    let newCircle = new Circle(p, totalCirclesSpawned, x, y, xSpeed, ySpeed, circleRadius, color)
                    
                    circles.push(newCircle);
                    dataCollector.addCircle(newCircle, p.frameCount);
                    totalCirclesSpawned++;
                    waveCirclesSpawned++;
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

                if (waveCirclesSpawned >= maxWaveCircles && circles.length === 0){
                    if (waveNumber >= maxWaves){
                        gameState = "endgame";
                        dispatch({
                            type: 'SET_GAMESTATE',
                            payload: gameState
                        });
                    }
                    else{
                        waveNumber++;
                        gameState = "countdown";
                        dispatch({
                            type: 'SET_GAMESTATE',
                            payload: gameState
                        });
                        timer = 3;
                        dispatch({
                            type: 'SET_TIMER',
                            payload: timer
                        });
                        timerId = setInterval(handleTimer, 1000);
                    }

                }

                if (misses === lives){
                    gameState = "endgame";
                    dispatch({
                        type: 'SET_GAMESTATE',
                        payload: gameState
                    });
                }

                // Update ingame stats
                dispatch({
                    type: 'SET_INGAME_STATS', 
                    payload: {
                        hits: hits, 
                        misses: misses, 
                        misclicks: totalClicks - hits
                    }
                });
                break;
//
//
//
            case "endgame":
                break;
        }

    }




    //-----------------mousePressed--------------//
    p.mousePressed = () => {
        switch (gameState){
            case "pregame":        
                if (p.mouseX > 0 && p.mouseX < 800 && p.mouseY > 0 && p.mouseY < 600){
                    timer = 3;
                    dispatch({
                        type: 'SET_TIMER',
                        payload: timer
                    });
                    gameState = "countdown";
                    dispatch({
                        type: 'SET_GAMESTATE',
                        payload: gameState
                    });
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

    //---------------Utility----------------//
    function handleTimer(){
        if (timer > 0) {
            timer--;
        }
        dispatch({
            type: 'SET_TIMER',
            payload: timer
        });
    }
}

export default CirclefallWave;