import {Circle} from './p5components/Circle.js'

export const Circlefall = (p, gamemodeDataFilePath, setTimer, dispatch) => {
    // Sketch variables
    let circles;
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

        gameState = "pregame";
        dispatch({ type: 'SET_GAMESTATE', payload: gameState }); // Initialize game state in context
        
        circles = [];
        totalCirclesSpawned = 0;

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
        p.background(43);


        switch (gameState){
            case "pregame":
                break;
//
//
//
            case "countdown":
                if (timer <= 0) {
                    gameState = "ingame";
                    dispatch({ type: 'SET_GAMESTATE', payload: gameState }); // Update game state in context
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
                        misses++;
                    }
                }

                if (totalCirclesSpawned >= 100 && circles.length === 0){
                    gameState = "endgame";
                    dispatch({ type: 'SET_GAMESTATE', payload: gameState }); // Update game state in context
                }
                dispatch({ type: 'SET_INGAME_STATS', payload: {hits: hits, misses: misses, misclicks: totalClicks - hits}});
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
                    setTimer(timer);
                    gameState = "countdown";
                    dispatch({ type: 'SET_GAMESTATE', payload: gameState }); // Update game state in context
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
                        hits++;
                        break;
                    }
                }
                // If here, is a misclick
                totalClicks++;
                break;
        }

    }

    function handleTimer(){
        if (timer > 0) {
            timer--;
            setTimer(timer);
        }
    }
}

export default Circlefall;