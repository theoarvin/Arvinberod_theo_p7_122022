let filters = document.querySelectorAll(".filter");
const filter1 = document.querySelector(".filter1");
const filter2 = document.querySelector(".filter2");
const filter3 = document.querySelector(".filter3");

filters.forEach((filter) => {
  filter.childNodes[5].addEventListener("click", () => {
    const filterTitle = filter.childNodes[1];
    console.log(filter.childNodes[8]);
    filterTitle.style.display =
      filterTitle.style.display === "none" ? "block" : "none";
    const filterSearch = filter.childNodes[3];
    filterSearch.style.display =
      filterSearch.style.display === "block" ? "none" : "block";
    const blockList = filter.childNodes[8];
    blockList.style.display =
      blockList.style.display === "flex" ? "none" : "flex";
  });
});

// for the size of the opening tagbox
const btnFilters = document.querySelectorAll(".btn-filter");
btnFilters[0].addEventListener("click", function () {
  filters[0].classList.toggle("filter1-active");
});

btnFilters[1].addEventListener("click", function () {
  filters[1].classList.toggle("filter2-active");
});

btnFilters[2].addEventListener("click", function () {
  filters[2].classList.toggle("filter3-active");
});

function getIngredients(recipes, arrayTag, totalRecipes) {
  const array = [];
  recipes.forEach((recipe) => {
    for (let recip of recipe.ingredients) {
      if (array.includes(recip.ingredient.toLowerCase()) === false) {
        array.push(recip.ingredient.toLowerCase());
      }
    }
  });
  // création ingrédients list
  const blockList = document.querySelector(".block-list");
  blockList.innerHTML = ""
  array.forEach((ingredient) => {
    const list = document.createElement("li");
    list.classList.add("list-ingredients");
    list.textContent = ingredient;
    blockList.appendChild(list);
  });
  filters[0].appendChild(blockList);

  // filter by search input
  const inputClassName = ".input1";
  const classNameList = "list-ingredients";

  const inputvalue = document.querySelectorAll(inputClassName);

  inputvalue.forEach((value) => {
    value.addEventListener("input", (e) => {
      const searchedString = e.target.value.toLowerCase();
      const filteredArr = array.filter((el) =>
        el.toLowerCase().includes(searchedString)
      );
      blockList.innerHTML = "";

      filteredArr.forEach((ingredient) => {
        const list = document.createElement("li");
        list.classList.add(classNameList);
        list.textContent = ingredient;
        blockList.appendChild(list);
      });
      displayIngredientsTags(recipes, arrayTag, totalRecipes);
    });
  });
  displayIngredientsTags(recipes, arrayTag, totalRecipes);
}

function getAppareils(recipes, arrayTag, totalRecipes) {
  const array = [];
  for (let recip of recipes) {
    if (array.includes(recip.appliance) === false) {
      array.push(recip.appliance);
    }
  }
  // création Appareils list
  const blockList = document.querySelector(".block-list2");
  blockList.innerHTML = ""
  array.forEach((appareil) => {
    const list = document.createElement("li");
    list.classList.add("list-appareils");
    list.textContent = appareil;
    blockList.appendChild(list);
  });
  filters[1].appendChild(blockList);

  const inputClassName = ".input2";
  const classNameList = "list-appareils";

  const inputvalue = document.querySelectorAll(inputClassName);
  inputvalue.forEach((value) => {
    value.addEventListener("input", (e) => {
      const searchedString = e.target.value.toLowerCase();
      const filteredArr = array.filter((el) =>
        el.toLowerCase().includes(searchedString)
      );
      blockList.innerHTML = "";

      filteredArr.forEach((ingredient) => {
        const list = document.createElement("li");
        list.classList.add(classNameList);
        list.textContent = ingredient;
        blockList.appendChild(list);
      });
      displayAppareilsTags(recipes, arrayTag, totalRecipes);
    });
  });
  displayAppareilsTags(recipes, arrayTag, totalRecipes);
}

