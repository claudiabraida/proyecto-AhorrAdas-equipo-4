import features from "./features.js"

/* Functions: HTML element selectors */
const $ = element => document.querySelector(element);
const $$ = element => document.querySelectorAll(element)

/* ......ELEMENTS HTML FUNCIONALITY VIEW CATEGORIES ...... */
const $containerNameCategories = $("#container-name-categories")//ELEMENT HTML ON SCREEN 
const $inputnameCategories = $("#name-categories")
const $buttonAddCategories = $("#add-categories")
const $containerNewOperations = $("#container-new-operations")

/* ...... ELEMENTS HTML ON SCREEN ...... */
const $selectCategoriesNewOperation = $("#categories-new-operation");
const $selectEditCategoriesOperation = $("#edit-categories-operation")


/* ......ELEMENTS HTML EDIT ...... */
const $editOperation = $("#edit-operation")
const $formEditOperation = $("#form-edit-operation");

/* ..................... FILTERS ..................... */
const $filterCategories = $("#filter-categories")

/* ................ GENERAL FUNCTIONS: SHOW/HIDE ................ */
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

/* _________________ BUTTON FUNCIONALITY WITH VIEWS _________________ */

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
  hideElement([$("#view-categories"), $("#view-report"), $("#new-operation")])
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

/* ...... EVENT FUNCIONALITY RETURN NEW OPERATION ...... */
$("#button-new-operation").addEventListener("click", () => {
  showElement([$("#new-operation")])
  hideElement([$("#view-balance-home"), $("#view-report")])
})
/* ...... button functionality add new operation ...... */
$("#form-create-new-operation").addEventListener("submit", (e) => {
  e.preventDefault()
  hideElement([ $("#new-operation")])
  showElement([$("#operations-section"), $("#view-balance-home")])

})

/* ...... button functionality cancel new operation ...... */
$("#button-cancel-new-operation").addEventListener("click", (e) => {
  e.preventDefault();
  hideElement([ $("#new-operation")])
  showElement([$("#operations-section"), $("#view-balance-home")])
});

/* ......  BUTTON functionality CANCEL EDIT OPERATION ...... */
$("#edit-button-cancel-operation").addEventListener("click", (e) => {
  e.preventDefault()
  hideElement([$formEditOperation, $("#edit-operation")])
  showElement([$("#view-balance-home"), $("#operations-section") ])
  
})

/* 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥 VIEW BALANCE HOME 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥 */
/* ******************************** BALANCE ******************************* */
function calculateBalance() {//funtion for calculate de balance
  const operations = features.readLocalStorage("operations") || [];

  const { totalProfits, totalExpenses } = operations.reduce((acc, operation) => {
    if (operation.type === 'profits') {
      acc.totalProfits += operation.amount;
    } else if (operation.type === 'expenses' || operation.type === 'gasto') {
      acc.totalExpenses += operation.amount;
    }
    return acc;
  }, { totalProfits: 0, totalExpenses: 0 });
  
  const total = totalProfits - totalExpenses;
   $("#profits-amount").textContent = `+$${totalProfits}`;
   $("#expenses-amount").textContent = `-$${totalExpenses}`;
   $("#total-amount").textContent = `$${total}`;
  }
  addEventEditDelete()


/* 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥 VIEW CATEGORIES 💥💥💥💥💥💥💥💥💥💥💥💥💥💥💥 */
function clear (element) {
  element.value = ""
}

/* ******************************** ADD CATEGORY ******************************* */

function addCategory () {
  const newCategory = $inputnameCategories.value.trim().replace(/\s+/g, " ")
  const uniqueId = crypto.randomUUID(); // Generate a unique ID
  
  const categoryObject = {
    id: uniqueId,
    name: newCategory
  };
  
  $containerNameCategories.innerHTML += ` 
  <div class="flex justify-around p-2" id="${uniqueId}">
  <div class="min-w-12 ">
  <p class= "bg-yellow-100">${newCategory}</p>
  </div>
  <button class="text-blue-700">Editar</button>
  <button class="text-red-700">Eliminar</button>
  </div>`
  
  clear($inputnameCategories)
  
  features.arrayCategories(categoryObject)
  displayCategoriesFilters ()
  displayCategoriesNewOperation()
  displayOperations()
  // calculateBalance();
}

/* ______________ EVENT ADD CATEGORY ______________ */
$buttonAddCategories.addEventListener("click", addCategory)


/* ................ DISPLAY ON SCREEN ................ */
  
/* -------- display Categories -------- */
function displayCategories () {
  const category = features.readLocalStorage("categoria") 
  $containerNameCategories.innerHTML =""
  for (const flor of category) {
    $containerNameCategories.innerHTML += ` 
    <div class="flex justify-around p-2">
     <div class="min-w-12 ">
       <p class= "bg-yellow-100">${flor.name}</p>
     </div>
     <button class="text-blue-700">Editar</button>
     <button class="text-red-700">Eliminar</button>
    </div>`
  }
}

/* -------- display Categories Filters -------- */
function displayCategoriesFilters() {
  $filterCategories.innerHTML = ""
  const category = features.readLocalStorage("categoria") 
  for (const flor of category) {
    $filterCategories.innerHTML += `<option>${flor.name}</option>`
  }
}

