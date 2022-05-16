document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("IronFeeds JS imported successfully!");
    const forms = document.getElementsByClassName("saveFav");
    console.log("form", forms);
    for (const form of forms) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        console.log("worked");
      });
    }
  },
  false
);
