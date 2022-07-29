/*Food App It is a simple website that uses an Api and calls the data to display to display the recipes and meals requested by the user.
 The data was called by =>fetch()
*/
let btn = document.getElementById("search-btn");
let Get = document.getElementById("info");
//start Get meals
btn.addEventListener("click", function () {
  let searchs = document.getElementById("search-input").value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchs}`)
    .then((response) => response.json())
    .then((date) => {
      let camp = "";
      if (date.meals) {
        date.meals.forEach((meal) => {
          camp += `
            <div class=" col-xl-4 col-lg-4 col-md-6 col-sm-12">
            <div class="item" data-id="${meal.idMeal}">
            <div class="item_img"><img class="img-fluid" src="${meal.strMealThumb}" alt=""></div>
           <div class="item_name" id="info"  onclick="des()">
          <h3>${meal.strMeal}</h3>
          <a href="#"class="gets" id="Get">Get your order</a>
           </div>
     </div>
    </div>

            `;
        });
        document.querySelector("#Titel").innerText = "Your Search Results:";
        document.querySelector("#Titel").classList.remove("erorr");
      } else {
        //found Error Text
        document.querySelector("#Titel").innerText =
          "Sorry, we didn't find any meal!";
        document.querySelector("#Titel").classList.add("erorr");
      }

      document.getElementById("RowDate").innerHTML = camp;
    });
});
//function View recipe details
function des() {
  // The recipe that you are pressing
  if (event.target.classList.contains("gets")) {
    let mealItem = event.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data.meals));
  }
}

//creat model
function mealRecipeModal(meal) {
  meal = meal[0];
  //concatenation api

  let html = "";
  html = `
 <div class="descrsption">
   <i class="fa-solid fa-xmark closer " id="close"  onclick="close_tap()"></i>

   <div class="details-content py-2 text-center "> 
   <h2 class="mt-3">${meal.strMeal}</h2>
   <p>${meal.strCategory}</p>
 </div>


 <div class="recipe-instruct py-2 px-3 text-center">
   <h3>Instructions :</h3>
   <p>${meal.strInstructions}</p>
 </div>

<div class="meal_img py-2 text-center"><img class="" src="${meal.strMealThumb}" alt=""></div>

<div class="meals_ link_videos text-center  mb-4">  
 <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
</div>


 `;
  //display tap descraption meals

  $("#pakegall").fadeIn(600);

  document.querySelector(".descrsption").innerHTML = html;
}

//remove tap descraption meals
function close_tap() {
  $("#pakegall").fadeOut(600);
}
