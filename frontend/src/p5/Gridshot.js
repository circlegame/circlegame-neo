import {Circle} from './p5components/Circle.js'
import { Grid } from './p5components/Grid.js';

export const Gridshot = (p) => {
    let circles;

    let grid;
    let numRows;
    let numCols;
    
    p.setup = () => {
        p.createCanvas(800,600)

        // Initialize Grid
        numRows = 5;
        numCols = 5;
        let xMin = 200;
        let xMax = 600;
        let yMin = 100;
        let yMax = 500;
        grid = new Grid(numRows, numCols, xMin, xMax, yMin, yMax);

        // Initialize circles
        circles = []
        for(let i = 0; i < 5; i++){
            addNewCircle()
        }
    }
    
    p.draw = () => {
        p.background(200);

        for(let i = 0; i < circles.length; i++){
            circles[i][0].draw();
        }

    }

    p.mousePressed = () => {
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
                break;
            }
        // If here, must be a miss
        // TODO: missclick functionality
        }
    }

    function addNewCircle(){
        let row = p.int(p.random(0, numRows));
        let col = p.int(p.random(0, numCols));
        while(grid.isPointOccupied(row, col)){
            row = p.int(p.random(0, numRows));
            col = p.int(p.random(0, numCols));
        }
        grid.setPointOccupied(row, col);

        // Input variables to circle class
        let radius = 40;
        let [x, y] = grid.getCoordinates(row,col);
        let xSpeed = 0;
        let ySpeed = 0;
        let color = p.color(p.random(255), p.random(255), p.random(255));
        circles.push([new Circle(p, x, y, xSpeed, ySpeed, radius, color), row, col]);
    }
}

export default Gridshot;