function getUstensiles(recipes, arrayTag, totalRecipes) {
  const array = [];
  recipes.forEach((recipe) => {
    for (let recip of recipe.ustensils) {
      if (array.includes(recip.toLowerCase()) === false) {
        array.push(recip.toLowerCase());
      }
    }
  });
  // création ustensiles list
  const blockList = document.querySelector(".block-list3");
  blockList.innerHTML = ""
  array.forEach((appareil) => {
    const list = document.createElement("li");
    list.classList.add("list-ustensiles");
    list.textContent = appareil;
    blockList.appendChild(list);
  });
  filters[2].appendChild(blockList);

  // filter by search input
  const inputClassName = ".input3";
  const classNameList = "list-ustensiles";

  const inputvalue = document.querySelectorAll(inputClassName);

  inputvalue.forEach((value) => {
    value.addEventListener("input", (e) => {
      console.log(array);
      const searchedString = e.target.value.toLowerCase();
      const filteredArr = array.filter((el) =>
        el.toLowerCase().includes(searchedString)
      );
      blockList.innerHTML = "";

      filteredArr.forEach((ingredient) => {
        const list = document.createElement("li");
        list.classList.add(classNameList);
        list.textContent = ingredient;
        blockList.appendChild(list);
      });
      displayUstensilesTags(recipes, arrayTag, totalRecipes);
    });
  });

  displayUstensilesTags(recipes, arrayTag, totalRecipes);
}

// function for display the ingredients tags
function displayIngredientsTags(recipes, arrayTag, totalRecipes) {
  const list = document.querySelectorAll(".list-ingredients")
  const arrayTagIngredients = arrayTag

  list.forEach((ingredient) => {
    ingredient.addEventListener("click", function () {
      // création tag
      const tagBlock = document.querySelector(".tags");
      const tag = document.createElement("span");
      // do not display the same tag
      for (let value of tagBlock.childNodes) {
        if (value.textContent === ingredient.textContent) {
          return null;
        }
      }
      // 3 tags max
      if (tagBlock.childNodes.length + 1 > 3) {
        return null;
      } else {
        // display tag
        tag.classList.add("ingredients-tag");
        tag.innerHTML =
          this.textContent + `<i class="fa-solid fa-xmark close-tag"></i>`;
        tagBlock.appendChild(tag);
        arrayTagIngredients.push(tag.textContent);
      }

      tagRecipe(recipes, arrayTagIngredients, totalRecipes);
      // delete tag with close btn
      tag.childNodes[1].addEventListener("click", function () {
        const blockRecipes = document.querySelector(".recipes-block");
        const index = arrayTag.indexOf(tag.textContent);
        arrayTagIngredients.splice(index, 1);
        tag.remove(this);
        blockRecipes.innerHTML = "";
        tagRecipe(recipes, arrayTagIngredients, totalRecipes);
      });
    });
  });
}

// function for display the appareils tags
function displayAppareilsTags(recipes, arrayTag, totalRecipes) {
  const list = document.querySelectorAll(".list-appareils");
  const arrayTagAppareils = arrayTag

  list.forEach((ingredient) => {
    ingredient.addEventListener("click", function () {
      // création tag
      const tagBlock = document.querySelector(".tags");
      const tag = document.createElement("span");

      for (let value of tagBlock.childNodes) {
        if (value.textContent === ingredient.textContent) {
          return null;
        }
      }
      if (tagBlock.childNodes.length + 1 > 3) {
        return null;
      } else {
        tag.classList.add("appareils-tag");
        tag.innerHTML =
          this.textContent + `<i class="fa-solid fa-xmark close-tag"></i>`;
        tagBlock.appendChild(tag);
        arrayTagAppareils.push(tag.textContent);
      }
    
      tagRecipe(recipes, arrayTagAppareils, totalRecipes);
      // delete tag with close btn
      tag.childNodes[1].addEventListener("click", function () {
        const blockRecipes = document.querySelector(".recipes-block");
        const index = arrayTag.indexOf(tag.textContent);
        arrayTagAppareils.splice(index, 1);
        tag.remove(this);
        blockRecipes.innerHTML = "";
        tagRecipe(recipes, arrayTagAppareils, totalRecipes);
      });
    });
  });
}

