window.onload = () => {
    game = new Game({
        fps: 30
    });
    game.init();
};


class Game {
    constructor(options) {
        this.fps = options.fps;
    }
    init() {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.canvas.width = window.innerWidth
        ctx.canvas.height = window.innerHeight;
        this.asteroids = [];
        this.ship = new Ship(ctx.canvas.width / 2, ctx.canvas.height, 500);
    }
    async spawnAsteroids() {
        this.asteroids.push(new Asteroid(200, 200, 10));
    }

    async game() {
        this.asteroids.map((asteroid) => {
            asteroid.game();
        });
    }

    async draw() {
        // Draw Ship
        this.asteroids.map((asteroid) => {
            asteroid.draw();
        });
        await this.ship.draw();
    }
}