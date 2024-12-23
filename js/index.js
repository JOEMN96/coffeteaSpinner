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

  let spinBtn = document.querySelector(".spin");

  spinBtn.addEventListener("click", async (e) => {
    createUserDetailsModal();
  });

  function createUserDetailsModal() {
    userDetailmodal.open();

    let form = document.querySelector(".userForm");

    let spinner = document.querySelector(".spinner");

    form.addEventListener(
      "submit",
      async (e) => {
        e.preventDefault();
        var formData = new FormData(form);

        let data = {
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
        };
        const { duration, winningItemRotaion } = calcSpinToValues();

        try {
          spinner.style.display = "inline-block";
          let res = await getSelection(data.name, data.email, data.phone);

          let index = res.prize.index;
          let duplicate = res.duplicate;

          spinner.style.display = "none";
          userDetailmodal.close();
          if (duplicate) {
            showPopup(null, duplicate);
            return;
          } else {
            wheel.spinToItem(index, duration, true, 2, 1);
          }
        } catch (error) {
          userDetailmodal.close();
          wheel.spinToItem(8, duration, true, 2, 1);
        }
      },
      { once: true }
    );
  }

  const userDetailmodal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ["overlay", "button", "escape"],
    closeLabel: "Close",
    cssClass: ["userDetailmodal"],
    onOpen: function () {},
    onClose: function () {},
    beforeClose: function () {
      return true;
    },
  });

  userDetailmodal.setContent(`<div class="box">
    <form class="userForm">
      <span class="text-center">Contact Details</span>
    <div class="input-container">
      <input type="text" id="name" name="name" required=''/>
      <label>Name</label>		
    </div>
    <div class="input-container">		
      <input type="mail" id="email" name="email" required=""/>
      <label>Email</label>
    </div>
    <div class="input-container">		
      <input type="number" id="phone" name="phone" required=""/>
      <label>Phone Number</label>
    </div>
      <button type="submit" class="btn">Submit & Spin <svg width="20" class="spinner" style="display:none;vertical-align: bottom;margin-left: 10px;" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_P7sC{transform-origin:center;animation:spinner_svv2 .75s infinite linear}@keyframes spinner_svv2{100%{transform:rotate(360deg)}}</style><path d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z" class="spinner_P7sC"/></svg></button>
  </form>	
  </div>`);

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

  async function getSelection(name, email, phone) {
    const userData = JSON.stringify({
      name,
      email,
      phone,
    });
    try {
      let res = await fetch("/.netlify/functions/api", {
        method: "POST",
        body: userData,
      });
      let data = await res.json();

      if (res.status === 400) {
        return {
          ...data,
          duplicate: true,
        };
      } else if (res.status === 500) {
        return {
          prize: { index: 8 },
          duplicate: false,
        };
      } else {
        return {
          ...data,
          duplicate: false,
        };
      }
    } catch (error) {
      return 8;
    }
  }
};

const modal = new tingle.modal({
  footer: true,
  stickyFooter: false,
  closeMethods: ["overlay", "button", "escape"],
  closeLabel: "Close",
  cssClass: ["resultsModal"],
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

function showPopup(event, duplicate = false) {
  if (duplicate) {
    modal.setContent(
      `<h1 class="winnerHeading">
        Email or Phone no already exits ! Please use different contact details to spin again !
      </h1>`
    );
  } else {
    modal.setContent(
      `<h1 class="winnerHeading ${event.currentIndex === 8 ? "red" : "green"}">
        ${event.currentIndex === 8 ? "" : "You Won -"} ${props[0].items[event.currentIndex].labelText}
      </h1>`
    );
  }

  modal.open();
}
