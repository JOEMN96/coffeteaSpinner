const AlignText = Object.freeze({
  left: "left",
  right: "right",
  center: "center",
});

export const props = [
  {
    name: "Workout",
    radius: 0.84,
    itemLabelRadius: 0.93,
    itemLabelRadiusMax: 0.35,
    itemLabelRotation: 180,
    itemLabelAlign: AlignText.left,
    itemLabelColors: ["#000000"],
    itemLabelBaselineOffset: -0.07,
    itemLabelFont: "Poppins",
    itemLabelFontSizeMax: 55,
    itemBackgroundColors: ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"],
    rotationSpeedMax: 500,
    rotationResistance: -100,
    lineWidth: 1,
    lineColor: "#000",
    // image: "./img/our-image.svg",
    overlayImage: "./img/our-overlay.svg",
    items: [
      {
        // label: "English Breakfast ",
        image: "./spinnerImages/english-breakfast.svg",
        imageScale: 1,
        imageRotation: -90,
        // imageRadius: 0.6,
      },
      {
        image: "./spinnerImages/ChoiceofPasta.svg",
        imageScale: 1,
        imageRotation: -90,
      },
      {
        // label: "250gms Cookies",
        image: "./spinnerImages/cake.svg",
        imageScale: 1,
        imageRotation: -90,
      },

      {
        image: "./spinnerImages/ticket.svg",
        imageScale: 1,
        imageRotation: -90,
      },

      {
        // label: "Boat Airdopes",
        image: "./spinnerImages/boat.svg",
        imageScale: 1,
        imageRotation: -90,
      },
      {
        // label: "Rs 500 Voucher",
        image: "./spinnerImages/voucher.svg",
        imageScale: 1,
        imageRotation: -90,
      },
      {
        // label: "Creamy cappuccino ",
        image: "./spinnerImages/cappuccino.svg",
        imageScale: 1,
        imageRotation: -90,
      },
      {
        // label: "Better luck Next time",
        image: "./spinnerImages/bl.svg",
        imageRotation: -90,
      },
      {
        // label: "Creamy Cold Coffee",
        image: "./spinnerImages/cold-coffee.svg",
        imageRotation: -90,
      },
    ],
  },

  // {
  //   name: "Rock Paper Scissors",
  //   itemBackgroundColors: ["#ffc93c", "#66bfbf", "#a2d5f2", "#515070", "#43658b", "#ed6663", "#d54062"],
  //   lineColor: "hsl(350, 20%, 40%)",
  //   lineWidth: 2,
  //   borderColor: "hsl(350, 20%, 40%)",
  //   borderWidth: 4,
  //   itemLabelRadius: 0.93,
  //   itemLabelRadiusMax: 0.35,
  //   itemLabelRotation: 180,
  //   itemLabelAlign: AlignText.left,
  //   itemLabelColors: ["#fff"],
  //   itemLabelBaselineOffset: -0.07,
  //   itemLabelFont: "Amatic SC",
  //   itemLabelFontSizeMax: 40,
  //   items: [
  //     {
  //       image: "./spinnerImages/dinner.svg",
  //       imageRadius: 0.6,
  //       imageScale: 0.1,
  //       label: "English Breakfast",
  //     },
  //     {
  //       image: "./img/example-5-item-1.svg",
  //       imageRadius: 0.6,
  //       imageScale: 1.2,
  //     },
  //     {
  //       image: "./img/example-5-item-2.svg",
  //       imageRadius: 0.6,
  //       imageScale: 1.2,
  //     },
  //     {
  //       image: "./img/example-5-item-3.svg",
  //       imageRadius: 0.6,
  //       imageScale: 1.2,
  //     },
  //     {
  //       image: "./img/example-5-item-4.svg",
  //       imageRadius: 0.6,
  //       imageScale: 1.2,
  //     },
  //   ],
  // },

  // {
  //   name: "Basic",
  //   items: [
  //     {
  //       label: "one",
  //     },
  //     {
  //       label: "two",
  //     },
  //     {
  //       label: "three",
  //     },
  //   ],
  // },
];
