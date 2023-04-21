import initEditor from "./js/editor.js";
const loggedIn = localStorage.getItem("loggedIn");

if (loggedIn === "true") {
  initEditor()
} else {
  const login = document.querySelector(".login");
  login.addEventListener("click", clickLogin)

    function clickLogin(){
      
      localStorage.setItem("loggedIn", "true")
      console.log("Loggades in")

    initEditor();
  }
}

