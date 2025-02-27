class Rock {
  constructor(x, y, z, label) {
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
    
    // Track if the rock is flipped
    let isUp = false;

    // Track if any "boom" rock has been clicked
    let clickedBoomRocks = [];

    // Event listener for clicking the rock
    rock.addEventListener("click", function () {
      let currentRotation = rock.getAttribute("rotation");
      let currentPosition = rock.getAttribute("position");

      let rockLabel = parseInt(label);

      // Logic for "Boom" rocks (1, 3, 5, 7)
      if (rockLabel === 1 || rockLabel === 3 || rockLabel === 5 || rockLabel === 7) {
        alert("Boom, you died!");

        // Reset the camera position to simulate death
        let camera = document.querySelector("#camera");
        camera.setAttribute("position", "0 1.6 0"); // Reset camera to start position
        
        // Add to the clicked boom rocks list
        clickedBoomRocks.push(rockLabel);
      } else if (rockLabel === 2 || rockLabel === 4 || rockLabel === 6) {
        alert("You didn't blow up yay!");

        // Check if all the boom rocks (1, 3, 5, 7) have been clicked
        if (clickedBoomRocks.length === 0) {
          alert("Congrats you beat the game!");
        }
      }
      
      // Flip the rock and move it
      if (!isUp) {
        rock.setAttribute("animation__flip", `property: rotation; to: ${currentRotation.x + 60} ${currentRotation.y + 50} ${currentRotation.z + 60}; dur: 1000; easing: easeInOutQuad`);
        rock.setAttribute("animation__move", `property: position; to: ${x} ${y + 1} ${z}; dur: 1000; easing: easeInOutQuad`);
      } else {
        rock.setAttribute("animation__move", `property: position; to: ${x} ${y} ${z}; dur: 1000; easing: easeInOutQuad`);
      }
      isUp = !isUp;
    });

    return rock;
  }
}
