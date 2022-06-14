const tlLeave = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});
const tlEnter = gsap.timeline({
  defaults: { duration: 0.75, ease: "Power2.easeOut" },
});

//function for leave and enter
const leaveAnimation = (current, done) => {
  const product = current.querySelector(".img-container");
  const text = current.querySelector(".showcase-text");
  const circle = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow ");
  return (
    tlLeave.fromTo(
      arrow,
      { opacity: 1, y: 0 },
      { opacity: 0, y: 50, duration: 1 }
    ),
    tlLeave.fromTo(product, { y: 0, opacity: 1 }, { y: -100, opacity: 0 }, "<"),
    tlLeave.fromTo(
      text,
      { x: 0, opacity: 1 },
      { x: 100, opacity: 0, onComplete: done },
      "<"
    ),
    tlLeave.fromTo(
      circle,
      { y: 0, opacity: 1 },
      {
        y: -200,
        opacity: 0,
        stagger: 0.15,
        ease: "back.out(1.7,)",
        duration: 1,
      },
      "<"
    )
  );
};

const enterAnimation = (current, done, gradient) => {
  const product = current.querySelector(".img-container");
  const text = current.querySelector(".showcase-text");
  const circle = current.querySelectorAll(".circle");
  const arrow = current.querySelector(".showcase-arrow ");
  return (
    tlEnter.to("body", { background: gradient }, "<"),
    tlEnter.fromTo(
      arrow,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    ),
    tlEnter.fromTo(product, { y: -100, opacity: 0 }, { y: 0, opacity: 1 }, "<"),
    tlEnter.fromTo(
      text,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, onComplete: done },
      "<"
    ),
    tlEnter.fromTo(
      circle,
      { y: -200, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "back.out(1.7)",
        duration: 1,
      },
      "<"
    )
  );
};

//Running Animation;
barba.init({
  preventRunning: true,
  transitions: [
    //showcase transition
    {
      name: "default",
      once(data) {
        let done = this.async();
        let next = data.next.container;
        let gradient = getGradient(data.next.namespace);
        gsap.set("body", { background: gradient });
        enterAnimation(next, done, gradient);
      },
      leave(data) {
        console.log(data);
        const done = this.async();
        let current = data.current.container;
        leaveAnimation(current, done);
      },
      enter(data) {
        const done = this.async();
        let next = data.next.container;
        const gradient = getGradient(data.next.namespace);
        enterAnimation(next, done, gradient);
      },
    },
    //product page
    {
      name: "product",
      sync: true,
      from: { namespace: ["handbag", "product"] },
      to: { namespace: ["product", "handbag"] },
      enter(data) {
        const done = this.async();
        const next = data.next.container;
        productEnterAnimation(next, done);
      },
      leave(data) {
        const done = this.async();
        const current = data.current.container;
        productLeaveAnimation(current, done);
      },
    },
  ],
});
const productEnterAnimation = (next, done) => {
  tlEnter.fromTo(next, { y: "100%" }, { y: "0%" }),
    tlEnter.fromTo(
      ".card",
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, stagger: "0.5", onComplete: done },
      "<"
    );
};
const productLeaveAnimation = (current, done) => {
  tlLeave.fromTo(
    current,
    { x: "0%", opacity: 1 },
    { x: "100%", opacity: 0, duration: 1, onComplete: done }
  );
};

//Changing gradient background

function getGradient(name) {
  switch (name) {
    case "handbag":
      return "linear-gradient(260deg, #b75d62, #754d4f)";
    case "boot":
      return "linear-gradient(260deg, #5d8cb7, #4c4f70)";
    case "hat":
      return "linear-gradient(260deg, #b27a5c, #7f5459)";
  }
}

//Logo title animation
const nav = document.querySelector("nav");
const logo = nav.querySelector(".logo");
const text = logo.textContent.split("");

logo.textContent = "";
text.forEach((el) => {
  logo.innerHTML += `<span class="letter">${el}</span>`;
});
gsap.set(".letter", { display: "inline-block" });
gsap.fromTo(
  ".letter",
  { y: 55 },
  { y: 0, delay: 2 , stagger: 0.05, ease: "block.out(3)" },"<"
);
