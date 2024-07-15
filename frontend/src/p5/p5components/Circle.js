class Circle {
    constructor(p, id, x, y, xSpeed, ySpeed, radius, color, stroke){
        this.p = p; // Reference to the p5 instance
        this.id = id;
        this.x = x;
        this.y = y;
        this.xSpeed = xSpeed;
        this.ySpeed = ySpeed;
        this.radius = radius;
        this.color = color;
        this.stroke = stroke;
    }

    draw(){
        // Draw the circle
        this.p.fill(this.color);
        this.p.stroke(this.stroke);
        this.p.circle(this.x, this.y, this.radius*2)

        // Update the circle
        this.update()
    }

    update(){
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }

    isMouseHovering(mouseX, mouseY){
        return Math.sqrt(Math.pow((this.x - mouseX), 2) + Math.pow((this.y - mouseY), 2)) <= this.radius
    }
}

export { Circle };