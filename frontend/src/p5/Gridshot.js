import { Circle } from './p5components/Circle.js'
import { Grid } from './p5components/Grid.js';
import { DataCollector } from './p5components/DataCollector.js';
import { submitScore } from '../api.js';

export const Gridshot = (p, gamemode, context) => {
    // Sketch variables
    let circles;
    let grid;
    let dataCollector;
    let gameState; // "pregame", "countdown", "ingame", or "endgame"
    let timer;
    let timerId;
    let totalCirclesSpawned;

    // Stats Variables
    let totalClicks;
    let hits;
    let score;

    // General Gamemode Data Variables
    let numRows;
    let numCols;
    let xMin;
    let xMax;
    let yMin;
    let yMax;
    let numCircles;
    let circleRadius;
    let taxicabRadius;

    // Scoring Gamemode Data Variables
    let scorePerHit;
    let scorePerMiss;
    let precisionBonus;

    
    //-----------Preload-----------//
    let gamemodeData;
    p.preload = () => {
        if (gamemode){
            gamemodeData = p.loadJSON("./gamemodeData/" + gamemode + ".json");
        } // Maybe raise error if this messes up or something
    }
    
    //-------------Setup------------//
    p.setup = () => {
        p.createCanvas(800,600)

        numRows = gamemodeData["numRows"];
        numCols = gamemodeData["numCols"];
        xMin = gamemodeData["xMin"];
        xMax = gamemodeData["xMax"];
        yMin = gamemodeData["yMin"];
        yMax = gamemodeData["yMax"];
        numCircles = gamemodeData["numCircles"];
        circleRadius = gamemodeData["circleRadius"];
        taxicabRadius = gamemodeData["taxicabRadius"];

        let scoringData = gamemodeData["scoring"];
        scorePerHit = scoringData["scorePerHit"];
        scorePerMiss = scoringData["scorePerMiss"];
        precisionBonus = scoringData["precisionBonus"];

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
        score = 0;
        totalCirclesSpawned = 0;

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
                    timer = 30;
                    context.dispatch({
                        type: 'SET_TIMER',
                        payload: {
                            timer: timer, 
                            timerId: timerId
                        }
                    });

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

                for(let i = 0; i < circles.length; i++){
                    circles[i][0].draw();
                }

                dataCollector.addFrameMousePosition(p.frameCount, p.mouseX, p.mouseY);
                
                if (timer <= 0) {
                    gameState = "endgame";
                    clearInterval(timerId)
                    // Update game state in context
                    context.dispatch({ 
                        type: 'SET_GAMESTATE',
                        payload: gameState 
                    });
                    try{
                        let response = submitScore(gamemode, p.int(score), hits, 0, totalClicks-hits);
                        // if (!response.ok){
                        //     throw new Error(`HTTP error! Status: ${response.status}`);
                        // }
                        // console.log("Submit Score Successful");
                    }catch (error){
                        console.log("Submit Score Failed:", error);
                    }
                }

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
                let circleX;
                let circleY;
                for(let i = circles.length-1; i >= 0; i--){
                    if (circles[i][0].isMouseHovering(p.mouseX, p.mouseY)){
                        // Set grid value to unoccupied
                        let row = circles[i][1];
                        let col = circles[i][2];

                        circleClickedId = circles[i][0].id;
                        dataCollector.addCircleDeath(circleClickedId, p.frameCount);

                        circleX = circles[i][0].x;
                        circleY = circles[i][0].y;
        
                        // Remove circle from list
                        circles.splice(i,1);
        
                        // Add new circle to grid
                        addNewCircle();
                        grid.setPointNotOccupied(row, col);
                        hits++;
                        break;
                    }
                }
                totalClicks++;
                dataCollector.addFrameMousePressed(p.frameCount, circleClickedId);
                if (circleClickedId){
                    score += scorePerHit;
                    score += calculatePrecisionBonus(p.mouseX, p.mouseY, circleX, circleY);
                } else{
                    score += scorePerMiss;
                }
                updateGameStats();
                break;
        }


    }

    //---------------Utility----------------//
    function addNewCircle(){
        let row = p.int(p.random(0, numRows));
        let col = p.int(p.random(0, numCols));
        while(!isValidSpawnPoint(row, col)){
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
        let newCircle = new Circle(p, totalCirclesSpawned, x, y, xSpeed, ySpeed, circleRadius, color, stroke);
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
                score: p.int(score)
            }
        });
    }

    function calculatePrecisionBonus(mouseX, mouseY, circleX, circleY){
        let distFromCenter = Math.sqrt(Math.pow((circleX - mouseX), 2) + Math.pow((circleY - mouseY), 2));
        return ((circleRadius-distFromCenter)/circleRadius) * precisionBonus;
    }

    function isValidSpawnPoint(row, col){
        for (let i = row - taxicabRadius; i <= row + taxicabRadius; i++){
            for (let j = col - taxicabRadius; j <= col + taxicabRadius; j++){
                if (Math.abs(i-row) + Math.abs(j-col) <= taxicabRadius){
                    if (grid.isPointOccupied(i, j)){
                        return false;
                    }
                }
            }
        }
        return true;
    }
}

export default Gridshot;