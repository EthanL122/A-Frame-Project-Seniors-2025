class Rock {
  constructor(x, y, z, flippable = false) {
    let rock = document.createElement("a-dodecahedron");
    rock.setAttribute("position", `${x} ${y} ${z}`);
    let a = Math.random() * 360;
    rock.setAttribute("rotation", `${a} ${a} ${a}`);

    if (flippable) {
      // Red rock with flipping and upward movement animation
      rock.setAttribute("material", "color: #FF0000");
      
      let isUp = false;
      rock.addEventListener("click", function () {
        if (!isUp) {
          rock.setAttribute("animation__flip", {
            property: "rotation",
            to: `${rock.getAttribute("rotation").x + 60} ${rock.getAttribute("rotation").y + 50} ${rock.getAttribute("rotation").z + 60}`,
            dur: 1000,
            easing: "easeInOutQuad"
          });
          rock.setAttribute("animation__move", {
            property: "position",
            to: `${x} ${y + 1} ${z}`,
            dur: 1000,
            easing: "easeInOutQuad"
          });
        } else {
          rock.setAttribute("animation__move", {
            property: "position",
            to: `${x} ${y} ${z}`,
            dur: 1000,
            easing: "easeInOutQuad"
          });
        }
        isUp = !isUp;
      });
    } else {
      // Small grey rock
      rock.setAttribute("material", "color: #808080");
      rock.setAttribute("scale", "0.5 0.5 0.5");
    }

    document.querySelector('a-scene').appendChild(rock);
  }
}