// function for display the ustensiles tags
function displayUstensilesTags(recipes, arrayTag, totalRecipes) {
  const list = document.querySelectorAll(".list-ustensiles");
  const arrayTagUstensiles = arrayTag

  list.forEach((ingredient) => {
    ingredient.addEventListener("click", function () {
      // création tag
      const tagBlock = document.querySelector(".tags");
      const tag = document.createElement("span");
      
      for (let value of tagBlock.childNodes) {
        if (value.textContent === ingredient.textContent) {
          return null;
        }
      }
      if (tagBlock.childNodes.length + 1 > 3) {
        return null;
      } else {
        tag.classList.add("ustensiles-tag");
        tag.innerHTML =
        this.textContent + `<i class="fa-solid fa-xmark close-tag"></i>`;
        tagBlock.appendChild(tag);
        arrayTagUstensiles.push(tag.textContent);
      }

      tagRecipe(recipes, arrayTagUstensiles, totalRecipes);
      // delete tag with close btn
      tag.childNodes[1].addEventListener("click", function () {
        const blockRecipes = document.querySelector(".recipes-block");
        const index = arrayTag.indexOf(tag.textContent);
        arrayTagUstensiles.splice(index, 1);
        tag.remove(this);
        blockRecipes.innerHTML = "";
        tagRecipe(recipes, arrayTagUstensiles, totalRecipes);
      });
    });
  });
}

// function to update recipes based on tags
function tagRecipe(recipes, arrayTag, totalRecipes) {
  console.log(totalRecipes);
  const blockRecipes = document.querySelector(".recipes-block");
    // if there are no tags
    if (arrayTag.length === 0) {
      //console.log(recipes);
      return searchRecipes(totalRecipes, arrayTag, totalRecipes);
    }
    const recipFilter = totalRecipes.filter((recipe) => {
      
      const arrayIngredients = [];
      for (ingredient of recipe.ingredients) {
        arrayIngredients.push(ingredient.ingredient.toLowerCase())
      }
      // if there are 1 tags
      if (arrayTag.length === 1) { 
        if (
          recipe.ustensils.includes(arrayTag[0]) ||
          recipe.appliance.includes(arrayTag[0]) ||
          arrayIngredients.includes(arrayTag[0].toLowerCase())
        ) {
          return true;
        }
      }
      // if there are 2 tags
      if (arrayTag.length === 2) {
          if (
            recipe.ustensils.includes(arrayTag[0]) ||
            recipe.appliance.includes(arrayTag[0]) ||
            arrayIngredients.includes(arrayTag[0].toLowerCase())
          ) {
            if (
              recipe.ustensils.includes(arrayTag[1]) ||
              recipe.appliance.includes(arrayTag[1]) ||
              arrayIngredients.includes(arrayTag[1].toLowerCase())
            ) {
              return true;
            }
          }
      }
      // if there are 3 tags
      if (arrayTag.length === 3) {
        if (
          recipe.ustensils.includes(arrayTag[0]) ||
          recipe.appliance.includes(arrayTag[0]) ||
          arrayIngredients.includes(arrayTag[0].toLowerCase())
        ) {
          if (
            recipe.ustensils.includes(arrayTag[1]) ||
            recipe.appliance.includes(arrayTag[1]) ||
            arrayIngredients.includes(arrayTag[1].toLowerCase())
          ) {
            if (
              recipe.ustensils.includes(arrayTag[2]) ||
              recipe.appliance.includes(arrayTag[2]) ||
              arrayIngredients.includes(arrayTag[2].toLowerCase())
            ) {
              return true;
            }
          }
        }
      }
    });
    console.log(recipFilter);
    blockRecipes.innerHTML = "";
    searchRecipes(recipFilter, arrayTag, totalRecipes);
  }

