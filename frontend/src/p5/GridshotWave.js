import { Circle } from './p5components/Circle.js'
import { Grid } from './p5components/Grid.js';
import { DataCollector } from './p5components/DataCollector.js';
import { submitScore } from '../api.js';
import { Howl } from 'howler';

export const GridshotWave = (p, gamemode, context) => {
    // Sketch variables
    let circles;
    let grid;
    let dataCollector;
    let gameState; // "pregame", "countdown", "ingame", or "endgame"
    let timer;
    let timerId;
    let totalCirclesSpawned;
    let waveNumber;
    let maxWaves;
    let hitSound;

    // Stats Variables
    let totalClicks;
    let hits;
    let score;

    // Gamemode Data Variables
    let numRows;
    let numCols;
    let xMin;
    let xMax;
    let yMin;
    let yMax;
    let numCircles;
    let circleRadius;


    //-----------Preload-----------//
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
    
    //-------------Setup------------//
    p.setup = () => {
        p.createCanvas(800,600);

        maxWaves = gamemodeData["numWaves"];
        waveNumber = 1;


        let waveInfo = gamemodeData["waveInfo"][waveNumber.toString()];

        numRows = waveInfo["numRows"];
        numCols = waveInfo["numCols"];
        xMin = waveInfo["xMin"];
        xMax = waveInfo["xMax"];
        yMin = waveInfo["yMin"];
        yMax = waveInfo["yMax"];
        numCircles = waveInfo["numCircles"];
        circleRadius = waveInfo["circleRadius"];

        // Initialize Grid
        grid = new Grid(numRows, numCols, xMin, xMax, yMin, yMax);
        circles = [];
        dataCollector = new DataCollector();

        gameState = "pregame";
        // Initialize game state in context
        context.dispatch({
            type: 'SET_GAMESTATE',
            payload: gameState
        });

        totalClicks = 0;
        hits = 0;
        totalCirclesSpawned = 0;
        score = 150000;

        p.textAlign(p.CENTER);
    }
    
    //-------------Draw--------------//
    p.draw = () => {
        p.background(43);

        switch (gameState){
            case "pregame":
                break;
//
//
//
            case "countdown":
                for(let i = 0; i < circles.length; i++){
                    circles[i][0].draw();
                }

                if (timer <= 0) {
                    gameState = "ingame";
                    // Update game state in context
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

                // Update score 10 times/s
                if (p.frameCount % 6 === 0){
                    context.dispatch({
                        type: 'SET_SCORE',
                        payload: score
                    });
                }
                score -= 24;

                for(let i = 0; i < circles.length; i++){
                    circles[i][0].draw();
                }

                dataCollector.addFrameMousePosition(p.frameCount, p.mouseX, p.mouseY);

                break;
//
//
//
            case "endgame":
                break;
        }


    }
    
    //-------------MousePressed------------//
    p.mousePressed = () => {
        switch (gameState) {
            case "pregame":
                if (!(context.popupVisible) && p.mouseX > 0 && p.mouseX < 800 && p.mouseY > 0 && p.mouseY < 600){
                    // Initialize timer
                    timer = 3;
                    timerId = setInterval(handleTimer, 1000);
                    context.dispatch({  
                        type: 'SET_TIMER', 
                        payload: {
                            timer: timer, 
                            timerId: timerId
                        }
                    });

                    // Update game state
                    gameState = "countdown";
                    context.dispatch({ type: 'SET_GAMESTATE', payload: gameState }); // Update game state in context

                    // Initialize circles
                    for(let i = 0; i < numCircles; i++){ 
                        addNewCircle(); 
                    }
                }
                break;
//
//
//
            case "ingame":
                let circleClickedId = null;
                for(let i = circles.length-1; i >= 0; i--){
                    if (circles[i][0].isMouseHovering(p.mouseX, p.mouseY)){
                        // Set grid value to unoccupied
                        let row = circles[i][1];
                        let col = circles[i][2];

                        circleClickedId = circles[i][0].id;
                        dataCollector.addCircleDeath(circleClickedId, p.frameCount);

                        if (hitSound) {
                            hitSound.play();
                        }
                        
                        // Remove circle from list
                        circles.splice(i,1);
        
                        // Add new circle to grid
                        // addNewCircle();
                        grid.setPointNotOccupied(row, col)
                        hits++;
                        break;
                    }
                }
                totalClicks++;
                dataCollector.addFrameMousePressed(p.frameCount, circleClickedId);
                if (!circleClickedId){
                    score -= 666;
                }
                if (circles.length <= 0){
                    // Go to next wave
                    if (waveNumber < maxWaves){
                        waveNumber++;
                        let waveInfo = gamemodeData["waveInfo"][waveNumber.toString()];

                        numRows = waveInfo["numRows"];
                        numCols = waveInfo["numCols"];
                        xMin = waveInfo["xMin"];
                        xMax = waveInfo["xMax"];
                        yMin = waveInfo["yMin"];
                        yMax = waveInfo["yMax"];
                        numCircles = waveInfo["numCircles"];
                        circleRadius = waveInfo["circleRadius"];

                        grid = new Grid(numRows, numCols, xMin, xMax, yMin, yMax);
                        
                        // Initialize circles for new wave
                        for(let i = 0; i < numCircles; i++){ 
                            addNewCircle(); 
                        }                        


                    }
                    else{
                        gameState = "endgame";
                        clearInterval(timerId);
                        // Update game state in context
                        context.dispatch({ 
                            type: 'SET_GAMESTATE',
                            payload: gameState 
                        });
                    
                        submitScore(gamemode, score, hits, 0, totalClicks-hits)
                            .then(response => {
                                context.userDispatch({
                                    type: 'ADD_SCORE',
                                    payload: {
                                        hits: hits,
                                        misses: 0,
                                        misclicks: totalClicks-hits,
                                        score: score, 
                                        gamemode: gamemode,
                                    }
                                });
                            })
                            .catch(error => {
                                console.log("Submit Score Failed");
                            });        
                    }

                }
                updateGameStats();
                break;
        }


    }

    //---------------Utility----------------//
    function addNewCircle(){
        let row = p.int(p.random(0, numRows));
        let col = p.int(p.random(0, numCols));
        while(grid.isPointOccupied(row, col)){
            row = p.int(p.random(0, numRows));
            col = p.int(p.random(0, numCols));
        }
        grid.setPointOccupied(row, col);

        // Input variables to circle class
        let [x, y] = grid.getCoordinates(row,col);
        let xSpeed = 0;
        let ySpeed = 0;
        let color = p.color(255, 40, 40);
        let stroke = p.color(43);
        let newCircle = new Circle(p, totalCirclesSpawned+1, x, y, xSpeed, ySpeed, circleRadius, color, stroke);
        circles.push([newCircle, row, col]);
        dataCollector.addCircle(newCircle, p.frameCount);
        totalCirclesSpawned++;
    }
    
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
                misses: 0, 
                misclicks: totalClicks - hits,
                score: score
            }
        });
    }
}

export default GridshotWave;