import fetchAll from "./posts.js";
import newPost from "./newPost.js";

export default function selectMode() {
    const container = document.querySelector('.buttonContainer');
    const fetchAllBtn = document.createElement('button');
    fetchAllBtn.classList.add('fetchAll');
    fetchAllBtn.textContent = 'Se alla inlägg';
    fetchAllBtn.addEventListener('click', () => {
        container.style.display = "none";
        fetchAll();
      });
  
    const writeNewBtn = document.createElement('button');
    writeNewBtn.classList.add('writeNew');
    writeNewBtn.textContent = 'Skriv ett nytt inlägg';
      writeNewBtn.addEventListener('click', () => {
        container.style.display = "none";
        newPost();
      });
  
    container.appendChild(fetchAllBtn);
    container.appendChild(writeNewBtn);
  }
  