window.onload = () => {
    game = new Game({
        fps: 60
    });
    game.init();
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Game {
    constructor(options) {
        this.fps = options.fps;
        this.asteroids = [];
        this.forward = false;
    }
    init() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        this.ship = new Ship(ctx.canvas.width / 2, ctx.canvas.height / 2, 5, 30, 90);
        document.addEventListener("keydown", this.keydown.bind(this));
        document.addEventListener("keyup", this.keyup.bind(this));
        setInterval(this.draw.bind(this), 1000 / this.fps);
        setInterval(this.game.bind(this), 1000 / this.fps);
    }
    async keydown(ev) {
        let _this = this;

        switch (ev.keyCode) {
            case 37: // left arrow
                _this.ship.rotation = 500 / 180 * Math.PI / this.fps;
                break;
            case 38: // up arrow
                _this.forward = true;
                break;
            case 39: // right arrow
                _this.ship.rotation = -500 / 180 * Math.PI / this.fps;
                break;
            default:
                break;
        }
    }

    async keyup(ev) {
        let _this = this;

        switch (ev.keyCode) {
            case 37: // left arrow
                _this.ship.rotation = 0;
                break;
            case 38: // up arrow
                _this.forward = false;
                break;
            case 39: // right arrow
                _this.ship.rotation = 0;
                break;
            default:
                break;
        }
    }

    async spawnAsteroids() {
        if (this.asteroids.length > 20) return;
        this.asteroids.push(new Asteroid(200, 200, 10));
    }

    async game() {
        await this.spawnAsteroids();
        this.asteroids.forEach((asteroid) => {
            asteroid.game();
        });
        this.ship.angle += this.ship.rotation;
        if (this.forward) {
            this.ship.thrust.x += this.ship.speed * Math.cos(this.ship.angle) / this.fps;
            this.ship.thrust.y -= this.ship.speed * Math.sin(this.ship.angle) / this.fps;
        } else {
            this.ship.thrust.x -= (0.7 * this.ship.thrust.x / this.fps);
            this.ship.thrust.y -= (0.7 * this.ship.thrust.y / this.fps);
        }
        this.ship.x += this.ship.thrust.x;
        this.ship.y += this.ship.thrust.y;

        if (this.ship.x > ctx.canvas.width) {
            this.ship.x = 0 - this.ship.radius;
        }
        if (this.ship.x < 0 - this.ship.radius) {
            this.ship.x = ctx.canvas.width;
        }
        if (this.ship.y > ctx.canvas.height) {
            this.ship.y = 0 - this.ship.radius;
        }
        if (this.ship.y < 0 - this.ship.radius) {
            this.ship.y = ctx.canvas.height;
        }
    }

    async draw() {
        let _this = this;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let i = 0; i < _this.asteroids.length; i++) {
            await _this.asteroids[i].draw(ctx);
        }
        await _this.ship.draw(ctx);
    }
}