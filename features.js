const arrayNewCategories = []
const dataOperations = []

function readLocalStorage (key) {
  const datos = JSON.parse(localStorage.getItem(key))
  return datos ? datos : [];
}

function saveLocalStorage (key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function arrayCategories (array) {
 const cosa = readLocalStorage("categoria")
  cosa.push(array)
  saveLocalStorage("categoria", cosa)
}

function arrayDataOperations (array) {
  const cosa = readLocalStorage("operations")
   cosa.push(array)
   saveLocalStorage("operations", cosa)
}


function deleteOperation (idOperation) {
  const data = readLocalStorage("operations")
  const filterDeleteOperation = data.filter(operation => operation.id !== idOperation)
  saveLocalStorage("operations", filterDeleteOperation)

  return filterDeleteOperation
}

// New function to delete a category
function deleteCategory(categoryId) {
  const categories = readLocalStorage("categoria");
  const updatedCategories = categories.filter(category => category.id !== categoryId);
  saveLocalStorage("categoria", updatedCategories);
}

export default {
  readLocalStorage,
  saveLocalStorage,
  arrayCategories,
  arrayNewCategories,
  arrayDataOperations,
  dataOperations,
  deleteOperation,
  deleteCategory
}