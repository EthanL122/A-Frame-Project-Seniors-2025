// Define the Rock class
class Rock {
  constructor(x, y, z, label) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.label = label;
    this.isUp = false;

    let rock = document.createElement("a-entity");
    rock.setAttribute("geometry", "primitive: dodecahedron");
    rock.setAttribute("position", `${x} ${y} ${z}`);
    
    // Create a text element for the label
    let text = document.createElement("a-text");
    text.setAttribute("value", label);  // Set the label to the rock's number (1-7)
    text.setAttribute("align", "center");
    text.setAttribute("color", "#FFFFFF");
    text.setAttribute("position", "0 0.5 0"); // Position the label slightly above the rock
    rock.appendChild(text);  // Attach the text label to the rock entity
    
    // Random rotation
    let a = Math.random() * 360;
    rock.setAttribute("rotation", `${a} ${a} ${a}`);

    // Event listener for clicking the rock
    rock.addEventListener("click", () => this.handleClick(rock));

    return rock;
  }

  handleClick(rock) {
    // Prevent further action if the game is over
    if (gameOver) return;

    const rockLabel = this.label;

    // Check if it's a "Boom" rock (1, 3, 5, 7) and end the game if clicked
    if (['1', '3', '5', '7'].includes(rockLabel)) {
      alert("Boom, you died!"); // This alert should now be triggered when clicking these rocks
      gameOver = true;  // End the game
      resetGame();  // Reset the game state
      return;  // Exit early to prevent further actions
    }

    // If it's the correct next safe rock in the sequence (2 -> 4 -> 6)
    if (safeRocksSequence.includes(rockLabel) && !clickedRocks.has(rockLabel)) {
      alert(`You safely clicked rock ${rockLabel}!`);

      // Add the clicked rock to the set
      clickedRocks.add(rockLabel);

      // If all required safe rocks have been clicked
      if (clickedRocks.size === safeRocksSequence.length) {
        alert("Congrats you beat the game!");  // Victory message
        gameOver = true;  // End the game
      }
    } else {
      // If it's not the correct safe rock in sequence or already clicked
      alert("Incorrect rock clicked, try again!");
    }

    // Flip the rock and move it
    let currentRotation = rock.getAttribute("rotation");
    let currentPosition = rock.getAttribute("position");

    if (!this.isUp) {
      rock.setAttribute("animation__flip", `property: rotation; to: ${currentRotation.x + 60} ${currentRotation.y + 50} ${currentRotation.z + 60}; dur: 1000; easing: easeInOutQuad`);
      rock.setAttribute("animation__move", `property: position; to: ${this.x} ${this.y + 1} ${this.z}; dur: 1000; easing: easeInOutQuad`);
    } else {
      rock.setAttribute("animation__move", `property: position; to: ${this.x} ${this.y} ${this.z}; dur: 1000; easing: easeInOutQuad`);
    }
    this.isUp = !this.isUp;
  }
}
