import { GridPoint } from "./GridPoint";

class Grid {
    constructor(numRows, numCols, xMin, xMax, yMin, yMax){
        // Initialize grid of GridPoint objects based on parameters
        this.grid = []
        for(let i = 0; i < numRows; i++){
            this.grid.push([]);
            let yPosition = yMin + (i / (numRows - 1)) * (yMax - yMin);
            for(let j = 0; j < numCols; j++){
                let xPosition = xMin + (j / (numCols - 1)) * (xMax - xMin);
                this.grid[i].push(new GridPoint(xPosition, yPosition));
            }
        }
    }
    
    //------Utility------//
    isPointOccupied(row, col){
        return this.grid[row][col].occupied;
    }
    setPointOccupied(row, col){
        this.grid[row][col].occupied = true;
    }

    setPointNotOccupied(row, col){
        this.grid[row][col].occupied = false;
    }

    getCoordinates(row, col){
        let point = this.grid[row][col];
        return [point.x, point.y];
    }
}

export { Grid };