class Ship {
    constructor(x, y, speed, size, angle) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.size = size;
        this.radius = this.size / 2;
        this.angle = angle / 180 * Math.PI;
        this.rotation = 0;
        this.frictain = 0.7;
        this.thrust = {
            x: 0,
            y: 0
        }
    }

    async draw(ctx) {
        ctx.strokeStyle = "white";
        ctx.lineWidth = this.size / 20;
        ctx.beginPath();
        ctx.moveTo( // Nose
            this.x + this.radius * Math.cos(this.angle),
            this.y - this.radius * Math.sin(this.angle)
        );
        ctx.lineTo( // left
            this.x - this.radius * (Math.cos(this.angle) + Math.sin(this.angle)),
            this.y + this.radius * (Math.sin(this.angle) - Math.cos(this.angle))
        );
        ctx.lineTo( // right
            this.x - this.radius * (Math.cos(this.angle) - Math.sin(this.angle)),
            this.y + this.radius * (Math.sin(this.angle) + Math.cos(this.angle))
        );

        ctx.closePath();
        ctx.stroke();
    }
}