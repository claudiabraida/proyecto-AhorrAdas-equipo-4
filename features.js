const arrayNewCategories = []

function readLocalStorage (key) {
  const datos = JSON.parse(localStorage.getItem(key))
  return datos;
}

function saveLocalStorage (key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

function arrayCategories (array) {
  arrayNewCategories.push(array)
  saveLocalStorage("categoria", arrayNewCategories)
  readLocalStorage(arrayNewCategories)
}
// console.log(arrayNewCategories)


export default {
  readLocalStorage,
  saveLocalStorage,
  arrayCategories
  
}