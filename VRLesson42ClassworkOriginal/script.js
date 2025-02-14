document.addEventListener("DOMContentLoaded", function () {
  const scene = document.querySelector('#scene');

  // Create one red floating rock
  const flippableRock = new Rock(1, 0, -3, true);

  // Create large grey rocks
  for (let i = -10; i <= 10; i += 2) {
    for (let j = -10; j <= 10; j += 2) {
      if (Math.abs(i) > 5 || Math.abs(j) > 5) {
        const rock = new Rock(i, 0, j);
      }
    }
  }
});
