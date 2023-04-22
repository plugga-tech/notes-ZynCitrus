import initEditor from "./js/editor.js";
import fetchAll from "./js/fetchAll.js"
const loggedIn = localStorage.getItem("loggedIn");
const login = document.querySelector(".login");

if (loggedIn === "true") {
  fetchAll();
  login.classList.add("hidden");
} else {
  login.addEventListener("click", clickLogin);
  
  function clickLogin() {
    localStorage.setItem("loggedIn", "true");
    console.log("Loggades in");
    fetchAll();
    login.classList.add("hidden");
  }
}
