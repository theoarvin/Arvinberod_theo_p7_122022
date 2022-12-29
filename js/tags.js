let filters = document.querySelectorAll('.filter');

filters.forEach((filter) => {
    filter.childNodes[5].addEventListener('click',() => {
        const filterTitle = filter.childNodes[1];
        filterTitle.style.display = filterTitle.style.display === 'none' ? 'block' : 'none' ;
        const filterSearch = filter.childNodes[3];
        filterSearch.style.display = filterSearch.style.display === 'block' ? 'none' : 'block' ;
        const blockList = filter.childNodes[7];
        blockList.style.display = blockList.style.display === 'flex' ? 'none' : 'flex'; 
    })
})

const btnFilters = document.querySelectorAll('.btn-filter')
btnFilters[0].addEventListener('click', function() {
filters[0].classList.toggle('filter1-active')
})

btnFilters[1].addEventListener('click', function() {
filters[1].classList.toggle('filter2-active')
})

btnFilters[2].addEventListener('click', function() {
filters[2].classList.toggle('filter3-active')
})


async function getIngredients(recipes){
    const array = []
    recipes.forEach((recipe) => {
     
      for( let recip of recipe.ingredients ){
         if(array.includes(recip.ingredient.toLowerCase()) === false){
             array.push(recip.ingredient.toLowerCase())
         }
        }
    })
    // création ingrédients list
    const blockList = document.createElement('ul');
    blockList.classList.add('block-list')
    array.forEach((ingredient) => {
       const list = document.createElement('li')
       list.classList.add('list-ingredients')
       list.textContent = ingredient
       blockList.appendChild(list)
    })
    filters[0].appendChild(blockList)
    
    const className = '.block-list'
    const inputClassName = '.input1'
    const classNameList = 'list-ingredients'
    searchTag(array, className, inputClassName, classNameList, recipes)
    displayIngredientsTags()
 }
 
 
 async function getAppareils(recipes){
     const array = []
       for( let recip of recipes ){
         if(array.includes(recip.appliance) === false){
             array.push(recip.appliance)
         }
       }
        // création Appareils list
       const blockList = document.createElement('ul');
       blockList.classList.add('block-list2')
       array.forEach((appareil) => {
          const list = document.createElement('li')
          list.classList.add('list-appareils')
          list.textContent = appareil
          blockList.appendChild(list)
       }) 
       filters[1].appendChild(blockList) 
       
       const className = '.block-list2'
       const inputClassName = '.input2'
       const classNameList = 'list-appareils'
       searchTag(array, className, inputClassName,  classNameList, recipes)
       displayAppareilsTags(recipes)
 }
 

 async function getUstensiles(recipes){
     const array = []
     recipes.forEach((recipe) => {
     
         for( let recip of recipe.ustensils ){
            if(array.includes(recip.toLowerCase()) === false){
                array.push(recip.toLowerCase())
            }
           }
       })
        // création ustensiles list
       const blockList = document.createElement('ul');
       blockList.classList.add('block-list3')
       array.forEach((appareil) => {
          const list = document.createElement('li')
          list.classList.add('list-ustensiles')
          list.textContent = appareil
          blockList.appendChild(list)
       }) 
       filters[2].appendChild(blockList)
       const className = '.block-list3'
       const inputClassName = '.input3'
       const classNameList = 'list-ustensiles'
       searchTag(array, className, inputClassName, classNameList, recipes)
       displayUstensilesTags(recipes)
 }


 function displayIngredientsTags(){
  const list = document.querySelectorAll('.list-ingredients')

  list.forEach((ingredient) => {
     ingredient.addEventListener('click', function(){
          // création tag 
          const tagBlock = document.querySelector('.tags')
          const tag = document.createElement('span');
          
          for(let value of tagBlock.childNodes){
            if(value.textContent === ingredient.textContent){
               return null
            }
          }
          if(tagBlock.childNodes.length + 1 > 3 ){
            return null
          }else{
            tag.classList.add('ingredients-tag',)
            tag.innerHTML = this.textContent + `<i class="fa-solid fa-xmark close-tag"></i>`;
            tagBlock.appendChild(tag)
          }
          // delete tag with close btn 
          tag.childNodes[1].addEventListener('click', function(){
             tag.remove(this)
          })
     })
  })
}

