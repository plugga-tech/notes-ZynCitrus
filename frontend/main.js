import fetchAll from "./js/posts.js"
import selectMode from "./js/selectMode.js"
const loggedIn = localStorage.getItem("loggedIn");
const login = document.querySelector(".login");

if (loggedIn === "true") {
  login.classList.add("hidden");
  selectMode();
} else {
  login.addEventListener("click", clickLogin);

  function clickLogin() {
    localStorage.setItem("loggedIn", "true");
    console.log("Loggades in");
    login.classList.add("hidden");
    selectMode();
  }
}
