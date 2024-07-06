import { Circle } from './p5components/Circle.js'
import { Grid } from './p5components/Grid.js';

export const Gridshot = (p, gamemodeDataFilePath, dispatch) => {
    // Sketch variables
    let circles;
    let grid;
    let gameState; // "pregame", "countdown", "ingame", or "endgame"
    let timer;
    let timerId;

    // Stats Variables
    let totalClicks;
    let hits;

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
        if (gamemodeDataFilePath){
            gamemodeData = p.loadJSON("./gamemodeData/" + gamemodeDataFilePath);
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

        // Initialize Grid
        grid = new Grid(numRows, numCols, xMin, xMax, yMin, yMax);
        circles = [];
        gameState = "pregame";
        dispatch({ type: 'SET_GAMESTATE', payload: gameState }); // Initialize game state in context

        totalClicks = 0;
        hits = 0;

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
                    dispatch({ type: 'SET_TIMER', payload: timer })
                    gameState = "ingame";
                    dispatch({ type: 'SET_GAMESTATE', payload: gameState }); // Update game state in context
                }
                break;
//
//
//
            case "ingame":

                for(let i = 0; i < circles.length; i++){
                    circles[i][0].draw();
                }
                
                if (timer <= 0) {
                    gameState = "endgame";
                    clearInterval(timerId)
                    dispatch({ type: 'SET_GAMESTATE', payload: gameState }); // Update game state in context
                }

                // Update ingame stats
                dispatch({  type: 'SET_INGAME_STATS', 
                    payload:   {hits: hits, 
                                misses: 0, 
                                misclicks: totalClicks - hits}});

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
                if (p.mouseX > 0 && p.mouseX < 800 && p.mouseY > 0 && p.mouseY < 600){
                    // Initialize timer
                    timer = 3;
                    dispatch({ type: 'SET_TIMER', payload: timer });
                    gameState = "countdown";
                    dispatch({ type: 'SET_GAMESTATE', payload: gameState }); // Update game state in context
                    timerId = setInterval(handleTimer, 1000);

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
                for(let i = circles.length-1; i >= 0; i--){
                    if (circles[i][0].isMouseHovering(p.mouseX, p.mouseY)){
                        // Set grid value to unoccupied
                        let row = circles[i][1];
                        let col = circles[i][2];
        
                        // Remove circle from list
                        circles.splice(i,1);
        
                        // Add new circle to grid
                        addNewCircle();
                        grid.setPointNotOccupied(row, col)
                        hits++;
                        break;
                    }
                }
                // If here, must be a miss
                totalClicks++;
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
        let color = p.color(p.random(255), p.random(255), p.random(255));
        circles.push([new Circle(p, x, y, xSpeed, ySpeed, circleRadius, color), row, col]);
    }

    function handleTimer(){
        if (timer > 0) {
            timer--;
            dispatch({ type: 'SET_TIMER', payload: timer });
        }
    }
}

export default Gridshot;