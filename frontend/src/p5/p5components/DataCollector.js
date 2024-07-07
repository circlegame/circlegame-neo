import p5 from 'p5';

class DataCollector {
    constructor(){
        this.dataStore = {
            "frameInfo": {},
            "circles": {},
        }
    }

    addCircle(circle, frameCount){
        this.dataStore["circles"][circle.id.toString()] = {
            "spawnFrame": frameCount,
            "initalX": circle.x,
            "initialY": circle.y,
            "xSpeed": circle.xSpeed,
            "ySpeed": circle.ySpeed,
            "radius": circle.radius,
            "color": {
                "red": p5.prototype.red(circle.color),
                "green": p5.prototype.green(circle.color),
                "blue": p5.prototype.blue(circle.color),
                "alpha": p5.prototype.alpha(circle.color)
            }
        };
    }

    addCircleDeath(circleId, frameCount){
        this.dataStore["circles"][circleId.toString()]["deathFrame"] = frameCount;
    }

    addFrameMousePosition(frameCount, mouseX, mouseY){
        if (!(frameCount.toString() in this.dataStore["frameInfo"])){
            this.dataStore["frameInfo"][frameCount.toString()] = {};
        }

        this.dataStore["frameInfo"][frameCount.toString()]["mouseX"] = Math.floor(mouseX);
        this.dataStore["frameInfo"][frameCount.toString()]["mouseY"] = Math.floor(mouseY);

    }

    addFrameMousePressed(frameCount, clickedCircleId){
        if (!(frameCount.toString() in this.dataStore["frameInfo"])){
            this.dataStore["frameInfo"][frameCount.toString()] = {};
        }
        this.dataStore["frameInfo"][frameCount.toString()]["mousePressed"] = true;
        this.dataStore["frameInfo"][frameCount.toString()]["clickedCircleId"] = clickedCircleId;
    }
}

export {DataCollector};