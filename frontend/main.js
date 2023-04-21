import initEditor from "./js/editor.js";

const login = document.querySelector(".login");
login.addEventListener("click", clickLogin)




function clickLogin(){


  localStorage.setItem("loggedIn", "true")
    console.log("Loggades in")

initEditor();

}