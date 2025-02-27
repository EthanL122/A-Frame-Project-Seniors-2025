document.addEventListener("DOMContentLoaded", function () {
  const labels = ['1', '2', '3', '4', '5', '6', '7'];  // Labels for the rocks
  const positions = [
    {x: -2, z: -3}, {x: 2, z: -3}, {x: -3, z: 2}, {x: 3, z: 2},
    {x: -5, z: -5}, {x: 5, z: -5}, {x: -4, z: 4}, {x: 4, z: 4}
  ];

  // Define the sequence of safe rocks (rocks to click in order)
  const safeRocksSequence = ['2', '4', '6'];  // Safe rocks to click
  let currentSafeRockIndex = 0;  // To track the sequence
  let gameOver = false;  // To prevent further clicks after losing
  const clickedRocks = new Set();  // To keep track of clicked rocks

  const scene = document.querySelector("a-scene");

  // Create labeled rocks
  labels.forEach((label, index) => {
    const position = positions[index];
    const rock = new Rock(position.x, 0, position.z, label);
    scene.appendChild(rock);  // Add the rock to the scene
  });

  // Rock class with updated logic
  class Rock {
    constructor(x, y, z, label) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.label = label;
      this.isUp = false;

      let rock = document.createElement("a-entity");
      rock.setAttribute("geometry", "primitive: dodecahedron");
      rock.setAttribute("position", ${x} ${y} ${z});

      // Create a text element for the label
      let text = document.createElement("a-text");
      text.setAttribute("value", label);  // Set the label to the rock's number (1-7)
      text.setAttribute("align", "center");
      text.setAttribute("color", "#FFFFFF");
      text.setAttribute("position", "0 0.5 0"); // Position the label slightly above the rock
      rock.appendChild(text);  // Attach the text label to the rock entity

      // Random rotation
      let a = Math.random() * 360;
      rock.setAttribute("rotation", ${a} ${a} ${a});

      // Event listener for clicking the rock
      rock.addEventListener("click", () => this.handleClick(rock));

      return rock;
    }

    // Handle clicking the rock
    handleClick(rock) {
      if (gameOver) return;  // Ignore clicks if the game is over

      const rockLabel = this.label;  // Use label directly as a string

      // If the player clicks a "Boom" rock (1, 3, 5, 7)
      if (['1', '3', '5', '7'].includes(rockLabel)) {
        alert("Boom, you died!");
        gameOver = true;  // End the game
        resetGame();  // Reset the game state
        return;  // Exit early
      }

      // If it's the correct next rock in the sequence (2 -> 4 -> 6)
      if (safeRocksSequence[currentSafeRockIndex] === rockLabel) {
        alert(You safely clicked rock ${rockLabel}!);
        clickedRocks.add(rockLabel); // Add clicked rock to the set

        // If it's the last safe rock (rock 6)
        if (rockLabel === '6' && clickedRocks.size === safeRocksSequence.length) {
          alert("Congrats you beat the game!");
          gameOver = true;  // End the game
        } else {
          // Move to the next rock in the sequence
          currentSafeRockIndex++;
        }
      } else {
        // If it's not the correct safe rock in sequence
        alert("Incorrect rock clicked, try again!");
      }

      // Flip the rock and move it
      let currentRotation = rock.getAttribute("rotation");
      let currentPosition = rock.getAttribute("position");

      if (!this.isUp) {
        rock.setAttribute("animation__flip", property: rotation; to: ${currentRotation.x + 60} ${currentRotation.y + 50} ${currentRotation.z + 60}; dur: 1000; easing: easeInOutQuad);
        rock.setAttribute("animation__move", property: position; to: ${this.x} ${this.y + 1} ${this.z}; dur: 1000; easing: easeInOutQuad);
      } else {
        rock.setAttribute("animation__move", property: position; to: ${this.x} ${this.y} ${this.z}; dur: 1000; easing: easeInOutQuad);
      }
      this.isUp = !this.isUp;
    }
  }

  // Function to reset the game state
  function resetGame() {
    // Reset the game logic
    currentSafeRockIndex = 0;
    gameOver = false;
    clickedRocks.clear();  // Clear clicked rocks set
    // Reset camera and other states as needed (optional)
    let camera = document.querySelector("a-entity[camera]");
    camera.setAttribute("position", "0 1.6 0");
  }
});  
