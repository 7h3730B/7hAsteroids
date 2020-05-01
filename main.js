window.onload = () => {
    game = new Game({
        fps: 30
    });
    game.init();
};

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

class Game {
    constructor(options) {
        this.fps = options.fps;
        this.asteroids = [];
    }
    init() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
        this.ship = new Ship(ctx.canvas.width / 2, ctx.canvas.height / 2, 500, 30, 90);
        document.addEventListener("keydown", this.keydown);
        document.addEventListener("keyup", this.keyup);
        setInterval(this.draw.bind(this), 1000 / 30);
    }
    async keydown(ev) {
        switch (ev.keyCode) {
            case 37: // left arrow
                ship.rotation = 50 / 180 * Math.PI / this.fps;
                break;
            case 38: // up arrow

                break;
            case 39: // right arrow
                this.ship.rotation = -50 / 180 * Math.PI / this.fps;
                break;
            default:
                break;
        }
    }

    async keyup(ev) {
        switch (ev.keyCode) {
            case 37: // left arrow
                this.ship.rotation = 0;
                break;
            case 38: // up arrow

                break;
            case 39: // right arrow
                this.ship.rotation = 0;
                break;
            default:
                break;
        }
    }

    async spawnAsteroids() {
        this.asteroids.push(new Asteroid(200, 200, 10));
    }

    async game() {
        await this.spawnAsteroids();
        this.asteroids.forEach((asteroid) => {
            asteroid.game();
        });
        await this.ship.game();
    }

    async draw() {
        let _this = this;

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (let i = 0; i < _this.asteroids.length; i++) {
            _this.asteroids[i].draw(ctx);
        }
        await _this.ship.draw(ctx);
    }
}