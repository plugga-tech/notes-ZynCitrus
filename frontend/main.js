import initEditor from "./editor.js";


const login = document.querySelector(".login");
login.addEventListener("click", clickLogin)



function clickLogin(){


  localStorage.setItem("loggedIn", "true")
    console.log("Hej")

initEditor();

}