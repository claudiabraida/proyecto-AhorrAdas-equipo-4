function readLocalStorage (key) {
  const datos = JSON.parse(localStorage.getItem(key))
  return datos;
}

function saveLocalStorage (key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

export default {
  readLocalStorage,
  saveLocalStorage
}