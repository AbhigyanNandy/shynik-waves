const car = document.getElementById('car');
const obstacle = document.getElementById('obstacle');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('startButton');
const gameOverDisplay = document.getElementById('gameOver');
const finalScoreDisplay = document.getElementById('finalScore');
let score = 0;
let gameOver = false;
let obstacleSpeed = 5;

// Move the car left and right
document.addEventListener('keydown', (event) => {
    if (gameOver) return;

    const carPosition = car.offsetLeft;
    if (event.key === 'ArrowLeft' && carPosition > 0) {
        car.style.left = `${carPosition - 20}px`;
    }
    if (event.key === 'ArrowRight' && carPosition < 260) {
        car.style.left = `${carPosition + 20}px`;
    }
});

// Start the game
startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    gameOver = false;
    score = 0;
    obstacleSpeed = 5;
    scoreDisplay.textContent = 'Score: ' + score;
    startGame();
});

// Generate obstacle and check for collision
function startGame() {
    obstacle.style.left = `${Math.random() * 260}px`;
    let obstacleTop = -80;

    const gameLoop = setInterval(() => {
        if (gameOver) {
            clearInterval(gameLoop);
            return;
        }

        obstacleTop += obstacleSpeed;
        obstacle.style.top = `${obstacleTop}px`;

        if (obstacleTop > 600) {
            obstacleTop = -80;
            obstacle.style.left = `${Math.random() * 260}px`;
            score++;
            scoreDisplay.textContent = 'Score: ' + score;

            // Increase speed every 5 points
            if (score % 5 === 0) {
                obstacleSpeed += 1;
            }
        }

        // Check for collision
        if (obstacleTop > 520 && obstacleTop < 600) {
            const carPosition = car.offsetLeft;
            const obstaclePosition = obstacle.offsetLeft;
            if (carPosition < obstaclePosition + 40 && carPosition + 40 > obstaclePosition) {
                gameOver = true;
                endGame();
            }
        }
    }, 100);
}

// End the game
function endGame() {
    finalScoreDisplay.textContent = score;
    gameOverDisplay.classList.remove('hidden');
    startButton.classList.remove('hidden');
}