/* -------- display Categories new operation -------- */
function displayCategoriesNewOperation() {
  $selectCategoriesNewOperation.innerHTML = ""
  const category = features.readLocalStorage("categoria"); 
  for (const flor of category) {
    $selectCategoriesNewOperation.innerHTML += `<option>${flor.name}</option>`;
  }
}

/* -------- display Categories edit operation -------- */
function displayCategoriesEditOperation() {
  $selectEditCategoriesOperation.innerHTML = ""
  const category = features.readLocalStorage("categoria"); 
  for (const flor of category) {
    $selectEditCategoriesOperation.innerHTML += `<option>${flor.name}</option>`;
  }
  
}


/* ******************************** OPERATIONS ******************************** */

/* ____________________________***** form create new operation *****____________________________  */

$("#form-create-new-operation").addEventListener("submit", (e) => { 

  e.preventDefault()
 
  const newOperationObject = {
    id : crypto.randomUUID(),
    description : e.target[0].value,
    amount :Number(e.target[1].value),
    type : e.target[2].value,
    categories : e.target[3].value,
    date : dayjs(e.target[4].value).format("DD/MM/YYYY"),
  }
  
  features.arrayDataOperations(newOperationObject);
  console.log("New operation added:", newOperationObject); // Debugging log

  displayOperations()
  calculateBalance();

  // Optionally, clear the form fields after submission
  e.target.reset();
});


/* show in operations section */
function displayOperations() {
  const operations = features.readLocalStorage("operations") || []; 
  // console.log("Current operations:", operations); // Debugging log
  $containerNewOperations.innerHTML = ""

  operations.forEach(operation => {
    $containerNewOperations.innerHTML += `
      <div class="rounded-lg bg-[#f6f7fa] shadow-[-3px_-3px_20px_3px_rgb(0,0,0,0.4)] p-9 m-4 operation">
        <p>Description: ${operation.description}</p>
        <p>Amount: ${operation.amount}</p>
        <p>Type: ${operation.type}</p>
        <p>Categories: ${operation.categories}</p>
        <p>Date: ${operation.date}</p>

        <div class = "flex gap-9">
         <button id ="${operation.id}"class=" button-edit text-blue-700 rounded-xl border border-blue-300 shadow-[0px_-1px_4px_3px_rgb(0,0,0,0.2)] bg-blue-100 mt-3 p-2">Editar</button>
         <button id ="${operation.id}"class=" button-delete text-red-700 rounded-xl border border-red-300 shadow-[0px_-1px_4px_3px_rgb(0,0,0,0.2)] bg-red-100 mt-3 p-2">Eliminar</button>
        </div>
      </div>
    `;
  });

  addEventEditDelete()
}

/* ......... edit - delete operations ......... */
function addEventEditDelete () {
  const $$arrayButonsEdit = $$(".button-edit")
  const $$arrayButonsDelete = $$(".button-delete")

  $$arrayButonsDelete.forEach(button => {
  
    button.addEventListener("click", (e) => {
      e.preventDefault()
     const arrayDeleteOperations = features.deleteOperation(e.target.id)
     displayOperations(arrayDeleteOperations)
     calculateBalance()
    })

  })

  $$arrayButonsEdit.forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      // console.log("wwwwww")
      showElement([$editOperation, $formEditOperation])
      hideElement([$("#operations-section"), $("#view-balance-home")])
      
      const data = features.readLocalStorage("operations")
      const sol = data.find(elemen => elemen.id === e.target.id)

      $("#edit-description-operation").value = sol.description;
      $("#edit-amount-operation").value = sol.amount;
      $("#edit-type-operation").value = sol.type;
      $selectEditCategoriesOperation.value = sol.categories;
      $("#edit-date-operation").value = sol.date;
    
      $formEditOperation.id = sol.id
    })
    
    calculateBalance()

  })

}

/* ..................... FORM EDIT OPERATION ..................... */

$formEditOperation.addEventListener("submit", (e) => { 
  e.preventDefault()
  hideElement([$formEditOperation, $("#edit-operation")])
  showElement([$("#view-balance-home"), $("#operations-section") ])
  const data = features.readLocalStorage("operations")

  const sol = data.find(elemen => elemen.id === e.target.id)

  const newData = {
    // id : sol.id,
    description : e.target[0].value,
    amount :Number(e.target[1].value),
    type : e.target[2].value,
    categories : e.target[3].value,
    // date : dayjs(e.target[4].value).format("MM/DD/YYYY"),
    date : dayjs(e.target[4].value).format("DD/MM/YYYY")
  }
  
  const modifiedData = features.editOperation(sol.id, newData)

   // Optionally, clear the form fields after submission
  displayOperations(modifiedData);
  // e.target.reset();

});


window.onload = () => {
  const category = features.readLocalStorage("categoria") 
  features.arrayNewCategories = category
  displayCategories ()
  displayCategoriesFilters()
  displayCategoriesEditOperation()
  displayCategoriesNewOperation()
  displayOperations()
  calculateBalance()
  addEventEditDelete()
};
