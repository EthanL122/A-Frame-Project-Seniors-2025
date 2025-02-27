class Rock {
  constructor(x, y, z, isUp, color) {
    // Create the rock element
    let rock = document.createElement("a-entity");
    rock.setAttribute("geometry", "primitive: dodecahedron");
    rock.setAttribute("position", `${x} ${y} ${z}`);
    rock.setAttribute("material", `color: ${color}`);
    
    // Random rotation
    let a = Math.random() * 360;
    rock.setAttribute("rotation", `${a} ${a} ${a}`);
    
    // Track if the rock is flipped
    let isFlipped = isUp;
    
    // Event listener for flipping and moving the rock
    rock.addEventListener("click", function () {
      let currentRotation = rock.getAttribute("rotation");
      let currentPosition = rock.getAttribute("position");
      
      if (!isFlipped) {
        rock.setAttribute("animation__flip", `property: rotation; to: ${currentRotation.x + 60} ${currentRotation.y + 50} ${currentRotation.z + 60}; dur: 1000; easing: easeInOutQuad`);
        rock.setAttribute("animation__move", `property: position; to: ${x} ${y + 1} ${z}; dur: 1000; easing: easeInOutQuad`);
      } else {
        rock.setAttribute("animation__move", `property: position; to: ${x} ${y} ${z}; dur: 1000; easing: easeInOutQuad`);
      }
      isFlipped = !isFlipped;
    });

    return rock;
  }
}
