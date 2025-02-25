export const loadCategories = () => {
  const categories = JSON.parse(localStorage.getItem('categories')) || [];
  return categories;
};

export const saveCategoryToStorage = (categoryName) => {
  const categories = loadCategories();
  categories.push(categoryName);
  localStorage.setItem('categories', JSON.stringify(categories));
};

export const removeCategoryFromStorage = (categoryName) => {
  const categories = loadCategories();
  const updatedCategories = categories.filter(name => name !== categoryName);
  localStorage.setItem('categories', JSON.stringify(updatedCategories));
};

export const updateCategoryInStorage = (oldName, newName) => {
  const categories = loadCategories();
  const updatedCategories = categories.map(name => name === oldName ? newName : name);
  localStorage.setItem('categories', JSON.stringify(updatedCategories));

};
