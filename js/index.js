async function getData() {
  let jsonFile = "./recipes.json";
  let response = await fetch(jsonFile);
  let data = await response.json();
  let { recipes } = await data;
  return recipes;
}

async function init() {
  const recipes = await getData();
  const arrayTag = [];
  const totalRecipes = recipes;
  searchRecipes(recipes, arrayTag, totalRecipes);
}
init();

function searchRecipes(recipes, arrayTag, totalRecipes) {
  // get the search input
  const search = document.querySelector(".search-input");

  const arrayRecipesName = [];
  recipes.forEach((recipe) => {
    if (arrayRecipesName.includes(recipe.name.toLowerCase()) === false) {
      arrayRecipesName.push(recipe.name.toLowerCase());
    }
  });

  if (search.value.length > 0) {
    const blockRecipes = document.querySelector(".recipes-block");
    blockRecipes.innerHTML = "";
    const searchedString = search.value.toLowerCase();
    const filteredArr = recipes.filter((recipe) => {
     
      const ingredientArr = [];
      // search by ingredient
      recipe.ingredients.forEach((ingredients) => {
        ingredientArr.push(ingredients.ingredient.toLowerCase());
      });
      if (ingredientArr.includes(searchedString.toLowerCase())) {
        return true;
      }

      if (recipe.name.toLowerCase().includes(searchedString.toLowerCase())) {
        return true;
      }

      if (
        recipe.description.toLowerCase().includes(searchedString.toLowerCase())
      ) {
        return true;
      }
    });
    displayRecipes(filteredArr, arrayTag, totalRecipes);
  } else {
    displayRecipes(recipes, arrayTag, totalRecipes);
  }

  //listen to main search
  search.addEventListener("input", (e) => {
    const blockRecipes = document.querySelector(".recipes-block");
    blockRecipes.innerHTML = "";
    const searchedString = e.target.value.toLowerCase();

    const filteredArr = recipes.filter((recipe) => {
      const ingredientArr = [];
      // search by ingredient
      recipe.ingredients.forEach((ingredients) => {
        ingredientArr.push(ingredients.ingredient.toLowerCase());
      });
      if (ingredientArr.includes(searchedString.toLowerCase())) {
        return true;
      }
      if (recipe.name.toLowerCase().includes(searchedString.toLowerCase())) {
        return true;
      }
      if (
        recipe.description.toLowerCase().includes(searchedString.toLowerCase())
      ) {
        return true;
      }
    });
    displayRecipes(filteredArr, arrayTag, totalRecipes);
  });
}

function displayRecipes(recipes, arrayTag, totalRecipes) {
  const blockRecipes = document.querySelector(".recipes-block");
  if (recipes.length === 0) {
    const infoText = document.createElement("p");
    infoText.textContent = `Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.`;
    blockRecipes.appendChild(infoText);
  }

  recipes.forEach((recipe) => {
    const card = document.createElement("div");
    const cardImg = document.createElement("div");
    const cardDesc = document.createElement("div");
    const h2 = document.createElement("h2");
    const span = document.createElement("span");
    const recipeBlock = document.createElement("div");
    const recipeIngredients = document.createElement("ul");
    const recipeDesc = document.createElement("p");

    card.classList.add("card");
    cardImg.classList.add("card-img");
    cardDesc.classList.add("card-desc");
    recipeBlock.classList.add("recipe");
    recipeIngredients.classList.add("recipe-ingredients");
    recipeDesc.classList.add("recipe-desc");

    h2.textContent = recipe.name;
    span.innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z" fill="black"/>
    </svg>
     ${recipe.time} min`;
    recipeDesc.textContent = recipe.description;
    for (let value of recipe.ingredients) {
      const ingredient = document.createElement("li");
      if (value.unit) {
        ingredient.innerHTML = `<span>${value.ingredient} :</span> ${value.quantity}  ${value.unit}`;
      } else {
        ingredient.innerHTML = value.quantity
          ? `<span>${value.ingredient} :</span> ${value.quantity}`
          : value.ingredient;
      }
      recipeIngredients.appendChild(ingredient);
    }
    card.appendChild(cardImg);
    card.appendChild(cardDesc);
    cardDesc.appendChild(h2);
    cardDesc.appendChild(span);
    card.appendChild(recipeBlock);
    recipeBlock.appendChild(recipeIngredients);
    recipeBlock.appendChild(recipeDesc);
    blockRecipes.appendChild(card);
  });

  getIngredients(recipes, arrayTag, totalRecipes);
  getAppareils(recipes, arrayTag, totalRecipes);
  getUstensiles(recipes, arrayTag, totalRecipes);
}
