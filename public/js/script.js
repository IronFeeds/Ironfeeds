document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronFeeds JS imported successfully!");
    //Save and unsave button on index file prevent reload action
    const forms = document.getElementsByClassName("saveFav");
    console.log("form", forms);
    for (const form of forms) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        fetch(event.target.action, {method: "POST"})
        .then(response=>response.json())
        .then(data=>console.log("worked", data))
      });
    }

// Profile buttons for Saved and MyArticles
const savedButton = document.getElementById("savedButton")
const myArticlesButton = document.getElementById("myArticlesButton")
const saved = document.getElementsByClassName("savedArticles")
const myArticles = document.getElementsByClassName("myArticles")

function hideSaved(){
  Array.from(saved).forEach((save)=>save.classList.add("hide"))
  myArticlesButton.classList.add("chosen")
  savedButton.classList.remove("chosen")
  Array.from(myArticles).forEach((article)=>article.classList.remove("hide"))
}
function hideMyArticles(){
  Array.from(saved).forEach((save)=>save.classList.remove("hide"))
  myArticlesButton.classList.remove("chosen")
  savedButton.classList.add("chosen")
  Array.from(myArticles).forEach((article)=>article.classList.add("hide"))
}

savedButton?.addEventListener("click", hideMyArticles)
myArticlesButton?.addEventListener("click", hideSaved)


//Index file DOM manipulation for save/unsave icons
const saveIcon = document.getElementsByClassName("saveIcon")
console.log("baaaa", saveIcon)

Array.from(saveIcon).forEach((icon)=> icon.addEventListener("click", ()=>{
  icon.classList.toggle("saved")
  icon.classList.toggle("unsaved")
}))

},
false
);

//Menu lines
const lines = document.querySelectorAll('.line1, .line2, .line3');
const linesContainer = document.getElementsByClassName("lines");

function changeClass (){
    for(let i=0; i<3;i++){
if (lines[i].classList.contains("noAnimation")){
    lines[i].classList.add("close"); 
    lines[i].classList.remove("noAnimation");  
  }
 else if (lines[i].classList.contains("close")){
    lines[i].classList.add("rev");
    lines[i].classList.remove("close");  
  }
 else if (lines[i].classList.contains("rev")){
    lines[i].classList.add("close");  
    lines[i].classList.remove("rev");
  }; 
}}

linesContainer[0].addEventListener("click", changeClass);