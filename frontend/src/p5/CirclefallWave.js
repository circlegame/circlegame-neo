import { Circle } from './p5components/Circle.js'
import { DataCollector } from './p5components/DataCollector.js';
import { submitScore } from '../api.js';
import { Howl } from 'howler';

export const CirclefallWave = (p, gamemode, context) => {
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
    let hitSound;

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
        if (gamemode){
            gamemodeData = p.loadJSON("./gamemodeData/" + gamemode + ".json");
        } // Maybe raise error if this messes up or something
        if (context.hitSound){
            hitSound = new Howl({
                src: ["./hitSounds/" + context.hitSound],
                volume: context.hitSoundVolume
            });
        }
    }

    //--------------Setup-------------//
    p.setup = () => {
        p.createCanvas(800, 600);

        gameState = "pregame";
        context.dispatch({
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
                if (gamemodeData.showWaveNumber){
                    p.fill(255);
                    p.textSize(50);
                    p.text("Wave " + waveNumber, 400, 250);
                }

                if (timer <= 0) {
                    let waveInfo = gamemodeData["waveInfo"][waveNumber.toString()]
                    waveCirclesSpawned = 0;
                    circleRadius = waveInfo["circleRadius"];
                    minSpeedY = waveInfo["minSpeedY"];
                    maxSpeedY = waveInfo["maxSpeedY"];
                    maxWaveCircles = waveInfo["totalCircles"];
                    circlesPerSecond = waveInfo["circlesPerSecond"];

                    gameState = "ingame";
                    context.dispatch({
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
                    let color = p.color(0, 174, 255);
                    let stroke = p.color(43);
                    let newCircle = new Circle(p, totalCirclesSpawned+1, x, y, xSpeed, ySpeed, circleRadius, color, stroke);
                    
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
                        updateGameStats();
                    }
                }

                dataCollector.addFrameMousePosition(p.frameCount, p.mouseX, p.mouseY);

                if (waveCirclesSpawned >= maxWaveCircles && circles.length === 0){
                    if (waveNumber >= maxWaves){
                        gameState = "endgame";
                        context.dispatch({
                            type: 'SET_GAMESTATE',
                            payload: gameState
                        });
                        try{
                            let response = submitScore(gamemode, hits-misses-(totalClicks-hits), hits, misses, totalClicks - hits);
                            // if (!response.ok){
                            //     throw new Error(`HTTP error! Status: ${response.status}`);
                            // }
                            // console.log("Submit Score Successful");
                        }catch (error){
                            console.log("Submit Score Failed:", error);
                        }
                    }
                    else{
                        waveNumber++;
                        gameState = "countdown";
                        context.dispatch({
                            type: 'SET_GAMESTATE',
                            payload: gameState
                        });
                        timer = 3;
                        timerId = setInterval(handleTimer, 1000);
                        context.dispatch({
                            type: 'SET_TIMER',
                            payload: {
                                timer: timer,
                                timerId: timerId
                            }
                        });
                    }

                }

                if (misses >= lives){
                    gameState = "endgame";
                    context.dispatch({
                        type: 'SET_GAMESTATE',
                        payload: gameState
                    });
                    submitScore(gamemode, hits-misses-(totalClicks-hits), hits, misses, totalClicks - hits)
                    .then(response => {
                        context.userDispatch({
                            type: 'ADD_SCORE',
                            payload: {
                                hits: hits,
                                misses: misses,
                                misclicks: totalClicks-hits,
                                score: hits-misses-(totalClicks-hits), 
                                gamemode: gamemode,
                            }
                        });
                    })
                    .catch(error => {
                        console.log("Submit Score Failed");
                    });   
                    
                }
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
                if (!(context.popupVisible) && p.mouseX > 0 && p.mouseX < 800 && p.mouseY > 0 && p.mouseY < 600){
                    timer = 3;
                    timerId = setInterval(handleTimer, 1000);
                    context.dispatch({
                        type: 'SET_TIMER',
                        payload: {
                            timer: timer,
                            timerId: timerId
                        }
                    });

                    gameState = "countdown";
                    context.dispatch({
                        type: 'SET_GAMESTATE',
                        payload: gameState
                    });
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
                        
                        if (hitSound) {
                            hitSound.play();
                        }
                        break;
                    }
                }
                totalClicks++;
                dataCollector.addFrameMousePressed(p.frameCount, circleClickedId);
                updateGameStats();
                break;
        }

    }

    //---------------Utility----------------//
    function handleTimer(){
        if (timer > 0) {
            timer--;
            context.dispatch({
                type: 'SET_TIMER',
                payload: {
                    timer: timer,
                    timerId: timerId
                }
            });
        }
    }

    function updateGameStats(){
        // Update ingame stats
        context.dispatch({
            type: 'SET_INGAME_STATS', 
            payload: {
                hits: hits, 
                misses: misses, 
                misclicks: totalClicks - hits,
                score: hits - (totalClicks - hits)
            }
        });
    }
}

export default CirclefallWave;