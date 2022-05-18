document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronFeeds JS imported successfully!");
    const forms = document.getElementsByClassName("saveFav");
    console.log("form", forms);
    for (const form of forms) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>", event.target.action)
        fetch(event.target.action, {method: "POST"})
        .then(response=>response.json())
        .then(data=>console.log("worked", data))
      });
    }
  },
  false
);

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
savedButton.addEventListener("click", hideMyArticles)
myArticlesButton.addEventListener("click", hideSaved)
