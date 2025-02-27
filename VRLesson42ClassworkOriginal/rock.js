class Rock {
  constructor(x, y, z, color) {
    let rock = document.createElement("a-entity");
    rock.setAttribute("geometry", "primitive: dodecahedron");
    rock.setAttribute("position", `${x} ${y} ${z}`);
    rock.setAttribute("material", `color: ${color}`);
    
    // Random rotation
    let a = Math.random() * 360;
    rock.setAttribute("rotation", `${a} ${a} ${a}`);
    
    // Track if the rock is flipped
    let isUp = false;
    
    // Event listener for flipping and moving the rock
    rock.addEventListener("click", function () {
      let currentRotation = rock.getAttribute("rotation");
      let currentPosition = rock.getAttribute("position");
      
      // Check if the rock's color is white and show the alert
      if (color === "white") {
        alert("Boom, you died!");
      }
      
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
