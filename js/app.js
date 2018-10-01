var Furry = function () {
    this.x = 0;
    this.y = 0;
    this.direction = "top";

}

var Coin = function () {
    this.x = Math.floor(Math.random() * 10);
    this.y = Math.floor(Math.random() * 10);
}

var Game = function () {
    this.board = document.querySelectorAll("#board div");
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    this.index = function (x, y) {
        return x + (y * 10);
    }
    this.showFurry = function () {
        this.hideVisibleFurry();
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    }
    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    }
    this.startGame = function (stop) {
        var self = this;

        var set = setInterval(function () {
            self.moveFurry();
        }, 250)
        if (stop == "stop") {
            clearInterval(set);
            console.log("stop")
        }

    }
    this.moveFurry = function () {
        if (this.furry.direction == "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction == "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction == "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction == "down") {
            this.furry.y = this.furry.y + 1;
        }
        this.showFurry();
        this.coinCollision();
        this.gameOver();

    }
    this.hideVisibleFurry = function () {

        var prevFurry = document.querySelector(".furry");
        if (prevFurry) {
            prevFurry.classList.remove("furry")
        };
    }



    this.move = function (event) {
        switch (event.which) {
            case 37:
                this.furry.direction = 'left';
                break;
            case 38:
                this.furry.direction = 'up';
                break;
            case 39:
                this.furry.direction = 'right';
                break;
            case 40:
                this.furry.direction = 'down';
                break;

        }
    }

    this.coinCollision = function () {
        if (this.furry.x == this.coin.x && this.furry.y == this.coin.y) {
            var coinElement = document.querySelector(".coin");
            var scoreElement = document.querySelector("#score strong")
            coinElement.classList.remove("coin");
            this.score += 1;
            scoreElement.innerText = this.score;
            this.coin = new Coin();
            this.showCoin();
        }
    }

    this.gameOver = function () {
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y > 9 || this.furry.y < 0) {
            this.startGame("stop")
            this.hideVisibleFurry();
            console.log("Game Over");
        }
    }
}

var game = new Game();
game.startGame();
game.showCoin();


document.addEventListener('keydown', function (event) {
    game.move(event);
});
