document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronFeeds JS imported successfully!");
    const forms = document.getElementsByClassName("saveFav");
    console.log("form", forms);
    for (const form of forms) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.target
        console.log("worked");
      });
    }
  },
  false
);

const saved = document.getElementById("saved")
const myArticles = document.getElementById("myArticles")

function hide(element){
  element.classList.add("hide")
}
saved.addEventListener("click", (event)=>hide(myArticles))
myArticles.addEventListener("click", (event)=>hide(saved))