function displayAppareilsTags(recipes){
    const list = document.querySelectorAll('.list-appareils')
    const arrayTag = [];
    list.forEach((ingredient) => {
        
       ingredient.addEventListener('click', function(){
          // création tag 
          const tagBlock = document.querySelector('.tags')
          const tag = document.createElement('span');
          
          for(let value of tagBlock.childNodes){
            if(value.textContent === ingredient.textContent){
               return null
            }
          }
        
          if(tagBlock.childNodes.length + 1 > 3 ){
            return null
          }else{ 
            tag.classList.add('appareils-tag',)
            tag.innerHTML = this.textContent + `<i class="fa-solid fa-xmark close-tag"></i>`;
            tagBlock.appendChild(tag)
            arrayTag.push(tag.textContent)
          }
                // search recipes by tags
         const blockRecipes = document.querySelector('.recipes-block');
         const arrayRecipes = []
         
         function tagRecipe(){
            console.log(arrayTag);
            if(arrayTag.length === 0){
               console.log('non');
               blockRecipes.innerHTML = ""
               displayRecipes(recipes)
            }else{
               recipes.forEach((recipe) => { 
                  if (arrayTag.length === 1){
                     if(recipe.appliance.includes(arrayTag[0])){
                        arrayRecipes.push(recipe)
                      }
                   }
                   if (arrayTag.length === 2){
                     if(recipe.appliance.includes(arrayTag[0]) && recipe.appliance.includes(arrayTag[1])){
                        arrayRecipes.push(recipe)
                      }
                   }
                   if (arrayTag.length === 3){
                     if(recipe.appliance.includes(arrayTag[0]) && recipe.appliance.includes(arrayTag[1]) && recipe.appliance.includes(arrayTag[2])){
                        arrayRecipes.push(recipe)
                      }
                   }
                   blockRecipes.innerHTML = ""
                   displayRecipes(arrayRecipes)
                })  
            }  
         }  
         tagRecipe()
         // delete tag with close btn 
         tag.childNodes[1].addEventListener('click', function(){
            const index = arrayTag.indexOf(tag.textContent);
            arrayTag.splice(index, 1);
            console.log(arrayTag);
            tag.remove(this)
            blockRecipes.innerHTML = ""
            tagRecipe()
         }) 
       })
    })
  }

 function displayUstensilesTags(recipes){
    const list = document.querySelectorAll('.list-ustensiles');
    const arrayTag = [];
    list.forEach((ingredient) => {
       ingredient.addEventListener('click', function(){
          // création tag 
          const tagBlock = document.querySelector('.tags')
          const tag = document.createElement('span');
          
          for(let value of tagBlock.childNodes){
            if(value.textContent === ingredient.textContent){
               return null
            }
          }
          if(tagBlock.childNodes.length + 1 > 3 ){
            return null
          }else{  
            tag.classList.add('ustensiles-tag',)
            tag.innerHTML = this.textContent + `<i class="fa-solid fa-xmark close-tag"></i>`;
            tagBlock.appendChild(tag)
            arrayTag.push(tag.textContent)
          }
          // search recipes by tags
         const blockRecipes = document.querySelector('.recipes-block');
         const arrayRecipes = []

         function tagRecipe(){
            console.log(arrayTag);
            if(arrayTag.length === 0){
               console.log('non');
               blockRecipes.innerHTML = ""
               displayRecipes(recipes)
            }else{
               recipes.forEach((recipe) => { 
                  if (arrayTag.length === 1){
                     if(recipe.ustensils.includes(arrayTag[0])){
                        arrayRecipes.push(recipe)
                      }
                   }
                   if (arrayTag.length === 2){
                     if(recipe.ustensils.includes(arrayTag[0]) && recipe.ustensils.includes(arrayTag[1])){
                        arrayRecipes.push(recipe)
                      }
                   }
                   if (arrayTag.length === 3){
                     if(recipe.ustensils.includes(arrayTag[0]) && recipe.ustensils.includes(arrayTag[1]) && recipe.ustensils.includes(arrayTag[2])){
                        arrayRecipes.push(recipe)
                      }
                   }
                   blockRecipes.innerHTML = ""
                   displayRecipes(arrayRecipes)
                })  
            }  
         }  
         tagRecipe()
          // delete tag with close btn 
          tag.childNodes[1].addEventListener('click', function(){
             const index = arrayTag.indexOf(tag.textContent);
             arrayTag.splice(index, 1);
             console.log(arrayTag);
             tag.remove(this)
             blockRecipes.innerHTML = ""
             tagRecipe()
          }) 
       })
    })
}

function searchTag(array,className,input,classNameList,recipes){
   const inputvalue = document.querySelectorAll(input);
  
     inputvalue.forEach((value) => {
        value.addEventListener('input', (e) => {;
       
            const searchedString = e.target.value.toLowerCase()
            const filteredArr = array.filter(el => el.toLowerCase().includes(searchedString))
            const blockList = document.querySelector(className);
            blockList.innerHTML = ""
            
            filteredArr.forEach((ingredient) => {
                const list = document.createElement('li')
                list.classList.add(classNameList)
                list.textContent = ingredient
                blockList.appendChild(list)
            })
            displayIngredientsTags()
            displayUstensilesTags(recipes)
            displayAppareilsTags(recipes) 
         })
     })  
}



