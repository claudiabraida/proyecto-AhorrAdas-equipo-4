const $ = element => document.querySelector(element);
/* Funciones generales */
// const showElement = (selectors) => {
//   for (const selector of selectors) {
//     selector.classList.toggle("hidden");
//   }
// };

// const hideElement = (selectors) => {
//   for (const selector of selectors) {
//     selector.classList.add("hidden");
//   }
// };


// $("#button-hamburger-menu").addEventListener("click", () => {
//   hideElement([$("#button-hamburger-menu")])
//   showElement([$("nav"), $("#button-close-menu")])
// })

// $("#button-close-menu").addEventListener("click", () => {
//   hideElement([$("#button-close-menu"),$("nav")])
//   showElement([$("#button-hamburger-menu")])
// })
 

const showOrHideElement = (selectors) => {
  for (const selector of selectors) {
    selector.classList.toggle("hidden");
  }
};


$("#button-hamburger-menu").addEventListener("click", () => {
  showOrHideElement([$("#button-hamburger-menu")])
  showOrHideElement([$("nav"), $("#button-close-menu")])
})


$("#button-close-menu").addEventListener("click", () => {
  showOrHideElement([$("#button-close-menu"), $("nav")])
  showOrHideElement([$("#button-hamburger-menu")])
})


