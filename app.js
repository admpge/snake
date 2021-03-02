const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Colors
const boardColor = '#222';
const snakeColor = '#F2F2F2';

let snake = [
  { x: 200, y: 200 },
  { x: 190, y: 200 },
  { x: 180, y: 200 },
  { x: 170, y: 200 },
  { x: 160, y: 200 },
];

let dx = 10;
let dy = 0;

// GAME START
function main() {
  setInterval(() => {
    if (gameEnded()) return;
    clearCanvas();
    moveSnake();
    drawSnake();
  }, 100);
}

document.addEventListener('keydown', changeDirection);

main();

function clearCanvas() {
  ctx.fillStyle = boardColor;
  ctx.fillRect(10, 10, canvas.width, canvas.height);
}

function drawSnake() {
  snake.forEach(snakeSegment => {
    console.log(snakeSegment);
    ctx.fillStyle = snakeColor;
    ctx.fillRect(snakeSegment.x, snakeSegment.y, 10, 10);
  });
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  snake.pop();
}

function changeDirection(e) {
  const goingLeft = dx === -10;
  const goingUp = dy === -10;
  const goingRight = dx === 10;
  const goingDown = dy === 10;

  if (e.keyCode === 37 && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (e.keyCode === 38 && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (e.keyCode === 39 && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (e.keyCode === 40 && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function gameEnded() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }

  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > canvas.width - 10;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - 10;
  return hitLeftWall || hitRightWall || hitToptWall || hitBottomWall;
}
