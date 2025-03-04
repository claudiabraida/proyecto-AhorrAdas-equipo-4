import features from "./features.js"

/* Functions: HTML element selectors */
const $ = element => document.querySelector(element);
const $$ = element => document.querySelectorAll(element)

const showOrHideElement = (selectors) => {
  for (const selector of selectors) {
    selector.classList.toggle("hidden");
  }
};

const hideElement = (selectors) => {
  for (const selector of selectors) {
    selector.classList.add("hidden");
  }
};

const showElement = (selectors) => {
  for (const selector of selectors) {
    selector.classList.remove("hidden");
  }
};

/* _________________ FUNCTIONALITIES OF BUTTONS WITH VIEWS _________________ */

/* ........... buttons header menu ........... */
$("#button-hamburger-menu").addEventListener("click", () => {
  showOrHideElement([$("#button-hamburger-menu")])
  showOrHideElement([$("nav"), $("#button-close-menu")])
})


$("#button-close-menu").addEventListener("click", () => {
  showOrHideElement([$("#button-close-menu"), $("nav")])
  showOrHideElement([$("#button-hamburger-menu")])
})

/* ........... buttons header nav ........... */
$("#button-view-balance").addEventListener("click", () => {
  showElement([$("#view-balance-home")])
  hideElement([$("#view-categories"), $("#view-report"),$("#new-operation") ])
})

$("#button-view-categories").addEventListener("click", () => {
  showElement([$("#view-categories")])
  hideElement([$("#view-balance-home"), $("#view-report"), $("#new-operation")])
})

$("#button-view-report").addEventListener("click", () => {
  showElement([$("#view-report")])
  hideElement([$("#view-balance-home"), $("#view-categories"), $("#new-operation")])
})

/* ...... button functionality panel-filters ...... */
$("#button-hide-panel-filters").addEventListener("click", () => {
  hideElement([$("#wrapper-panel-filters") ,$("#button-hide-panel-filters")])
  showElement([$("#button-show-panel-filters")])
})

$("#button-show-panel-filters").addEventListener("click", () => {
  showElement([$("#wrapper-panel-filters") ,$("#button-hide-panel-filters")])
  hideElement([$("#button-show-panel-filters")])
})

/* ...... button functionality new operation ...... */
$("#button-new-operation").addEventListener("click", () => {
  showElement([$("#new-operation")])
  hideElement([$("#view-balance-home"), $("#view-report")])
})

$("#form-create-new-operation").addEventListener("submit", (e) => {
  e.preventDefault();})              //probaaaaaaaaar 

/* ...... button functionality view categories ...... */
const $inputnameCategories = $("#name-categories")
const $buttonAddCategories = $("#add-categories")
const $filterCategories = $("#filter-categories")

const $containerNameCategories = $("#container-name-categories")


function clear (element) {
  element.value = ""
}
// function cat () {}
  
  // const objetoArray = {
  
  //   id: crypto.randomUUID(),
  
  // }

function mostrarCategorias () {
  const category = features.readLocalStorage("categoria") 
  for (const flor of category) {
  
    $containerNameCategories.innerHTML += ` 
    <div class="flex justify-around p-2">
    <div class="min-w-12 ">
    <p class= "bg-yellow-100">${flor}</p>
    </div>
    <button class="text-blue-700">Editar</button>
    <button class="text-red-700">Eliminar</button>
    </div>`
  }

}


function addCategory () {
  const newCategory = $inputnameCategories.value.trim().replace(/\s+/g, " ")
  $containerNameCategories.innerHTML += ` 
  <div class="flex justify-around p-2">
   <div class="min-w-12 ">
      <p class= "bg-yellow-100">${newCategory}</p>
   </div>
    <button class="text-blue-700">Editar</button>
    <button class="text-red-700">Eliminar</button>
  </div>`
  clear($inputnameCategories)
  
  features.arrayCategories(newCategory)
   mostrarCategoriasDos ()
   mostrarCategoriasNewOperation()

}
  
// 💛💛💛💛💛💛💛💛
function mostrarCategoriasDos () {
  const category = features.readLocalStorage("categoria") 
  for (const flor of category) {
    $filterCategories.innerHTML += `<option>${flor}</option>`

  }
}

function mostrarCategoriasNewOperation() {
  const category = features.readLocalStorage("categoria"); 
  const $selectCategoriesNewOperation = $("#categories-new-operation");
  for (const flor of category) {
    $selectCategoriesNewOperation.innerHTML += `<option>${flor}</option>`;
  }
}

// esto aca funciona pero me deja de andar el bton 
// function displayOperations() {
//   const operations = features.readLocalStorage("operations") || [];
//   const $operationsSection = $("#operations-section");
//   operations.forEach(operation => {
//     $operationsSection.innerHTML += `
//       <div class="operation">
//         <p>Description: ${operation.description}</p>
//         <p>Amount: ${operation.amount}</p>
//         <p>Type: ${operation.type}</p>
//         <p>Categories: ${operation.categories}</p>
//         <p>Date: ${operation.date}</p>
//       </div>
//     `;
//   });
// }


/* ______________ EVENT ADD CATEGORY ______________ */
$buttonAddCategories.addEventListener("click", addCategory)

window.onload = () => {
  const category = features.readLocalStorage("categoria") 
  features.arrayNewCategories = category
   mostrarCategorias ()
   mostrarCategoriasDos()
   mostrarCategoriasNewOperation();// Call to populate new operation categories
  //  displayOperations(); // Call to display existing operations 
 };

/* ____________________________***** form create new operation *****____________________________  */

$("#form-create-new-operation").addEventListener("submit", (e) => {
  e.preventDefault()
  // const $operationsSection = $("#operations-section")
 
  const newOperationObject = {
    id : crypto.randomUUID(),
    description : e.target[0].value,
    amount :Number(e.target[1].value),
    type : e.target[2].value,
    categories : e.target[3].value,
    date : dayjs(e.target[4].value).format("DD-MM-YYYY"),
  }
  
  // dataOperations.push(newOperationObject)
  // features.saveLocalStorage("operations", dataOperations)
  // features.saveLocalStorage("operations", dataOperations)
 features.arrayDataOperations(newOperationObject)
 displayOperations()

  // Optionally, clear the form fields after submission
  e.target.reset();
});


// esto aca funciona pero me deja de andar el bton
// Mila 
function displayOperations() {
  const operations = features.readLocalStorage("operations") || [];
  const $containerNewOperations = $("#container-new-operations")
  // const $operationsSection = $("#operations-section");
  operations.forEach(operation => {
    $containerNewOperations.innerHTML += `
      <div class="operation">
        <p>Description: ${operation.description}</p>
        <p>Amount: ${operation.amount}</p>
        <p>Type: ${operation.type}</p>
        <p>Categories: ${operation.categories}</p>
        <p>Date: ${operation.date}</p>
      </div>
    `;
  });
}


window.onload = () => {
  const category = features.readLocalStorage("categoria") 
  features.arrayNewCategories = category
  mostrarCategorias ()
  mostrarCategoriasDos()
  mostrarCategoriasNewOperation();// Call to populate new operation categories
  displayOperations();
  //  // Call to display existing operations 
};



/* ____________________________***** new operation *****____________________________  */
// const $inputDescriptionNewOperation = $("#description-new-operation")
// const $inputAmountNewOperation = $("#amount-new-operation")
// const $selectTypeNewOperation = $("#type-new-operation")
// const $selectCategoriesNewOperation = $("#categories-new-operation")
// const $inputDateNewOperation = $("#date-new-operation")

// const $buttonAddNewOperation = $("#button-add-new-operation")





   