import { Wheel } from "./wheel.js";
import { loadFonts, loadImages } from "./util.js";
import { props } from "./props.js";

window.onload = async () => {
  await loadFonts(props.map((i) => i.itemLabelFont));

  const wheel = new Wheel(document.querySelector(".wheel-wrapper"));

  const images = [];

  for (const p of props) {
    // Convert image urls into actual images:
    images.push(initImage(p, "image"));
    images.push(initImage(p, "overlayImage"));
    for (const item of p.items) {
      images.push(initImage(item, "image"));
    }
  }

  await loadImages(images);

  // Show the wheel once everything has loaded
  document.querySelector(".wheel-wrapper").style.visibility = "visible";

  wheel.init({
    ...props[0],
    rotation: wheel.rotation, // Preserve value.
  });

  wheel.isInteractive = false;

  // Save object globally for easy debugging.
  window.wheel = wheel;

  const btnSpin = document.querySelector("button");
  let modifier = 0;

  window.addEventListener("click", async (e) => {
    // Listen for click event on spin button:
    try {
      let res = await getSelecton();
      let json = res.json();
      console.log(json);
    } catch (error) {}
    if (e.target === btnSpin) {
      const { duration, winningItemRotaion } = calcSpinToValues();
      wheel.spinToItem(8, duration, true, 2, 1);
    }
  });

  wheel.onRest = function (event) {
    showPopup(event);
  };

  function calcSpinToValues() {
    const duration = 5000;
    const winningItemRotaion = getRandomInt(360, 360 * 1.75) + modifier;
    modifier += 360 * 1.75;
    return { duration, winningItemRotaion };
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function initImage(obj, pName) {
    if (!obj[pName]) return null;
    const i = new Image();
    i.src = obj[pName];
    obj[pName] = i;
    return i;
  }

  async function getSelecton() {
    const response = await fetch("/.netlify/functions/hello");
    const data = await response.json();
    console.log(data);
    return data;
  }
};

const modal = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: ["overlay", "button", "escape"],
  closeLabel: "Close",
  cssClass: ["custom-class-1", "custom-class-2"],
  onOpen: function () {},
  onClose: function () {},
  beforeClose: function () {
    return true;
  },
});

// set content

function openModal() {
  modal.open();
}

function closeModal() {
  modal.close();
}

function showPopup(event) {
  modal.setContent(props[0].items[event.currentIndex].labelText);
  modal.open();
}

async function getSelecton() {
  const response = await fetch("/hello");
  const data = await response.json();
  console.log(data);
  return data;
}
