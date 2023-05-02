const container = document.querySelector('.postsContainer');
import newPost from "./newPost.js";

export default function fetchAll() {
  fetch('http://localhost:3000/posts/all')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      data.forEach((row, index) => {
        const rowElement = document.createElement('div');
        const rowId = `row-${index}`;
        rowElement.innerHTML = `
        <button class="deleteBtn" data-id="${row.id}">TA BORT</button>
          <h2 class="row-title">${row.saveTitle}</h2>
          <p class="author">Author: ${row.saveAuthor}</p>
          <div class="editor" id="${rowId}" style="display:block">${row.saveContent}</div>
          <button class="updateBtn" data-id="${row.id}">UPPDATERA</button>
        `;
        container.appendChild(rowElement);

        const titleElement = rowElement.querySelector('.row-title');
        const deleteBtn = rowElement.querySelector('.deleteBtn');
        const updateBtn = rowElement.querySelector('.updateBtn');

        titleElement.addEventListener('click', () => {
          const editor = rowElement.querySelector('.editor');
          editor.style.display = 'block';
          tinymce.init({
            selector: `#${rowId}`,
            height: 300,
            inline: true,
            menubar: false,
            toolbar: 'undo redo | formatselect | bold italic backcolor | \
              alignleft aligncenter alignright alignjustify | \
              bullist numlist outdent indent | removeformat | help',
            setup: (editor) => {
              editor.on('init', () => {
                editor.setContent(row.saveContent, {format: 'raw'});
              });
            }
          });
        });
        
        deleteBtn.addEventListener('click', () => {
          const postId = deleteBtn.dataset.id;
          fetch(`http://localhost:3000/posts/delete/${postId}`, {
            method: 'DELETE'
          })
          .then(response => response.text())
          .then(result => {
            console.log(result);
            container.removeChild(rowElement);
          })
          .catch(error => {
            console.error(error);
          });
        });

        updateBtn.addEventListener('click', () => {
          const editor = rowElement.querySelector('.editor');
          const postId = updateBtn.dataset.id;
          const saveTitle = titleElement.textContent;
          const saveAuthor = row.saveAuthor;
          const saveContent = editor.innerHTML;
          const data = { saveTitle, saveAuthor, saveContent };
          fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(response => response.text())
          .then(result => {
            console.log(result);
          })
          .catch(error => {
            console.error(error);
          });
        });
      });

      const writeNewBtn = document.createElement('button');
      writeNewBtn.classList.add('writeNewAllPosts');
      writeNewBtn.textContent = 'Skriv ett nytt inlägg';
      writeNewBtn.addEventListener('click', () => {
        container.innerHTML = '';
        newPost();
      });



      container.appendChild(writeNewBtn);
    })
    .catch(error => {
      console.error
    })
  };