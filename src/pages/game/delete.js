// document.addEventListener('keydown', keyDownHandler, false);
// document.addEventListener('keyup', keyUpHandler, false);

// let lastTime;
// let leftPressed, rightPressed, upPressed, downPressed;

// let player = {
//   pos: [60, 70],
//   dir: 'e',
//   size: 32
// };

// let bullet = {
//   hot: false,
//   pos: [0, 0],
//   dir: '',
//   size: 6,
//   speed: 150
// };

// function fireBullet() {
//   console.log('fire!');
//   bullet.pos = [player.pos[0], player.pos[1]];
//   bullet.hot = true;
//   bullet.dir = player.dir;
// }

// const drawBullet = (color) => {
//   let x, y;

//   if (!bullet.hot) return;
//   ctx.save();
//   ctx.beginPath();
//   ctx.fillStyle = color;

//   if (bullet.dir === 'e') {
//     x = bullet.pos[0] + player.size;
//     y = bullet.pos[1] + player.size / 2 - bullet.size / 2;
//   } else if (bullet.dir === 'w') {
//     x = bullet.pos[0];
//     y = bullet.pos[1] + player.size / 2 - bullet.size / 2;
//   } else if (bullet.dir === 'n') {
//     x = bullet.pos[0] + player.size / 2 - bullet.size / 2;
//     y = bullet.pos[1];
//   } else if (bullet.dir === 's') {
//     x = bullet.pos[0] + player.size / 2 - bullet.size / 2;
//     y = bullet.pos[1] + player.size;
//   }

//   ctx.fillRect(x, y, bullet.size, bullet.size);
//   ctx.closePath();
//   ctx.restore();
// };

// const drawTank = (color, x, y, dir) => {
//   let svg = document.getElementById('tank');
//   let path = svg.getAttribute('d');
//   let p = new Path2D(path);
//   let dirDegrees = 0;

//   switch (dir) {
//     case 'e':
//       dirDegrees = 0;
//       break;
//     case 's':
//       dirDegrees = 90;
//       break;
//     case 'n':
//       dirDegrees = 270;
//       break;
//     case 'w':
//       dirDegrees = 180;
//       break;
//     default:
//       break;
//   }

//   ctx.save();
//   ctx.beginPath();
//   // ctx.translate(x, y);
//   ctx.fillStyle = color;
//   ctx.translate(x + player.size / 2, y + player.size / 2);
//   ctx.rotate((dirDegrees * Math.PI) / 180);
//   ctx.translate(-player.size / 2, -player.size / 2);
//   ctx.fill(p);
//   ctx.translate(-x, -y);
//   ctx.closePath();
//   ctx.restore();
//   // Another way to restore
//   // ctx.setTransform(1, 0, 0, 1, 0, 0);
// };

// function updatePlayer() {
//   if (rightPressed) {
//     if (player.pos[0] < canvas.width - player.size) player.pos[0]++;
//     player.dir = 'e';
//   }
//   if (leftPressed) {
//     if (player.pos[0] > 0) player.pos[0]--;
//     player.dir = 'w';
//   }
//   if (upPressed) {
//     if (player.pos[1] > 0) player.pos[1]--;
//     player.dir = 'n';
//   }
//   if (downPressed) {
//     if (player.pos[1] < canvas.height - player.size) player.pos[1]++;
//     player.dir = 's';
//   }
//   drawTank('darkblue', player.pos[0], player.pos[1], player.dir);
// }

// function updateBullet(dt) {
//   if (bullet.dir === 'e') {
//     bullet.pos[0] += dt * bullet.speed;
//   } else if (bullet.dir === 'w') {
//     bullet.pos[0] -= dt * bullet.speed;
//   } else if (bullet.dir === 'n') {
//     bullet.pos[1] -= dt * bullet.speed;
//   } else if (bullet.dir === 's') {
//     bullet.pos[1] += dt * bullet.speed;
//   }
//   drawBullet('black');
// }

// function update(dt) {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   updatePlayer();
//   updateBullet(dt);
// }

// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// lastTime = performance.now();
// main();

// function main() {
//   const now = performance.now();
//   const dt = (now - lastTime) / 1000.0;
//   update(dt);
//   lastTime = now;
//   window.requestAnimationFrame(main);
// }

// function keyDownHandler(e) {
//   if (e.key === 'Right' || e.key === 'ArrowRight') {
//     rightPressed = true;
//     leftPressed = upPressed = downPressed = false;
//   } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
//     leftPressed = true;
//     rightPressed = upPressed = downPressed = false;
//   } else if (e.key === 'Up' || e.key === 'ArrowUp') {
//     upPressed = true;
//     leftPressed = rightPressed = downPressed = false;
//   } else if (e.key === 'Down' || e.key === 'ArrowDown') {
//     downPressed = true;
//     upPressed = leftPressed = rightPressed = false;
//   }
// }

// function keyUpHandler(e) {
//   if (e.key === 'Right' || e.key === 'ArrowRight') {
//     rightPressed = false;
//   } else if (e.key === 'Left' || e.key === 'ArrowLeft') {
//     leftPressed = false;
//   } else if (e.key === 'Up' || e.key === 'ArrowUp') {
//     upPressed = false;
//   } else if (e.key === 'Down' || e.key === 'ArrowDown') {
//     downPressed = false;
//   }

//   if (e.key === ' ') {
//     fireBullet();
//   }
// }
